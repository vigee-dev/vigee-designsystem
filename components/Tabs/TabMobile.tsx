"use client";
import { ReactNode } from "react";
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
  startTransition?: (callback: () => void) => void;
}

export function TabMobile<T extends string = string>({ onChange, options, defaultValue, value, query, children, fullWidth, className, startTransition }: TabsResponsiveProps<T>) {
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
    <div className="flex items-center gap-4 w-full">
      <Tabs defaultValue={defaultValue} className={cn(`w-full overflow-x-auto`)} value={value}>
        <TabsList className={cn(`overflow-x-auto py-2`, className, "bg-transparent gap-2")}>
          {options.map((option, index) => (
            <TabsTrigger
              key={index}
              disabled={option.disabled}
              value={option.href ?? option.value ?? ""}
              className={cn(
                `flex gap-2 group min-w-0 `,
                fullWidth ? "w-full" : "w-fit",
                "rounded-xl dark:bg-zinc-900 bg-zinc-100 dark:data-[state=active]:text-zinc-800 text-zinc-500 dark:data-[state=active]:bg-white data-[state=active]:bg-primary data-[state=active]:text-zinc-100 font-bold"
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
    </div>
  );
}
