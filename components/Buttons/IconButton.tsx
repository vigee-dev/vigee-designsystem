"use client";
import { useState } from "react";

interface Props {
  icon?: string;
  iconHover?: string;
}

export const IconButton = ({ icon, iconHover }: Props) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="flex items-center justify-center w-8 h-8 p-2 rounded-full bg-gray-100 hover:bg-primary cursor-pointer trasnform ease-in-out duration-200"
    >
      {isHover ? iconHover : icon}
    </div>
  );
};
