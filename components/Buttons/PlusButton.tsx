import Link from "next/link";
import { PiPlusSquareDuoStroke } from "../../icons/PikaIcons";
import { Tooltip } from "../Tooltip/Tooltip";

interface Props {
  href?: string;
  tooltip?: string;
}

export const PlusButton = ({ href, tooltip }: Props) => {
  return href ? (
    <Link href={href}>
      <Tooltip message={tooltip ?? "Ajouter"}>
        <PiPlusSquareDuoStroke className="w-10 h-10 mr-2 text-primary hover:cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-110" />
      </Tooltip>
    </Link>
  ) : (
    <Tooltip message={tooltip ?? "Ajouter"}>
      <PiPlusSquareDuoStroke className="w-10 h-10 mr-2 text-primary hover:cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-110" />
    </Tooltip>
  );
};
