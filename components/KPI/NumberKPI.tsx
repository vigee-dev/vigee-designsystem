import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";
import { cn, currency } from "../lib/utils";

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

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

const NumberKPI = ({ stats, columns = 3 }: NumberKPIProps) => {
  const variation = (previousStat: number, stat: number) => {
    const diff = stat - previousStat;
    const percent = (diff / (previousStat === 0 ? 1 : previousStat)) * 100;
    return percent.toFixed(0);
  };

  return (
    <div className="my-2">
      <dl className={`grid grid-cols-1 divide-y divide-gray-100 overflow-hidden rounded-xl shadow-sm md:grid-cols-${columns} md:divide-x md:divide-gray-100 md:divide-y-0  bg-white border border-gray-100`}>
        {stats.map(item => (
          <div key={item.name} className="px-4 py-5 sm:p-6">
            <dt className="text-base font-medium text-gray-400">{item.name}</dt>
            <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
              <div className={cn(`flex items-baseline text-xl font-black text-primary`, item.color)}>
                {currency(item.stat).toRoundedEuro()}
              </div>

              {item?.previousStat != null && (
                <div
                  className={classNames(
                    item?.previousStat < item.stat
                      ? ` ${
                          !item.upNegative
                            ? "text-green-600 bg-green-100"
                            : "text-red-800 bg-red-100"
                        }`
                      : ` ${
                          !item.upNegative
                            ? "bg-red-100 text-red-600"
                            : "bg-green-100 text-green-800"
                        }`,
                    "inline-flex items-baseline rounded-full px-2.5 py-0.5 text-xs font-black md:mt-2 lg:mt-0"
                  )}
                >
                  {item.previousStat < item.stat ? (
                    <ArrowUpIcon
                      className={`-ml-1 mr-0.5 h-4 w-4 flex-shrink-0 self-center ${
                        !item.upNegative ? "text-green-600" : "text-red-800"
                      }`}
                      aria-hidden="true"
                    />
                  ) : (
                    <ArrowDownIcon
                      className={`-ml-1 mr-0.5 h-4 w-4 flex-shrink-0 self-center ${
                        !item.upNegative ? "text-red-600" : "text-green-800"
                      }`}
                      aria-hidden="true"
                    />
                  )}
                  <span className="sr-only">
                    {item.previousStat < item.stat ? "Increased" : "Decreased"} by{" "}
                  </span>
                  {item.previousStat != null && variation(item.previousStat, item.stat)} %
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
