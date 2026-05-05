/**
 * @description Slider avec affichage du titre, de la valeur courante en % et des bornes min/max, intégré au DS Vigee.
 * @useWhen sélection d'un pourcentage (ex: taux, avancement) → utiliser Slider | réglage d'une valeur numérique bornée avec feedback visuel immédiat → utiliser Slider
 * @dontUseFor saisie d'une valeur numérique précise → utiliser Input | sélection dans une plage de dates → utiliser DatePickerWithPresets
 * @example <Slider title="Avancement" value={[42]} min={0} max={100} step={1} defaultValue={[42]} />
 */
import { cn } from "../lib/utils";
import { Slider as ShadSlider } from "../ui/slider";
import { TypographyH2 } from "../Typography/Typography";

type SliderProps = React.ComponentProps<typeof ShadSlider>;

export function Slider({ className, ...props }: SliderProps) {
  return (
    <div className="flex flex-col  w-full">
      <div className="flex justify-between  gap-x-2 ">
        <p className="text-slate-400 text-md">{props.title}</p>
        <TypographyH2 className="text-primary font-bold ">
          {props.value}%
        </TypographyH2>
      </div>

      <div className="flex gap-x-2 w-full">
        <p className="text-slate-400">{props.min}</p>
        <ShadSlider
          defaultValue={props.defaultValue}
          max={props.max}
          step={props.step}
          className={cn("w-full text-slate-400 ", className)}
          {...props}
        />
        <p className="text-slate-400">{props.max}</p>
      </div>
    </div>
  );
}
