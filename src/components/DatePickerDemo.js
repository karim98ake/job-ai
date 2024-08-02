"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "../lib/utils"; // Adjust the path to utils if necessary
import { Button } from "./ui/button"; // Adjust the path to button component
import Calendar from "react-calendar"; // Using react-calendar
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover"; // Correctly import from @radix-ui/react-popover

export function DatePickerDemo({ selectedDate, setSelectedDate }) {
  const [date, setDate] = React.useState();

  React.useEffect(() => {
    if (selectedDate) {
      setDate(selectedDate);
    }
  }, [selectedDate]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 z-50 shadow-lg">
        <Calendar
          value={date}
          onChange={(selected) => {
            const fixedTime = new Date(selected);
            fixedTime.setHours(10, 30, 0, 0); 
            setDate(fixedTime);
            setSelectedDate(fixedTime);
          }}
          className="p-2 bg-white rounded-md shadow-md"
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
