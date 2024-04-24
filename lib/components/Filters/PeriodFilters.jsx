"use strict";
"use client";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeriodFilters = void 0;
var react_1 = __importDefault(require("react"));
var tabs_1 = require("../../components/ui/tabs");
var Select_1 = require("../Select/Select");
var navigation_1 = require("next/navigation");
var react_2 = require("react");
var date_fns_1 = require("date-fns");
var locale_1 = require("date-fns/locale");
var popover_1 = require("../ui/popover");
var button_1 = require("../ui/button");
var PikaIcons_1 = require("../../icons/PikaIcons");
var calendar_1 = require("../ui/calendar");
var utils_1 = require("../../lib/utils");
var PeriodFilters = function (_a) {
    var _b, _c;
    var _d = _a.years, years = _d === void 0 ? [{ label: "Cette année", value: new Date().getFullYear().toString() }] : _d, day = _a.day, month = _a.month, week = _a.week, _e = _a.year, year = _e === void 0 ? true : _e;
    var _f = (0, react_2.useState)(new Date()), date = _f[0], setDate = _f[1];
    var searchParams = (0, navigation_1.useSearchParams)();
    var _g = react_1.default.useState((_b = years[0]) === null || _b === void 0 ? void 0 : _b.value), selectedYear = _g[0], setSelectedYear = _g[1];
    var pathname = (0, navigation_1.usePathname)();
    var replace = (0, navigation_1.useRouter)().replace;
    function generateWeeks(year) {
        var currentMonth = new Date().getMonth();
        var startDate = (0, date_fns_1.startOfWeek)(new Date(year, currentMonth, 1), { weekStartsOn: 1 });
        var weeks = []; // Déclaration explicite du type du tableau
        while (startDate.getMonth() === currentMonth) {
            var endDate = (0, date_fns_1.addDays)(startDate, 6);
            weeks.push({
                label: "".concat(formatDate(startDate), " au ").concat(formatDate(endDate)),
                value: formatForURL(startDate),
            });
            startDate = (0, date_fns_1.addDays)(startDate, 7);
        }
        return weeks;
    }
    function formatDate(date) {
        return (0, date_fns_1.format)(date, "EE dd MMMM", { locale: locale_1.fr });
    }
    function formatForURL(date) {
        return (0, date_fns_1.format)(date, "yyy-MM-dd");
    }
    var getStartAndEndOfWeek = function (date) {
        var start = (0, date_fns_1.startOfWeek)(date, { weekStartsOn: 1 });
        var end = (0, date_fns_1.addDays)(start, 6);
        return [start, end];
    };
    var getStartAndEndOfMonth = function (date) {
        var start = new Date(date.getFullYear(), date.getMonth(), 1);
        var end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        return [start, end];
    };
    var handleDateChange = function (start, end) {
        var params = new URLSearchParams(searchParams);
        params.set("starting_date", formatForURL(start));
        params.set("ending_date", formatForURL(end));
        replace("".concat(pathname, "?").concat(params.toString()));
    };
    var _h = (0, react_2.useState)(function () { return generateWeeks(Number(selectedYear)); }), weeks = _h[0], setWeeks = _h[1];
    var _j = (0, react_2.useState)(function () {
        return __spreadArray([], Array(12), true).map(function (_, i) {
            var monthStart = new Date(Number(selectedYear), i, 1);
            return {
                label: monthStart.toLocaleString("fr-FR", { month: "long" }),
                value: formatDate(monthStart),
            };
        });
    }), months = _j[0], setMonths = _j[1];
    var handleDay = function (date) {
        if (date) {
            var start = (0, date_fns_1.set)(date, { hours: 0, minutes: 0, seconds: 0 });
            var end = (0, date_fns_1.set)(date, { hours: 23, minutes: 59, seconds: 59 });
            handleDateChange(start, end);
            setDate(date);
        }
    };
    var handleMonthChange = function (value) {
        var selectedMonthStart = new Date(Number(selectedYear), months.findIndex(function (m) { return m.value === value; }), 1);
        var _a = getStartAndEndOfMonth(selectedMonthStart), start = _a[0], end = _a[1];
        handleDateChange(start, end);
    };
    return (<div>
      <tabs_1.Tabs defaultValue="year" className="flex flex-col md:flex-row gap-1 md:gap-4 justify-between md:bg-white bg-transparent md:border border-none  items-center">
        <tabs_1.TabsList className="w-full md:w-fit mt-2">
          {day && (<tabs_1.TabsTrigger className="w-full md:w-fit" value="day" onClick={function () {
                var startOfDay = new Date();
                var endOfDay = new Date();
                handleDateChange(startOfDay, endOfDay);
            }}>
              Jour
            </tabs_1.TabsTrigger>)}
          {week && (<tabs_1.TabsTrigger className="w-full md:w-fit" value="week" onClick={function () {
                var today = new Date();
                var start = (0, date_fns_1.startOfWeek)(today, { weekStartsOn: 1 });
                var end = (0, date_fns_1.addDays)(start, 6);
                handleDateChange(start, end);
            }}>
              Hebdo
            </tabs_1.TabsTrigger>)}
          {month && (<tabs_1.TabsTrigger className="w-full md:w-fit" value="month" onClick={function () {
                var startOfMonth = new Date(Number(selectedYear), new Date().getMonth(), 1);
                var endOfMonth = new Date(Number(selectedYear), new Date().getMonth() + 1, 0);
                handleDateChange(startOfMonth, endOfMonth);
            }}>
              Mois
            </tabs_1.TabsTrigger>)}
          {year && (day || month || week) && (<tabs_1.TabsTrigger className="w-full md:w-fit" value="year" onClick={function () {
                var startOfYear = new Date(Number(selectedYear), 0, 1);
                var endOfYear = new Date(Number(selectedYear), 11, 31);
                handleDateChange(startOfYear, endOfYear);
            }}>
              Année
            </tabs_1.TabsTrigger>)}
        </tabs_1.TabsList>

        <div className="flex flex-col md:flex-row md:gap-2 gap-1 items-center w-full md:w-fit">
          <tabs_1.TabsContent value="day" className="w-full md:w-fit">
            <popover_1.Popover>
              <popover_1.PopoverTrigger asChild>
                <button_1.Button variant={"outline"} className={(0, utils_1.cn)("w-full md:w-fit font-medium bg-white md:bg-input", !date && "text-muted-foreground")}>
                  <PikaIcons_1.PiCalendarDefaultDuoStroke className="mr-2 h-4 w-4 text-primary"/>
                  {date ? ((0, date_fns_1.format)(date, "EEEE dd MMMM", { locale: locale_1.fr })) : (<span>Choisir une date</span>)}
                </button_1.Button>
              </popover_1.PopoverTrigger>
              <popover_1.PopoverContent className="w-auto p-0">
                <calendar_1.Calendar mode="single" selected={date} onSelect={handleDay} initialFocus locale={locale_1.fr}/>
              </popover_1.PopoverContent>
            </popover_1.Popover>
          </tabs_1.TabsContent>
          <tabs_1.TabsContent value="week" className="w-full md:w-fit">
            <Select_1.Select className="w-full md:w-fit" options={weeks} onChange={function (value) {
            var selectedWeekStart = new Date(value || "");
            var _a = getStartAndEndOfWeek(selectedWeekStart), start = _a[0], end = _a[1];
            handleDateChange(start, end);
        }} defaultValue={(_c = weeks.find(function (week) {
            var start = getStartAndEndOfWeek(new Date(week.value))[0];
            return date && start <= date && date <= (0, date_fns_1.addDays)(start, 6);
        })) === null || _c === void 0 ? void 0 : _c.value}/>
          </tabs_1.TabsContent>
          <tabs_1.TabsContent value="month" className="w-full md:w-fit">
            <Select_1.Select defaultValue={months[new Date().getMonth()].value} options={months} onChange={handleMonthChange} className="w-full md:w-fit bg-white md:bg-input"/>
          </tabs_1.TabsContent>

          <Select_1.Select className="w-full md:w-auto md:mt-2 bg-white md:bg-input" defaultValue={selectedYear} onChange={function (selectedValue) {
            setSelectedYear(selectedValue !== null && selectedValue !== void 0 ? selectedValue : "");
        }} placeholder="Année" options={years}/>
        </div>
      </tabs_1.Tabs>
    </div>);
};
exports.PeriodFilters = PeriodFilters;
