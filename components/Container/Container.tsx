import React from "react";

interface Props {
  children: React.ReactNode;
}

export function Container({ children }: Props) {
  return (
    <div className="bg-white flex flex-col border rounded-md shadow-sm  justify-center  my-4 w-full">
      {children}
    </div>
  );
}
