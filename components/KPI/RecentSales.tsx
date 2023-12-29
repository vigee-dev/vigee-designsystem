import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  TypographyH2,
  TypographyH3,
  TypographyH4,
} from "../Typography/Typography";
import { UserIcon } from "../../icons/User";

interface Data {
  name: string;
  avatar?: string;
  amount: number;
  currency?: string;
  subtitle: string;
}
interface Props {
  title?: string;
  subtitle?: string;
  data: Data[];
}

export function RecentSales({ title, subtitle, data }: Props) {
  return (
    <div className="space-y-8 border border-gray-100">
      <div className="flex flex-col">
        <TypographyH3 className="font-bold">{title}</TypographyH3>
        <p className="text-gray-500 text-sm">{subtitle}</p>
      </div>

      <div className="space-y-4">
        {data?.map((item, index) => (
          <div className="flex items-center" key={index}>
            <Avatar className="h-9 w-9">
              <AvatarImage src="/avatars/01.png" alt="Avatar" />
              <AvatarFallback>
                <UserIcon />
              </AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">{item.name}</p>
              <p className="text-sm text-muted-foreground">{item.subtitle}</p>
            </div>
            <div className="ml-auto font-medium">
              {item.amount}
              {item.currency}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
