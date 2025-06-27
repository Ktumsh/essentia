import { head, put } from "@vercel/blob";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";
import { z } from "zod";

import { auth } from "@/app/(auth)/auth";

const FileSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file.size <= 10 * 1024 * 1024, {
      message: "El archivo debe pesar menos de 10MB",
    })
    .refine(
      (file) =>
        [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/webp",
          "application/pdf",
        ].includes(file.type),
      {
        message: "Los archivos permitidos son JPEG, PNG, WEBP y PDF",
      },
    ),
});

export async function POST(request: Request) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (request.body === null) {
    return NextResponse.json(
      { error: "Request body is empty" },
      { status: 400 },
    );
  }
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No se envió archivo" },
        { status: 400 },
      );
    }

    const validatedFile = FileSchema.safeParse({ file });

    if (!validatedFile.success) {
      const errorMessage = validatedFile.error.errors
        .map((error) => error.message)
        .join(", ");

      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    const originalName = file.name.replace(/\.[^/.]+$/, "");
    const sanitized = originalName
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-_]/gi, "");

    const extension = file.name.split(".").pop();
    const filename = `${sanitized}-${nanoid()}.${extension}`;
    const filePath = `medical-files/${filename}`;

    const fileBuffer = Buffer.from(await file.arrayBuffer());

    const data = await put(filePath, fileBuffer, {
      access: "public",
    });

    const metadata = await head(data.url);

    return NextResponse.json({
      url: data.url,
      pathname: data.pathname,
      uploadedAt: metadata.uploadedAt,
      size: metadata.size,
      contentType: metadata.contentType,
      originalName: file.name,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al subir archivo" },
      { status: 500 },
    );
  }
}
