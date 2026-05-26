/**
 * Helper centralise pour les badges/cards de STATUT dans toute l'app Vigee.
 *
 * Convention globale (NON-NEGOCIABLE) :
 *   - TODO / TO_DO / DRAFT / OPEN / NEW       -> gris  (slate)
 *   - DOING / IN_PROGRESS / ACTIVE / RUNNING  -> bleu  (sky)
 *   - DONE / RESOLVED / COMPLETED / CLOSED    -> vert  (emerald)
 *
 * Utilisation dans un composant :
 *   const s = getStatusStyle("IN_PROGRESS");
 *   <span className={`${s.badge}`}>{label}</span>
 *
 * Si le statut n'est pas dans la convention (erreur, attente humaine, etc.),
 * passe `getStatusStyle(custom)` qui retourne le defaut (slate) — chaque
 * composant peut alors override via mapping local pour les cas hors convention.
 */

export type StatusKind = "todo" | "doing" | "done";

export type StatusStyle = {
  /** Combo bg + text + border pour badge inline. */
  badge: string;
  /** Combo bg + text pour card / pill plus marquee. */
  pill: string;
  /** Texte seul (utile pour label dans liste denudee). */
  text: string;
  /** Background seul (pour dot, icon container). */
  bg: string;
  /** Border seul. */
  border: string;
  /** Dot seul (cercle plein) pour timelines / listes. */
  dot: string;
};

const STYLES: Record<StatusKind, StatusStyle> = {
  todo: {
    badge: "bg-slate-50 text-slate-500 border border-slate-100",
    pill: "bg-slate-50 text-slate-500",
    text: "text-slate-500",
    bg: "bg-slate-50",
    border: "border-slate-100",
    dot: "bg-slate-300",
  },
  doing: {
    badge: "bg-sky-100 text-sky-700 border border-sky-200",
    pill: "bg-sky-100 text-sky-700",
    text: "text-sky-700",
    bg: "bg-sky-100",
    border: "border-sky-200",
    dot: "bg-sky-500",
  },
  done: {
    badge: "bg-emerald-100 text-emerald-700 border border-emerald-200",
    pill: "bg-emerald-100 text-emerald-700",
    text: "text-emerald-700",
    bg: "bg-emerald-100",
    border: "border-emerald-200",
    dot: "bg-emerald-500",
  },
};

const STATUS_TO_KIND: Record<string, StatusKind> = {
  // Generic
  TODO: "todo",
  TO_DO: "todo",
  DRAFT: "todo",
  NEW: "todo",
  OPEN: "todo",
  PENDING: "todo",
  IDEA: "todo",
  SCOPING: "todo",

  // Doing
  DOING: "doing",
  IN_PROGRESS: "doing",
  ACTIVE: "doing",
  RUNNING: "doing",
  ONGOING: "doing",
  PROCESSING: "doing",
  SYNCING: "doing",
  ANALYZING: "doing",
  DEVELOPMENT: "doing",
  TESTING: "doing",
  CONCEPTION: "doing",

  // Done
  DONE: "done",
  RESOLVED: "done",
  COMPLETED: "done",
  COMPLETE: "done",
  CLOSED: "done",
  VALIDATED: "done",
  ACCEPTED: "done",
  PRODUCTION: "done",
  MERGED: "done",
  SUCCESS: "done",
};

/**
 * Map un statut metier vers son kind canonique (todo|doing|done).
 * Retourne null si le statut n'est pas dans la convention (a l'appelant de
 * gerer le fallback via un mapping local).
 */
export function statusToKind(status: string | null | undefined): StatusKind | null {
  if (!status) return null;
  const key = status.toUpperCase().replace(/[\s-]/g, "_");
  return STATUS_TO_KIND[key] ?? null;
}

/**
 * Retourne le style associe a un statut. Si le statut n'est pas dans la
 * convention, retourne le style "todo" par defaut (slate).
 */
export function getStatusStyle(status: string | null | undefined): StatusStyle {
  const kind = statusToKind(status);
  return STYLES[kind ?? "todo"];
}

/**
 * Variante explicite par kind (utile quand on connait deja le kind).
 */
export function getStatusStyleByKind(kind: StatusKind): StatusStyle {
  return STYLES[kind];
}
