import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { auth } from "@/app/(auth)/auth";
import { updateUserBanner, updateUserPhoto } from "@/db/profile-querys";

const FileSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "El archivo debe pesar menos de 5MB",
    })
    .refine(
      (file) =>
        ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
          file.type,
        ),
      {
        message: "Los archivos permitidos son JPEG, PNG o WEBP",
      },
    ),
});

export const POST = async (req: NextRequest) => {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const userId = formData.get("userId") as string;
    const imageType = formData.get("imageType") as string;

    if (!userId || !imageType) {
      return NextResponse.json(
        {
          success: false,
          error: "ID de usuario y tipo de imagen son requeridos",
        },
        { status: 400 },
      );
    }

    const validatedFile = FileSchema.safeParse({ file });

    if (!validatedFile.success) {
      const errorMessage = validatedFile.error.errors
        .map((error) => error.message)
        .join(", ");

      return NextResponse.json(
        { success: false, error: errorMessage },
        { status: 400 },
      );
    }

    let folder = "";
    if (imageType === "profile") {
      folder = "profile/";
    } else if (imageType === "banner") {
      folder = "banner/";
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "Tipo de imagen no válido",
        },
        { status: 400 },
      );
    }

    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const fileExtension = file.name.split(".").pop();
    const filename = `${imageType}-${userId}-${uniqueSuffix}.${fileExtension}`;
    const filePath = `${folder}${filename}`;

    const fileBuffer = Buffer.from(await file.arrayBuffer());

    try {
      const data = await put(filePath, fileBuffer, {
        access: "public",
      });

      const fileUrl = data.url;

      let updateResult;

      if (imageType === "banner") {
        updateResult = await updateUserBanner(userId, fileUrl);
      } else if (imageType === "profile") {
        updateResult = await updateUserPhoto(userId, fileUrl);
      }

      if (updateResult?.error) {
        return NextResponse.json(
          {
            success: false,
            error: updateResult.error,
          },
          { status: 500 },
        );
      }

      return NextResponse.json({
        success: true,
        [imageType === "banner" ? "banner_image" : "profile_image"]: (
          updateResult as {
            banner_image?: string | null;
            profile_image?: string | null;
          }
        )[imageType === "banner" ? "banner_image" : "profile_image"],
      });
    } catch (error) {
      console.error("Error uploading file to Vercel Blob:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Error al subir la imagen",
        },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Error interno del servidor",
      },
      { status: 500 },
    );
  }
};
