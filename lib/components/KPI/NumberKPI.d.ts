/// <reference types="react" />
export interface StatItem {
    name: string;
    stat: number;
    previousStat?: number;
    color?: string;
    upNegative?: boolean;
}
interface NumberKPIProps {
    stats: StatItem[];
    columns?: number;
}
declare const NumberKPI: ({ stats, columns }: NumberKPIProps) => import("react").JSX.Element;
export default NumberKPI;
