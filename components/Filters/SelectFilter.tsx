/**
 * @description Filtre par sélection simple piloté par les search params URL, réinitialise la pagination à la page 1 à chaque changement.
 * @useWhen filtrer une liste par statut dans l'URL → utiliser SelectFilter | filtrer par catégorie/type avec navigation Next.js → utiliser SelectFilter | synchroniser un Select avec les query params sans état local → utiliser SelectFilter
 * @dontUseFor sélection multiple → utiliser SelectMultiple | filtrage par date → utiliser DatePickerFilter | filtrage par plage numérique → utiliser NumberFilter
 * @example <SelectFilter statusName="status" placeholder="Tous les statuts" status={[{ label: "Actif", value: "active" }, { label: "Inactif", value: "inactive" }]} />
 */
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
