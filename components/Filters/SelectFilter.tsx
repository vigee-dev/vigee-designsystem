"use client";
import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Select } from "../Select/Select";
import { cn } from "../lib/utils";

interface Props {
  statusName: string;
  placeholder?: string;
  status: { label: string; value: string; icon?: React.ReactNode }[];
  className?: string;
  defaultValue?: string;
}

export const SelectFilter = ({
  statusName,
  status,
  placeholder,
  className,
  defaultValue,
}: Props) => {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearch = useCallback(
    (status: string | undefined) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", "1");

      if (
        status === undefined ||
        status === searchParams.get(statusName) ||
        status === "" ||
        status === "all"
      ) {
        params.delete(statusName);
      } else {
        params.set(statusName, status);
      }

      replace(`${pathname}?${params.toString()}`);
    },
    [searchParams, statusName]
  );

  return (
    <Select
      className={cn("w-full md:w-auto", className)}
      onChange={handleSearch}
      defaultValue={defaultValue ?? searchParams.get(statusName) ?? ""}
      placeholder={placeholder ?? ""}
      options={status}
    />
  );
};
