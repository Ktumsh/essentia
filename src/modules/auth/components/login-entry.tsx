"use client";

import { FormEvent, useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button, Checkbox, Input } from "@nextui-org/react";
import Link from "next/link";
import { MailIcon } from "@/modules/icons/miscellaneus";
import { EyeIcon, EyeOffIcon } from "@/modules/icons/status";
import { validateEmail } from "../lib/form";
import { getMessageFromCode, ResultCode } from "@/utils/code";
import { toast } from "sonner";
import { useFormState } from "react-dom";
import { authenticate } from "@/app/login/actions";
import SignInWith from "./signin-with";
import { SpinnerIcon } from "@/modules/icons/common";

const LoginEntry = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const router = useRouter();
  const [result, dispatch] = useFormState(authenticate, undefined);
  const [isPending, startTransition] = useTransition();

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

  useEffect(() => {
    if (result) {
      if (result.type === "error") {
        startTransition(() => {
          toast.error(getMessageFromCode(result.resultCode));
        });
      } else {
        if (isSelected) {
          localStorage.setItem("rememberedEmail", email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }
        toast.success(getMessageFromCode(result.resultCode));
        router.refresh();
      }
    }
  }, [result, router, email, isSelected]);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="flex flex-col relative justify-center items-center p-8 size-full sm:min-w-[500px] rounded-xl bg-transparent sm:bg-white text-left sm:shadow-md shadow-black/20 font-normal text-base-color-m overflow-hidden">
      <form
        className="flex flex-col items-start justify-center size-full gap-5 mb-4 select-none"
        onSubmit={handleSubmit}
      >
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
            input: "placeholder:text-base-color-d",
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
            input: "placeholder:text-base-color-d",
          }}
        />

        <div className="flex w-full mt-[-15px] mx-0 justify-between text-[13px] text-gray-200 sm:text-base-color-h">
          <Checkbox
            isSelected={isSelected}
            onValueChange={setIsSelected}
            size="sm"
            color="danger"
            classNames={{
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
          className="bg-light-gradient text-base text-white"
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
      <div className="flex items-center justify-center text-[13px] text-center self-center mt-2 text-gray-200 sm:text-base-color-h">
        <p>
          ¿No tienes una cuenta?{" "}
          <Link
            id="register-base-color"
            className="register-base-color font-bold sm:font-medium text-orient-600 sm:text-orient-700"
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

export default LoginEntry;
