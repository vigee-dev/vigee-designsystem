"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var solid_1 = require("@heroicons/react/20/solid");
var utils_1 = require("../../lib/utils");
function classNames() {
    var classes = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        classes[_i] = arguments[_i];
    }
    return classes.filter(Boolean).join(" ");
}
var NumberKPI = function (_a) {
    var stats = _a.stats, _b = _a.columns, columns = _b === void 0 ? 3 : _b;
    var variation = function (previousStat, stat) {
        var diff = stat - previousStat;
        var percent = (diff / previousStat) * 100;
        return percent.toFixed(0);
    };
    return (<div className="my-2">
      <dl className={"grid grid-cols-1 divide-y divide-gray-100 overflow-hidden rounded-md shadow-sm md:grid-cols-".concat(columns, " md:divide-x md:divide-gray-100 md:divide-y-0  bg-white border border-gray-100")}>
        {stats.map(function (item) { return (<div key={item.name} className="px-4 py-5 sm:p-6">
            <dt className="text-base font-medium text-gray-400">{item.name}</dt>
            <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
              <div className={(0, utils_1.cn)("flex items-baseline text-xl font-black text-primary", item.color)}>
                {(0, utils_1.currency)(item.stat).toRoundedEuro()}
              </div>

              {(item === null || item === void 0 ? void 0 : item.previousStat) && (<div className={classNames((item === null || item === void 0 ? void 0 : item.previousStat) < item.stat
                    ? " ".concat(!item.upNegative
                        ? "text-green-600 bg-green-100"
                        : "text-red-800 bg-red-100")
                    : " ".concat(!item.upNegative
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-800"), "inline-flex items-baseline rounded-full px-2.5 py-0.5 text-xs font-black md:mt-2 lg:mt-0")}>
                  {item.previousStat < item.stat ? (<solid_1.ArrowUpIcon className={"-ml-1 mr-0.5 h-4 w-4 flex-shrink-0 self-center ".concat(!item.upNegative ? "text-green-600" : "text-red-800")} aria-hidden="true"/>) : (<solid_1.ArrowDownIcon className={"-ml-1 mr-0.5 h-4 w-4 flex-shrink-0 self-center ".concat(!item.upNegative ? "text-red-600" : "text-green-800")} aria-hidden="true"/>)}
                  <span className="sr-only">
                    {item.previousStat < item.stat ? "Increased" : "Decreased"}{" "}
                    by{" "}
                  </span>
                  {item.previousStat && variation(item.previousStat, item.stat)} %
                </div>)}
            </dd>
          </div>); })}
      </dl>
    </div>);
};
exports.default = NumberKPI;
