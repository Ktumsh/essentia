import { CheckCircle2, XCircle } from "lucide-react";

import { Badge } from "@/components/kit/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/kit/card";
import { Progress } from "@/components/kit/progress";
import { cn } from "@/lib/utils";

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

  const getIndicatorColor = (value: number) => {
    if (value < 20) {
      return "bg-red-500";
    } else if (value < 40) {
      return "bg-orange-500";
    } else if (value < 60) {
      return "bg-yellow-500";
    } else if (value < 80) {
      return "bg-lime-500";
    } else {
      return "bg-green-500";
    }
  };

  return (
    <Card>
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
          indicatorColor={getIndicatorColor(
            (data.filter((item) => item.value).length * 100) / data.length,
          )}
          className="bg-accent mb-4 md:max-w-[73%]"
        />
        <div className="flex flex-col gap-2 md:flex-row">
          {data.map((item, index) => (
            <Badge
              key={index}
              className={cn(
                item.value ? "text-green-500!" : "text-muted-foreground",
                "gap-1 bg-transparent! pl-0 hover:bg-inherit!",
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
