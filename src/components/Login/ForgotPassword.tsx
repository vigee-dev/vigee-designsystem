"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLongLeftIcon } from "@heroicons/react/24/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Copyright from "./Copyright";
import * as z from "zod";
import { Button } from "../Buttons/Button";
import { toast } from "../../components/ui/use-toast";
import { TypographyH1 } from "../Typography/Typography";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";

interface Props {
  logo: string;
}

export default function ForgotPassword({ logo }: Props) {
  type FormValues = {
    email: string;
  };

  // Schéma de validation zod
  const schema = z.object({
    email: z.string().email("L'adresse email est invalide."),
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  function onSubmit(data: FormValues) {
    toast({
      title: "un email de réinitialisation de mot de passe a été envoyé",
    });
  }

  return (
    <>
      <div className="w-full max-w-xl space-y-6 align-center my-auto justify-start mx-auto py-40 px-8 md:p-24 md:py-4 min-h-screen md:min-h-fit ">
        <Image
          width={100}
          height={100}
          className=" mx-auto"
          src={logo}
          alt="Fic Expertise by Vigee"
        />
        <div className="flex flex-col justify-start mx-auto shadow-sm border border-gray-100 rounded-xl p-8 bg-white ">
          <div>
            <TypographyH1 className="text-primary pb-4">
              Réinitialiser mon mot de passe
            </TypographyH1>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="ex : test@email.com" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Réinitialiser mon mot de passe</Button>
            </form>
          </Form>

          <div className="flex items-center pt-2">
            <Link
              href="/login"
              className="font-base hover:font-bold text-sm hover:text-primary flex gap-x-2 text-gray-400 transform hover:scale-105 transition duration-300 ease-in-out"
            >
              <ArrowLongLeftIcon width={20} />
              Retour à la connexion
            </Link>
          </div>
        </div>
        <Copyright />
      </div>
    </>
  );
}
