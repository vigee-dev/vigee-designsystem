"use client";
import React, { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Select } from "../../components/Select/Select";

interface Props {
  statusName: string;
  placeholder?: string;
  status: { label: string; value: string }[];
}

export const SelectFilter = ({ statusName, status, placeholder }: Props) => {
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
        status === ""
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
      className="w-full md:w-auto"
      onChange={handleSearch}
      defaultValue={searchParams.get(statusName) ?? ""}
      placeholder={placeholder}
      options={status}
    />
  );
};
