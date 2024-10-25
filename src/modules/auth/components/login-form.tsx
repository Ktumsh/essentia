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
    <div className="flex flex-col relative justify-center items-center md:p-8 px-6 size-full sm:min-w-[500px] rounded-xl bg-transparent sm:bg-white sm:dark:bg-base-full-dark text-left font-normal text-base-color-m dark:text-base-color-dark-m overflow-hidden">
      <form
        className="flex flex-col items-start justify-center size-full gap-5 mb-4 select-none"
        onSubmit={handleSubmit}
      >
        <div>
          <h2 className="text-xl sm:text-2xl text-base-color-h dark:text-base-color-dark font-extrabold font-sans">
            Bienvenid@,
          </h2>
          <div className="w-full text-sm text-base-color-h dark:text-base-color-dark-h">
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
            input:
              "placeholder:text-base-color-d dark:placeholder:text-base-color-dark-d",
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
            input:
              "placeholder:text-base-color-d dark:placeholder:text-base-color-dark-d",
          }}
        />

        <div className="flex w-full mt-[-15px] mx-0 justify-between text-[13px] text-base-color-h dark:text-base-color-dark-h">
          <Checkbox
            isSelected={isSelected}
            onValueChange={setIsSelected}
            size="sm"
            color="danger"
            classNames={{
              wrapper:
                "before:border-base-color-d md:before:border-gray-200 dark:before:border-base-color-dark-d md:dark:before:border-base-dark",
              label: "text-[13px] text-inherit",
            }}
          >
            Recordarme
          </Checkbox>
          <Link
            href="#"
            className="hover:underline underline-offset-2"
            aria-label="¿Olvidaste tu contraseña?"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
        <Button
          type="submit"
          radius="full"
          fullWidth
          className="bg-light-gradient dark:bg-dark-gradient-v2 text-base text-white"
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
      <div className="flex items-center justify-center text-[13px] text-center self-center mt-2 text-base-color-h dark:text-base-color-dark-h">
        <p>
          ¿No tienes una cuenta?{" "}
          <Link
            id="register-base-color"
            className="register-base-color font-bold sm:font-medium text-orient-700"
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
