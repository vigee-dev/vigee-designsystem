import React from "react";

interface Props {
  children: React.ReactNode;
}

export function Container({ children }: Props) {
  return (
    <div className="bg-black flex border rounded-md shadow-sm p-8 max-w-7xl justify-center mx-auto my-4">
      {children}
    </div>
  );
}
