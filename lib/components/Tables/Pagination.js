"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { generatePagination } from "../../lib/utils";
import { usePathname, useSearchParams } from "next/navigation";
export default function Pagination(_a) {
    var totalPages = _a.totalPages;
    // NOTE: comment in this code when you get to this point in the course
    var pathname = usePathname();
    var searchParams = useSearchParams();
    var currentPage = Number(searchParams.get("page")) || 1;
    var allPages = generatePagination(currentPage, totalPages);
    var createPageURL = function (pageNumber) {
        var params = new URLSearchParams(searchParams);
        params.set("page", pageNumber.toString());
        return "".concat(pathname, "?").concat(params.toString());
    };
    if (totalPages === 1)
        return null;
    return (_jsx("div", { className: "mt-5 flex w-full justify-end", children: _jsxs("div", { className: "inline-flex", children: [_jsx(PaginationArrow, { direction: "left", href: createPageURL(currentPage - 1), isDisabled: currentPage <= 1 }), _jsx("div", { className: "flex -space-x-px", children: allPages.map(function (page, index) {
                        var position;
                        if (index === 0)
                            position = "first";
                        if (index === allPages.length - 1)
                            position = "last";
                        if (allPages.length === 1)
                            position = "single";
                        if (page === "...")
                            position = "middle";
                        return (_jsx(PaginationNumber, { href: createPageURL(page), page: page, position: position, isActive: currentPage === page }, page));
                    }) }), _jsx(PaginationArrow, { direction: "right", href: createPageURL(currentPage + 1), isDisabled: currentPage >= totalPages })] }) }));
}
function PaginationNumber(_a) {
    var page = _a.page, href = _a.href, isActive = _a.isActive, position = _a.position;
    var className = clsx("flex h-6 w-6 items-center justify-center text-xs border", {
        "rounded-l-md": position === "first" || position === "single",
        "rounded-r-md": position === "last" || position === "single",
        "z-10 bg-primary border-primary text-white": isActive,
        "hover:bg-gray-100": !isActive && position !== "middle",
        "text-gray-300": position === "middle",
    });
    return isActive || position === "middle" ? (_jsx("div", { className: className, children: page })) : (_jsx(Link, { href: href, className: className, children: page }));
}
function PaginationArrow(_a) {
    var href = _a.href, direction = _a.direction, isDisabled = _a.isDisabled;
    var className = clsx("flex h-6 w-6 items-center justify-center rounded-md border", {
        "pointer-events-none text-gray-300": isDisabled,
        "hover:bg-gray-100": !isDisabled,
        "mr-2 md:mr-4": direction === "left",
        "ml-2 md:ml-4": direction === "right",
    });
    var icon = direction === "left" ? (_jsx(ArrowLeftIcon, { className: "w-4" })) : (_jsx(ArrowRightIcon, { className: "w-4" }));
    return isDisabled ? (_jsx("div", { className: className, children: icon })) : (_jsx(Link, { className: className, href: href, children: icon }));
}
