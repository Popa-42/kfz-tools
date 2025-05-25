"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, CheckIcon, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

type ComboboxProps = {
  options: Record<"value" | "label", string>[];
  placeholder: string;
  searchPlaceholder?: string;
  noneFoundText?: string;
  className?: string;
  id?: string;
  value: string;
  onValueChange: (value: string) => void;
};

type ComboboxWithCheckboxProps = {
  options: Record<"value" | "label", string>[];
  placeholder: string;
  searchPlaceholder?: string;
  noneFoundText?: string;
  className?: string;
  id?: string;
  selected: Record<"value" | "label", string>[];
  onSelectedChange: (selectedOptions: Record<"value" | "label", string>[]) => void;
};

function Combobox({
  options,
  placeholder,
  searchPlaceholder = "Type to search…",
  noneFoundText = "No options found",
  className,
  id,
  value,
  onValueChange,
}: ComboboxProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("relative min-w-50", className)}
        >
          {value ? options.find((option) => option.value === value)?.label : placeholder}
          <ChevronsUpDown className="text-muted-foreground absolute right-2" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={searchPlaceholder} className="h-9" />
          <CommandList>
            <CommandEmpty>{noneFoundText}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    onValueChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {option.label}
                  <Check className={cn("ml-auto", value === option.value ? "opacity-100" : "opacity-0")} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function ComboboxWithCheckbox({
  options,
  placeholder,
  searchPlaceholder = "Type to search…",
  noneFoundText = "No options found",
  className,
  id,
  selected,
  onSelectedChange,
}: ComboboxWithCheckboxProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("relative min-w-50 justify-start pr-8!", className)}
        >
          <span className="truncate">
            {selected.length > 0 ? selected.map((framework) => framework.label).join(", ") : placeholder}
          </span>
          <ChevronsUpDown className="text-muted-foreground absolute right-2" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{noneFoundText}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    onSelectedChange(
                      selected.some((f) => f.value === currentValue)
                        ? selected.filter((f) => f.value !== currentValue)
                        : [...selected, option],
                    );
                  }}
                >
                  <div
                    className={`
                      border-input pointer-events-none size-4 shrink-0 rounded-[4px] border transition-all select-none
                      data-[selected=true]:border-primary data-[selected=true]:bg-primary
                      data-[selected=true]:text-primary-foreground data-[selected=true]:*:[svg]:opacity-100
                      *:[svg]:opacity-0
                    `}
                    data-selected={selected.some((f) => f.value === option.value)}
                  >
                    <CheckIcon className="size-3.5 text-current" />
                  </div>
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export { Combobox, ComboboxWithCheckbox };
