import { Metadata } from "next";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/kit/card";

export const metadata: Metadata = {
  title: "Cuenta eliminada",
};

const AccountDeletedPage = () => {
  return (
    <div className="text-foreground mx-auto flex min-h-dvh flex-col items-center justify-center space-y-6 p-6">
      <Card className="dark:bg-dark/30 flex flex-col items-center border-none bg-transparent! text-center md:flex-row">
        <CardHeader className="space-y-8">
          <CardTitle className="dark:text-white">
            Tu cuenta está siendo eliminada
          </CardTitle>
          <CardDescription className="text-foreground/80 space-y-6 text-base">
            <p>
              Se ha confirmado la solicitud de eliminación de tu cuenta de
              Essentia.
            </p>
            <p>
              Se te enviará un correo electrónico con más información sobre el
              proceso de eliminación.
            </p>
            <p>Lamentamos que te vayas... 😪</p>
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
};

export default AccountDeletedPage;
