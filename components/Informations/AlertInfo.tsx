import Link from "next/link";
import { cn } from "../../components/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import {
  PiAlertCircleDuoSolid,
  PiAlertTriangleDuoSolid,
  PiCheckTickCircleDuoSolid,
  PiExternalLinkSquareDuoSolid,
  PiInformationCircleDuoSolid,
  PiQuestionMarkCircleDuoSolid,
} from "../../icons/PikaIcons";

export function AlertInfo({
  title,
  description,
  type,
  className,
  link,
}: {
  title: string;
  description?: string;
  type:
    | "neutral"
    | "informative"
    | "destructive"
    | "warning"
    | "question"
    | "success"
    | "special";
  className?: string;
  link?: string;
}) {
  const color =
    type === "informative"
      ? "text-informative bg-informative-background"
      : type === "destructive"
        ? "text-destructive-foreground bg-destructive-background"
        : type === "warning"
          ? "text-warning-foreground bg-warning-background"
          : type === "success"
            ? "text-success-foreground bg-success-background"
            : type === "special"
              ? "text-purple-600 bg-purple-100"
              : "text-neutral-foreground bg-neutral-background";
  const lightColor =
    type === "informative"
      ? "text-informative-foreground-light "
      : type === "destructive"
        ? "text-destructive-foreground-light "
        : type === "warning"
          ? "text-warning-foreground-light "
          : type === "success"
            ? "text-success-foreground-light "
            : type === "special"
              ? "text-purple-600-light "
              : "text-neutral-foreground-light ";

  const icon =
    type === "informative" ? (
      <PiInformationCircleDuoSolid className={cn(`h-6 w-6 shrink-0`, color)} />
    ) : type === "destructive" ? (
      <PiAlertCircleDuoSolid className={cn(`h-6 w-6 shrink-0`, color)} />
    ) : type === "warning" ? (
      <PiAlertTriangleDuoSolid className={cn(`h-6 w-6 shrink-0`, color)} />
    ) : type === "success" ? (
      <PiCheckTickCircleDuoSolid className={cn(`h-6 w-6 shrink-0`, color)} />
    ) : type === "special" ? (
      <PiInformationCircleDuoSolid className={cn(`h-6 w-6 shrink-0`, color)} />
    ) : (
      <PiQuestionMarkCircleDuoSolid className={cn(`h-6 w-6 shrink-0`, color)} />
    );

  return (
    <Alert
      className={cn(
        "flex items-center p-3 rounded-xl border-none",
        color,
        className
      )}
    >
      <div className="flex items-center gap-4">
        {icon}
        <div className="flex flex-col">
          <AlertTitle className={cn(color, "text-sm py-0 my-0")}>
            {title}
          </AlertTitle>
          {description && (
            <AlertDescription className={cn(color, "text-xs font-sans")}>
              {description}
            </AlertDescription>
          )}
        </div>
        {link && (
          <Link href={link}>
            <PiExternalLinkSquareDuoSolid />
          </Link>
        )}
      </div>
    </Alert>
  );
}
