"use client";
import { ReactNode, useTransition } from "react";
import { useQueryState } from "nuqs";
import { Tabs, TabsTrigger, TabsList } from "../ui/tabs";
import { cn } from "../lib/utils";
import { useRouter } from "next/navigation";
import { Badge } from "../ui/badge";

export type TabOption<T extends string = string> = {
  name: string | ReactNode;
  href?: string;
  value?: T;
  icon?: ReactNode;
  count?: number;
  badgeColor?: string;
  disabled?: boolean;
};

interface TabsResponsiveProps<T extends string = string> {
  onChange?: (value: T) => void;
  defaultValue?: string;
  value?: string;
  query?: string;
  options: TabOption<T>[];
  children?: ReactNode;
  fullWidth?: boolean;
  className?: string;
  selectLimit?: number;
  startTransition?: (callback: () => void) => void;
  variation?: "default" | "rounded" | "rounded-blue" | "rounded-green";
}

export function TabMobile<T extends string = string>({
  onChange,
  options,
  defaultValue,
  value,
  query,
  children,
  fullWidth,
  className,
  startTransition,
  variation = "default",
}: TabsResponsiveProps<T>) {
  const router = useRouter();

  const [filter, setFilter] = useQueryState(query ?? "", {
    defaultValue: defaultValue ?? "",
    clearOnDefault: false,
    shallow: false,
  });

  const [page, setPage] = useQueryState("page", {
    defaultValue: "1",
    clearOnDefault: false,
    shallow: false,
  });

  const updateValueAndNotify = (value: string | T, option: { href?: string; value?: T }) => {
    if (option.href) {
      router.push(option.href);
    } else if (option.value && query) {
      setFilter(value);
      setPage("1");
    }
    if (onChange && option.value) onChange(option.value);
  };

  const handleValueChange = (value: T | string, option: { href?: string; value?: T }) => {
    if (startTransition) {
      startTransition(() => {
        updateValueAndNotify(value, option);
      });
    } else {
      updateValueAndNotify(value, option);
    }
  };

  return (
    <div className="">
      <div className={"hidden md:flex w-full items-center"}>
        <div className={"flex items-center gap-4 w-full"}>
          <TabsComponent options={options} defaultValue={defaultValue} value={value} handleValueChange={handleValueChange} fullWidth={fullWidth} className={className} variation={variation}>
            {children}
          </TabsComponent>
        </div>
      </div>
      <div className={"flex md:hidden items-center gap-5"}>
        <div className={"flex items-center gap-4 w-full"}>
          <TabsComponent options={options} defaultValue={defaultValue} value={value} handleValueChange={handleValueChange} className={className} variation={variation}>
            {children}
          </TabsComponent>
        </div>
      </div>
    </div>
  );
}

interface TabProps<T extends string = string> {
  defaultValue?: string;
  value?: string;
  handleValueChange: (value: T | string, option: { href?: string; value?: T }) => void;
  options: TabOption<T>[];
  children?: ReactNode;
  fullWidth?: boolean;
  className?: string;
  variation?: "default" | "rounded" | "rounded-blue" | "rounded-green";
}

const TabsComponent = <T extends string = string>({ options, defaultValue, value, handleValueChange, children, fullWidth, className, variation = "default" }: TabProps<T>) => {
  return (
    <Tabs defaultValue={defaultValue} className={cn(`w-full overflow-x-auto`)} value={value}>
      <TabsList className={cn(`overflow-x-auto md:py-2`, className, variation === "rounded" || variation === "rounded-blue" || variation === "rounded-green" ? "bg-transparent gap-2" : "")}>
        {options.map((option, index) => (
          <TabsTrigger
            key={index}
            disabled={option.disabled}
            value={option.href ?? option.value ?? ""}
            className={cn(
              `flex gap-2 group min-w-0 `,
              fullWidth ? " md:w-full" : " md:w-fit",
              variation === "rounded"
                ? "rounded-xl dark:bg-zinc-900 bg-zinc-100 dark:data-[state=active]:text-zinc-800 text-zinc-500 dark:data-[state=active]:bg-white data-[state=active]:bg-primary data-[state=active]:text-zinc-100 font-bold"
                : "",
              variation === "rounded-blue"
                ? "rounded-xl dark:bg-blue-200 dark:text-blue-600 bg-zinc-100 dark:data-[state=active]:text-blue-800 text-blue-600 dark:data-[state=active]:bg-white data-[state=active]:bg-blue-500 data-[state=active]:text-white font-bold"
                : "",
              variation === "rounded-green"
                ? "rounded-xl dark:bg-emerald-900 dark:text-emerald-50 bg-zinc-100 dark:data-[state=active]:text-emerald-800 text-emerald-600 dark:data-[state=active]:bg-white data-[state=active]:bg-emerald-500 data-[state=active]:text-white font-bold"
                : ""
            )}
            onClick={() => handleValueChange(option.href ?? option.value ?? "", option)}>
            <div className="flex items-center gap-2 justify-between ">
              <div className="flex items-center gap-2">
                {option.icon && <span className="group-data-[state=active]:text-zinc-50 text-gray-400 dark:group-data-[state=active]:text-zinc-800">{option.icon}</span>}
                {option.name}
              </div>
              {option?.count && option?.count > 0 ? <Badge className={cn("bg-red-400 h-5 w-5 flex items-center justify-center mx-auto", option.badgeColor)}>{option.count}</Badge> : null}{" "}
            </div>
          </TabsTrigger>
        ))}
      </TabsList>

      {children}
    </Tabs>
  );
};
