/**
 * @description Select synchronisé avec l'URL (query string) via nuqs pour filtrer des listes sans état React local.
 * @useWhen filtrer une liste paginée par statut/catégorie avec persistance dans l'URL → utiliser UrlFilter | partager un état de filtre via un lien → utiliser UrlFilter | réinitialiser un filtre en re-sélectionnant la même valeur → utiliser UrlFilter
 * @dontUseFor filtre multi-valeurs → utiliser SelectMultiple | filtre sur une plage de dates → utiliser DatePickerFilter | filtre numérique min/max → utiliser NumberFilter
 * @example <UrlFilter name="status" placeholder="Statut" options={[{ label: "Actif", value: "active" }, { label: "Inactif", value: "inactive" }]} />
 */
"use client";

import { useQueryState } from "nuqs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { cn } from "../lib/utils";

interface Props {
  name: string;
  placeholder?: string;
  options: { label: string; value: string }[];
  type?: string;
  defaultValue?: string;
  className?: string;
}

export const UrlFilter = ({
  name,
  options,
  placeholder,
  type = "string",
  defaultValue,
  className,
}: Props) => {
  const [filter, setFilter] = useQueryState(name, {
    defaultValue: defaultValue || "",
    clearOnDefault: true,
    shallow: false,
  });

  const handleValueChange = (newValue: string) => {
    if (newValue == filter) {
      setFilter("");
      return;
    }

    setFilter(newValue);
  };

  return (
    <Select onValueChange={handleValueChange} defaultValue={filter}>
      <SelectTrigger className={cn("w-fit", className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="w-full md:w-auto">
        <SelectGroup>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
