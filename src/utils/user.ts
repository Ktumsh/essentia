import { capitalize } from "@/utils";

export const getFirstNameAndLastName = (
  fullName: string | undefined | null,
) => {
  if (!fullName) return "Usuario";
  const nameParts = fullName.toLowerCase().split(" ");
  if (nameParts.length < 3) return capitalize(fullName);
  return `${capitalize(nameParts[0])} ${capitalize(
    nameParts[nameParts.length - 2],
  )}`;
};

export const usernameOrEmail = (session: any) => {
  const username = session?.user?.username
    ? `@${session.user.username}`
    : session?.user?.email;

  return username;
};

export const getSureLabel = (genre?: string | null) => {
  if (genre === "Femenino") {
    return "segura";
  } else if (genre === "Masculino") {
    return "seguro";
  }
  return "segur@";
};

export const getWelcomeLabel = (genre?: string | null) => {
  if (genre === "Femenino") {
    return "Bienvenida";
  } else if (genre === "Masculino") {
    return "Bienvenido";
  }
  return "Bienvenid@";
};
