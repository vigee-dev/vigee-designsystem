import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { TypographyH3 } from "../Typography/Typography";
import { PiUserCircleDuoStroke } from "../../icons/PikaIcons";

interface Data {
  name: string;
  avatar?: string;
  amount: number;
  amount2?: number;
  currency?: string;
  subtitle?: string;
}
interface Props {
  title?: string;
  subtitle?: string;
  data: Data[];
  icon?: React.ReactNode;
}

export function Ranking({ title, subtitle, data, icon }: Props) {
  return (
    <div className="space-y-8 ">
      <div className="flex flex-col">
        <TypographyH3 className="text-primary font-bold">{title}</TypographyH3>
        <p className="text-gray-500 text-sm">{subtitle}</p>
      </div>

      <div className="space-y-4">
        {data?.map((item, index) => (
          <div className="flex items-center" key={index}>
            <Avatar className="h-9 w-9">
              <AvatarImage src="/avatars/01.png" alt="Avatar" />
              <AvatarFallback>
                {icon ? icon : <PiUserCircleDuoStroke />}
              </AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">{item.name}</p>
              <p className="text-sm text-muted-foreground">{item.subtitle}</p>
            </div>

            <div className="flex flex-col gap-1 ml-auto font-medium text-sm">
              <div className=" text-primary ">
                {item.amount.toLocaleString("fr-FR").replace(/\s/g, " ")}{" "}
                {item.currency}
              </div>
              {item.amount2 && (
                <div className="text-secondary ">
                  {item.amount2.toLocaleString("fr-FR").replace(/\s/g, " ")}{" "}
                  {item.currency}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
