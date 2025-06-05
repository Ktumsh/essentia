import { CheckCircle2, XCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/utils";

interface CompleteProfileProps {
  completeProfileData: {
    profileImage?: string | null;
    bio?: string | null;
    location?: string | null;
    weight?: number | null;
    height?: number | null;
    genre?: string | null;
  }[];
}

const CompleteProfile = ({ completeProfileData }: CompleteProfileProps) => {
  const { profileImage, bio, location, weight, height, genre } =
    completeProfileData[0];

  const data = [
    {
      description: "Añade una foto de perfil",
      value: profileImage,
    },
    {
      description: "Añade una biografía",
      value: bio,
    },
    {
      description: "Añade tu ubicación",
      value: location,
    },
    {
      description: "Añade tu peso",
      value: weight,
    },
    {
      description: "Añade tu estatura",
      value: height,
    },
    {
      description: "Añade tu género",
      value: genre,
    },
  ];

  return (
    <Card className="bg-muted">
      <CardHeader>
        <CardTitle className="mb-2 text-base">Completa tu perfil</CardTitle>
        <CardDescription className="space-y-1">
          <p>
            Cuando proporcionas tu información, nuestra inteligencia artificial
            la usará para brindarte una mejor experiencia para ti.
          </p>
          <p>Puedes hacer modificaciones en cualquier momento.</p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Progress
          value={(data.filter((item) => item.value).length * 100) / data.length}
        />
        <div className="mt-4 grid grid-cols-6">
          {data.map((item, index) => (
            <Badge
              key={index}
              className={cn(
                "text-muted-foreground mx-auto bg-transparent!",
                item.value && "text-green-500!",
              )}
            >
              {item.value ? (
                <CheckCircle2 className="size-4!" />
              ) : (
                <XCircle className="size-4!" />
              )}
              {item.description}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CompleteProfile;
