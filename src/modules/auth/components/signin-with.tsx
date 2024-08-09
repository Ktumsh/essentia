import { Button } from "@nextui-org/react";
import { GoogleIcon, FacebookIcon, TwitterIcon } from "@/modules/icons/media";
import { signIn } from "next-auth/react";

const SignInWith = () => {
  return (
    <div className="flex w-full gap-2">
      <Button
        id="loginWithGoogle"
        fullWidth
        variant="light"
        className="text-sm rounded text-white sm:text-base-color-h border border-gray-200/30 sm:border-gray-200 bg-black/30 sm:bg-transparent"
        onClick={async () =>
          await signIn("google", { callbackUrl: "/", redirect: false })
        }
      >
        <div className="flex justify-center items-center shrink-0">
          <GoogleIcon className="size-[18px]" />
        </div>
      </Button>
      <Button
        id="loginWithFacebook"
        fullWidth
        variant="light"
        className="text-sm rounded text-white sm:text-base-color-h border border-gray-200/30 sm:border-gray-200 bg-black/30 sm:bg-transparent"
        onClick={async () =>
          await signIn("facebook", { callbackUrl: "/", redirect: false })
        }
      >
        <div className="flex justify-center items-center shrink-0">
          <FacebookIcon className="size-[18px]" />
        </div>
      </Button>
      <Button
        id="loginWithX"
        fullWidth
        variant="light"
        className="text-sm rounded text-white sm:text-base-color-h border border-gray-200/30 sm:border-gray-200 bg-black/30 sm:bg-transparent"
        onClick={async () =>
          await signIn("twitter", { callbackUrl: "/", redirect: false })
        }
      >
        <div className="flex justify-center items-center shrink-0">
          <TwitterIcon className="size-4" />
        </div>
      </Button>
    </div>
  );
};

export default SignInWith;
