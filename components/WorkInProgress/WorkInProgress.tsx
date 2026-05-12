"use client";

import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../lib/utils";
import { WorkInProgressIllustration } from "./WorkInProgressIllustration";

interface WorkInProgressProps {
  /** Titre principal */
  title?: string;
  /** Sous-titre / description */
  subtitle?: string;
  /** Progression entre 0 et 100. Si non fourni : barre "indéterminée" animée. */
  progress?: number;
  /** Liste d'étapes affichées sous forme de skeleton clignotant + check pour celles franchies */
  steps?: string[];
  /** Couleur (classe tailwind, ex: "text-primary") */
  color?: string;
  /** Affiche/masque l'illustration */
  showIllustration?: boolean;
  /** Affiche/masque la barre de progression */
  showProgress?: boolean;
  /** Affiche/masque les skeletons */
  showSkeletons?: boolean;
  /** Nombre de lignes de skeleton à afficher (si pas de steps) */
  skeletonCount?: number;
  /** Contenu additionnel (boutons, infos, etc.) */
  children?: React.ReactNode;
  /** Classes additionnelles */
  className?: string;
  /** Date estimée de livraison */
  eta?: string;
  /** data-testid */
  "data-testid"?: string;
}

const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/70 before:to-transparent";

export function WorkInProgress({
  title = "En cours de développement",
  subtitle = "Cette section sera disponible très prochainement.",
  progress,
  steps,
  color = "text-primary",
  showIllustration = true,
  showProgress = true,
  showSkeletons = true,
  skeletonCount = 3,
  children,
  className,
  eta,
  "data-testid": dataTestId = "work-in-progress",
}: WorkInProgressProps) {
  const isIndeterminate = progress === undefined;
  const safeProgress = Math.min(100, Math.max(0, progress ?? 0));

  const skeletonLines = steps && steps.length > 0
    ? steps
    : Array.from({ length: skeletonCount }, () => "");

  return (
    <motion.div
      data-testid={dataTestId}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "relative w-full max-w-2xl mx-auto flex flex-col items-center justify-center gap-6 p-8 md:p-10 rounded-2xl bg-gradient-to-b from-white to-slate-50/60 border border-slate-100 shadow-sm overflow-hidden",
        className
      )}
    >
      {/* Badge "WIP" */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className={cn(
          "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-medium tracking-wide uppercase",
          color
        )}
      >
        <motion.span
          className="w-1.5 h-1.5 rounded-full bg-current"
          animate={{ opacity: [1, 0.3, 1], scale: [1, 1.4, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
        Work in progress
      </motion.div>

      {/* Illustration */}
      {showIllustration && (
        <WorkInProgressIllustration color={color} className="w-48 h-48 md:w-56 md:h-56" />
      )}

      {/* Texte */}
      <div className="flex flex-col items-center gap-2 text-center max-w-lg">
        <motion.h2
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="text-xl md:text-2xl font-semibold text-slate-800 font-display"
        >
          {title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32, duration: 0.4 }}
          className="text-sm text-slate-500 leading-relaxed"
        >
          {subtitle}
        </motion.p>
        {eta && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.4 }}
            className={cn("text-xs font-medium tracking-wide mt-1", color)}
          >
            Livraison estimée · {eta}
          </motion.p>
        )}
      </div>

      {/* Progress bar */}
      {showProgress && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="w-full max-w-md flex flex-col gap-2"
        >
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-medium tracking-wide uppercase">Progression</span>
            <AnimatePresence mode="wait">
              {isIndeterminate ? (
                <motion.span
                  key="indeterminate"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="italic text-slate-400"
                >
                  en cours…
                </motion.span>
              ) : (
                <motion.span
                  key="value"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={cn("font-semibold tabular-nums", color)}
                >
                  {Math.round(safeProgress)}%
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          <div className="relative w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
            {isIndeterminate ? (
              <motion.div
                className={cn(
                  "absolute inset-y-0 w-1/3 rounded-full bg-current",
                  color
                )}
                animate={{ x: ["-100%", "300%"] }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ) : (
              <motion.div
                className={cn(
                  "absolute inset-y-0 left-0 rounded-full bg-current",
                  color
                )}
                initial={{ width: 0 }}
                animate={{ width: `${safeProgress}%` }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
            )}
            {/* Shimmer overlay */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
              }}
              animate={{ x: ["-100%", "100%"] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </div>
        </motion.div>
      )}

      {/* Skeletons / steps clignotants */}
      {showSkeletons && skeletonLines.length > 0 && (
        <div className="w-full max-w-md flex flex-col gap-2">
          {skeletonLines.map((label, i) => {
            const reached =
              !isIndeterminate &&
              safeProgress >= ((i + 1) / skeletonLines.length) * 100;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.45 + i * 0.08,
                  duration: 0.35,
                }}
                className={cn(
                  "relative flex items-center gap-3 rounded-xl border border-slate-100 bg-white px-3 py-2.5 overflow-hidden",
                  !reached && shimmer,
                  !reached && "animate-pulse"
                )}
              >
                {/* Check / loader */}
                <div className="flex-shrink-0">
                  {reached ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 18 }}
                      className={cn(
                        "w-5 h-5 rounded-full flex items-center justify-center bg-current",
                        color
                      )}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="w-3 h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </motion.div>
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-slate-100 border-2 border-slate-200" />
                  )}
                </div>

                {/* Label ou skeleton */}
                {label ? (
                  <span
                    className={cn(
                      "text-sm transition-colors",
                      reached ? "text-slate-700 font-medium" : "text-slate-400"
                    )}
                  >
                    {label}
                  </span>
                ) : (
                  <div className="flex-1 flex flex-col gap-1.5">
                    <div
                      className="h-3 rounded bg-slate-100"
                      style={{ width: `${60 + ((i * 13) % 30)}%` }}
                    />
                    <div
                      className="h-2 rounded bg-slate-100"
                      style={{ width: `${40 + ((i * 7) % 25)}%` }}
                    />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      )}

      {children && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="flex flex-col items-center gap-2 pt-2"
        >
          {children}
        </motion.div>
      )}
    </motion.div>
  );
}

export default WorkInProgress;
