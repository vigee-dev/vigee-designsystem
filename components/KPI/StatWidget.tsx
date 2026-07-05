/**
 * @description Carte KPI premium sur fond blanc : libellé, grande valeur, sous-libellé, accent coloré, footer et popover de détail optionnel. Style « cockpit de pilotage ».
 * @useWhen mettre en avant un indicateur financier/commercial clé (ARR, trésorerie, CA) → utiliser StatWidget | KPI isolé qui mérite une carte dédiée avec accent couleur → utiliser StatWidget | besoin d'un détail au clic (par client, par criticité) → utiliser la prop detail
 * @dontUseFor plusieurs métriques compactes côte à côte avec variation N-1 → utiliser NumberKPI | tendance temporelle → utiliser AreaChart/LineChart | classement ordonné → utiliser Ranking
 * @example <StatWidget label="ARR Maintenance" value={4200} unit="€" sublabel="par mois" accent="indigo" />
 */
"use client";

import * as React from "react";
import { PiInformationCircleDuoSolid } from "../../icons/PikaIcons";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn, currency } from "../lib/utils";

export type StatWidgetAccent =
  | "indigo"
  | "emerald"
  | "amber"
  | "rose"
  | "slate"
  | "sky"
  | "violet";

export interface StatWidgetProps {
  /** Libellé du KPI (ex. "ARR Maintenance") */
  label: string;
  /** Valeur principale. Formatée en € via currency() si unit === "€". */
  value: string | number;
  /** Unité affichée (€ formate via currency, sinon suffixe simple). */
  unit?: "€" | "h" | "%" | string;
  /** Sous-libellé discret sous la valeur (ex. "30 derniers jours"). */
  sublabel?: React.ReactNode;
  /** Couleur d'accent (halo d'icône + liseré). */
  accent?: StatWidgetAccent;
  /** Icône affichée dans le halo en haut à gauche. */
  icon?: React.ReactNode;
  /** Badge de tendance (haut droite). */
  trend?: { value: string; type: "positive" | "negative" | "neutral" };
  /** Ligne secondaire en pied de carte (ex. manque à gagner, objectif). */
  footer?: React.ReactNode;
  /** Contenu du popover « ⓘ détail » (granularité par client/criticité). */
  detail?: React.ReactNode;
  /** Slot optionnel rendu sous la valeur (mini-chart, jauge). */
  children?: React.ReactNode;
  /** Série de valeurs pour un sparkline discret (évolution) sous la valeur. */
  sparkline?: number[];
  /** Classe optionnelle appliquée à la valeur (ex. couleur selon un seuil). */
  valueClassName?: string;
  className?: string;
  "data-testid"?: string;
}

const ACCENT_STROKE: Record<StatWidgetAccent, string> = {
  indigo: "#6366F1",
  emerald: "#10B981",
  amber: "#F59E0B",
  rose: "#F43F5E",
  slate: "#94A3B8",
  sky: "#0EA5E9",
  violet: "#8B5CF6",
};

/** Mini courbe d'évolution discrète (area sparkline, sans axes). */
function Sparkline({
  data,
  color,
}: {
  data: number[];
  color: string;
}) {
  if (data.length < 2) return null;
  const w = 240;
  const h = 36;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1;
  const step = w / (data.length - 1);
  const points = data.map((v, i) => {
    const x = i * step;
    const y = h - ((v - min) / span) * (h - 4) - 2;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  const line = `M${points.join(" L")}`;
  const area = `${line} L${w},${h} L0,${h} Z`;
  const gradId = `spark-${color.replace("#", "")}`;

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      className="mt-3 h-9 w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.18" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gradId})`} />
      <path
        d={line}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const ACCENT_HALO: Record<StatWidgetAccent, string> = {
  indigo: "bg-indigo-50 text-indigo-500",
  emerald: "bg-emerald-50 text-emerald-500",
  amber: "bg-amber-50 text-amber-500",
  rose: "bg-rose-50 text-rose-500",
  slate: "bg-slate-100 text-slate-500",
  sky: "bg-sky-50 text-sky-500",
  violet: "bg-violet-50 text-violet-500",
};

const TREND_CLASS: Record<NonNullable<StatWidgetProps["trend"]>["type"], string> =
  {
    positive: "text-emerald-600 bg-emerald-100",
    negative: "text-rose-600 bg-rose-100",
    neutral: "text-slate-600 bg-slate-100",
  };

function formatValue(value: string | number, unit?: string): string {
  if (typeof value === "string") return value;
  if (unit === "€") return currency(value).toRoundedEuro();
  if (unit) return `${value} ${unit}`;
  return String(value);
}

export const StatWidget = ({
  label,
  value,
  unit,
  sublabel,
  accent = "indigo",
  icon,
  trend,
  footer,
  detail,
  children,
  sparkline,
  valueClassName,
  className,
  "data-testid": dataTestId,
}: StatWidgetProps) => {
  return (
    <div
      data-testid={dataTestId}
      className={cn(
        "relative flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_2px_12px_rgba(15,23,42,0.05)]",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {icon != null && (
            <span
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-xl text-lg",
                ACCENT_HALO[accent]
              )}
            >
              {icon}
            </span>
          )}
          <span className="text-sm font-medium text-slate-400">{label}</span>
        </div>

        <div className="flex items-center gap-1.5">
          {trend != null && (
            <span
              className={cn(
                "inline-flex items-baseline rounded-full px-2.5 py-0.5 text-xs font-black",
                TREND_CLASS[trend.type]
              )}
            >
              {trend.value}
            </span>
          )}
          {detail != null && (
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  aria-label={`Détail ${label}`}
                  className="rounded-full p-1 text-slate-300 transition-colors hover:bg-slate-50 hover:text-slate-500"
                >
                  <PiInformationCircleDuoSolid className="h-4 w-4" />
                </button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-80">
                {detail}
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-baseline gap-2">
        <span
          className={cn(
            "text-[28px] font-semibold leading-none tracking-tight text-slate-900",
            valueClassName
          )}
        >
          {formatValue(value, unit)}
        </span>
      </div>

      {sublabel != null && (
        <span className="mt-1.5 text-xs font-medium text-slate-400">
          {sublabel}
        </span>
      )}

      {sparkline != null && sparkline.length >= 2 && (
        <Sparkline data={sparkline} color={ACCENT_STROKE[accent]} />
      )}

      {children}

      {footer != null && (
        <div className="mt-4 border-t border-gray-50 pt-3 text-xs font-medium text-slate-500">
          {footer}
        </div>
      )}
    </div>
  );
};

export default StatWidget;
