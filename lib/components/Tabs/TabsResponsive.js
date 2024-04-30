"use client";
import {
  jsx as _jsx,
  Fragment as _Fragment,
  jsxs as _jsxs,
} from "react/jsx-runtime";

import { useQueryState } from "nuqs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Tabs, TabsTrigger, TabsList } from "../../components/ui/tabs";
import { cn } from "../../lib/utils";
import { useRouter } from "next/navigation";
export var TabsResponsive = function (_a) {
  var options = _a.options,
    defaultValue = _a.defaultValue,
    query = _a.query;
  var router = useRouter();
  var _b = useQueryState(query !== null && query !== void 0 ? query : "", {
      defaultValue:
        defaultValue !== null && defaultValue !== void 0 ? defaultValue : "",
      clearOnDefault: false,
      shallow: false,
    }),
    filter = _b[0],
    setFilter = _b[1];
  var handleValueChange = function (value, option) {
    if (option.href) {
      router.push(option.href);
    } else if (option.value) {
      setFilter(value);
    }
  };
  React.useEffect(
    function () {
      if (defaultValue && query) {
        setFilter(defaultValue);
      }
    },
    [defaultValue, setFilter, query]
  );
  return _jsxs(_Fragment, {
    children: [
      _jsx("div", {
        className: "hidden md:flex",
        children:
          options.length < 7
            ? _jsx(TabComponent, {
                options: options,
                defaultValue: defaultValue,
                handleValueChange: handleValueChange,
              })
            : _jsx(SelectComponent, {
                options: options,
                defaultValue: defaultValue,
                handleValueChange: handleValueChange,
              }),
      }),
      _jsx("div", {
        className: "flex md:hidden",
        children:
          options.length < 4
            ? _jsx(TabComponent, {
                options: options,
                defaultValue: defaultValue,
                handleValueChange: handleValueChange,
              })
            : _jsx(SelectComponent, {
                options: options,
                defaultValue: defaultValue,
                handleValueChange: handleValueChange,
              }),
      }),
    ],
  });
};
var TabComponent = function (_a) {
  var options = _a.options,
    defaultValue = _a.defaultValue,
    handleValueChange = _a.handleValueChange;
  return _jsx(Tabs, {
    defaultValue: defaultValue,
    children: _jsx(TabsList, {
      className: "w-full md:w-fit ",
      children: options.map(function (option, index) {
        var _a, _b;
        return _jsxs(
          TabsTrigger,
          {
            value:
              (_b =
                (_a = option.href) !== null && _a !== void 0
                  ? _a
                  : option.value) !== null && _b !== void 0
                ? _b
                : "",
            className: "w-full md:w-fit flex gap-2",
            onClick: function () {
              var _a, _b;
              return handleValueChange(
                (_b =
                  (_a = option.href) !== null && _a !== void 0
                    ? _a
                    : option.value) !== null && _b !== void 0
                  ? _b
                  : "",
                option
              );
            },
            children: [option.icon, " ", option.name],
          },
          index
        );
      }),
    }),
  });
};
var SelectComponent = function (_a) {
  var options = _a.options,
    defaultValue = _a.defaultValue,
    handleValueChange = _a.handleValueChange;
  var router = useRouter();
  return _jsx("div", {
    className: "w-full md:w-fit",
    children: _jsxs(Select, {
      defaultValue: defaultValue,
      onValueChange: function (value) {
        var _a, _b;
        // Assurez-vous que `value` est défini avant de pousser le routeur
        if (value) {
          handleValueChange(value, {
            href:
              (_a = options.find(function (option) {
                return option.value === value;
              })) === null || _a === void 0
                ? void 0
                : _a.href,
            value:
              (_b = options.find(function (option) {
                return option.value === value;
              })) === null || _b === void 0
                ? void 0
                : _b.value,
          });
        }
      },
      children: [
        _jsx(SelectTrigger, {
          className: cn(
            "w-full md:fit font-medium h-12 md:h-fit text-md flex gap-2 items-center"
          ),
          children: _jsx(SelectValue, {}),
        }),
        _jsx(SelectContent, {
          className: cn("font-medium"),
          children: options.map(function (option, index) {
            var _a, _b;
            return _jsxs(
              SelectItem,
              {
                value:
                  (_b =
                    (_a = option.href) !== null && _a !== void 0
                      ? _a
                      : option.value) !== null && _b !== void 0
                    ? _b
                    : "",
                className: "w-full md:fit flex gap-2",
                children: [option.icon, " ", option.name],
              },
              index
            );
          }),
        }),
      ],
    }),
  });
};
