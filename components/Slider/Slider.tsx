import { cn } from "@/lib/utils";
import { Slider as ShadSlider } from "../../components/ui/slider";
import { TypographyH2 } from "../Typography/Typography";

type SliderProps = React.ComponentProps<typeof ShadSlider>;

export function Slider({ className, ...props }: SliderProps) {
  return (
    <div className="flex flex-col items-center">
      <TypographyH2 className="text-primary-light">{props.title}</TypographyH2>
      <ShadSlider
        defaultValue={props.defaultValue}
        max={props.max}
        step={props.step}
        className={cn("w-[60%]", className)}
        {...props}
      />
    </div>
  );
}
