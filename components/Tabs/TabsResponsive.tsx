"use client";
import { ReactNode } from "react";
import { useQueryState } from "nuqs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Tabs, TabsTrigger, TabsList } from "../../components/ui/tabs";
import { cn } from "../lib/utils";
import { useRouter } from "next/navigation";
import { Badge } from "../ui/badge";

interface TabsResponsiveProps {
  defaultValue?: string;
  query?: string;
  options: {
    name: string;
    href?: string;
    value?: string;
    icon?: ReactNode;
    count?: number;
    badgeColor?: string;
  }[];
  children?: ReactNode;
  fullWidth?: boolean;
  className?: string;
}

export const TabsResponsive = ({
  options,
  defaultValue,
  query,
  children,
  fullWidth,
  className,
}: TabsResponsiveProps) => {
  const router = useRouter();

  const [filter, setFilter] = useQueryState(query ?? "", {
    defaultValue: defaultValue ?? "",
    clearOnDefault: false,
    shallow: false,
  });

  const handleValueChange = (
    value: string,
    option: { href?: string; value?: string }
  ) => {
    if (option.href) {
      router.push(option.href);
    } else if (option.value && query) {
      setFilter(value);
    }
  };

  return (
    <>
      <div className="hidden md:flex w-full ">
        {options.length < 7 ? (
          <TabComponent
            options={options}
            defaultValue={defaultValue}
            handleValueChange={handleValueChange}
            fullWidth={fullWidth}
            className={className}
          >
            {children}
          </TabComponent>
        ) : (
          <SelectComponent
            options={options}
            defaultValue={defaultValue}
            handleValueChange={handleValueChange}
            className={className}
          />
        )}
      </div>
      <div className="flex md:hidden">
        {options.length < 4 ? (
          <TabComponent
            options={options}
            defaultValue={defaultValue}
            handleValueChange={handleValueChange}
            className={className}
          >
            {children}
          </TabComponent>
        ) : (
          <SelectComponent
            options={options}
            defaultValue={defaultValue}
            handleValueChange={handleValueChange}
            className={className}
          />
        )}
      </div>
    </>
  );
};

interface TabProps {
  defaultValue?: string;
  handleValueChange: (
    value: string,
    option: { href?: string; value?: string }
  ) => void;
  options: {
    name: string;
    href?: string;
    value?: string;
    icon?: ReactNode;
    count?: number;
    badgeColor?: string;
  }[];
  children?: ReactNode;
  fullWidth?: boolean;
  className?: string;
}

const TabComponent = ({
  options,
  defaultValue,
  handleValueChange,
  children,
  fullWidth,
  className,
}: TabProps) => {
  return (
    <Tabs defaultValue={defaultValue} className={cn(`w-full`)}>
      <TabsList
        className={cn(
          `w-full`,
          fullWidth ? " md:w-full" : " md:w-fit",
          className
        )}
      >
        {options.map((option, index) => (
          <TabsTrigger
            key={index}
            value={option.href ?? option.value ?? ""}
            className={cn(
              `w-full flex gap-2`,
              fullWidth ? " md:w-full" : " md:w-fit"
            )}
            onClick={() =>
              handleValueChange(option.href ?? option.value ?? "", option)
            }
          >
            {option.icon} {option.name}{" "}
            {option?.count && option?.count > 0 ? (
              <Badge
                className={cn(
                  "bg-red-400 h-5 w-5 flex items-center justify-center mx-auto",
                  option.badgeColor
                )}
              >
                {option.count}
              </Badge>
            ) : null}
          </TabsTrigger>
        ))}
      </TabsList>

      {children}
    </Tabs>
  );
};

const SelectComponent = ({
  options,
  defaultValue,
  handleValueChange,
  className,
}: TabProps) => {
  const router = useRouter();
  return (
    <div className="w-full md:w-fit">
      <Select
        defaultValue={defaultValue}
        onValueChange={value => {
          // Assurez-vous que `value` est défini avant de pousser le routeur
          if (value) {
            handleValueChange(value, {
              href: options.find(option => option.value === value)?.href,
              value: options.find(option => option.value === value)?.value,
            });
          }
        }}
      >
        <SelectTrigger
          className={cn(
            "w-full md:fit font-medium h-12 md:h-fit text-md flex gap-2 items-center",
            className
          )}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent className={cn("font-medium")}>
          {options.map((option, index) => (
            <SelectItem
              value={option.href ?? option.value ?? ""}
              className="w-full md:fit flex gap-2"
              key={index}
            >
              <div className="flex items-center gap-2">
                {option.icon} {option.name}
                {option?.count && option?.count > 0 ? (
                  <Badge className={cn("bg-red-400", option.badgeColor)}>
                    {option.count}
                  </Badge>
                ) : null}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
