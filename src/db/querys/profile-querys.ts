"use server";

import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import {
  user,
  type User,
  userProfile,
  type UserProfile,
  subscription,
  type Subscription,
} from "@/db/schema";

const client = postgres(process.env.POSTGRES_URL!);
const db = drizzle(client);

export async function getProfile(userId: string): Promise<Array<UserProfile>> {
  try {
    return await db
      .select()
      .from(userProfile)
      .where(eq(userProfile.userId, userId))
      .limit(1);
  } catch (error) {
    console.error(
      "Error al obtener la información del perfil del usuario:",
      error,
    );
    throw error;
  }
}

export async function getProfileNameByEmail(
  email: string,
): Promise<Array<{ firstName: string; lastName: string }>> {
  try {
    return await db
      .select({
        firstName: userProfile.firstName,
        lastName: userProfile.lastName,
      })
      .from(userProfile)
      .innerJoin(user, eq(user.id, userProfile.userId))
      .where(eq(user.email, email))
      .limit(1);
  } catch (error) {
    console.error("Error al obtener el nombre del perfil del usuario:", error);
    throw error;
  }
}

export async function getUserProfileByEmail(
  email: string,
): Promise<
  Array<{ user: User; profile: UserProfile; subscription: Subscription }>
> {
  try {
    return await db
      .select({
        user: user,
        profile: userProfile,
        subscription: subscription,
      })
      .from(userProfile)
      .innerJoin(user, eq(user.id, userProfile.userId))
      .innerJoin(subscription, eq(user.id, subscription.userId))
      .where(eq(user.email, email));
  } catch (error) {
    console.error("Error al obtener el perfil del usuario:", error);
    throw error;
  }
}

export async function getUserProfileByUsername(
  username: string,
): Promise<
  Array<{ user: User; profile: UserProfile; subscription: Subscription }>
> {
  try {
    return await db
      .select({
        user: user,
        profile: userProfile,
        subscription: subscription,
      })
      .from(userProfile)
      .innerJoin(user, eq(user.id, userProfile.userId))
      .innerJoin(subscription, eq(user.id, subscription.userId))
      .where(eq(user.username, username));
  } catch (error) {
    console.error("Error al obtener el perfil del usuario:", error);
    throw error;
  }
}

export async function updateUserProfile(
  profileData: Partial<UserProfile & User>,
) {
  const {
    userId,
    firstName,
    lastName,
    birthdate,
    profileImage,
    bio,
    location,
    weight,
    height,
    genre,
    username,
  } = profileData;

  if (!userId) {
    return { error: "ID de usuario es requerido" };
  }

  try {
    const profileResult = await db
      .update(userProfile)
      .set({
        firstName: firstName,
        lastName: lastName,
        birthdate: birthdate,
        profileImage: profileImage,
        bio: bio,
        location: location,
        weight: weight,
        height: height,
        genre: genre,
        updatedAt: new Date(),
      })
      .where(eq(userProfile.userId, userId));

    if (profileResult.count === 0) {
      throw new Error("No se pudo actualizar el perfil del usuario");
    }

    const userResult = await db
      .update(user)
      .set({
        username,
        updatedAt: new Date(),
      })
      .where(eq(user.id, userId));

    if (userResult.count === 0) {
      throw new Error("No se pudo actualizar el perfil del usuario");
    }

    return { ...profileResult, ...userResult };
  } catch (error) {
    console.error("Error al actualizar el perfil del usuario:", error);
    throw error;
  }
}

export async function updateUserPhoto(
  userId: string,
  profileImageData: string,
) {
  if (!userId) {
    return { error: "ID de usuario es requerido" };
  }

  try {
    const res = await db
      .update(userProfile)
      .set({
        profileImage: profileImageData,
        updatedAt: new Date(),
      })
      .where(eq(userProfile.userId, userId));

    if (res.count === 0) {
      console.error("Error al actualizar: Usuario no encontrado");
      return { error: "Usuario no encontrado" };
    }

    return res;
  } catch (error) {
    console.error("Error al actualizar la foto de perfil:", error);
    throw error;
  }
}

export async function deleteUserPhoto(userId: string) {
  if (!userId) {
    return { error: "ID de usuario es requerido" };
  }
  try {
    const res = await db
      .update(userProfile)
      .set({
        profileImage: null,
        updatedAt: new Date(),
      })
      .where(eq(userProfile.userId, userId));

    if (res.count === 0) {
      console.error("Error al eliminar: Usuario no encontrado");
      return { error: "Usuario no encontrado" };
    }

    return res;
  } catch (error) {
    console.error("Error al eliminar la foto de perfil:", error);
    throw error;
  }
}
