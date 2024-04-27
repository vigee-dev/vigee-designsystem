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
import { cn } from "../../lib/utils";
import { useRouter } from "next/navigation";
import React from "react";

interface TabsResponsiveProps {
  defaultValue: string;
  query?: string;
  options: {
    name: string;
    href?: string;
    value?: string;
    icon?: ReactNode;
  }[];
}

export const TabsResponsive = ({
  options,
  defaultValue,
  query,
}: TabsResponsiveProps) => {
  const router = useRouter();

  const [filter, setFilter] = useQueryState(query ?? "", {
    defaultValue: defaultValue,
    clearOnDefault: false,
    shallow: false,
  });

  const handleValueChange = (
    value: string,
    option: { href?: string; value?: string }
  ) => {
    if (option.href) {
      router.push(option.href);
    } else if (option.value) {
      setFilter(value);
    }
  };

  React.useEffect(() => {
    console.log("defaultValue", defaultValue, query, filter);
    if (defaultValue) {
      setFilter(defaultValue);
    }
  }, [defaultValue, setFilter, query]);

  return (
    <>
      <div className="hidden md:flex">
        {options.length < 7 ? (
          <TabComponent
            options={options}
            defaultValue={defaultValue}
            handleValueChange={handleValueChange}
          />
        ) : (
          <SelectComponent
            options={options}
            defaultValue={defaultValue}
            handleValueChange={handleValueChange}
          />
        )}
      </div>
      <div className="flex md:hidden ">
        {options.length < 4 ? (
          <TabComponent
            options={options}
            defaultValue={defaultValue}
            handleValueChange={handleValueChange}
          />
        ) : (
          <SelectComponent
            options={options}
            defaultValue={defaultValue}
            handleValueChange={handleValueChange}
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
  }[];
}

const TabComponent = ({
  options,
  defaultValue,
  handleValueChange,
}: TabProps) => {
  return (
    <Tabs defaultValue={defaultValue}>
      <TabsList className="w-full md:w-fit">
        {options.map((option, index) => (
          <TabsTrigger
            key={index}
            value={option.href ?? option.value ?? ""}
            className="w-full md:w-fit flex gap-2"
            onClick={() =>
              handleValueChange(option.href ?? option.value ?? "", option)
            }
          >
            {option.icon} {option.name}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

const SelectComponent = ({
  options,
  defaultValue,
  handleValueChange,
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
          className={cn("w-full md:fit font-medium h-12 md:h-fit text-md")}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent className={cn("font-medium")}>
          {options.map((option, index) => (
            <SelectItem
              value={option.href ?? option.value ?? ""}
              className="w-full md:fit"
              key={index}
            >
              {option.icon} {option.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
