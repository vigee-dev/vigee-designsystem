/// <reference types="react" />
interface StatItem {
    name: string;
    color?: string;
    children?: React.ReactNode;
    stat?: React.ReactNode;
}
interface NumberKPIProps {
    stats: StatItem[];
}
export declare const KPI: ({ stats }: NumberKPIProps) => import("react/jsx-runtime").JSX.Element;
export {};
