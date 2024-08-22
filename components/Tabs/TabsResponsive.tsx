"use client";
import { ReactNode, useTransition } from "react";
import { useQueryState } from "nuqs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tabs, TabsTrigger, TabsList } from "../ui/tabs";
import { cn } from "../lib/utils";
import { useRouter } from "next/navigation";
import { Badge } from "../ui/badge";

export type TabOption = {
  name: string;
  href?: string;
  value?: string;
  icon?: ReactNode;
  count?: number;
  badgeColor?: string;
};

interface TabsResponsiveProps {
  defaultValue?: string;
  value?: string;
  query?: string;
  options: TabOption[];
  children?: ReactNode;
  fullWidth?: boolean;
  className?: string;
  selectLimit?: number;
  startTransition?: (callback: () => void) => void
}

export const TabsResponsive = ({ options, defaultValue, value, query, children, fullWidth, className, selectLimit = 4, startTransition }: TabsResponsiveProps) => {
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

  const handleValueChange = (value: string, option: { href?: string; value?: string }) => {
    if (startTransition) {
      startTransition(() => {
        if (option.href) {
          router.push(option.href);
        } else if (option.value && query) {
          setFilter(value);
          setPage("1");
        }
      })
    } else {
      if (option.href) {
        router.push(option.href);
      } else if (option.value && query) {
        setFilter(value);
        setPage("1");
      }
    }
  };

  return (
    <div className="w-full">
      <div className={"hidden md:flex w-full items-center"}>
        <div className={"flex items-center gap-4 w-full"}>
          {options.length < selectLimit ? (
            <TabsComponent options={options} defaultValue={defaultValue} value={value} handleValueChange={handleValueChange} fullWidth={fullWidth} className={className}>
              {children}
            </TabsComponent>
          ) : (
            <SelectComponent options={options} defaultValue={defaultValue} value={value} handleValueChange={handleValueChange} className={className} />
          )}
        </div>
      </div>
      <div className={"flex md:hidden items-center gap-5"}>
        <div className={"flex items-center gap-4 w-full"}>
          {options.length < selectLimit ? (
            <TabsComponent options={options} defaultValue={defaultValue} value={value} handleValueChange={handleValueChange} className={className}>
              {children}
            </TabsComponent>
          ) : (
            <SelectComponent options={options} defaultValue={defaultValue} value={value} handleValueChange={handleValueChange} className={className} />
          )}
        </div>
      </div>
    </div>
  );
};

interface TabProps {
  defaultValue?: string;
  value?: string;
  handleValueChange: (value: string, option: { href?: string; value?: string }) => void;
  options: TabOption[];
  children?: ReactNode;
  fullWidth?: boolean;
  className?: string;
}

const TabsComponent = ({ options, defaultValue, value, handleValueChange, children, fullWidth, className }: TabProps) => {
  return (
    <Tabs defaultValue={defaultValue} className={cn(`w-full`)} value={value}>
      <TabsList className={cn(`w-full`, fullWidth ? " md:w-full" : " md:w-fit", className)}>
        {options.map((option, index) => (
          <TabsTrigger
            key={index}
            value={option.href ?? option.value ?? ""}
            className={cn(`w-full flex gap-2`, fullWidth ? " md:w-full" : " md:w-fit")}
            onClick={() => handleValueChange(option.href ?? option.value ?? "", option)}>
            {option.icon} {option.name}
            {option?.count && option?.count > 0 ? <Badge className={cn("bg-red-400 h-5 w-5 flex items-center justify-center mx-auto", option.badgeColor)}>{option.count}</Badge> : null}
          </TabsTrigger>
        ))}
      </TabsList>

      {children}
    </Tabs>
  );
};

const SelectComponent = ({ options, defaultValue, value, handleValueChange, className }: TabProps) => {
  const router = useRouter();
  return (
    <div className="w-full md:w-fit">
      <Select
        defaultValue={defaultValue}
        value={value}
        onValueChange={value => {
          // Assurez-vous que `value` est défini avant de pousser le routeur
          if (value) {
            handleValueChange(value, {
              href: options.find(option => option.href === value)?.href,
              value: options.find(option => option.value === value)?.value,
            });
          }
        }}>
        <SelectTrigger className={cn("w-full md:fit font-medium h-12 md:h-fit text-md flex gap-2 items-center", className)}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent className={cn("font-medium")}>
          {options.map((option, index) => (
            <SelectItem value={option.href ?? option.value ?? ""} className="w-full md:fit flex gap-2" key={index}>
              <div className="flex items-center gap-2">
                {option.icon} {option.name}
                {option?.count && option?.count > 0 ? <Badge className={cn("bg-red-400", option.badgeColor)}>{option.count}</Badge> : null}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
