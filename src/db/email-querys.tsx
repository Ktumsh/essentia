"use server";

import { createPool } from "@vercel/postgres";
import { nanoid } from "nanoid";

import { sendEmail } from "@/modules/auth/lib/send-email";

const pool = createPool({
  connectionString: process.env.POSTGRES_URL,
});

export async function insertEmailVerificationToken(
  userId: string,
  token: string,
): Promise<void> {
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 24);

  await pool.sql`
    INSERT INTO email_verifications (user_id, token, expires_at)
    VALUES (${userId}, ${token}, ${expiresAt.toISOString()});
  `;
}

export async function getVerificationToken(token: string) {
  const result = await pool.sql`
    SELECT * FROM email_verifications WHERE token = ${token} LIMIT 1;
  `;
  return result.rows[0] || null;
}

export async function resendEmailVerification(userId: string, email: string) {
  try {
    const newToken = nanoid();

    const result = await pool.sql`
      UPDATE email_verifications
      SET token = ${newToken}, expires_at = NOW() + INTERVAL '24 hours'
      WHERE user_id = ${userId};
    `;

    if (result.rowCount === 0) {
      throw new Error(
        "No se pudo actualizar el token de verificación para el usuario.",
      );
    }

    const resultEmail = await sendEmail(email, newToken);

    if (resultEmail.success) {
      return {
        status: "success",
        message: "Se ha enviado un nuevo correo de verificación.",
      };
    } else {
      throw new Error("Error al enviar el correo de verificación.");
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error al reenviar el correo de verificación:", error);

      return {
        status: "error",
        message: "Ocurrió un error al reenviar el correo de verificación.",
      };
    }
  }
}

export async function updateEmailVerified(userId: string) {
  try {
    await pool.sql`
      UPDATE users
      SET email_verified = TRUE, updated_at = NOW()
      WHERE id = ${userId};
    `;
  } catch (error) {
    console.error("Error al marcar el correo como verificado:", error);
  }
}

export async function deleteVerificationToken(token: string) {
  try {
    const result = await pool.sql`
      DELETE FROM email_verifications WHERE token = ${token};
    `;

    if (result.rowCount === 0) {
      throw new Error(`No se encontró ningún token con el valor: ${token}`);
    }

    return {
      status: "success",
      message: "El token de verificación ha sido eliminado correctamente.",
    };
  } catch (error) {
    console.error("Error al eliminar el token de verificación:", error);
    return {
      status: "error",
      message: "Ocurrió un error al eliminar el token de verificación.",
    };
  }
}
