"use client";
import React from "react";

interface Props {
  icon?: React.ReactNode;
}

export const IconButton = ({ icon }: Props) => {
  return (
    <div className="flex items-center justify-center  rounded-full  w-8 h-8 text-gray-400 hover:cursor-pointer hover:text-primary transform ease-in-out duration-200">
      {icon}
    </div>
  );
};
