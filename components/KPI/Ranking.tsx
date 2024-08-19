import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { TypographyH3 } from "../Typography/Typography";
import { PiUserCircleDuoSolid, PiUserCircleDuoStroke } from "../../icons/PikaIcons";
import { cn } from "../lib/utils";

interface Data {
  name: string;
  avatar?: string;
  img?: string;
  amount: number;
  amount2?: number;
  amount1Color?: string;
  amount2Color?: string;
  amount1Name?: string;
  amount2Name?: string;
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
  const truncateName = (name: string) => {
    return name.length > 10 ? name.substring(0, 10) + "..." : name;
  };

  return (
    <div className="space-y-8 ">
      <div className="flex flex-col">
        <TypographyH3 className="text-primary font-bold">{title}</TypographyH3>
        <p className="text-gray-500 text-sm">{subtitle}</p>
      </div>

      <div className="space-y-4">
        {data?.map((item, index) => (
          <div className="flex items-center" key={index}>
            {item.img ? (
              <Avatar className="h-9 w-9">
                <AvatarImage src={item.img} alt="Avatar" className="object-cover w-full h-full" /> <AvatarFallback>{item ? icon : <PiUserCircleDuoStroke />}</AvatarFallback>
              </Avatar>
            ) : (
              <PiUserCircleDuoSolid className="text-gray-400  h-9 w-9" />
            )}

            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">{truncateName(item.name)}</p>
              <p className="text-sm text-muted-foreground">{truncateName(item.subtitle || "")}</p>
            </div>

            <div className="flex flex-col gap-1 ml-auto font-medium text-sm">
              <div className={cn(" text-primary ", item.amount1Color && item.amount1Color)}>
                {item.amount1Name} {item.amount.toLocaleString("fr-FR").replace(/\s/g, " ")} {item.currency}
              </div>
              {item.amount2 && (
                <div className={cn(" text-secondary ", item.amount2Color && item.amount2Color)}>
                  {item.amount2Name} {item.amount2.toLocaleString("fr-FR").replace(/\s/g, " ")} {item.currency}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
