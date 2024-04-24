"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
var navigation_1 = require("next/navigation");
var outline_1 = require("@heroicons/react/24/outline");
var use_debounce_1 = require("use-debounce");
function TableSearch(_a) {
    var _b;
    var placeholder = _a.placeholder;
    var searchParams = (0, navigation_1.useSearchParams)();
    var pathname = (0, navigation_1.usePathname)();
    var replace = (0, navigation_1.useRouter)().replace;
    var handleSearch = (0, use_debounce_1.useDebouncedCallback)(function (term) {
        var params = new URLSearchParams(searchParams);
        params.set("page", "1");
        if (term) {
            params.set("query", term);
        }
        else {
            params.delete("query");
        }
        replace("".concat(pathname, "?").concat(params.toString()));
    }, 300);
    return (<div className="relative flex flex-1 flex-shrink-0 max-w-lg md:max-w-sm min-w-[200px] ">
      <label htmlFor="search" className="sr-only">
        Rechercher
      </label>
      <input className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-[16px] md:text-sm outline-2 placeholder:text-gray-500" placeholder={placeholder !== null && placeholder !== void 0 ? placeholder : "Rechercher"} onChange={function (e) {
            handleSearch(e.target.value);
        }} defaultValue={(_b = searchParams.get("query")) === null || _b === void 0 ? void 0 : _b.toString()}/>
      <outline_1.MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
    </div>);
}
exports.default = TableSearch;
