import { UseFormReturn, FieldValues, Path } from "react-hook-form";
type Props<T extends FieldValues> = {
    form?: UseFormReturn<T>;
    name: Path<T>;
    extensions?: string[];
    multiple?: boolean;
    accept?: string;
};
export default function InputDropZoneFile<T extends FieldValues>({ form, name, extensions, multiple, accept, }: Props<T>): import("react/jsx-runtime").JSX.Element;
export {};
