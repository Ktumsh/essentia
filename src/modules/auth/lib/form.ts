import { DateValue } from "@nextui-org/react";

export const validateEmail = (value: string): boolean =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);

export const validatePassword = (value: string): boolean => {
  return (
    value.length >= 8 &&
    /[A-Z]/.test(value) &&
    /[a-z]/.test(value) &&
    /[0-9]/.test(value) &&
    /[^A-Za-z0-9]/.test(value)
  );
};

export const validateBirthdate = (value: DateValue | undefined): boolean => {
  if (!value) return false;
  const birthDate = new Date(value.toString());
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  const dayDifference = today.getDate() - birthDate.getDate();

  const currentYear = today.getFullYear();
  const birthYear = birthDate.getFullYear();
  if (birthYear < 1900 || birthYear > currentYear) return false;

  return (
    age > 13 ||
    (age === 13 &&
      (monthDifference > 0 || (monthDifference === 0 && dayDifference >= 0)))
  );
};
