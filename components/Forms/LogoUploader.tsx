/**
 * @description Logo rond cliquable (entreprise, client) : aperçu immédiat du fichier choisi, icône à la place quand il n'y a pas de logo, lecture seule possible ; le fichier est rendu à l'appelant qui l'envoie.
 * @useWhen poser ou changer le logo d'un client, d'une organisation, d'un projet hors formulaire → passer `src` et `onPick` | logo absent → `placeholder` (ex. une mallette) | utilisateur sans droit d'écriture → `disabled` (rien ne s'affiche s'il n'y a pas de logo non plus)
 * @dontUseFor photo de profil d'un utilisateur dans un formulaire react-hook-form → utiliser Forms/ProfileImageUploader | petit logo dans une ligne de liste → utiliser Avatar/LogoMark | fichiers non-image → utiliser Forms/InputDropZone
 * @example <LogoUploader src={logoUrl} alt={client.name} placeholder={<PiBriefcaseJobDuoSolid className="h-7 w-7 text-slate-400" />} onPick={uploadLogo} data-testid="project-client-logo-input" />
 */
"use client";
import React, { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { PiPhotoImageDefaultDuoSolid, PiUploadUpContrast } from "../../icons/PikaIcons";
import { cn } from "../lib/utils";

interface LogoUploaderProps {
  /** Logo enregistré (URL affichable), ou rien. */
  src?: string | null;
  alt: string;
  /** Envoi du fichier choisi ; une promesse rejetée remet le logo d'avant. */
  onPick: (file: File) => void | Promise<void>;
  /** Ce qui s'affiche sans logo ; par défaut, une image. */
  placeholder?: React.ReactNode;
  disabled?: boolean;
  /** Types acceptés par le sélecteur ; pas de SVG par défaut. */
  accept?: string;
  className?: string;
  "data-testid"?: string;
}

export const LogoUploader = ({
  src,
  alt,
  onPick,
  placeholder,
  disabled = false,
  accept = "image/png,image/jpeg,image/webp,image/gif",
  className,
  "data-testid": testId = "logo-upload-input",
}: LogoUploaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  // Un nouveau logo enregistré remplace l'aperçu local.
  useEffect(() => setPreview(null), [src]);
  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);

  if (disabled && !src) return null;
  const shown = preview ?? src ?? null;

  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setSending(true);
    try {
      await onPick(file);
    } catch {
      setPreview(null);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className={cn("flex items-center", className)} title={disabled ? alt : `Changer le logo de ${alt}`}>
      <Avatar
        className={cn(
          "border shadow w-16 h-16 flex justify-center items-center bg-white",
          !disabled && "cursor-pointer",
          sending && "opacity-60",
        )}
        onClick={() => !disabled && !sending && inputRef.current?.click()}
      >
        {shown ? (
          <AvatarImage src={shown} alt={alt} className="object-contain p-1.5" />
        ) : (
          <AvatarFallback className="bg-white">
            {placeholder ?? <PiPhotoImageDefaultDuoSolid className="text-slate-400 w-full h-full" />}
          </AvatarFallback>
        )}
        {!disabled && (
          <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300">
            <PiUploadUpContrast className="text-white w-8 h-8" />
          </div>
        )}
      </Avatar>
      {!disabled && (
        <input
          type="file"
          accept={accept}
          className="hidden"
          ref={inputRef}
          onChange={onChange}
          data-testid={testId}
        />
      )}
    </div>
  );
};
