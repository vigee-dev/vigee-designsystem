import { cn } from "components/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import { PiAlertCircleDuoSolid, PiAlertTriangleDuoSolid, PiInformationCircleDuoSolid, PiQuestionMarkCircleDuoSolid } from "icons/PikaIcons";

export function AlertInfo({ title, description, type }: { title: string; description?: string; type: "info" | "destructive" | "warning" | "question" }) {
  const color =
    type === "info"
      ? "text-informative bg-informative-light"
      : type === "destructive"
        ? "text-destructive bg-destructive-light"
        : type === "warning"
          ? "text-warning bg-warning-light"
          : "text-question bg-question-light";
  const lightColor =
    type === "info" ? "text-informative-foreground " : type === "destructive" ? "text-destructive-foreground " : type === "warning" ? "text-warning-foreground " : "text-question-foreground ";

  const icon =
    type === "info" ? (
      <PiInformationCircleDuoSolid className={cn(`h-6 w-6 shrink-0`, color)} />
    ) : type === "destructive" ? (
      <PiAlertCircleDuoSolid className={cn(`h-6 w-6 shrink-0`, color)} />
    ) : type === "warning" ? (
      <PiAlertTriangleDuoSolid className={cn(`h-6 w-6 shrink-0`, color)} />
    ) : (
      <PiQuestionMarkCircleDuoSolid className={cn(`h-6 w-6 shrink-0`, color)} />
    );

  return (
    <Alert className={cn("flex items-center p-3 rounded-xl border-none", color)}>
      <div className="flex items-center gap-4">
        {icon}
        <div className="flex flex-col">
          <AlertTitle className={cn(color, "text-sm py-0 my-0")}>{title}</AlertTitle>
          {description && <AlertDescription className={cn(lightColor, "text-xs")}>{description}</AlertDescription>}
        </div>
      </div>
    </Alert>
  );
}
