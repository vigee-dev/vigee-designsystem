"use client";
import React, { useState, ReactElement } from "react";
interface IconProps {
  className?: string;
}

interface Props {
  icon?: ReactElement<IconProps>;
  iconHover?: ReactElement<IconProps>;
}

export const IconButton = ({ icon, iconHover }: Props) => {
  const iconClasses = "w-8 h-8 text-gray-400 ";
  const iconHoverClasses =
    " w-8 h-8 text-primary cursor-pointer cursor-pointer transform ease-in-out duration-200";

  return (
    <div className="flex items-center justify-center  rounded-full  w-8 h-8 text-gray-400 hover:cursor-pointer hover:text-primary transform ease-in-out duration-200">
      {icon}
    </div>
  );
};
