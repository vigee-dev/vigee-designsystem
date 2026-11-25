/**
 * @description Petit logo sans bord ni arrondi, invisible tant qu'il n'est pas chargé et retiré s'il n'existe pas ; `useLogoMark` dit à l'appelant s'il remplace un libellé (nom du client, du projet).
 * @useWhen logo d'un client au début d'une ligne ou d'une carte, à la place de son nom → `const logo = useLogoMark(enabled)` puis `<LogoMark logo={logo} … />` et cacher le nom quand `logo.replacesLabel` | logo servi par une route qui répond 404 quand il n'y en a pas → rien ne s'affiche, le nom revient
 * @dontUseFor poser ou changer un logo → utiliser Forms/LogoUploader | photo d'un utilisateur → utiliser Avatar/Avatar
 * @example const logo = useLogoMark(isTeam); <LogoMark src={`/api/clients/${id}/logo`} alt={name} logo={logo} data-testid={`tickets-client-logo-${id}`} />{!logo.replacesLabel && name}
 */
"use client";
import { useState } from "react";
import { cn } from "../lib/utils";

type LogoState = "loading" | "shown" | "absent";

/** État d'un LogoMark ; `enabled` à faux le retire (page où il n'a pas sa place). */
export function useLogoMark(enabled = true) {
  const [state, setState] = useState<LogoState>("loading");
  const effective: LogoState = enabled ? state : "absent";
  return {
    state: effective,
    /** Le libellé se cache : le logo est là, ou en train d'arriver. */
    replacesLabel: effective !== "absent",
    onLoad: () => setState("shown"),
    onError: () => setState("absent"),
  };
}

interface LogoMarkProps {
  src: string;
  alt: string;
  logo: ReturnType<typeof useLogoMark>;
  className?: string;
  "data-testid"?: string;
}

export function LogoMark({ src, alt, logo, className, "data-testid": testId }: LogoMarkProps) {
  if (logo.state === "absent") return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element -- petit logo déjà réduit par la route qui le sert
    <img
      src={src}
      alt={alt}
      title={alt}
      data-testid={testId}
      className={logo.state === "shown" ? cn("h-5 w-5 shrink-0 self-center object-contain", className) : "hidden"}
      onLoad={logo.onLoad}
      onError={logo.onError}
    />
  );
}
