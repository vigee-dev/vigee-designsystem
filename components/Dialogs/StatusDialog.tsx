/**
 * @description Popup d'état (attente → succès/erreur) avec grande illustration, badge animé, titre + description, et fermeture automatique optionnelle. Idéale pour une action asynchrone visible (envoi, génération, traitement).
 * @useWhen action asynchrone qu'on veut rendre visible (envoi d'email, génération IA, import) → afficher la progression puis la conclusion | confirmation auto-disparaissante d'une opération réussie → passer `autoCloseMs` | feedback bloquant non interrompable pendant un traitement → `status="loading"`
 * @dontUseFor confirmation d'action critique avec choix utilisateur → utiliser AlertDialog | formulaire ou contenu riche → utiliser Dialog | simple toast non bloquant → utiliser sonner toast
 * @example <StatusDialog open={open} onOpenChange={setOpen} status={status} title="Envoi en cours" description="Patientez…" image={<Image src={illu} alt="" />} autoCloseMs={2200} />
 */
"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent } from "../ui/dialog";
import {
  PiSpinnerDuoStroke,
  PiCheckTickCircleDuoSolid,
  PiSparkleAi01DuoSolid,
} from "../../icons/PikaIcons";
import { cn } from "../lib/utils";

export type StatusDialogStatus = "loading" | "success" | "error";

export interface StatusDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** État courant : pilote le badge animé et le comportement de fermeture auto. */
  status: StatusDialogStatus;
  title: string;
  description?: string;
  /** Illustration affichée en grand dans le container arrondi (ex : <Image …/>). */
  image?: React.ReactNode;
  /**
   * Ferme automatiquement la popup après ce délai (ms) quand status passe à
   * "success" ou "error". Omis ou 0 → pas de fermeture auto.
   */
  autoCloseMs?: number;
  /** Affiche l'icône IA (étincelle) à côté du spinner en mode loading. */
  withAiSpark?: boolean;
  /** Empêche la fermeture manuelle (clic extérieur / Échap) pendant le loading. */
  lockWhileLoading?: boolean;
  className?: string;
  classNameImage?: string;
}

/**
 * Popup d'état générique réutilisable. Le parent pilote `status`/`title`/
 * `description` ; le composant gère le visuel (illustration + badge animé) et la
 * fermeture automatique à la conclusion.
 */
export function StatusDialog({
  open,
  onOpenChange,
  status,
  title,
  description,
  image,
  autoCloseMs,
  withAiSpark = false,
  lockWhileLoading = true,
  className,
  classNameImage,
}: StatusDialogProps) {
  // Fermeture automatique à la conclusion (succès / erreur).
  useEffect(() => {
    if (!open || !autoCloseMs) return;
    if (status === "success" || status === "error") {
      const t = setTimeout(() => onOpenChange(false), autoCloseMs);
      return () => clearTimeout(t);
    }
  }, [status, open, autoCloseMs, onOpenChange]);

  const handleOpenChange = (next: boolean) => {
    // Pendant le loading, on bloque la fermeture manuelle si demandé.
    if (!next && lockWhileLoading && status === "loading") return;
    onOpenChange(next);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className={cn(
          "max-w-md rounded-3xl border-slate-200 p-0 overflow-hidden",
          className,
        )}
        data-testid="status-dialog"
      >
        <div className="flex flex-col items-center text-center px-8 pt-10 pb-8">
          {image && (
            <div
              className={cn(
                "w-full rounded-3xl bg-slate-50 flex items-center justify-center py-6 mb-6",
                classNameImage,
              )}
            >
              {image}
            </div>
          )}

          {/* Badge d'état animé */}
          <div className="mb-3 h-10 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {status === "loading" ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex items-center gap-2 text-sky-500"
                >
                  {withAiSpark && <PiSparkleAi01DuoSolid className="w-5 h-5" />}
                  <PiSpinnerDuoStroke className="w-6 h-6 animate-spin" />
                </motion.div>
              ) : status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                >
                  <PiCheckTickCircleDuoSolid className="w-10 h-10 text-emerald-500" />
                </motion.div>
              ) : (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-500 text-xl font-bold"
                >
                  !
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Titre + description clairs */}
          <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
          {description && (
            <p className="mt-1.5 text-sm text-slate-400 leading-relaxed max-w-xs">
              {description}
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default StatusDialog;
