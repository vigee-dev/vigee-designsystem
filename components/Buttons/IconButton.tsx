"use client";
import React from "react";
import { Button } from "../ui/button";

interface Props {
  icon?: React.ReactNode;
}

export const IconButton = ({ icon }: Props) => {
  return (
    <Button className="flex bg-transparent items-center justify-center  rounded-full  w-8 h-8 text-gray-400 hover:cursor-pointer hover:text-primary transform ease-in-out duration-200">
      {icon}
    </Button>
  );
};
