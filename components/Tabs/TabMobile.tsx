"use client";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { ReactNode } from "react";
import { cn } from "../lib/utils";
import { Badge } from "../ui/badge";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export type TabStatus = "blue" | "green" | "orange" | "red";

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
  tooltip?: string;
  status?: TabStatus;
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
    "rounded-xl dark:bg-slate-900 bg-slate-100 dark:data-[state=active]:text-slate-800 text-slate-700 dark:data-[state=active]:bg-white data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold",
  light:
    "rounded-xl bg-transparent data-[state=active]:text-primary text-slate-700 font-bold data-[state=active]:bg-transparent data-[state=active]:shadow-none border-none pl-0",
  mini: "rounded-xl dark:bg-slate-900 bg-slate-100 dark:data-[state=active]:text-slate-800 text-slate-700 dark:data-[state=active]:bg-white data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold text-sm p-1 px-2",
  big: "rounded-xl dark:bg-slate-900 bg-slate-100 dark:data-[state=active]:text-slate-800 text-slate-700 dark:data-[state=active]:bg-white data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold text-lg py-3 px-4",
} as const;

const statusColors: Record<TabStatus, string> = {
  blue: "bg-blue-500",
  green: "bg-green-500",
  orange: "bg-orange-500",
  red: "bg-red-500",
};

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
          <TooltipProvider>
            {options.map((option, index) => {
              const tabTrigger = (
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
                        <span className="opacity-70">{option.icon}</span>
                      )}
                      {option.name}
                      {option.status && (
                        <span
                          className={cn(
                            "h-2 w-2 rounded-full animate-pulse",
                            statusColors[option.status]
                          )}
                        />
                      )}
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
              );

              // Note: We don't use asChild here to avoid interference with TabsTrigger's data-[state] attributes
              // The TooltipTrigger will render its own button but display:contents makes it transparent in layout
              if (option.tooltip) {
                return (
                  <Tooltip key={`tooltip-${index}`} delayDuration={300}>
                    <TooltipTrigger className="contents">
                      {tabTrigger}
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{option.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                );
              }

              return tabTrigger;
            })}
          </TooltipProvider>
        </TabsList>
        {children}
      </Tabs>
    </div>
  );
}
