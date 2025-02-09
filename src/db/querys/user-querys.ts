"use server";

import { createAvatar } from "@dicebear/core";
import * as icons from "@dicebear/icons";
import { compare, genSaltSync, hashSync } from "bcrypt-ts";
import { and, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import { nanoid } from "nanoid";
import postgres from "postgres";

import { user, type User, userProfile, subscription } from "@/db/schema";
import { sendEmailAction } from "@/modules/auth/lib/email-action";
import { generateVerificationCode } from "@/modules/core/lib/utils";
import { ResultCode } from "@/utils/code";

import { insertEmailSendsCode } from "./email-querys";
import { createNotification } from "./notification-querys";

const client = postgres(process.env.POSTGRES_URL!);
const db = drizzle(client);

export async function createUser(
  email: string,
  password: string,
  username: string,
  firstName: string,
  lastName: string,
  birthdate: Date | null,
) {
  const salt = genSaltSync(10);
  const hash = hashSync(password, salt);

  try {
    const avatar = createAvatar(icons, {
      seed: username,
      backgroundType: ["gradientLinear", "solid"],
    });

    const avatarSvg = avatar.toDataUri();

    const userResult = await db
      .insert(user)
      .values({
        email,
        username,
        password: hash,
      })
      .returning();

    const userId = userResult[0].id;

    await db.insert(userProfile).values({
      userId,
      firstName,
      lastName,
      birthdate,
      profileImage: avatarSvg,
    });

    await db.insert(subscription).values({
      userId,
      isPremium: false,
    });

    const code = generateVerificationCode();
    const token = nanoid(64);

    await insertEmailSendsCode(userId, code, "email_verification");

    const emailResult = await sendEmailAction("email_verification", {
      email,
      code,
      token,
    });

    if (!emailResult.success) {
      throw new Error("Error al enviar el email de verificación");
    }

    await createNotification({
      userId,
      title: "¡Bienvenid@!",
      message:
        "Gracias por registrarte en Essentia. ¡Comienza a explorar nuestros cursos educativos!",
      url: "/salud-y-bienestar",
    });

    return {
      type: "success",
      resultCode: ResultCode.USER_CREATED,
    };
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    return {
      type: "error",
      resultCode: ResultCode.UNKNOWN_ERROR,
    };
  }
}

export async function getUserById(id: string): Promise<Array<User>> {
  try {
    return await db.select().from(user).where(eq(user.id, id));
  } catch (error) {
    console.error("Error al obtener el usuario por ID:", error);
    throw error;
  }
}

export async function getUserByEmail(email: string): Promise<Array<User>> {
  try {
    return await db.select().from(user).where(eq(user.email, email));
  } catch (error) {
    console.error("Error al obtener el usuario por email:", error);
    throw error;
  }
}

export async function getUserByUsername(
  username: string,
): Promise<Array<User>> {
  try {
    return await db.select().from(user).where(eq(user.username, username));
  } catch (error) {
    console.error("Error al obtener el usuario por username:", error);
    throw error;
  }
}

export async function updateUserEmail(id: string, email: string) {
  try {
    return await db
      .update(user)
      .set({
        email,
      })
      .where(eq(user.id, id));
  } catch (error) {
    console.error("Error al actualizar el email del usuario:", error);
    throw error;
  }
}

export async function updateUserPassword(id: string, password: string) {
  const salt = genSaltSync(10);
  const hash = hashSync(password, salt);

  try {
    return await db
      .update(user)
      .set({
        password: hash,
      })
      .where(eq(user.id, id));
  } catch (error) {
    console.error("Error al actualizar la contraseña del usuario:", error);
    throw error;
  }
}

export async function deleteUser(
  id: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    const [userToDelete] = await getUserById(id);
    if (!userToDelete) {
      return {
        success: false,
        error: "Usuario no encontrado.",
      };
    }

    if (userToDelete.role === "admin") {
      const adminCount = await getAdminCount();
      if (adminCount <= 1) {
        return {
          success: false,
          error: "No se puede eliminar el único administrador.",
        };
      }
    }

    await db.update(user).set({ status: "disabled" }).where(eq(user.id, id));

    return { success: true };
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    return { success: false, error: "Error al eliminar el usuario." };
  }
}

export async function getUserState(id: string): Promise<string> {
  try {
    const [userData] = await db
      .select({ status: user.status })
      .from(user)
      .where(eq(user.id, id));

    return userData.status;
  } catch (error) {
    console.error("Error al obtener el estado del usuario:", error);
    throw error;
  }
}

export async function verifySamePassword(
  userId: string,
  newPassword: string,
): Promise<boolean> {
  const [user] = await getUserById(userId);

  if (!user) {
    throw new Error("Usuario no encontrado.");
  }

  return await compare(newPassword, user.password);
}

export async function getAdminCount(): Promise<number> {
  try {
    const admins = await db
      .select()
      .from(user)
      .where(and(eq(user.role, "admin"), eq(user.status, "enabled")));
    return admins.length;
  } catch (error) {
    console.error("Error al obtener el conteo de administradores:", error);
    throw error;
  }
}
