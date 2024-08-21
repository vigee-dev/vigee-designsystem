import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";
import { cn, currency } from "../lib/utils";

export interface StatItem {
  name: string;
  stat: number;
  previousStat?: number;
  color?: string;
  upNegative?: boolean;
  currency?: string;
  icon?: React.ReactNode;
}

interface NumberKPIProps {
  stats: StatItem[];
  columns?: number;
}

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

interface PreviousStatProps {
  previousStat: number;
  upNegative?: boolean;
  notApplicable?: boolean;
}

const PreviousStat = ({ previousStat, upNegative = false, notApplicable = false }: PreviousStatProps) => {
  return (
    <div
      className={classNames(
        !notApplicable && previousStat > 0 ? `${!upNegative ? "text-green-600 bg-green-100" : "text-red-600 bg-red-100"}` : "",
        !notApplicable && previousStat < 0 ? `${!upNegative ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}` : "",
        (notApplicable && previousStat) === 0 ? `bg-gray-100 text-gray-600` : "",
        "inline-flex items-baseline rounded-full px-2.5 py-0.5 text-xs font-black md:mt-2 lg:mt-0"
      )}>
      {!notApplicable && previousStat > 0 && <ArrowUpIcon className={`-ml-1 mr-0.5 h-4 w-4 flex-shrink-0 self-center ${!upNegative ? "text-green-600" : "text-red-600"}`} aria-hidden="true" />}

      {!notApplicable && previousStat < 0 && <ArrowDownIcon className={`-ml-1 mr-0.5 h-4 w-4 flex-shrink-0 self-center ${!upNegative ? "text-red-600" : "text-green-600"}`} aria-hidden="true" />}

      <span className="sr-only">{previousStat < 0 ? "Increased" : "Decreased"} by </span>
      {previousStat !== 0 && !notApplicable ? previousStat.toFixed(0) + " %" : "N/A"}
    </div>
  );
};

const NumberKPI = ({ stats, columns = 3 }: NumberKPIProps) => {
  const variation = (previousStat: number, stat: number) => {
    const diff = stat - previousStat;
    return (diff / (previousStat === 0 ? 1 : previousStat)) * 100;
  };

  return (
    <div className="my-2">
      <dl
        className={`grid grid-cols-1 divide-y divide-gray-100 overflow-hidden rounded-xl shadow-sm md:grid-cols-${columns} md:divide-x md:divide-gray-100 md:divide-y-0  bg-white border border-gray-100`}>
        {stats.map(item => (
          <div key={item.name} className="px-4 py-5 sm:p-6">
            <dt className="text-base font-medium text-gray-400">{item.name}</dt>
            <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
              <div className={cn(`flex items-center text-xl font-black text-primary gap-2`, item.color)}>
                {item.icon}
                {item.currency ? currency(item.stat).toRoundedEuro() : item.stat}
              </div>
              {item.previousStat != null && <PreviousStat previousStat={variation(item.previousStat, item.stat)} upNegative={item.upNegative} notApplicable={item.previousStat === 0} />}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default NumberKPI;
