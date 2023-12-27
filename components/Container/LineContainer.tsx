import { TypographyH3, TypographyH4 } from "../Typography/Typography";

interface PageHeaderProps {
  title: string;
  children?: React.ReactNode;
  small?: boolean;
}

export function LineContainer({ title, children, small }: PageHeaderProps) {
  return (
    <div className="rounded-md h-fit bg-white p-5  border mb-4 items-center ">
      <div className="flex flex-wrap justify-between  gap-x-4 w-full items-center ">
        <TypographyH4>{title}</TypographyH4>
        <div className="flex gap-x-4">{children}</div>
      </div>
    </div>
  );
}
