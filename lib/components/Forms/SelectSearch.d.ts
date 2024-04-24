/// <reference types="react" />
import { UseFormReturn, FieldValues, Path } from "react-hook-form";
import { OnChangeValue, MultiValue, SingleValue } from "react-select";
interface SearchSelectInterface<T extends FieldValues, Option, IsMulti extends boolean = false> {
    name: Path<T>;
    form?: UseFormReturn<T>;
    disabled?: boolean;
    placeholder?: string;
    isClearable?: boolean;
    preprocessOnChange?: (e: OnChangeValue<Option, IsMulti>) => any;
    options: Option[];
    label?: string;
    isMulti?: IsMulti;
    defaultOptions?: Option[];
    defaultValue?: IsMulti extends true ? MultiValue<Option> : SingleValue<Option>;
    classNameContainer?: string;
}
export default function SelectSearch<T extends FieldValues, Option, IsMulti extends boolean = false>({ name, label, form, placeholder, disabled, isClearable, preprocessOnChange, options, isMulti, defaultOptions, defaultValue, classNameContainer, }: SearchSelectInterface<T, Option, IsMulti>): import("react").JSX.Element;
export {};
