"use client";

import * as React from "react";

import { Button } from "../../components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../components/ui/command";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "../../components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";

type Status = {
  value: string;
  label: string;
};

interface ComboBoxProps {
  items: Status[];
  text: string;
  selectedStatus: Status | null;
  setSelectedStatus: (status: Status | null) => void;
}

export function ComboBoxResponsive({
  items,
  text,
  selectedStatus,
  setSelectedStatus,
}: ComboBoxProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <div className="hidden md:block">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[150px] justify-start">
              {selectedStatus ? <>{selectedStatus.label}</> : <>{text}</>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0" align="start">
            <StatusList
              statuses={items}
              setOpen={setOpen}
              setSelectedStatus={setSelectedStatus}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="md:hidden">
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button variant="outline" className="w-[150px] justify-start">
              {selectedStatus ? <>{selectedStatus.label}</> : <>{text}</>}
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mt-4 border-t">
              <StatusList
                statuses={items}
                setOpen={setOpen}
                setSelectedStatus={setSelectedStatus}
              />
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
}

function StatusList({
  statuses,
  setOpen,
  setSelectedStatus,
}: {
  statuses: Status[];
  setOpen: (open: boolean) => void;
  setSelectedStatus: (status: Status | null) => void;
}) {
  return (
    <Command>
      <CommandInput placeholder="Rechercher..." />
      <CommandList>
        <CommandEmpty>Aucun résultat.</CommandEmpty>
        <CommandGroup>
          {statuses.map(status => (
            <CommandItem
              key={status.value}
              value={status.value}
              onSelect={value => {
                setSelectedStatus(
                  statuses.find(priority => priority.value === value) || null
                );
                setOpen(false);
              }}
            >
              {status.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
