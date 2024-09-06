import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import {
  deleteUserBanner,
  updateUserBanner,
  updateUserProfileImage,
} from "@/app/(main)/profile/actions";

const UPLOAD_DIR = path.resolve(process.cwd(), "public/uploads");

const generateHash = (buffer: Buffer) => {
  return crypto.createHash("sha256").update(buffer).digest("hex");
};

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const userId = formData.get("userId") as string;
    const imageType = formData.get("imageType") as string;

    if (!userId || !imageType) {
      return NextResponse.json({
        success: false,
        error: "ID de usuario y tipo de imagen son requeridos",
      });
    }

    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const fileHash = generateHash(buffer);

      if (!fs.existsSync(UPLOAD_DIR)) {
        fs.mkdirSync(UPLOAD_DIR, { recursive: true });
      }

      const existingFiles = fs.readdirSync(UPLOAD_DIR);
      const existingFile = existingFiles.find((fileName) => {
        const existingFilePath = path.join(UPLOAD_DIR, fileName);
        const existingFileBuffer = fs.readFileSync(existingFilePath);
        const existingFileHash = generateHash(existingFileBuffer);
        return existingFileHash === fileHash;
      });

      let fileUrl;
      if (existingFile) {
        fileUrl = `/uploads/${existingFile}`;
      } else {
        const fileName = `${Date.now()}-${file.name}`;
        const filePath = path.join(UPLOAD_DIR, fileName);
        fs.writeFileSync(filePath, buffer);

        fileUrl = `/uploads/${fileName}`;
      }

      let updateResult;

      if (imageType === "banner") {
        updateResult = await updateUserBanner(userId, fileUrl);
      } else if (imageType === "profile") {
        updateResult = await updateUserProfileImage(userId, fileUrl);
      } else {
        return NextResponse.json({
          success: false,
          error: "Tipo de imagen no válido",
        });
      }

      if (updateResult.error) {
        return NextResponse.json({
          success: false,
          error: updateResult.error,
        });
      }

      return NextResponse.json({
        success: true,
        [imageType === "banner" ? "banner_image" : "profile_image"]:
          updateResult[
            imageType === "banner" ? "banner_image" : "profile_image"
          ],
      });
    } else {
      return NextResponse.json({
        success: false,
        error: "No se recibió ningún archivo",
      });
    }
  } catch (error) {
    console.error("Error al subir el archivo:", error);
    return NextResponse.json({
      success: false,
      error: "Error interno del servidor",
    });
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({
        success: false,
        error: "ID de usuario es requerido",
      });
    }

    const deleteResult = await deleteUserBanner(userId);

    if (deleteResult.error) {
      return NextResponse.json({
        success: false,
        error: deleteResult.error,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Banner eliminado correctamente.",
    });
  } catch (error) {
    console.error("Error al eliminar el banner:", error);
    return NextResponse.json({
      success: false,
      error: "Error interno del servidor",
    });
  }
};
