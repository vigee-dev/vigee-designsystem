import React from "react";
import Link from "next/link";
import VariableLogo from "../Logos/VariableLogo";
import Copyright from "./Copyright";
import { authenticate } from "@/app/lib/auth/signin";
import { useFormState, useFormStatus } from "react-dom";
import {
  ArrowRightIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/app/components/design-system/src/components/ui/button";
import { InputLabel } from "../../../../Forms/InputLabel";

type FormData = {
  email: string;
  password: string;
};

export default function Login() {
  const [code, action] = useFormState(authenticate, undefined);
  const { pending } = useFormStatus();

  function LoginButton() {
    const { pending } = useFormStatus();

    return (
      <Button type="submit" className="mt-4 w-full" aria-disabled={pending}>
        Connexion
      </Button>
    );
  }

  return (
    <>
      <div className="flex flex-col h-screen justify-center items-center md:p-24 md:py-4 min-h-screen md:min-h-fit">
        <div className="bg-white flex flex-col items-center">
          <div className="flex justify-center">
            <VariableLogo title="Vigee" big />
          </div>
          <form className="space-y-3" action={action}>
            <div className="flex flex-col pointer-events-none  inset-0 z-10 rounded-md gap-12 p-4 " />

            <InputLabel
              label="Email"
              name="email"
              type="email"
              placeholder="Email"
            />

            <InputLabel
              label="Mot de passe"
              name="password"
              type="password"
              placeholder="Mot de passe"
            />

            <div className="flex items-center justify-center">
              <Link
                href="/forgot-password"
                className="font-medium text-primary hover:text-secondary text-sm"
              >
                Mot de passe oublié ?
              </Link>
            </div>

            <LoginButton />

            {code === "CredentialSignin" && (
              <div className="flex h-8 items-end space-x-1">
                <>
                  <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                  <p aria-live="polite" className="text-sm text-red-500">
                    Identifiants incorrects
                  </p>
                </>
              </div>
            )}

            <p className="text-center text-sm leading-6 text-gray-500 ">
              Pas encore de compte ?{" "}
              <Link
                href="/sign-up"
                className="font-medium text-sm text-secondary hover:text-primary  transform ease-in-out duration-200"
              >
                {"Créez votre compte gratuitement"}
              </Link>
            </p>
          </form>
        </div>
        <Copyright />
      </div>
    </>
  );
}
