import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { TypographyH2 } from "../Typography/Typography";

interface Data {
  name: string;
  avatar?: string;
  amount: number;
  currency?: string;
  subtitle: string;
}
interface Props {
  title: string;
  data: Data[];
}

export function RecentSales({ title, data }: Props) {
  return (
    <div className="space-y-8 ">
      <TypographyH2>{title}</TypographyH2>

      <div className="space-y-4">
        {data?.map((item) => (
          <div className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/avatars/01.png" alt="Avatar" />
              <AvatarFallback>{item.name}</AvatarFallback>
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
