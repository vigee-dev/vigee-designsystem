/// <reference types="react" />
interface Data {
    name: string;
    avatar?: string;
    amount: number;
    amount2?: number;
    currency?: string;
    subtitle?: string;
}
interface Props {
    title?: string;
    subtitle?: string;
    data: Data[];
    icon?: React.ReactNode;
}
export declare function Ranking({ title, subtitle, data, icon }: Props): import("react").JSX.Element;
export {};
