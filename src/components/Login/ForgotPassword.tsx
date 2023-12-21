"use client";
import React from "react";
import Image from "next/image";
import logo from "@/img/logos/logo.png";
import Link from "next/link";
import { ArrowLongLeftIcon } from "@heroicons/react/24/solid";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSendResetEmail } from "@/app/api/password/usePassword";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Copyright from "../../../../Vigee/Copyright/Copyright";

export default function ForgotPassword() {
  type FormValues = {
    email: string;
  };

  // Schéma de validation zod
  const schema = z.object({
    email: z.string().email("L'adresse email est invalide."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const mutation = useSendResetEmail();

  const onSubmit = async (data: FormValues) => {
    try {
      await mutation.mutateAsync(data.email);
      toast.success(
        "Un email de réinitialisation de mot de passe vous a été envoyé."
      );
      reset();
    } catch (error) {
      toast.error("Aucun compte n'est associé à cette adresse email.");
    }
  };

  return (
    <>
      <div className="w-full max-w-xl space-y-6 align-center my-auto justify-center mx-auto py-40 px-8 md:p-24 md:py-4 min-h-screen md:min-h-fit">
        <div>
          <Image
            width={400}
            height={400}
            className="mx-auto h-10 w-auto"
            src={logo}
            alt="Vigee Web"
          />
        </div>
        <div className="flex items-center ">
          <Link
            href="/login"
            className="font-semibold text-sm hover:text-secondary flex gap-x-2"
          >
            <ArrowLongLeftIcon width={20} />
            Retour à la connexion
          </Link>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="email-address" className="sr-only">
              Entrez votre email
            </label>

            <input
              {...register("email")}
              id="email-address"
              type="text"
              autoComplete="email"
              required
              className="relative block w-full text-black border-none  rounded-md shadow-sm text-sm"
              placeholder="Entrez votre email"
            />

            {errors.email && errors.email.message && (
              <span className="text-red-500">
                {errors.email?.message as string}
              </span>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={mutation.isLoading}
              className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary mb-4"
            >
              Réinitialiser mon mot de passe
            </button>
          </div>
        </form>

        <p className="text-center leading-6 text-gray-500 ">
          Pas encore de compte ?{" "}
          <Link
            href="/sign-up"
            className="font-semibold text-primary hover:text-secondary"
          >
            {"Créez votre compte gratuitement"}
          </Link>
        </p>
      </div>
      <Copyright />
    </>
  );
}
