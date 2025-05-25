import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, CheckIcon, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import * as React from "react";
import { cn } from "@/lib/utils";

type ComboboxWithCheckboxProps = {
  options: Record<"value" | "label", string>[];
  placeholder?: string;
  searchPlaceholder?: string;
  noneFoundText?: string;
};

function Combobox({ options, placeholder, searchPlaceholder, noneFoundText }: ComboboxWithCheckboxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
          {value ? options.find((option) => option.value === value)?.label : placeholder}
          <ChevronsUpDown className="opacity-50" />
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
                    setValue(currentValue === value ? "" : currentValue);
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

function ComboboxWithCheckbox({ options, placeholder, searchPlaceholder, noneFoundText }: ComboboxWithCheckboxProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedFrameworks, setSelectedFrameworks] = React.useState<Record<"value" | "label", string>[]>([]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-fit min-w-[280px] justify-between">
          {selectedFrameworks.length > 0
            ? selectedFrameworks.map((framework) => framework.label).join(", ")
            : placeholder}
          <ChevronsUpDown className="text-muted-foreground" />
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
                    setSelectedFrameworks(
                      selectedFrameworks.some((f) => f.value === currentValue)
                        ? selectedFrameworks.filter((f) => f.value !== currentValue)
                        : [...selectedFrameworks, option],
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
                    data-selected={selectedFrameworks.some((f) => f.value === option.value)}
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
