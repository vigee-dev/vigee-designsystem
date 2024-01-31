import Link from "next/link";
import {
  PiPlusCircleSolid,
  PiPlusSquareDuoStroke,
} from "../../icons/PikaIcons";

interface Props {
  href: string;
}

export const PlusButton = ({ href }: Props) => {
  return href ? (
    <Link href={href}>
      <PiPlusSquareDuoStroke className="w-10 h-10 mr-2 text-primary hover:cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-110" />
    </Link>
  ) : (
    <PiPlusSquareDuoStroke className="w-10 h-10 mr-2 text-primary hover:cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-110" />
  );
};
