"use client";
import React, { useState } from "react";

interface Props {
  icon?: React.ReactNode;
  iconHover?: React.ReactNode;
}

export const IconButton = ({ icon, iconHover }: Props) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="flex items-center justify-center w-8 h-8  text-gray-400 hover:text-primary cursor-pointer transform ease-in-out duration-200"
    >
      {isHover ? iconHover : icon}
    </div>
  );
};
