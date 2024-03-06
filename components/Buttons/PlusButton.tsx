import Link from "next/link";
import { PiPlusSquareDuoStroke } from "../../icons/PikaIcons";
import { Tooltip } from "../Tooltip/Tooltip";

interface Props {
  href?: string;
  tooltip?: string;
  onClick?: () => void;
}

export const PlusButton = ({ href, onClick, tooltip }: Props) => {
  return href ? (
    <Tooltip message={tooltip ?? "Ajouter"}>
      <Link href={href}>
        <PiPlusSquareDuoStroke className="w-10 h-10 mr-2 text-primary hover:cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-110" />
      </Link>
    </Tooltip>
  ) : onClick ? (
    <div onClick={onClick}>
      <Tooltip message={tooltip ?? "Ajouter"}>
        <PiPlusSquareDuoStroke className="w-10 h-10 mr-2 text-primary hover:cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-110" />
      </Tooltip>
    </div>
  ) : (
    <Tooltip message={tooltip ?? "Ajouter"}>
      <PiPlusSquareDuoStroke className="w-10 h-10 mr-2 text-primary hover:cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-110" />
    </Tooltip>
  );
};
