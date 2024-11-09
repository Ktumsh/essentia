"use client";

import {
  Button,
  DateInput,
  DateValue,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
} from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState, useTransition } from "react";
import { toast } from "sonner";

import { signup } from "@/app/(auth)/signup/actions";
import { getUserByEmail } from "@/db/user-querys";
import { SpinnerIcon } from "@/modules/icons/common";
import { QuestionIcon } from "@/modules/icons/miscellaneus";
import { ArrowRightV2Icon } from "@/modules/icons/navigation";
import { CalendarFillIcon, EyeIcon, EyeOffIcon } from "@/modules/icons/status";
import { tooltipStyles } from "@/styles/tooltip-styles";
import { getMessageFromCode, ResultCode } from "@/utils/code";

import { validateEmail } from "../lib/form";

const SignupForm = () => {
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
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email || !password || !username || !name || !lastname || !birthdate) {
      toast.error(getMessageFromCode(ResultCode.ALL_FIELDS_REQUIRED));
      return;
    }

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      formData.append("username", username);
      formData.append("name", name);
      formData.append("lastname", lastname);
      formData.append("birthdate", birthdate?.toString() || "");

      startTransition(async () => {
        const result = await signup(undefined, formData);
        if (result) {
          if (result.type === "error" && result.errors) {
            const errors = result.errors as Record<string, string> | undefined;

            setFieldErrors((prevErrors) => ({
              ...prevErrors,
              email: errors?.email || "",
              password: errors?.password || "",
              username: errors?.username || "",
              name: errors?.name || "",
              lastname: errors?.lastname || "",
              birthdate: errors?.birthdate || "",
            }));
          } else if (result.type === "error") {
            toast.error(getMessageFromCode(result.resultCode));
          } else if (result.type === "success" && result.redirectUrl) {
            toast.success(getMessageFromCode(result.resultCode));
            router.push(result.redirectUrl);
          }
        }
      });
    } catch {
      toast.error(ResultCode.ACCOUNT_CREATED_ERROR);
    }
  };

  const handleEmailSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast.error(ResultCode.REQUIRED_EMAIL);
      return;
    }

    setFieldErrors((prevErrors) => ({ ...prevErrors, email: "" }));
    startTransition(async () => {
      try {
        const existingUserByEmail = await getUserByEmail(email);
        if (existingUserByEmail) {
          toast.error(ResultCode.EMAIL_EXISTS);
          return;
        } else {
          setStep(2);
        }
      } catch {
        toast.error(ResultCode.EMAIL_VERIFICATION_ERROR);
      }
    });
  };

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <motion.div
      layout
      style={{ height: "auto" }}
      transition={{ ease: "easeInOut", duration: 0.5 }}
      className="relative mb-9 flex items-center justify-center overflow-hidden rounded-xl bg-transparent px-6 text-left font-normal text-main-m dark:text-main-dark-m sm:w-[500px] sm:bg-white sm:dark:bg-full-dark md:p-8"
    >
      <AnimatePresence mode="popLayout">
        {step === 1 ? (
          <motion.form
            key="step1"
            layout
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            transition={{ ease: "easeInOut", duration: 0.5 }}
            className="flex w-full select-none flex-col items-start justify-center"
            onSubmit={handleEmailSubmit}
          >
            <div className="mb-5 w-full text-sm text-main-h dark:text-main-dark-h">
              <p>Continúa con tu correo para comenzar a crear tu cuenta.</p>
            </div>
            <Input
              name="email"
              aria-label="Correo electrónico"
              type="text"
              value={email}
              label="Correo electrónico"
              placeholder="Ingresa tu correo electrónico"
              errorMessage={fieldErrors.email}
              isInvalid={!!fieldErrors.email}
              onValueChange={(value) => {
                setEmail(value);
                setFieldErrors((prev) => ({ ...prev, email: "" }));
              }}
              classNames={{
                inputWrapper:
                  "bg-white md:bg-gray-100 dark:!bg-white/5 dark:data-[hover=true]:!bg-white/10 dark:data-[focus=true]:!bg-white/10",
                input:
                  "placeholder:text-main-l dark:placeholder:text-main-dark-l",
              }}
            />
            <Button
              type="submit"
              radius="full"
              fullWidth
              className="mt-4 bg-light-gradient text-base text-white dark:bg-dark-gradient-v2"
              isDisabled={isPending}
              startContent={
                isPending ? (
                  <SpinnerIcon className="size-4 animate-spin" />
                ) : null
              }
            >
              Continuar
            </Button>
            <div className="mt-2 flex items-center justify-center self-center text-center text-[13px] text-inherit">
              <p>
                ¿Ya tienes una cuenta?{" "}
                <Link
                  className="font-bold text-orient-700 sm:font-medium"
                  href="/login"
                  aria-label="Inicia sesión"
                >
                  Inicia sesión
                </Link>
              </p>
            </div>
          </motion.form>
        ) : (
          <motion.form
            key="step2"
            layout
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            transition={{ ease: "easeInOut", duration: 0.5 }}
            onSubmit={handleSubmit}
            className="flex w-full select-none flex-col items-start justify-center"
          >
            <div className="flex flex-col gap-5">
              <div className="flex gap-5">
                <Button
                  isIconOnly
                  onPress={() => setStep(1)}
                  className="bg-transparent sm:bg-gray-100 sm:dark:bg-dark"
                >
                  <ArrowRightV2Icon className="size-6 rotate-180 text-main-h dark:text-main-dark-h" />
                </Button>
                <div className="w-full text-sm text-main-h dark:text-main-dark-h">
                  <p>
                    Parece que no tienes una cuenta. Vamos a crear una nueva
                    cuenta para{" "}
                    <span className="font-bold text-orient-700 sm:font-medium">
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
                  onValueChange={(value) => {
                    setName(value);
                    setFieldErrors((prev) => ({ ...prev, name: "" }));
                  }}
                  classNames={{
                    inputWrapper:
                      "bg-white md:bg-gray-100 dark:!bg-white/5 dark:data-[hover=true]:!bg-white/10 dark:data-[focus=true]:!bg-white/10",
                    input:
                      "placeholder:text-main-l dark:placeholder:text-main-dark-l",
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
                  onValueChange={(value) => {
                    setLastname(value);
                    setFieldErrors((prev) => ({ ...prev, lastname: "" }));
                  }}
                  classNames={{
                    inputWrapper:
                      "bg-white md:bg-gray-100 dark:!bg-white/5 dark:data-[hover=true]:!bg-white/10 dark:data-[focus=true]:!bg-white/10",
                    input:
                      "placeholder:text-main-l dark:placeholder:text-main-dark-l",
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
                value={username}
                errorMessage={fieldErrors.username}
                isInvalid={!!fieldErrors.username}
                onValueChange={(value) => {
                  setUsername(value);
                  setFieldErrors((prev) => ({ ...prev, username: "" }));
                }}
                classNames={{
                  inputWrapper:
                    "bg-white md:bg-gray-100 dark:!bg-white/5 dark:data-[hover=true]:!bg-white/10 dark:data-[focus=true]:!bg-white/10",
                  input:
                    "placeholder:text-main-l dark:placeholder:text-main-dark-l",
                }}
              />
              <div className="relative">
                <Popover
                  showArrow
                  placement="left"
                  classNames={{
                    base: ["max-w-80", tooltipStyles.arrow],
                    content: ["items-start", tooltipStyles.content],
                  }}
                >
                  <PopoverTrigger>
                    <div className="absolute left-3 top-2.5">
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
                          aria-label="Ayuda"
                          type="button"
                          className="flex size-3 items-center justify-center rounded-full bg-bittersweet-300 dark:bg-cerise-red-600"
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
                  endContent={
                    <CalendarFillIcon className="size-6 text-main-m dark:text-main-dark-m" />
                  }
                  errorMessage={fieldErrors.birthdate}
                  isInvalid={!!fieldErrors.birthdate}
                  color={fieldErrors.birthdate ? "danger" : "default"}
                  classNames={{
                    label: "ml-5",
                    description: "text-main-m dark:text-main-dark-m",
                    inputWrapper:
                      "bg-white md:bg-gray-100 dark:!bg-white/5 dark:hover:!bg-white/10",
                    innerWrapper: "text-main-m",
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
                onValueChange={(value) => {
                  setPassword(value);
                  setFieldErrors((prev) => ({ ...prev, password: "" }));
                }}
                endContent={
                  <button
                    type="button"
                    onClick={() => setIsVisible(!isVisible)}
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
                  inputWrapper:
                    "bg-white md:bg-gray-100 dark:!bg-white/5 dark:data-[hover=true]:!bg-white/10 dark:data-[focus=true]:!bg-white/10",
                  input:
                    "placeholder:text-main-l dark:placeholder:text-main-dark-l",
                }}
              />
              <div className="relative mb-6 flex w-full select-text text-[13px] leading-snug text-main-h dark:text-main-dark-h">
                <p className="text-center md:text-start">
                  Al registrarte, estás aceptando los{" "}
                  <Link
                    className="font-bold text-orient-700 underline-offset-2 hover:underline sm:font-medium"
                    href="#"
                    aria-label="Términos y condiciones de uso"
                  >
                    Términos y condiciones de uso{" "}
                  </Link>
                  y la{" "}
                  <Link
                    className="font-bold text-orient-700 underline-offset-2 hover:underline sm:font-medium"
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
              className="bg-light-gradient text-base text-white dark:bg-dark-gradient-v2"
              isDisabled={isPending}
              startContent={
                isPending ? (
                  <SpinnerIcon className="size-4 animate-spin" />
                ) : null
              }
            >
              Crear cuenta
            </Button>
            <div className="mt-2 flex items-center justify-center self-center text-center text-[13px] text-main-h dark:text-main-dark-h">
              <p>
                ¿Ya tienes una cuenta?{" "}
                <Link
                  id="login-base-color"
                  className="login-base-color font-bold text-orient-700 sm:font-medium"
                  href="/login"
                  aria-label="Inicia sesión"
                >
                  Inicia sesión
                </Link>
              </p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SignupForm;
