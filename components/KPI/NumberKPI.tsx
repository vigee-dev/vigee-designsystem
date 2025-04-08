import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";
import { cn, currency } from "../lib/utils";

export interface StatItem {
  name: string;
  stat: number;
  previousStat?: number;
  color?: string;
  upNegative?: boolean;
  unit?: string;
  icon?: React.ReactNode;
  objectif?: number; // Ajout de l'objectif
  ecartType?: number; // Ajout de l'écart type
  stat2?: string;
}

interface NumberKPIProps {
  stats: StatItem[];
  columns?: number;
  small?: boolean;
  className?: string;
}

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

interface PreviousStatProps {
  previousStat: number;
  upNegative?: boolean;
  notApplicable?: boolean;
}

const getColumnClass = (columns: number) => {
  switch (columns) {
    case 1:
      return "md:grid-cols-1";
    case 2:
      return "md:grid-cols-2";
    case 3:
      return "md:grid-cols-3";
    case 4:
      return "md:grid-cols-4";
    case 5:
      return "md:grid-cols-5";
    default:
      return "md:grid-cols-3";
  }
};

const PreviousStat = ({ previousStat, upNegative = false, notApplicable = false }: PreviousStatProps) => {
  return (
    <div
      className={classNames(
        !notApplicable && previousStat > 0 ? `${!upNegative ? "text-green-600 bg-green-100" : "text-red-600 bg-red-100"}` : "",
        !notApplicable && previousStat < 0 ? `${!upNegative ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}` : "",
        notApplicable || previousStat === 0 ? `bg-gray-100 text-gray-600` : "",
        "inline-flex items-baseline rounded-full px-2.5 py-0.5 text-xs font-black md:mt-2 lg:mt-0"
      )}>
      {!notApplicable && previousStat > 0 && <ArrowUpIcon className={`-ml-1 mr-0.5 h-4 w-4 flex-shrink-0 self-center ${!upNegative ? "text-green-600" : "text-red-600"}`} aria-hidden="true" />}
      {!notApplicable && previousStat < 0 && <ArrowDownIcon className={`-ml-1 mr-0.5 h-4 w-4 flex-shrink-0 self-center ${!upNegative ? "text-red-600" : "text-green-600"}`} aria-hidden="true" />}

      <span className="sr-only">{previousStat < 0 ? "Increased" : "Decreased"} by </span>
      {previousStat !== 0 && !notApplicable ? previousStat.toFixed(0) + " %" : "N/A"}
    </div>
  );
};

const NumberKPI = ({ stats, columns = 3, small = false, className }: NumberKPIProps) => {
  const variation = (previousStat: number, stat: number) => {
    const diff = stat - previousStat;
    return (diff / (previousStat === 0 ? 1 : previousStat)) * 100;
  };

  const ecartType = (objectif: number, stat: number) => {
    const diff = stat - objectif;
    return diff;
  };

  return (
    <div className="my-2">
      <dl
        className={cn(
          `grid grid-cols-1 divide-y divide-gray-100 overflow-hidden rounded-xl shadow-sm ${getColumnClass(columns)} md:divide-x md:divide-gray-100 md:divide-y-0 bg-white border border-gray-100`,
          className
        )}>
        {stats.map(item => (
          <div key={item.name} className={cn("px-4 ", small ? "flex gap-2 items-center justify-between py-2 px-6" : "py-5 sm:p-6")}>
            <dt className={cn(" font-medium text-gray-400", small ? "text-sm" : "text-base")}>{item.name}</dt>
            <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
              <div className="flex flex-col gap-2">
                <div className={cn(`flex items-center text-xl font-black text-primary gap-2 whitespace-nowrap`, item.color, small ? "text-base" : "text-xl")}>
                  {item.icon}
                  {item.unit === "€" ? currency(item.stat).toRoundedEuro() : item.unit ? `${item.stat} ${item.unit}` : item.stat}
                </div>
                {item.stat2 != null && <div className={cn(`flex items-center text-xs font-medium text-primary gap-2 whitespace-nowrap`, item.color)}>{item.stat2}</div>}
              </div>
              {item.previousStat != null && <PreviousStat previousStat={variation(item.previousStat, item.stat)} upNegative={item.upNegative} notApplicable={item.previousStat === 0} />}
              {item.objectif != null && item.ecartType != null && (
                <div
                  className={classNames(
                    Math.abs(ecartType(item.stat, item.objectif)) > item.ecartType ? "text-red-600 bg-red-100" : "text-green-600 bg-green-100",
                    "inline-flex items-baseline rounded-full px-2.5 py-0.5 text-xs font-black md:mt-2 lg:mt-0"
                  )}>
                  {ecartType(item.stat, item.objectif) > 0 ? "+" : ""}
                  {ecartType(item.stat, item.objectif)}%
                </div>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default NumberKPI;
