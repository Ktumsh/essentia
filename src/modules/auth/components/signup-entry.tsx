"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SignInWith from "./signin-with";
import { signup } from "@/app/signup/actions";
import {
  Button,
  DateInput,
  DateValue,
  Divider,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
} from "@nextui-org/react";
import Link from "next/link";
import { tooltipStyles } from "@/styles/tooltip-styles";
import { MailIcon, QuestionIcon, UserIcon } from "@/modules/icons/miscellaneus";
import { ArrowRightV2Icon } from "@/modules/icons/navigation";
import { CalendarIcon, EyeIcon, EyeOffIcon } from "@/modules/icons/status";
import { getMessageFromCode } from "@/utils/code";
import { toast } from "sonner";
import { validateEmail } from "../lib/form";
import { ErrorMessages } from "../lib/error-message";

const SignUpEntry = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [birthdate, setBirthdate] = useState<DateValue | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({
    email: "",
    password: "",
    username: "",
    name: "",
    lastname: "",
    birthdate: "",
  });
  const router = useRouter();
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("username", username);
    formData.append("name", name);
    formData.append("lastname", lastname);
    formData.append("birthdate", birthdate?.toString() || "");

    const result = await signup(undefined, formData);

    if (result) {
      if (result.type === "error") {
        toast.error(getMessageFromCode(result.resultCode));
        setFieldErrors((prevErrors) => ({
          ...prevErrors,
          ...result.errors,
        }));
      } else {
        toast.success(getMessageFromCode(result.resultCode));
        router.refresh();
      }
    }
  };

  const handleEmailSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setFieldErrors((prevErrors) => ({
        ...prevErrors,
        email: ErrorMessages.REQUIRED_EMAIL,
      }));
      return;
    }

    setFieldErrors((prevErrors) => ({ ...prevErrors, email: "" }));

    try {
      const response = await fetch(`/api/check-email?email=${email}`);
      const data = await response.json();

      if (data.exists) {
        setFieldErrors((prevErrors) => ({
          ...prevErrors,
          email: ErrorMessages.EMAIL_EXISTS,
        }));
      } else {
        setStep(2);
      }
    } catch (error) {
      toast.error("Error verificando el correo electrónico.");
    }
  };

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleChange =
    (setter: (value: string) => void, field: string) => (value: string) => {
      setter(value);
      setFieldErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
    };

  return (
    <div className="flex relative justify-center items-center p-8 mb-9 size-full sm:w-[500px] rounded-xl bg-transparent sm:bg-white text-left sm:shadow-md shadow-black/20 font-normal text-base-color-m overflow-hidden">
      <div className="form-box register flex flex-col size-full">
        {step === 1 ? (
          <form
            className="flex flex-col items-start justify-center size-full select-none"
            onSubmit={handleEmailSubmit}
          >
            <Input
              name="email"
              aria-label="Correo electrónico"
              type="text"
              value={email}
              label="Correo electrónico"
              placeholder="Ingresa tu correo electrónico"
              errorMessage={fieldErrors.email}
              isInvalid={!!fieldErrors.email}
              color={fieldErrors.email ? "danger" : "default"}
              onValueChange={handleChange(setEmail, "email")}
              endContent={<MailIcon className="size-6" />}
              classNames={{
                input: "placeholder:text-base-color-d",
              }}
            />
            <Button
              type="submit"
              radius="full"
              fullWidth
              className="bg-light-gradient text-base text-white mt-4"
            >
              Continuar
            </Button>
            <div className="flex items-center justify-center w-full px-3 my-4">
              <Divider className="flex-1 bg-gray-200" />
              <span className="text-xs text-center mx-2 text-nowrap text-white sm:text-inherit">
                o
              </span>
              <Divider className="flex-1 bg-gray-200" />
            </div>
            <SignInWith />
            <div className="flex items-center justify-center text-[13px] text-center self-center mt-2 text-gray-200 sm:text-inherit">
              <p>
                ¿Ya tienes una cuenta?{" "}
                <Link
                  className="font-bold sm:font-medium text-orient-600 sm:text-orient-700"
                  href="/login"
                  aria-label="Inicia sesión"
                >
                  Inicia sesión
                </Link>
              </p>
            </div>
          </form>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-start justify-center size-full select-none"
          >
            <div className="flex flex-col gap-5">
              <div className="flex gap-5">
                <Button
                  isIconOnly
                  onPress={() => setStep(1)}
                  className="bg-transparent sm:bg-gray-100"
                >
                  <ArrowRightV2Icon className="size-6 rotate-180 text-white sm:text-base-color-h" />
                </Button>
                <div className="w-full text-sm text-base-color-dark sm:text-base-color-h">
                  <p>
                    Parece que no tienes una cuenta. Vamos a crear una nueva
                    cuenta para{" "}
                    <span className="font-bold text-orient-600 sm:text-orient-700 sm:font-medium">
                      {email}
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex w-full gap-5">
                <Input
                  isRequired
                  name="name"
                  aria-label="Nombre"
                  type="text"
                  value={name}
                  label="Nombre"
                  placeholder="Ingresa tu nombre"
                  errorMessage={fieldErrors.name}
                  isInvalid={!!fieldErrors.name}
                  color={fieldErrors.name ? "danger" : "default"}
                  onValueChange={handleChange(setName, "name")}
                  classNames={{
                    input: "placeholder:text-base-color-d",
                  }}
                />
                <Input
                  isRequired
                  name="lastname"
                  aria-label="Apellido"
                  type="text"
                  value={lastname}
                  label="Apellido"
                  placeholder="Ingresa tu apellido"
                  errorMessage={fieldErrors.lastname}
                  isInvalid={!!fieldErrors.lastname}
                  color={fieldErrors.lastname ? "danger" : "default"}
                  onValueChange={handleChange(setLastname, "lastname")}
                  classNames={{
                    input: "placeholder:text-base-color-d",
                  }}
                />
              </div>
              <Input
                isRequired
                name="username"
                aria-label="Nombre de usuario"
                type="text"
                label="Nombre de usuario"
                placeholder="Ingresa tu nombre de usuario"
                description="Tu nombre de usuario es el que aparecerá a la vista de todos en tu perfil."
                value={username}
                errorMessage={fieldErrors.username}
                isInvalid={!!fieldErrors.username}
                color={fieldErrors.username ? "danger" : "default"}
                onValueChange={handleChange(setUsername, "username")}
                endContent={<UserIcon className="size-6" />}
                classNames={{
                  input: "placeholder:text-base-color-d",
                  description: "text-base-color-dark sm:text-base-color-m",
                }}
              />
              <div className="relative">
                <Popover
                  showArrow
                  placement="left"
                  classNames={{
                    base: "max-w-80",
                  }}
                >
                  <PopoverTrigger>
                    <div className="absolute top-2.5 left-3">
                      <Tooltip
                        content="Haz click para obtener más información"
                        placement="top"
                        delay={500}
                        closeDelay={0}
                        classNames={{
                          content: tooltipStyles.content,
                        }}
                      >
                        <button
                          type="button"
                          className="flex items-center justify-center size-3 bg-bittersweet-300 rounded-full"
                        >
                          <QuestionIcon className="size-2 text-white" />
                        </button>
                      </Tooltip>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="px-1 py-2">
                      <div className="text-xs font-bold">
                        Cuando proporcionas tu fecha de nacimiento,
                      </div>
                      <p className="text-xs">
                        obtendrás una experiencia en Essentia adecuada para tu
                        edad. Si quieres cambiar quién ve tu fecha de
                        nacimiento, puedes ir a la configuración de tu perfil.
                      </p>
                    </div>
                  </PopoverContent>
                </Popover>
                <DateInput
                  isRequired
                  label="Fecha de nacimiento"
                  aria-label="Fecha de nacimiento"
                  description="Este es mi cumpleaños."
                  value={birthdate}
                  onChange={(date) => {
                    setBirthdate(date);
                    setFieldErrors((prevErrors) => ({
                      ...prevErrors,
                      birthdate: "",
                    }));
                  }}
                  endContent={<CalendarIcon className="size-6" />}
                  errorMessage={fieldErrors.birthdate}
                  isInvalid={!!fieldErrors.birthdate}
                  color={fieldErrors.birthdate ? "danger" : "default"}
                  classNames={{
                    label: "ml-5",
                    description: "text-base-color-dark sm:text-base-color-m",
                    innerWrapper: "text-base-color-m",
                  }}
                />
              </div>
              <Input
                isRequired
                name="password"
                aria-label="Contraseña"
                type={isVisible ? "text" : "password"}
                value={password}
                label="Contraseña"
                placeholder="Ingresa tu contraseña"
                errorMessage={fieldErrors.password}
                isInvalid={!!fieldErrors.password}
                color={fieldErrors.password ? "danger" : "default"}
                onValueChange={handleChange(setPassword, "password")}
                endContent={
                  <button
                    type="button"
                    onClick={toggleVisibility}
                    aria-label="Alternar visibilidad de la contraseña"
                  >
                    {isVisible ? (
                      <EyeOffIcon className="size-6" />
                    ) : (
                      <EyeIcon className="size-6" />
                    )}
                  </button>
                }
                classNames={{
                  input: "placeholder:text-base-color-d",
                }}
              />
              <div className="flex mb-6 relative w-full text-[13px] leading-snug select-text text-base-color-dark sm:text-base-color-h">
                <p>
                  Al registrarte, estás aceptando los{" "}
                  <Link
                    className="hover:underline underline-offset-2 font-bold text-orient-600 sm:text-orient-700 sm:font-medium"
                    href="#"
                    aria-label="Términos y condiciones de uso"
                  >
                    Términos y condiciones de uso{" "}
                  </Link>
                  y la{" "}
                  <Link
                    className="hover:underline underline-offset-2 font-bold text-orient-600 sm:text-orient-700 sm:font-medium"
                    href="#"
                    aria-label="Política de privacidad"
                  >
                    Política de privacidad
                  </Link>
                </p>
              </div>
            </div>
            <Button
              type="submit"
              radius="full"
              fullWidth
              className="bg-light-gradient text-base text-white"
            >
              Crear cuenta
            </Button>
            <div className="flex items-center justify-center text-[13px] text-center self-center mt-2 text-base-color-dark sm:text-base-color-h">
              <p>
                ¿Ya tienes una cuenta?{" "}
                <Link
                  id="login-base-color"
                  className="login-base-color font-bold sm:font-medium text-orient-600 sm:text-orient-700"
                  href="/login"
                  aria-label="Inicia sesión"
                >
                  Inicia sesión
                </Link>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignUpEntry;
