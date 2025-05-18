import { Metadata } from "next";

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/kit/card";

export const metadata: Metadata = {
  title: "Cuenta eliminada",
};

const AccountDeletedPage = () => {
  return (
    <div className="px-4">
      <Card className="w-full bg-transparent text-center">
        <CardContent className="space-y-6 p-6 md:p-8">
          <CardTitle className="font-merriweather text-xl">
            Lamentamos que te vayas... 😪
          </CardTitle>
          <CardDescription className="text-foreground/80 space-y-4 text-base">
            <p>
              Se ha confirmado la solicitud de eliminación de tu cuenta de
              Essentia.
            </p>
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountDeletedPage;
