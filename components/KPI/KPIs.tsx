interface StatItem {
  name: string;
  color?: string;
  children?: React.ReactNode;
  stat?: React.ReactNode;
}

interface NumberKPIProps {
  stats: StatItem[];
}

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

const KPIs = ({ stats }: NumberKPIProps) => {
  return (
    <div>
      <dl className="grid grid-cols-1 divide-y divide-gray-100 overflow-hidden rounded-md shadow-sm md:grid-cols-3 md:divide-x md:divide-gray-100 md:divide-y-0  bg-white border border-gray-100">
        {stats.map(item => (
          <div key={item.name} className="px-4 py-5 sm:p-6">
            <dt className="text-base font-medium text-gray-400">{item.name}</dt>
            <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
              <div
                className={`flex items-baseline text-xl font-black  ${
                  item?.color ? "text-" + item?.color : "text-primary"
                }`}
              >
                {item.children}
              </div>

              <div
                className={classNames(
                  "inline-flex items-baseline rounded-full px-2.5 py-0.5 text-xs font-black md:mt-2 lg:mt-0"
                )}
              >
                {item.stat}
              </div>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default KPIs;
