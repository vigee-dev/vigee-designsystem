import { UseFormReturn, FieldValues, Path } from "react-hook-form";
type Props<T extends FieldValues> = {
  form?: UseFormReturn<T>;
  label?: string;
  placeholder?: string;
  required?: boolean;
  name?: Path<T>;
  descr?: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  value?: string;
  helpComponent?: React.ReactNode;
  isBoolean?: boolean;
};
export default function Select<T extends FieldValues>({
  form,
  label,
  placeholder,
  required,
  name,
  descr,
  children,
  className,
  disabled,
  onChange,
  value,
  helpComponent,
  isBoolean,
}: Props<T>): import("react/jsx-runtime").JSX.Element;
export {};
