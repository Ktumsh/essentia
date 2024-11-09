"use client";

import { Button, Checkbox, Input } from "@nextui-org/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  FormEvent,
  useCallback,
  useEffect,
  useState,
  useTransition,
} from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";

import { authenticate } from "@/app/(auth)/login/actions";
import { getProfileNameByEmail } from "@/db/profile-querys";
import { SpinnerIcon } from "@/modules/icons/common";
import { MailIcon } from "@/modules/icons/miscellaneus";
import { EyeIcon, EyeOffIcon } from "@/modules/icons/status";
import { getMessageFromCode, ResultCode } from "@/utils/code";

import { validateEmail } from "../lib/form";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [result, dispatch] = useFormState(authenticate, undefined);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const redirectUrl = searchParams.get("redirect") || "/";

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setIsSelected(true);
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const errors = {
      email: !validateEmail(email) ? ResultCode.REQUIRED_EMAIL : "",
      password: password.trim() === "" ? ResultCode.REQUIRED_PASSWORD : "",
    };

    if (Object.values(errors).some((error) => error)) {
      toast.error(errors.email || errors.password);
      return;
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    startTransition(() => {
      dispatch(formData);
    });
  };

  const fetchUserName = useCallback(async () => {
    const userName = await getProfileNameByEmail(email);
    if (userName) {
      toast.success(`¡Hola de nuevo, ${userName.first_name}!`);
    } else {
      toast.success(`¡Hola de nuevo!`);
    }
    router.push(redirectUrl);
  }, [email, router, redirectUrl]);

  useEffect(() => {
    if (result) {
      if (result.type === "error") {
        if (
          result.resultCode === ResultCode.EMAIL_NOT_VERIFIED &&
          result.redirectUrl
        ) {
          router.push(result.redirectUrl);
        } else {
          startTransition(() => {});
          toast.error(getMessageFromCode(result.resultCode));
        }
      } else {
        if (isSelected) {
          localStorage.setItem("rememberedEmail", email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }
        fetchUserName();
      }
    }
  }, [result, router, email, isSelected, fetchUserName]);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="relative flex size-full flex-col items-center justify-center overflow-hidden rounded-xl bg-transparent px-6 text-left font-normal text-main-m dark:text-main-dark-m sm:min-w-[500px] sm:bg-white sm:dark:bg-full-dark md:p-8">
      <form
        className="mb-4 flex size-full select-none flex-col items-start justify-center gap-5"
        onSubmit={handleSubmit}
      >
        <div>
          <h2 className="font-sans text-xl font-extrabold text-main-h dark:text-main-dark sm:text-2xl">
            Bienvenid@,
          </h2>
          <div className="w-full text-sm text-main-h dark:text-main-dark-h">
            <p>
              Ingresa tus credenciales para acceder a tu cuenta de Essentia.
            </p>
          </div>
        </div>
        <Input
          name="email"
          aria-label="Correo electrónico"
          type="text"
          value={email}
          label="Correo electrónico"
          placeholder="Ingresa tu correo electrónico"
          onValueChange={setEmail}
          endContent={<MailIcon className="size-6" />}
          classNames={{
            inputWrapper:
              "bg-white md:bg-gray-100 dark:!bg-white/5 dark:data-[hover=true]:!bg-white/10 dark:data-[focus=true]:!bg-white/10",
            input: "placeholder:text-main-l dark:placeholder:text-main-dark-l",
          }}
        />
        <Input
          name="password"
          aria-label="Contraseña"
          type={isVisible ? "text" : "password"}
          value={password}
          label="Contraseña"
          placeholder="Ingresa tu contraseña"
          onValueChange={setPassword}
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
            inputWrapper:
              "bg-white md:bg-gray-100 dark:!bg-white/5 dark:data-[hover=true]:!bg-white/10 dark:data-[focus=true]:!bg-white/10",
            input: "placeholder:text-main-l dark:placeholder:text-main-dark-l",
          }}
        />

        <div className="mx-0 mt-[-15px] flex w-full justify-between text-[13px] text-main-h dark:text-main-dark-h">
          <Checkbox
            isSelected={isSelected}
            onValueChange={setIsSelected}
            size="sm"
            color="danger"
            classNames={{
              wrapper:
                "before:border-base-color-d md:before:border-gray-200 dark:before:border-base-color-dark-d md:dark:before:border-dark",
              label: "text-[13px] text-inherit",
            }}
          >
            Recordarme
          </Checkbox>
          <Link
            href="#"
            className="underline-offset-2 hover:underline"
            aria-label="¿Olvidaste tu contraseña?"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
        <Button
          type="submit"
          radius="full"
          fullWidth
          className="bg-light-gradient text-base text-white dark:bg-dark-gradient-v2"
          isDisabled={isPending}
          aria-disabled={isPending}
          startContent={
            isPending ? <SpinnerIcon className="size-4 animate-spin" /> : null
          }
        >
          {isPending ? "Iniciando sesión..." : "Iniciar sesión"}
        </Button>
      </form>
      {/* <div className="flex flex-row items-center justify-center w-full px-3 my-4">
        <hr className="flex-1 h-px border-gray-200" />
        <span className="text-xs text-center mx-2 text-nowrap text-white sm:text-inherit">
          o
        </span>
        <hr className="flex-1 h-px border-gray-200" />
      </div>
      <SignInWith /> */}
      <div className="mt-2 flex items-center justify-center self-center text-center text-[13px] text-main-h dark:text-main-dark-h">
        <p>
          ¿No tienes una cuenta?{" "}
          <Link
            id="register-base-color"
            className="register-base-color font-bold text-orient-700 sm:font-medium"
            href="/signup"
            aria-label="Regístrate"
          >
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
