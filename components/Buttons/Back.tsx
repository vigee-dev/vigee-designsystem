import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

interface BackProps {
  href: string;
  where?: string;
}

const Back: React.FC<BackProps> = ({ href, where }) => {
  return (
    <div className="flex flex-grid text-gray-400 ">
      <Link
        href={href}
        className="flex flex-grid text-gray-400 pb-1 hover:text-primary transform ease-in-out duration-200 hover:font-bold"
      >
        <ArrowLeftIcon width={15} />
        <p className="mx-1 text-sm "> {where}</p>
      </Link>
    </div>
  );
};

export default Back;
