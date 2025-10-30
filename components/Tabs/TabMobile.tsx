"use client";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { ReactNode } from "react";
import { cn } from "../lib/utils";
import { Badge } from "../ui/badge";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

export type TabOption<T extends string = string> = {
  name: string | ReactNode;
  href?: string;
  value?: T;
  icon?: ReactNode;
  count?: number;
  badgeColor?: string;
  color?: string;
  disabled?: boolean;
  badgeIcon?: ReactNode;
};

interface TabsResponsiveProps<T extends string = string> {
  onChange?: (value: T) => void;
  defaultValue?: string;
  value?: string;
  query?: string;
  options: TabOption<T>[];
  children?: ReactNode;
  className?: string;
  startTransition?: (callback: () => void) => void;
  fullWidth?: boolean;
  variant?: "default" | "light" | "mini" | "big";
  pageName?: string;
}

const variants = {
  default:
    "rounded-xl dark:bg-zinc-900 bg-zinc-100 dark:data-[state=active]:text-zinc-800 text-zinc-500 dark:data-[state=active]:bg-white data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold",
  light:
    "rounded-xl bg-transparent data-[state=active]:text-primary text-primary-light font-bold data-[state=active]:bg-transparent data-[state=active]:shadow-none border-none pl-0",
  mini: "rounded-xl dark:bg-zinc-900 bg-zinc-100 dark:data-[state=active]:text-zinc-800 text-zinc-500 dark:data-[state=active]:bg-white data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold text-sm p-1 px-2",
  big: "rounded-xl dark:bg-zinc-900 bg-zinc-100 dark:data-[state=active]:text-zinc-800 text-zinc-500 dark:data-[state=active]:bg-white data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold text-lg py-3 px-4",
} as const;

export function TabMobile<T extends string = string>({
  onChange,
  options,
  defaultValue,
  value,
  query,
  children,
  className,
  startTransition,
  fullWidth,
  variant = "default",
  pageName = "page",
}: TabsResponsiveProps<T>) {
  const router = useRouter();

  const [filter, setFilter] = useQueryState(query ?? "", {
    defaultValue: defaultValue ?? "",
    clearOnDefault: false,
    shallow: false,
  });

  const [page, setPage] = useQueryState(pageName, {
    defaultValue: "1",
    clearOnDefault: false,
    shallow: false,
  });

  const formatCount = (count: number): string => {
    if (count >= 1000) {
      const thousands = count / 1000;
      return `${thousands.toFixed(1).replace(/\.0$/, "")}k`;
    }
    return count.toString();
  };

  const updateValueAndNotify = (
    value: string | T,
    option: { href?: string; value?: T }
  ) => {
    if (option.href) {
      router.push(option.href);
    } else if (option.value && query) {
      setFilter(value);
      setPage("1");
    }
    if (onChange && option.value) onChange(option.value);
  };

  const handleValueChange = (
    value: T | string,
    option: { href?: string; value?: T }
  ) => {
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
      <Tabs
        defaultValue={defaultValue}
        className={cn(`w-full overflow-x-auto sm:no-scrollbar `, className)}
        value={value}
      >
        <TabsList
          className={cn(
            `overflow-x-auto`,
            "bg-transparent gap-2",
            fullWidth || variant === "big" ? "w-full" : "w-fit"
          )}
        >
          {options.map((option, index) => (
            <TabsTrigger
              key={index}
              disabled={option.disabled}
              value={option.href ?? option.value ?? ""}
              className={cn(
                `flex gap-2 group min-w-0 px-2`,
                fullWidth || variant === "big" ? "w-full" : "w-fit",
                variants[variant]
              )}
              onClick={() =>
                handleValueChange(option.href ?? option.value ?? "", option)
              }
            >
              <div className="flex items-center gap-2 justify-between ">
                <div className="flex items-center gap-2">
                  {option.icon && (
                    <span
                      className={cn(
                        "group-data-[state=active]:text-primary-light text-zinc-400 dark:group-data-[state=active]:text-primary opacity-50 group-data-[state=active]:opacity-100",
                        variant === "light" &&
                          "text-zinc-400 group-data-[state=active]:text-zinc-800"
                      )}
                    >
                      {option.icon}
                    </span>
                  )}
                  {option.name}
                </div>

                {option?.count && option?.count > 0 ? (
                  <Badge
                    className={cn(
                      "bg-red-400 h-5 w-5 flex items-center justify-center mx-auto opacity-50 group-data-[state=active]:opacity-100",
                      option.badgeColor
                    )}
                  >
                    {formatCount(option.count)}
                  </Badge>
                ) : null}
              </div>
            </TabsTrigger>
          ))}
        </TabsList>
        {children}
      </Tabs>
    </div>
  );
}
