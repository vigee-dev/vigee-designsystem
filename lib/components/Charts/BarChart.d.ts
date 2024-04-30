/// <reference types="react" />
interface Data {
    name: string;
    total?: number;
}
interface Key {
    dataKey: string;
    color: string;
}
interface Props {
    title?: string;
    subtitle?: string;
    data: Data[];
    color?: string;
    container?: boolean;
    keys?: Key[];
    euro?: boolean;
}
export declare const BarChart: React.FC<Props>;
export {};
