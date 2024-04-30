import { UseFormReturn, FieldValues, Path } from "react-hook-form";
type Props<T extends FieldValues> = {
  form?: UseFormReturn<T>;
  label?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  name?: Path<T>;
  descr?: string;
  className?: string;
  disabled?: boolean;
  id?: string;
  min?: number | string;
  max?: number | string;
  step?: number;
  helpComponent?: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
};
export default function Input<T extends FieldValues>({
  form,
  label,
  placeholder,
  type,
  required,
  name,
  descr,
  className,
  disabled,
  id,
  min,
  max,
  step,
  helpComponent,
  onChange,
  value,
}: Props<T>): import("react/jsx-runtime").JSX.Element;
export {};
