import { FieldValues, Path, UseFormReturn } from "react-hook-form";
interface Props<T extends FieldValues> {
    label?: string;
    form: UseFormReturn<T>;
    name: Path<T>;
    className?: string;
    starting_date?: Date;
    disabled?: boolean;
    disabledKeys?: boolean;
    returnString?: boolean;
    years?: boolean;
    defaultValue?: string;
}
export default function DatePicker<T extends FieldValues>({ label, form, name, className, starting_date, disabled, disabledKeys, returnString, defaultValue, }: Props<T>): import("react/jsx-runtime").JSX.Element;
export {};
