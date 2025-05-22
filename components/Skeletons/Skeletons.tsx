import { cn } from "../lib/utils";

// Loading animation
const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export const MiniInputSkeleton = () => {
  return (
    <div className="flex flex-col p-1 gap-1 bg-white rounded-xl animate-pulse">
      <div className="h-4 w-12 rounded-md bg-gray-100" />
    </div>
  );
};

export const ChatBubbleSkeleton = () => {
  return (
    <div
      className="flex flex-row items-end gap-2 p-2 bg-white rounded-xl shadow-sm w-fit max-w-xs animate-pulse  border-gray-100"
      aria-busy="true"
    >
      {/* Message skeleton */}
      <div className="flex flex-col gap-2 flex-1 min-w-[80px]">
        <div className="h-3 w-24 rounded-md bg-gray-100" />
        <div className="h-3 w-32 rounded-md bg-gray-100" />
      </div>
      {/* Pending dot */}
      <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse ml-2" />
      {/* Avatar skeleton */}
      <div className="w-8 h-8 rounded-full bg-gray-200" />
    </div>
  );
};

export const InputSkeleton = ({
  big = true,
  bigHeight = false,
  className,
}: {
  big?: boolean;
  bigHeight?: boolean;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col p-1 gap-1", className)}>
      <div className="h-6 w-16 rounded-md bg-gray-100" />
      <div
        className={cn(
          `${shimmer} relative h-6 overflow-hidden ${big ? "w-full" : "w-36"} ${bigHeight ? "h-96" : "h-8"} rounded-md bg-gray-100`
        )}
      />
    </div>
  );
};

export const TaskSkeleton = () => {
  return (
    <div
      className={`${shimmer} flex items-center justify-between rounded-xl border border-gray-100 bg-white p-2 gap-2`}
    >
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <div className="h-6 w-6 rounded-md bg-gray-100 flex-shrink-0" />
        <div className="h-6 md:w-64 w-full rounded-md bg-gray-100" />
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        <div className="h-6 w-6 rounded-md bg-gray-100" />
        <div className="h-6 w-12 rounded-md bg-gray-100" />
        <div className="h-6 w-6 rounded-full bg-gray-100" />
        <div className="h-6 w-12 rounded-md bg-gray-100" />
        <div className="h-6 w-6 rounded-full bg-gray-100" />
      </div>
    </div>
  );
};

export const PlanningTaskSkeleton = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        `${shimmer} animate-pulse flex flex-col gap-2 rounded-xl `,
        className
      )}
    >
      <div className="flex gap-2 bg-white p-2 rounded-xl w-32 h-8">
        <div className="h-4 w-16 rounded-md bg-gray-100" />
        <div className="h-4 w-32 rounded-md bg-gray-100" />
      </div>
      <TaskSkeleton />
      <TaskSkeleton />
      <TaskSkeleton />
    </div>
  );
};

export const TicketSkeleton = () => {
  return (
    <div className="flex flex-col gap-2 animate-pulse">
      <div
        className={`${shimmer} flex items-center justify-between p-3 rounded-xl border border-gray-100 bg-white gap-2 `}
      >
        {/* Left part: icon + client/project + description */}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {/* Avatar placeholder */}
          <div className="h-8 w-8 rounded-full bg-gray-100 flex-shrink-0" />

          {/* Texts */}
          <div className="flex flex-col gap-1 overflow-hidden">
            <div className="flex gap-2">
              <div className="h-4 w-28 rounded bg-gray-100" />
              <div className="h-4 w-32 rounded bg-gray-100" />
            </div>
            <div className="h-4 w-48 rounded bg-gray-100" />
          </div>
        </div>

        {/* Right part: flags, timer, date, etc. */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="h-4 w-4 rounded bg-gray-100" /> {/* Flag */}
          <div className="h-4 w-4 rounded bg-gray-100" /> {/* Timer */}
          <div className="h-4 w-12 rounded bg-gray-100" /> {/* Date */}
          <div className="h-4 w-4 rounded-full bg-gray-100" /> {/* Dot */}
        </div>
      </div>
    </div>
  );
};

export const TicketsTitleSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex flex-col gap-2 my-2", className)}>
      <div className="flex gap-2 bg-white p-2 rounded-xl w-32 h-8">
        <div className="h-4 w-16 rounded-md bg-gray-100" />
        <div className="h-4 w-32 rounded-md bg-gray-100" />
      </div>
      <TicketSkeleton />
    </div>
  );
};

export const TicketsSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex flex-col gap-2 my-2", className)}>
      <TicketsTitleSkeleton />
      {Array.from({ length: 2 }).map((_, index) => (
        <TicketSkeleton key={index} />
      ))}
    </div>
  );
};

export const MultiInputsSkeleton = ({ number = 3 }: { number?: number }) => {
  const inputs = Array.from({ length: number }, (_, index) => index);

  return (
    <div className="flex flex-col p-1 gap-1 w-full">
      {inputs.map((input, index) => (
        <div key={index} className="flex flex-col p-1 gap-1">
          <div className="h-6 w-16 rounded-md bg-gray-100" />
          <div
            className={`${shimmer} relative h-6 overflow-hidden w-full rounded-md bg-gray-100`}
          />
        </div>
      ))}
    </div>
  );
};

