import {
  Avatar as ShadcnAvatar,
  AvatarFallback,
  AvatarImage,
} from "../ui/avatar";
import { PiUserCircleDuoSolid } from "../../icons/PikaIcons";
import { cn } from "../lib/utils";

interface Props {
  /** Direct image URL (signed S3 URL or external URL) */
  src?: string | null;
  /** User ID — uses proxy /api/user/avatar/[userId] to avoid expired signed URLs */
  userId?: string | null;
  alt?: string;
  onClick?: () => void;
  className?: string;
}

const Avatar = ({ src, userId, alt, onClick, className }: Props) => {
  const imageSrc = userId ? `/api/user/avatar/${userId}` : src;

  return (
    <ShadcnAvatar
      className={cn(
        "border shadow w-16 h-16 flex justify-center items-center",
        className
      )}
      onClick={onClick}
    >
      {imageSrc && (
        <AvatarImage
          src={imageSrc}
          alt={alt || "Photo de profil"}
          className="object-cover"
        />
      )}
      <AvatarFallback>
        <PiUserCircleDuoSolid
          className={cn("text-slate-400 w-full h-full", className)}
        />
      </AvatarFallback>
    </ShadcnAvatar>
  );
};

export default Avatar;
