import * as React from "react";
import { DateRange, Matcher } from "react-day-picker";
interface DatePickerRangeProps {
    date: DateRange | undefined;
    setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
    className?: string;
    select?: boolean;
    label?: string;
    onChange?: (date: DateRange) => void;
    disabledDays?: Matcher | Matcher[] | undefined;
}
declare const DatePickerRange: ({ className, date, setDate, select, label, onChange, disabledDays, }: DatePickerRangeProps) => import("react/jsx-runtime").JSX.Element;
export default DatePickerRange;
