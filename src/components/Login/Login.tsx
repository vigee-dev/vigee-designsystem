"use client";
import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Copyright from "./Copyright";
import * as z from "zod";
import { Button } from "../Buttons/Button";
import { toast } from "../../components/ui/use-toast";
import { TypographyH1 } from "../Typography/Typography";
import { signIn } from "next-auth/react";
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
  logo: StaticImageData;
}

export default function Login({ logo }: Props) {
  const router = useRouter();

  type FormValues = {
    email: string;
    password: string;
  };

  // Schéma de validation zod
  const schema = z.object({
    email: z.string().email("L'adresse email est invalide."),
    password: z.string().min(8, {
      message: "Le mot de passe doit contenir au moins 8 caractères.",
    }),
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    console.log(data);
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (result?.error) {
      console.log(result.error);
      toast({ title: "Email ou mot de passe incorrect" });
    } else {
      toast({ title: "Bienvenue" });
      router.push("/");
    }
  };

  return (
    <>
      <div className="w-full max-w-xl space-y-6 align-center my-auto justify-start mx-auto py-40 md:px-8 md:p-24 md:py-4 min-h-screen md:min-h-fit md:max-w-[480px]">
        <Image
          width={100}
          height={100}
          className=" ml-8 md:ml-4 absolute md:relative top-12 md:top-0"
          src={logo}
          alt="Vigee - Make IT Simple"
        />
        <div className="flex flex-col justify-start mx-auto md:shadow-sm  md:border border-gray-100 rounded-xl px-4 md:p-8  md:bg-white">
          <div>
            <TypographyH1 className="text-primary py-2 pt-0">
              Connexion
            </TypographyH1>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
              id="form"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mot de passe</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} type="password" />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col items-center ">
                <Link
                  href="/forgot-password"
                  className="font-base hover:font-bold text-sm hover:text-primary flex gap-x-2 text-gray-00 transform hover:scale-105 transition duration-300 ease-in-out pb-2"
                >
                  Mot de passe oublié ?
                </Link>

                {/* <div className="flex md:hidden items-center py-2">
                  <Copyright />
                </div> */}

                <div className="absolute md:relative bottom-12 md:bottom-0 w-full px-4 md:px-0 items-center gap-2 ">
                  <Button
                    type="submit"
                    className="w-full h-12 text-md font-bold "
                  >
                    Connexion
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
        <div className="hidden absolute md:flex items-center py-2">
          <Copyright />
        </div>
      </div>
    </>
  );
}
