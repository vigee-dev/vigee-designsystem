"use client";
import { signIn, useSession } from "next-auth/react";
import React from "react";
import { Button } from "./Button";
import { useRouter } from "next/navigation";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Tooltip } from "../Tooltip/Tooltip";

const SignInButton = ({ link = "/admin/dashboard" }: { link: string }) => {
  const router = useRouter();

  return (
    <div>
      <Link href={link} className="mx-auto justify-center">
        <Tooltip message="Espace client">
          <UserCircleIcon className="text-primaryLight hover:text-primary h-6 w-6" />
        </Tooltip>
      </Link>
    </div>
  );
};

export default SignInButton;
