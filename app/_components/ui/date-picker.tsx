"use client";

import * as React from "react";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { cn } from "@/app/_lib/utils";
import { SelectSingleEventHandler } from "react-day-picker";

interface DatePickerProps {
  value?: Date;
  onChange?: SelectSingleEventHandler;
}

export function DatePicker({ onChange, value }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start bg-[#141414] text-left font-normal hover:bg-neutral-900",
            !value && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? (
            new Date(value).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })
          ) : (
            <span>Selecione uma data</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          initialFocus
          locale={ptBR}
        />
      </PopoverContent>
    </Popover>
  );
}
