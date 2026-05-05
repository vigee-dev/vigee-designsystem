/**
 * @description Fond décoratif SVG en grille de points, positionné en absolute pour couvrir le conteneur parent.
 * @useWhen arrière-plan visuel d'une section hero ou splash screen → utiliser DotPattern | fond texturé pour une card ou un bloc mise en avant → utiliser DotPattern
 * @dontUseFor contenu interactif ou porteur de sens → utiliser un vrai composant | fond animé → utiliser GridPattern ou RetroGrid
 * @example <DotPattern className="opacity-50" width={20} height={20} cr={1.5} />
 */
import { useId } from "react";

import { cn } from "../lib/utils";

interface DotPatternProps {
  width?: any;
  height?: any;
  x?: any;
  y?: any;
  cx?: any;
  cy?: any;
  cr?: any;
  className?: string;
  [key: string]: any;
}
export function DotPattern({ width = 16, height = 16, x = 0, y = 0, cx = 1, cy = 1, cr = 1, className, ...props }: DotPatternProps) {
  const id = useId();

  return (
    <svg aria-hidden="true" className={cn("pointer-events-none absolute inset-0 h-full w-full fill-neutral-400/80", className)} {...props}>
      <defs>
        <pattern id={id} width={width} height={height} patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse" x={x} y={y}>
          <circle id="pattern-circle" cx={cx} cy={cy} r={cr} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
    </svg>
  );
}

export default DotPattern;
