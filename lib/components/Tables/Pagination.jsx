"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var outline_1 = require("@heroicons/react/24/outline");
var clsx_1 = __importDefault(require("clsx"));
var link_1 = __importDefault(require("next/link"));
var utils_1 = require("../../lib/utils");
var navigation_1 = require("next/navigation");
function Pagination(_a) {
    var totalPages = _a.totalPages;
    // NOTE: comment in this code when you get to this point in the course
    var pathname = (0, navigation_1.usePathname)();
    var searchParams = (0, navigation_1.useSearchParams)();
    var currentPage = Number(searchParams.get("page")) || 1;
    var allPages = (0, utils_1.generatePagination)(currentPage, totalPages);
    var createPageURL = function (pageNumber) {
        var params = new URLSearchParams(searchParams);
        params.set("page", pageNumber.toString());
        return "".concat(pathname, "?").concat(params.toString());
    };
    if (totalPages === 1)
        return null;
    return (<div className="mt-5 flex w-full justify-end">
      <div className="inline-flex">
        <PaginationArrow direction="left" href={createPageURL(currentPage - 1)} isDisabled={currentPage <= 1}/>

        <div className="flex -space-x-px">
          {allPages.map(function (page, index) {
            var position;
            if (index === 0)
                position = "first";
            if (index === allPages.length - 1)
                position = "last";
            if (allPages.length === 1)
                position = "single";
            if (page === "...")
                position = "middle";
            return (<PaginationNumber key={page} href={createPageURL(page)} page={page} position={position} isActive={currentPage === page}/>);
        })}
        </div>

        <PaginationArrow direction="right" href={createPageURL(currentPage + 1)} isDisabled={currentPage >= totalPages}/>
      </div>
    </div>);
}
exports.default = Pagination;
function PaginationNumber(_a) {
    var page = _a.page, href = _a.href, isActive = _a.isActive, position = _a.position;
    var className = (0, clsx_1.default)("flex h-6 w-6 items-center justify-center text-xs border", {
        "rounded-l-md": position === "first" || position === "single",
        "rounded-r-md": position === "last" || position === "single",
        "z-10 bg-primary border-primary text-white": isActive,
        "hover:bg-gray-100": !isActive && position !== "middle",
        "text-gray-300": position === "middle",
    });
    return isActive || position === "middle" ? (<div className={className}>{page}</div>) : (<link_1.default href={href} className={className}>
      {page}
    </link_1.default>);
}
function PaginationArrow(_a) {
    var href = _a.href, direction = _a.direction, isDisabled = _a.isDisabled;
    var className = (0, clsx_1.default)("flex h-6 w-6 items-center justify-center rounded-md border", {
        "pointer-events-none text-gray-300": isDisabled,
        "hover:bg-gray-100": !isDisabled,
        "mr-2 md:mr-4": direction === "left",
        "ml-2 md:ml-4": direction === "right",
    });
    var icon = direction === "left" ? (<outline_1.ArrowLeftIcon className="w-4"/>) : (<outline_1.ArrowRightIcon className="w-4"/>);
    return isDisabled ? (<div className={className}>{icon}</div>) : (<link_1.default className={className} href={href}>
      {icon}
    </link_1.default>);
}
