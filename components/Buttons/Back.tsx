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

const Back: React.FC<BackProps> = ({
  href,
  where,
  onClick,
  linkBtn = false,
  className,
}) => {
  return (
      <div className={cn("flex flex-grid text-gray-400 ", className)}>
        {href ? (
            <Link
                href={href}
                className="flex flex-grid text-gray-400 pb-1 hover:text-primary transform ease-in-out duration-200 hover:font-bold"
            >
              <ArrowLeftIcon width={15} />
              <p className="mx-1 text-sm "> {where}</p>
            </Link>
        ) : !linkBtn ? (
            <Button
                variant="ghost"
                onClick={onClick}
                className="flex flex-grid text-gray-400 pb-1 hover:text-primary transform ease-in-out duration-200 hover:font-bold border-0"
            >
              <ArrowLeftIcon width={15} />
              <p className="mx-1 text-sm "> {where}</p>
            </Button>
        ) : (
            <Button
                variant="ghost"
                onClick={onClick}
                className="flex flex-grid text-gray-400 pb-1 hover:text-primary transform ease-in-out duration-200 hover:font-bold font-normal gap-0 hover:bg-transparent"
            >
              <ArrowLeftIcon width={15} />
              <p className="mx-1 text-sm "> {where}</p>
            </Button>
        )}
      </div>
  );
};

export default Back;
