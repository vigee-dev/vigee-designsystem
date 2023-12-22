"use client";
import React from "react";
import Image, { StaticImageData } from "next/image";
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
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";

interface Props {
  logo: StaticImageData;
}

export default function ForgotPassword({ logo }: Props) {
  const router = useRouter();

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

  const email = form.watch("email");

  function onSubmit(data: FormValues) {
    toast({
      title: "un email de réinitialisation de mot de passe a été envoyé",
    });
    router.push("/login");
  }

  return (
    <>
      <div className="w-full max-w-xl space-y-6 align-center my-auto justify-start mx-auto py-40 md:px-8 md:p-24 md:py-4 min-h-screen md:min-h-fit md:max-w-[480px]">
        <Image
          width={100}
          height={100}
          className=" ml-4 md:ml-4 absolute md:relative top-12 md:top-0"
          src={logo}
          alt="Vigee - Make IT Simple"
        />
        <div className="flex flex-col justify-start mx-auto md:shadow-sm  md:border border-gray-100 rounded-xl px-4 md:p-8  md:bg-white">
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
                      <Input
                        placeholder="ex : test@email.com"
                        {...field}
                        className="text-[16px] md:text-sm"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Link
                href="/login"
                className="font-base hover:font-bold text-sm hover:text-primary flex gap-x-2 text-gray-400 transform hover:scale-105 transition duration-300 ease-in-out"
              >
                <ArrowLongLeftIcon width={20} />
                Retour à la connexion
              </Link>
              <div className="flex flex-col items-center ">
                <div className="absolute md:relative bottom-12 md:bottom-0 w-full px-4 md:px-0 items-center gap-2 ">
                  <Button
                    pending={form.formState.isSubmitting}
                    disabled={!email}
                    type="submit"
                    className="w-full h-12 text-md font-bold "
                  >
                    Réinitialiser mon mot de passe
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
