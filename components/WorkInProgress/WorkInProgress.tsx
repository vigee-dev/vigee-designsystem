"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import devGreenIllustration from "../../img/empty/dev-green.svg";
import { cn } from "../lib/utils";

interface WorkInProgressProps {
  /** Titre principal */
  title?: string;
  /** Sous-titre / description */
  subtitle?: string;
  /** Progression entre 0 et 100. Si non fourni : barre "indéterminée" animée. */
  progress?: number;
  /** Affiche/masque l'illustration */
  showIllustration?: boolean;
  /** Affiche/masque la barre de progression */
  showProgress?: boolean;
  /** Contenu additionnel (boutons, infos, etc.) */
  children?: React.ReactNode;
  /** Classes additionnelles */
  className?: string;
  /** Date estimée de livraison */
  eta?: string;
  /** data-testid */
  "data-testid"?: string;
}

export function WorkInProgress({
  title = "En cours de développement",
  subtitle = "Cette section sera disponible très prochainement.",
  progress,
  showIllustration = true,
  showProgress = true,
  children,
  className,
  eta,
  "data-testid": dataTestId = "work-in-progress",
}: WorkInProgressProps) {
  const isIndeterminate = progress === undefined;
  const safeProgress = Math.min(100, Math.max(0, progress ?? 0));

  return (
    <motion.div
      data-testid={dataTestId}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "relative w-full flex flex-col items-center justify-center gap-6 py-8",
        className
      )}
    >
      {/* Badge "WIP" */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-medium tracking-wide uppercase text-emerald-700"
      >
        <motion.span
          className="w-1.5 h-1.5 rounded-full bg-emerald-500"
          animate={{ opacity: [1, 0.3, 1], scale: [1, 1.4, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
        Work in progress
      </motion.div>

      {/* Illustration */}
      {showIllustration && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex items-center justify-center"
        >
          <Image
            src={devGreenIllustration}
            alt="En cours de développement"
            width={600}
            height={600}
            className="w-80 h-auto md:w-[28rem]"
            priority
          />
        </motion.div>
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
            className="text-xs font-medium tracking-wide mt-1 text-emerald-600"
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
                  className="font-semibold tabular-nums text-emerald-600"
                >
                  {Math.round(safeProgress)}%
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          <div className="relative w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
            {isIndeterminate ? (
              <motion.div
                className="absolute inset-y-0 w-1/3 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600"
                animate={{ x: ["-100%", "300%"] }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ) : (
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600"
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
