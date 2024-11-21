import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { GoogleIcon, FacebookIcon, TwitterIcon } from "@/modules/icons/media";

const SignInWith = () => {
  return (
    <div className="flex w-full gap-2">
      <Button
        id="loginWithGoogle"
        variant="ghost"
        className="rounded border border-gray-200/30 bg-black/30 text-sm text-white sm:border-gray-200 sm:bg-transparent sm:text-main-h"
        onClick={async () =>
          await signIn("google", { callbackUrl: "/", redirect: false })
        }
      >
        <div className="flex shrink-0 items-center justify-center">
          <GoogleIcon className="size-[18px]" />
        </div>
      </Button>
      <Button
        id="loginWithFacebook"
        variant="ghost"
        className="rounded border border-gray-200/30 bg-black/30 text-sm text-white sm:border-gray-200 sm:bg-transparent sm:text-main-h"
        onClick={async () =>
          await signIn("facebook", { callbackUrl: "/", redirect: false })
        }
      >
        <div className="flex shrink-0 items-center justify-center">
          <FacebookIcon className="size-[18px]" />
        </div>
      </Button>
      <Button
        id="loginWithX"
        variant="ghost"
        className="rounded border border-gray-200/30 bg-black/30 text-sm text-white sm:border-gray-200 sm:bg-transparent sm:text-main-h"
        onClick={async () =>
          await signIn("twitter", { callbackUrl: "/", redirect: false })
        }
      >
        <div className="flex shrink-0 items-center justify-center">
          <TwitterIcon className="size-4" />
        </div>
      </Button>
    </div>
  );
};

export default SignInWith;
