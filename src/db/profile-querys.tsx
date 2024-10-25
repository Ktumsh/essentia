"use server";

import { createPool, sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

import { User, UserProfile, UserProfileData } from "@/types/session";

import { getUserByEmail, getUserByUsername } from "./user-querys";

const pool = createPool({
  connectionString: process.env.POSTGRES_URL,
});

export async function getProfile(userId: string): Promise<UserProfile | null> {
  const result = await pool.sql<UserProfile>`
        SELECT * FROM user_profiles WHERE user_id = ${userId} LIMIT 1;
      `;
  return result.rows[0] || null;
}

export async function getProfileNameByEmail(
  email: string
): Promise<UserProfile | null> {
  const user = await getUserByEmail(email);
  if (!user) {
    return null;
  }

  const result = await pool.sql<UserProfile>`
        SELECT first_name, last_name FROM user_profiles WHERE user_id = ${user?.id} LIMIT 1;
      `;

  return result.rows[0] || null;
}

export async function getUserProfileByEmail(
  email: string
): Promise<{ user: User; profile: UserProfile } | null> {
  const user = await getUserByEmail(email);
  if (!user) return null;

  const profile = await getProfile(user.id);
  if (!profile) return null;

  return { user, profile };
}

export async function getUserProfileByUsername(
  username: string
): Promise<{ user: User; profile: UserProfile } | null> {
  const user = await getUserByUsername(username);
  if (!user) return null;

  const profile = await getProfile(user.id);
  if (!profile) return null;
  return { user, profile };
}

export async function updateUserProfile(profileData: Partial<UserProfileData>) {
  const {
    id,
    first_name,
    last_name,
    birthdate,
    profile_image,
    bio,
    location,
    banner_image,
    username,
  } = profileData;

  if (!id) {
    return { error: "ID de usuario es requerido" };
  }

  const queryProfile = `
      UPDATE user_profiles 
      SET 
        first_name = COALESCE($1, first_name), 
        last_name = COALESCE($2, last_name), 
        birthdate = COALESCE($3, birthdate), 
        profile_image = COALESCE($4, profile_image), 
        bio = COALESCE($5, bio), 
        location = COALESCE($6, location), 
        banner_image = COALESCE($7, banner_image), 
        updated_at = NOW()
      WHERE user_id = $8
      RETURNING *;
    `;

  const profileValues = [
    first_name,
    last_name,
    birthdate,
    profile_image,
    bio,
    location,
    banner_image,
    id,
  ];

  try {
    const resProfile = await sql.query(queryProfile, profileValues);
    if (resProfile.rowCount === 0) {
      console.error("Error al actualizar: Usuario no encontrado");
      return { error: "Usuario no encontrado" };
    }

    if (username) {
      const queryUser = `
          UPDATE users 
          SET username = $1 
          WHERE id = $2
          RETURNING *;
        `;

      const userValues = [username, id];

      const resUser = await sql.query(queryUser, userValues);
      if (resUser.rowCount === 0) {
        console.error(
          "Error al actualizar: Usuario no encontrado en tabla 'users'"
        );
        return { error: "Usuario no encontrado en tabla 'users'" };
      }
    }

    revalidatePath("/perfil");

    const updatedProfile = {
      ...resProfile.rows[0],
      username: username || resProfile.rows[0].username,
    };

    return updatedProfile;
  } catch (error) {
    console.error("Error al actualizar el perfil:", error);
    return { error: "Error interno del servidor" };
  }
}

// Actualizar la foto de perfil de un usuario
export async function updateUserPhoto(
  userId: string,
  profileImageData: string
) {
  if (!userId) {
    return { error: "ID de usuario es requerido" };
  }

  const query = `
      UPDATE user_profiles 
      SET 
        profile_image = $1, 
        updated_at = NOW()
      WHERE user_id = $2
      RETURNING profile_image;
    `;

  const values = [profileImageData, userId];

  try {
    const res = await sql.query(query, values);
    if (res.rowCount === 0) {
      console.error("Error al actualizar: Usuario no encontrado");
      return { error: "Usuario no encontrado" };
    }

    revalidatePath("/perfil");

    return res.rows[0];
  } catch (error) {
    console.error("Error al actualizar la foto de perfil:", error);
    return { error: "Error interno del servidor" };
  }
}

// Eliminar la foto de perfil de un usuario
export async function deleteUserPhoto(userId: string) {
  if (!userId) {
    return { error: "ID de usuario es requerido" };
  }

  const query = `
      UPDATE user_profiles 
      SET 
        profile_image = NULL, 
        updated_at = NOW()
      WHERE user_id = $1
      RETURNING profile_image;
    `;

  const values = [userId];

  try {
    const res = await sql.query(query, values);
    if (res.rowCount === 0) {
      console.error("Error al eliminar: Usuario no encontrado");
      return { error: "Usuario no encontrado" };
    }

    revalidatePath("/perfil");

    return res.rows[0];
  } catch (error) {
    console.error("Error al eliminar la foto de perfil:", error);
    return { error: "Error interno del servidor" };
  }
}

// Actualizar el banner de un usuario
export async function updateUserBanner(userId: string, bannerData: string) {
  if (!userId) {
    return { error: "ID de usuario es requerido" };
  }

  const query = `
      UPDATE user_profiles 
      SET 
        banner_image = $1, 
        updated_at = NOW()
      WHERE user_id = $2
      RETURNING banner_image;
    `;

  const values = [bannerData, userId];

  try {
    const res = await sql.query(query, values);
    if (res.rowCount === 0) {
      console.error("Error al actualizar: Usuario no encontrado");
      return { error: "Usuario no encontrado" };
    }

    revalidatePath("/perfil");

    return res.rows[0];
  } catch (error) {
    console.error("Error al actualizar el banner:", error);
    return { error: "Error interno del servidor" };
  }
}

// Eliminar el banner de un usuario
export async function deleteUserBanner(userId: string) {
  if (!userId) {
    return { error: "ID de usuario es requerido" };
  }

  const query = `
      UPDATE user_profiles 
      SET 
        banner_image = NULL, 
        updated_at = NOW()
      WHERE user_id = $1
      RETURNING banner_image;
    `;

  const values = [userId];

  try {
    const res = await sql.query(query, values);
    if (res.rowCount === 0) {
      console.error("Error al eliminar: Usuario no encontrado");
      return { error: "Usuario no encontrado" };
    }

    revalidatePath("/perfil");

    return res.rows[0];
  } catch (error) {
    console.error("Error al eliminar el banner:", error);
    return { error: "Error interno del servidor" };
  }
}
