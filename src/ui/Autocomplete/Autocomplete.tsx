import { Popover, PopoverContent, PopoverTrigger } from "../Popover/Popover";
import { Button } from "../Button/Button";
import { CheckIcon, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../Command/Command";

import { useState, useEffect, useRef } from "react";
import { Spinner } from "../Spinner/Spinner";
import { cn } from "@/lib/utils";

type AutocompleteProps = {
  value?: string;
  items?: { value: string; label: string }[];
  placeholder?: string;
  filterPlaceholder?: string;
  emptyMessage?: string;
  isLoading?: boolean;
  onFilterChange?: (value: string) => void;
  onValueChange?: (value: string) => void;
};

export const Autocomplete = (props: AutocompleteProps) => {
  const [filterValue, setFilterValue] = useState("");
  const [open, setOpen] = useState(false);
  const filterChangeCallbackRef = useRef(props.onFilterChange);
  const [selectedLabel, setSelectedLabel] = useState(
    props.value
      ? props.items?.find((item) => item.value === props.value)?.label || ""
      : "",
  );

  const onFilterChange = (value: string) => {
    setFilterValue(value);
  };

  useEffect(() => {
    filterChangeCallbackRef.current = props.onFilterChange;
  }, [props.onFilterChange]);

  useEffect(() => {
    if (!filterChangeCallbackRef.current) return;

    const timeout = setTimeout(() => {
      console.log("Filtering with value:", filterValue);
      filterChangeCallbackRef.current!(filterValue);
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [filterValue]);

  useEffect(() => {
    if (!props.items && !props.isLoading) {
      setSelectedLabel("");
      return;
    } else if (!props.items) {
      return;
    }

    const item = props.items.find((item) => item.value === props.value);

    if (item) {
      setSelectedLabel(item.label);
    }
  }, [props.value, props.items, props.isLoading]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          {!props.value && (
            <div className="text-muted-foreground">{props.placeholder}</div>
          )}
          {props.value && (
            <div className="truncate">{selectedLabel || props.value}</div>
          )}
          {props.isLoading && <Spinner className="ml-2 h-4 w-4 shrink-0" />}
          {!props.isLoading && (
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command shouldFilter={!props.onFilterChange}>
          <CommandInput
            value={filterValue}
            placeholder={props.filterPlaceholder || "Type to filter..."}
            onValueChange={onFilterChange}
          ></CommandInput>
          <CommandList>
            <CommandEmpty className="p-2">
              {props.emptyMessage || "No results found."}
            </CommandEmpty>
            <CommandGroup>
              {props.items?.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={(value) => {
                    props.onValueChange?.(value);
                    setOpen(false);
                  }}
                >
                  {item.label}

                  <CheckIcon
                    className={cn(
                      "ml-auto size-4",
                      props.value === item.value && "opacity-100",
                      props.value !== item.value && "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
