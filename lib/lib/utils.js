"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.currency = exports.matchRolesStatus = exports.matchStatus = exports.truncateText = exports.generatePagination = exports.formatDateToLocal = exports.formatCurrency = exports.cn = void 0;
var clsx_1 = require("clsx");
var tailwind_merge_1 = require("tailwind-merge");
function cn() {
    var inputs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        inputs[_i] = arguments[_i];
    }
    return (0, tailwind_merge_1.twMerge)((0, clsx_1.clsx)(inputs));
}
exports.cn = cn;
var formatCurrency = function (amount) {
    return (amount / 100).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
    });
};
exports.formatCurrency = formatCurrency;
var formatDateToLocal = function (dateStr, locale) {
    if (locale === void 0) { locale = "en-US"; }
    var date = new Date(dateStr);
    var options = {
        day: "numeric",
        month: "short",
        year: "numeric",
    };
    var formatter = new Intl.DateTimeFormat(locale, options);
    return formatter.format(date);
};
exports.formatDateToLocal = formatDateToLocal;
var generatePagination = function (currentPage, totalPages) {
    // If the total number of pages is 7 or less,
    // display all pages without any ellipsis.
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, function (_, i) { return i + 1; });
    }
    // If the current page is among the first 3 pages,
    // show the first 3, an ellipsis, and the last 2 pages.
    if (currentPage <= 3) {
        return [1, 2, 3, "...", totalPages - 1, totalPages];
    }
    // If the current page is among the last 3 pages,
    // show the first 2, an ellipsis, and the last 3 pages.
    if (currentPage >= totalPages - 2) {
        return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
    }
    // If the current page is somewhere in the middle,
    // show the first page, an ellipsis, the current page and its neighbors,
    // another ellipsis, and the last page.
    return [
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages,
    ];
};
exports.generatePagination = generatePagination;
var truncateText = function (text, length) {
    if (length === void 0) { length = 20; }
    if (text.length > length) {
        return text.substring(0, length) + "...";
    }
    return text;
};
exports.truncateText = truncateText;
var matchStatus = function (status) {
    var color = "bg-gray-200 text-gray-600";
    var text = "Brouillon";
    switch (status) {
        case "on-going":
            color = "bg-sky-200 text-sky-600";
            text = "En cours";
            break;
        case "validated":
            color = "bg-green-200 text-green-600";
            text = "Validé";
            break;
        case "waiting-validation":
            color = "bg-yellow-200 text-yellow-600";
            text = "Attente de validation";
            break;
        case "pending":
            color = "bg-yellow-200 text-yellow-600";
            text = "Envoyé";
            break;
        case "draft":
            color = "bg-gray-200 text-gray-600";
            text = "Brouillon";
            break;
        case "active":
            color = "bg-green-200 text-green-600";
            text = "Actif";
            break;
        case "inactive":
            color = "bg-gray-200 text-gray-600";
            text = "Inactif";
            break;
        case "refused":
            color = "bg-red-200 text-red-600";
            text = "Refusé";
            break;
    }
    return { color: color, text: text };
};
exports.matchStatus = matchStatus;
var matchRolesStatus = function (status) {
    var color = "bg-gray-200 text-gray-600";
    var text = "admin";
    switch (status) {
        case "admin":
            color = "bg-sky-200 text-sky-600";
            text = "Admin";
            break;
        case "client":
            color = "bg-green-200 text-green-600";
            text = "Client";
            break;
        case "user":
            color = "bg-yellow-200 text-yellow-600";
            text = "utilisateur";
            break;
    }
    return { color: color, text: text };
};
exports.matchRolesStatus = matchRolesStatus;
var currency = function (number) {
    return {
        toEuro: function () {
            return (number !== null && number !== void 0 ? number : 0)
                .toLocaleString("fr-FR", { style: "currency", currency: "EUR" })
                .replace(/\s/g, " ");
        },
        toRoundedEuro: function () {
            return Math.round(number)
                .toLocaleString("fr-FR", {
                style: "currency",
                currency: "EUR",
                minimumFractionDigits: 0, // Force l'affichage sans décimales
                maximumFractionDigits: 0, // Force l'affichage sans décimales
            })
                .replace(/\s/g, " ");
        },
    };
};
exports.currency = currency;
