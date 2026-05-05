/**
 * @description Select qui synchronise la valeur choisie avec un paramètre d'URL (query string) pour filtrer des données tabulaires.
 * @useWhen filtre d'une colonne de tableau via l'URL → utiliser SelectSearch | valeur présélectionnée à conserver dans l'URL → utiliser SelectSearch avec `preselected` | navigation avec état persistant dans l'URL → utiliser SelectSearch
 * @dontUseFor sélection multiple → utiliser MultiSelect | filtres combinés avancés → utiliser Filter | sélection sans impact sur l'URL → utiliser Select
 * @example <SelectSearch items={[{ value: "Actif" }, { value: "Inactif" }]} placeholder="Statut" query="status" />
 */
"use client";
import React, { useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import {
  Select,
  SelectGroup,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "../ui/select";

interface Item {
  value: string;
}

interface FilterableSelectProps {
  items: Item[];
  placeholder: string;
  query: string;
  preselected?: string;
}

const FilterableSelect: React.FC<FilterableSelectProps> = ({
  items,
  placeholder,
  query,
  preselected,
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [selectedValue, setSelectedValue] = useState<string | null>(
    preselected || null
  );

  const handleSelect = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(query, preselected || value);
    if (value) {
      params.set(query, value);
      setSelectedValue(value);
    } else {
      params.delete(query);
      setSelectedValue(null);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Select
      value={selectedValue || preselected}
      onValueChange={(value: string) => handleSelect(value)}
    >
      <SelectTrigger>{selectedValue || placeholder}</SelectTrigger>
      <SelectContent>
        {items.map((item, index) => (
          <SelectItem key={index} value={item.value}>
            {item.value}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default FilterableSelect;
