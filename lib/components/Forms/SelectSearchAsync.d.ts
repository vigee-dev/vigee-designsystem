import { UseFormReturn, FieldValues, Path } from "react-hook-form";
import { ActionMeta, OnChangeValue } from "react-select";
import { MultiValue, SingleValue, PropsValue } from "react-select";
import React from "react";
interface SearchSelectAsyncInterface<T extends FieldValues, Option, IsMulti extends boolean = false> {
    name?: Path<T>;
    form?: UseFormReturn<T>;
    disabled?: boolean;
    placeholder?: string;
    loadOptions: (query: string) => Promise<Option[]>;
    isClearable?: boolean;
    preprocessOnChange?: (e: OnChangeValue<Option, IsMulti>) => any;
    defaultOptions?: Option[] | boolean;
    defaultValue?: IsMulti extends true ? MultiValue<Option> : SingleValue<Option>;
    value?: PropsValue<Option>;
    label?: string;
    isMulti?: IsMulti;
    noOptionsMessage?: string;
    onChange?: (newValue: OnChangeValue<Option, IsMulti>, actionMeta: ActionMeta<Option>) => void;
}
export default function SearchSelectAsync<T extends FieldValues, Option, IsMulti extends boolean = false>({ name, label, form, placeholder, loadOptions, disabled, isClearable, preprocessOnChange, defaultOptions, isMulti, noOptionsMessage, defaultValue, onChange, value, }: SearchSelectAsyncInterface<T, Option, IsMulti>): React.JSX.Element;
export {};
