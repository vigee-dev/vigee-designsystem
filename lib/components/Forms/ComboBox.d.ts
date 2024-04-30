import { UseFormReturn, FieldValues, Path } from "react-hook-form";
import { z } from "zod";
interface Item {
  value: string;
  label: string;
}
type ComboBoxProps<T extends z.ZodType<any, any>> = {
  form?: UseFormReturn<z.infer<T> & FieldValues>;
  name: Path<z.infer<T> & FieldValues>;
  label?: string;
  placeholder?: string;
  required?: boolean;
  items: Item[];
  icon?: React.ReactNode;
  onChange: (value: string | undefined) => void;
};
export declare function ComboBox<T extends z.ZodType<any, any, any>>({
  items,
  form,
  name,
  label,
  placeholder,
  required,
  icon,
  onChange,
}: ComboBoxProps<T>): import("react/jsx-runtime").JSX.Element;
export {};
