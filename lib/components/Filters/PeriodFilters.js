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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "../../components/ui/tabs";
import { useQueryState } from "nuqs";
import { Select } from "../Select/Select";
import { useState } from "react";
import { startOfWeek, format, addDays, set } from "date-fns";
import { fr } from "date-fns/locale";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { PiCalendarDefaultDuoStroke } from "../../icons/PikaIcons";
import { Calendar } from "../ui/calendar";
import { cn } from "../../lib/utils";
export var PeriodFilters = function (_a) {
    var _b;
    var _c = _a.years, years = _c === void 0 ? [
        { label: "Cette année", value: new Date().getFullYear().toString() },
    ] : _c, day = _a.day, month = _a.month, week = _a.week, _d = _a.year, year = _d === void 0 ? true : _d;
    var _e = useState(new Date()), date = _e[0], setDate = _e[1];
    var _f = useQueryState("starting_date", {
        defaultValue: "",
        shallow: false,
    }), startDate = _f[0], setStartDate = _f[1];
    var _g = useQueryState("ending_date", {
        defaultValue: "",
        shallow: false,
    }), endDate = _g[0], setEndDate = _g[1];
    var _h = useQueryState("year", {
        defaultValue: years[0].value,
        shallow: false,
    }), selectedYear = _h[0], setSelectedYear = _h[1];
    function generateWeeks(year) {
        var currentMonth = new Date().getMonth();
        var startDate = startOfWeek(new Date(year, currentMonth, 1), {
            weekStartsOn: 1,
        });
        var weeks = []; // Déclaration explicite du type du tableau
        while (startDate.getMonth() === currentMonth) {
            var endDate_1 = addDays(startDate, 6);
            weeks.push({
                label: "".concat(formatDate(startDate), " au ").concat(formatDate(endDate_1)),
                value: formatForURL(startDate),
            });
            startDate = addDays(startDate, 7);
        }
        return weeks;
    }
    function formatDate(date) {
        return format(date, "EE dd MMMM", { locale: fr });
    }
    function formatForURL(date) {
        return format(date, "yyy-MM-dd");
    }
    var getStartAndEndOfWeek = function (date) {
        var start = startOfWeek(date, { weekStartsOn: 1 });
        var end = addDays(start, 6);
        return [start, end];
    };
    var getStartAndEndOfMonth = function (date) {
        var start = new Date(date.getFullYear(), date.getMonth(), 1);
        var end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        return [start, end];
    };
    var handleDateChange = function (start, end) {
        setStartDate(formatForURL(start)); // Mettre à jour la date de début dans l'URL
        setEndDate(formatForURL(end)); // Mettre à jour la date de fin dans l'URL
    };
    var _j = useState(function () { return generateWeeks(Number(selectedYear)); }), weeks = _j[0], setWeeks = _j[1];
    var _k = useState(function () {
        return __spreadArray([], Array(12), true).map(function (_, i) {
            var monthStart = new Date(Number(selectedYear), i, 1);
            return {
                label: monthStart.toLocaleString("fr-FR", { month: "long" }),
                value: formatDate(monthStart),
            };
        });
    }), months = _k[0], setMonths = _k[1];
    var handleDay = function (date) {
        if (date) {
            var start = set(date, { hours: 0, minutes: 0, seconds: 0 });
            var end = set(date, { hours: 23, minutes: 59, seconds: 59 });
            handleDateChange(start, end);
            setDate(date);
        }
    };
    var handleMonthChange = function (value) {
        var selectedMonthStart = new Date(Number(selectedYear), months.findIndex(function (m) { return m.value === value; }), 1);
        var _a = getStartAndEndOfMonth(selectedMonthStart), start = _a[0], end = _a[1];
        handleDateChange(start, end);
    };
    return (_jsx("div", { children: _jsxs(Tabs, { defaultValue: "year", className: "flex flex-col md:flex-row gap-1 md:gap-4 justify-between bg-transparent md:border border-none  items-center", children: [_jsxs(TabsList, { className: "w-full md:w-fit", children: [day && (_jsx(TabsTrigger, { className: "w-full md:w-fit", value: "day", onClick: function () {
                                var startOfDay = new Date();
                                var endOfDay = new Date();
                                handleDateChange(startOfDay, endOfDay);
                            }, children: "Jour" })), week && (_jsx(TabsTrigger, { className: "w-full md:w-fit", value: "week", onClick: function () {
                                var today = new Date();
                                var start = startOfWeek(today, { weekStartsOn: 1 });
                                var end = addDays(start, 6);
                                handleDateChange(start, end);
                            }, children: "Hebdo" })), month && (_jsx(TabsTrigger, { className: "w-full md:w-fit", value: "month", onClick: function () {
                                var startOfMonth = new Date(Number(selectedYear), new Date().getMonth(), 1);
                                var endOfMonth = new Date(Number(selectedYear), new Date().getMonth() + 1, 0);
                                handleDateChange(startOfMonth, endOfMonth);
                            }, children: "Mois" })), year && (day || month || week) && (_jsx(TabsTrigger, { className: "w-full md:w-fit", value: "year", onClick: function () {
                                var startOfYear = new Date(Number(selectedYear), 0, 1);
                                var endOfYear = new Date(Number(selectedYear), 11, 31);
                                handleDateChange(startOfYear, endOfYear);
                            }, children: "Ann\u00E9e" }))] }), _jsxs("div", { className: "flex flex-col md:flex-row md:gap-2 gap-1 items-center w-full md:w-fit", children: [_jsx(TabsContent, { value: "day", className: "w-full md:w-fit", children: _jsxs(Popover, { children: [_jsx(PopoverTrigger, { asChild: true, children: _jsxs(Button, { variant: "outline", className: cn("w-full md:w-fit font-medium bg-white md:bg-input", !date && "text-muted-foreground"), children: [_jsx(PiCalendarDefaultDuoStroke, { className: "mr-2 h-4 w-4 text-primary" }), date ? (format(date, "EEEE dd MMMM", { locale: fr })) : (_jsx("span", { children: "Choisir une date" }))] }) }), _jsx(PopoverContent, { className: "w-auto p-0", children: _jsx(Calendar, { mode: "single", selected: date, onSelect: handleDay, initialFocus: true, locale: fr }) })] }) }), _jsx(TabsContent, { value: "week", className: "w-full md:w-fit  mt-0", children: _jsx(Select, { className: "w-full md:w-fit", options: weeks, onChange: function (value) {
                                    var selectedWeekStart = new Date(value || "");
                                    var _a = getStartAndEndOfWeek(selectedWeekStart), start = _a[0], end = _a[1];
                                    handleDateChange(start, end);
                                }, defaultValue: (_b = weeks.find(function (week) {
                                    var start = getStartAndEndOfWeek(new Date(week.value))[0];
                                    return date && start <= date && date <= addDays(start, 6);
                                })) === null || _b === void 0 ? void 0 : _b.value }) }), _jsx(TabsContent, { value: "month", className: "w-full md:w-fit mt-0", children: _jsx(Select, { defaultValue: months[new Date().getMonth()].value, options: months, onChange: handleMonthChange, className: "w-full md:w-fit bg-white md:bg-input" }) }), _jsx(Select, { className: "w-full md:w-auto  bg-white md:bg-input", defaultValue: selectedYear, onChange: function (selectedValue) {
                                setSelectedYear(selectedValue !== null && selectedValue !== void 0 ? selectedValue : "");
                            }, placeholder: "Ann\u00E9e", options: years })] })] }) }));
};
