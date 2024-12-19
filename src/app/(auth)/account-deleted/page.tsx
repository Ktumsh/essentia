import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const AccountDeletedPage = () => {
  return (
    <div className="mx-auto flex min-h-dvh flex-col items-center justify-center space-y-6 p-6 text-main dark:text-main-dark">
      <Card className="flex flex-col items-center border-none !bg-transparent text-center dark:bg-dark/30 md:flex-row">
        <CardHeader className="space-y-8">
          <CardTitle className="dark:text-white">
            Tu cuenta está siendo eliminada
          </CardTitle>
          <CardDescription className="space-y-6 text-base text-main-h dark:text-main-dark">
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