export const CalendarSkeleton = () => {
  return (
    <div className={`${shimmer} w-fit p-4 rounded-lg  bg-white`}>
      {/* Header avec les flèches et le mois */}
      <div className="flex items-center justify-between mb-4">
        <div className="h-6 w-6 rounded-md bg-gray-100" /> {/* Flèche gauche */}
        <div className="h-4 w-24 rounded-md bg-gray-100" /> {/* Mois / année */}
        <div className="h-6 w-6 rounded-md bg-gray-100" /> {/* Flèche droite */}
      </div>

      {/* Lignes de jours de la semaine */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={`day-title-${i}`}
            className="h-3 w-6 rounded-md bg-gray-100 mx-auto"
          />
        ))}
      </div>

      {/* Grille des jours (6 lignes x 7 colonnes) */}
      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: 42 }).map((_, i) => (
          <div
            key={`day-${i}`}
            className="h-8 w-8 rounded-md bg-gray-100 mx-auto"
          />
        ))}
      </div>
    </div>
  );
};

export function CardSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm`}
    >
      <div className="flex p-4">
        <div className="h-5 w-5 rounded-md bg-gray-200" />
        <div className="ml-2 h-6 w-16 rounded-md bg-gray-200 text-sm font-medium" />
      </div>
      <div className="flex items-center justify-center truncate rounded-xl bg-white px-4 py-8">
        <div className="h-7 w-20 rounded-md bg-gray-200" />
      </div>
    </div>
  );
}

export function HeaderSkeleton() {
  return (
    <div className={"rounded-xl h-fit bg-white p-6   items-center mb-4"}>
      <div className="flex flex-col gap-2  ">
        <div
          className={`${shimmer} relative  h-6 w-36 overflow-hidden rounded-md bg-gray-100`}
        />
        <div
          className={`${shimmer} relative h-4 w-24 overflow-hidden rounded-md bg-gray-100`}
        />
      </div>
    </div>
  );
}

export function CardsSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
  );
}

export function RevenueChartSkeleton() {
  return (
    <div className={`${shimmer} relative w-full overflow-hidden md:col-span-4`}>
      <div className="mb-4 h-8 w-36 rounded-md bg-gray-100" />
      <div className="rounded-xl bg-gray-100 p-4">
        <div className="sm:grid-cols-13 mt-0 grid h-[410px] grid-cols-12 items-end gap-2 rounded-md  bg-white p-4 md:gap-4" />
        <div className="flex items-center pb-2 pt-6">
          <div className="h-5 w-5 rounded-full bg-gray-200" />
          <div className="ml-2 h-4 w-20 rounded-md bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

export function InvoiceSkeleton() {
  return (
    <div className="flex flex-row items-center justify-between border-b border-gray-100 py-4">
      <div className="flex items-center">
        <div className="mr-2 h-8 w-8 rounded-full bg-gray-200" />
        <div className="min-w-0">
          <div className="h-5 w-40 rounded-md bg-gray-200" />
          <div className="mt-2 h-4 w-12 rounded-md bg-gray-200" />
        </div>
      </div>
      <div className="mt-2 h-4 w-12 rounded-md bg-gray-200" />
    </div>
  );
}

export function LatestInvoicesSkeleton() {
  return (
    <div
      className={`${shimmer} relative flex w-full flex-col overflow-hidden md:col-span-4 lg:col-span-4`}
    >
      <div className="mb-4 h-8 w-36 rounded-md bg-gray-100" />
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-100 p-4">
        <div className="bg-white px-6">
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <div className="flex items-center pb-2 pt-6">
            <div className="h-5 w-5 rounded-full bg-gray-200" />
            <div className="ml-2 h-4 w-20 rounded-md bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
}

interface DashboardSkeletonProps {
  noTop?: boolean;
}
export default function DashboardSkeleton({ noTop }: DashboardSkeletonProps) {
  return (
    <>
      {!noTop && (
        <div
          className={`${shimmer} relative mb-4 h-8 w-36 overflow-hidden rounded-md bg-gray-100`}
        />
      )}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <div className="col-span-full md:col-span-3 lg:col-span-6">
          <RevenueChartSkeleton />
        </div>
        <div className="col-span-full md:col-span-1 lg:col-span-2">
          <LatestInvoicesSkeleton />
        </div>
      </div>
    </>
  );
}

export function TitleSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        `${shimmer} relative mb-4 h-8 w-36 overflow-hidden rounded-md bg-gray-100`,
        className
      )}
    />
  );
}

export function TableRowSkeleton() {
  return (
    <tr className="w-full border-b border-gray-100 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
      {/* Customer Name and Image */}
      <td className="relative overflow-hidden whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gray-100"></div>
          <div className="h-6 w-24 rounded bg-gray-100"></div>
        </div>
      </td>
      {/* Email */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-32 rounded bg-gray-100"></div>
      </td>
      {/* Amount */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </td>
      {/* Date */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </td>
      {/* Status */}
      {/* <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </td> */}
      {/* Actions */}
      <td className="whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex justify-end gap-3">
          <div className="h-[38px] w-[38px] rounded bg-gray-100"></div>
          <div className="h-[38px] w-[38px] rounded bg-gray-100"></div>
        </div>
      </td>
    </tr>
  );
}

export function InvoicesMobileSkeleton() {
  return (
    <div className="mb-2 w-full rounded-md bg-white p-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-8">
        <div className="flex items-center">
          <div className="mr-2 h-8 w-8 rounded-full bg-gray-100"></div>
          <div className="h-6 w-16 rounded bg-gray-100"></div>
        </div>
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </div>
      <div className="flex w-full items-center justify-between pt-4">
        <div>
          <div className="h-6 w-16 rounded bg-gray-100"></div>
          <div className="mt-2 h-6 w-24 rounded bg-gray-100"></div>
        </div>
        <div className="flex justify-end gap-2">
          <div className="h-10 w-10 rounded bg-gray-100"></div>
          <div className="h-10 w-10 rounded bg-gray-100"></div>
        </div>
      </div>
    </div>
  );
}

export function MobileCardSkeleton() {
  return (
    <div className="flex flex-col gap-2 px-2">
      <div className="mb-2 w-full rounded-md bg-white p-4 flex justify-between ">
        <div>
          <div className="h-6 w-16 rounded bg-gray-100"></div>
          <div className="mt-2 h-6 w-24 rounded bg-gray-100"></div>
        </div>
        <div className="flex justify-end gap-2 items-center">
          <div className="mr-2 h-8 w-8 rounded-full bg-gray-100"></div>
          <div className="h-10 w-10 rounded bg-gray-100"></div>
        </div>
      </div>
    </div>
  );
}

export function InvoicesTableSkeleton() {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Customer
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Amount
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th
                  scope="col"
                  className="relative pb-4 pl-3 pr-6 pt-2 sm:pr-6"
                >
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function TicketResumeSkeleton({
  className,
  noBackground,
}: {
  className?: string;
  noBackground?: boolean;
}) {
  return (
    <div className={cn("mt-6 flow-root", className)}>
      <div className="inline-block min-w-full align-middle">
        <div
          className={cn(
            "rounded-lg p-4 md:pt-0",
            noBackground ? "" : "bg-gray-50"
          )}
        >
          {/* Icône de validation */}
          <div className="flex justify-center mb-4">
            <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse" />
          </div>

          {/* Titre principal */}
          <div className="h-5 w-3/4 mx-auto mb-6 rounded-md bg-gray-200 animate-pulse" />

          {/* Contenu principal */}
          <div className="rounded-xl bg-white p-4 shadow-sm border border-gray-100 space-y-3 animate-pulse">
            <div className="flex items-center space-x-4">
              <div className="h-4 w-4 bg-gray-200 rounded-full" />
              <div className="h-4 w-32 bg-gray-200 rounded-md" />
            </div>
            <div className="flex items-center space-x-4">
              <div className="h-4 w-4 bg-gray-200 rounded-sm" />
              <div className="h-4 w-20 bg-gray-200 rounded-md" />
            </div>
            <div className="space-y-1 pt-2">
              <div className="h-4 w-60 bg-gray-200 rounded-md" />
              <div className="h-4 w-72 bg-gray-200 rounded-md" />
            </div>
          </div>

          {/* Bouton */}
          <div className="flex justify-center mt-6">
            <div className="h-10 w-48 bg-gray-200 rounded-lg animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function TableSkeleton({
  className,
  noBackground,
}: {
  className?: string;
  noBackground?: boolean;
}) {
  return (
    <div className={cn("mt-6 flow-root", className)}>
      <div
        className={cn(
          "inline-block min-w-full align-middle",
          !noBackground && "bg-white"
        )}
      >
        <div className="rounded-lg bg-gray-50  md:pt-0">
          <div className="md:hidden">
            <MobileCardSkeleton />
            <MobileCardSkeleton />
            <MobileCardSkeleton />
            <MobileCardSkeleton />
            <MobileCardSkeleton />
            <MobileCardSkeleton />
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <tbody
              className={cn("bg-transparent", !noBackground && "bg-gray-50")}
            >
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export const DocumentSkeleton = () => {
  return (
    <div className="flex flex-col gap-2">
      <InputSkeleton />

      <InputSkeleton />
      <div className="p-1">
        <div
          className={`${shimmer} relative h-6 overflow-hidden w-full rounded-md bg-gray-100 `}
        />
      </div>
      <InputSkeleton />
      <div className="p-1">
        <div
          className={`${shimmer} relative h-6 overflow-hidden w-full rounded-md bg-gray-100  `}
        />
      </div>
      <InputSkeleton />
      <div className="p-1">
        <div
          className={`${shimmer} relative h-6 overflow-hidden w-full rounded-md bg-gray-100`}
        />
      </div>
    </div>
  );
};
