/**
 * @description Défilement infini en boucle d'éléments enfants, horizontalement ou verticalement, avec pause optionnelle au survol.
 * @useWhen afficher un bandeau de logos partenaires en défilement continu | présenter des témoignages/cards en boucle sur une landing page | créer un ticker de contenu animé horizontal ou vertical
 * @dontUseFor navigation entre contenus → utiliser TabsResponsive | listes statiques sans animation → utiliser Container
 * @example <Marquee pauseOnHover repeat={3}><Card /><Card /><Card /></Marquee>
 */
import { cn } from "../lib/utils";

interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
  [key: string]: any;
}

export default function Marquee({ className, reverse, pauseOnHover = false, children, vertical = false, repeat = 4, ...props }: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className
      )}>
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn("flex shrink-0 justify-around [gap:var(--gap)]", {
              "animate-marquee flex-row": !vertical,
              "animate-marquee-vertical flex-col": vertical,
              "group-hover:[animation-play-state:paused]": pauseOnHover,
              "[animation-direction:reverse]": reverse,
            })}>
            {children}
          </div>
        ))}
    </div>
  );
}
