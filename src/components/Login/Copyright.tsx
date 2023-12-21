import React from "react";
import Link from "next/link";

interface Props {
  clientName?: string;
}

const Copyright = ({ clientName = "Vigee" }: Props) => {
  return (
    <div className="absolute bottom-1 justify-center mx-auto max-w-sm text-center mb-2">
      <p className="text-sm text-gray-500  md:block p-0 md:p-5 bottom-1 left-0 pt-16 mt-4">
        Copyright &copy; {new Date().getFullYear()}{" "}
        {`${clientName}. Tous droits réservés. Developed by `}{" "}
        <Link href="https://www.vigee.fr" className="text-black font-bold">
          Vigee
        </Link>
      </p>
    </div>
  );
};

export default Copyright;
