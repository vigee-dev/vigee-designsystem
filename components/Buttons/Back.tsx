import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Button } from "./Button";
import { cn } from "../lib/utils";

interface BackProps {
  href?: string;
  where?: string;
  onClick?: () => void;
  linkBtn?: boolean;
  className?: string;
}

const Back: React.FC<BackProps> = ({ href, where, onClick, linkBtn = false, className }) => {
  return (
    <>
      <div className={cn(" flex-grid text-gray-400 hidden md:flex", className)}>
        {href ? (
          <Link href={href} className="flex flex-grid text-gray-400 pb-1 hover:text-primary transform ease-in-out duration-200 hover:font-bold">
            <ArrowLeftIcon width={15} />
            <p className="mx-1 text-sm "> {where}</p>
          </Link>
        ) : !linkBtn ? (
          <Button variant="ghost" onClick={onClick} className="flex flex-grid text-gray-400 pb-1 hover:text-primary transform ease-in-out duration-200 hover:font-bold border-0">
            <ArrowLeftIcon width={15} />
            <p className="mx-1 text-sm "> {where}</p>
          </Button>
        ) : (
          <Button
            variant="ghost"
            onClick={onClick}
            className="flex flex-grid text-gray-400 pb-1 hover:text-primary transform ease-in-out duration-200 hover:font-bold font-normal gap-0 hover:bg-transparent">
            <ArrowLeftIcon width={15} />
            <p className="mx-1 text-sm "> {where}</p>
          </Button>
        )}
      </div>

      <Button
        icon="chevronLeft"
        href={href}
        classNameIcon="bg-zinc-900 text-zinc-50 h-12 w-12 rounded-full bg-zinc-900 p-2 shrink-0 hover:text-zinc-900 hover:bg-zinc-50 z-50"
        className="md:hidden fixed bottom-12 left-0"
      />
    </>
  );
};

export default Back;
