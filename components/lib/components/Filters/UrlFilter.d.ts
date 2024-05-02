interface Props {
    name: string;
    placeholder?: string;
    options: {
        label: string;
        value: string;
    }[];
    type?: string;
    defaultValue?: string;
    className?: string;
}
export declare const UrlFilter: ({ name, options, placeholder, type, defaultValue, className, }: Props) => import("react/jsx-runtime").JSX.Element;
export {};
