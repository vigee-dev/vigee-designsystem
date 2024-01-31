import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

export const formatDateToLocal = (
  dateStr: string,
  locale: string = "en-US"
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
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

export const truncateText = (text: string, length: number = 20) => {
  if (text.length > length) {
    return text.substring(0, length) + "...";
  }
  return text;
};

export const matchStatus = (status: string) => {
  let color = "bg-gray-200 text-gray-600";
  let text = "Brouillon";

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

  return { color, text };
};

export const matchRolesStatus = (status: string) => {
  let color = "bg-gray-200 text-gray-600";
  let text = "admin";

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

  return { color, text };
};

export type PaginationInfo = {
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
};
