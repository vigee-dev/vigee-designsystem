import {
  Avatar as ShadcnAvatar,
  AvatarFallback,
  AvatarImage,
} from "../ui/avatar";
import { PiUserCircleDuoSolid } from "../../icons/PikaIcons";
import React from "react";
import { cn } from "../lib/utils";

interface Props {
  src?: string | null;
  alt?: string;
  onClick?: () => void;
  className?: string;
}

const Avatar = ({ src, alt, onClick, className }: Props) => {
  return (
    <ShadcnAvatar
      className={cn(
        "border shadow w-16 h-16 flex justify-center items-center",
        className
      )}
      onClick={onClick}
    >
      {src != null ? (
        <AvatarImage
          src={src}
          alt={alt || "Photo de profil"}
          className="object-cover"
        />
      ) : (
        <AvatarFallback>
          <PiUserCircleDuoSolid
            className={cn("text-gray-400 w-full h-full", className)}
          />
        </AvatarFallback>
      )}
    </ShadcnAvatar>
  );
};

export default Avatar;
