"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Select } from "../../components/Select/Select";

interface Props {
  statusName: string;
  searchParams?: {
    statusName?: string;
  };

  defaultYear?: string; // Ajout d'une prop pour l'année par défaut
  placeholder?: string;
  status: { label: string; value: string }[];
}

export const SelectFilter = ({
  statusName,
  status,
  searchParams,
  placeholder,
}: Props) => {
  const { replace } = useRouter();
  const pathname = usePathname();
  const [selectedStatus, setSelectedStatus] = React.useState<string>("");

  const handleSelectStatus = (status: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(statusName, status);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Select
      className="w-full md:w-auto"
      onChange={selectedValue => {
        setSelectedStatus(selectedValue ?? "");
        handleSelectStatus(selectedValue ?? "");
      }}
      placeholder={placeholder}
      options={status}
    />
  );
};
