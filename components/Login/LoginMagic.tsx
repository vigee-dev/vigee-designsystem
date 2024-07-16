"use client";
import Image, { StaticImageData } from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Copyright from "./Copyright";
import * as z from "zod";
import { Button } from "../Buttons/Button";
import { TypographyH1 } from "../Typography/Typography";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

interface Props {
  logo: StaticImageData;
  clientName?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost";
  callbackUrl?: string;
  noCopyright?: boolean;
  imageWidth?: number;
  imageHeight?: number;
  github?: boolean;
  google?: boolean;
  apple?: boolean;
  credentials?: boolean;
}

export default function Login({
  logo,
  clientName,
  variant,
  callbackUrl = "/",
  noCopyright = false,
  imageWidth = 90,
  imageHeight = 90,
  github = false,
  google = false,
  apple = false,
  credentials = false,
}: Props) {
  type FormValues = {
    email: string;
    password: string;
  };

  // Schéma de validation zod
  const schema = z.object({
    email: z.string().email("L'adresse email est invalide.").min(1, "L'adresse email est invalide."),
  });
  const schemaWithPassword = schema.extend({
    password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères.").max(32, "Le mot de passe doit contenir au plus 32 caractères."),
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(credentials ? schemaWithPassword : schema),
  });

  const onSubmitResend = async (data: FormValues) => {
    const response = await signIn("resend", {
      email: data.email,
      redirect: false,
      callbackUrl: callbackUrl || "/",
    });
    if (response?.error) {
      toast.error("Une erreur s'est produite lors de l'envoi du mail de vérification.");
      return false;
    }
    toast.success("Un email de vérification vous a été envoyé. Cliquez sur le lien pour vos connecter.");
    return true;
  };

  const onSubmitCredentials = async (data: FormValues) => {
    const response = await signIn("credentials", {
      email: data.email,
      password: data.password,
    });
    if (response) {
      if (response.ok) {
        toast.success("Vous êtes connecté.");
      } else {
        toast.error("Mot de passe ou identifiant incorrect");
      }
    } else {
      toast("Une erreur est survenue, veuillez réesayer ultérieurement.");
    }
  };

  const onSubmitGoogle = async () => {
    const response = await signIn("google", {
      redirect: false,
    });
    if (response?.error) {
      console.log("response", response);
      toast.error("Une erreur s'est produite lors de la connexion.");
      return false;
    }
    toast.success("Vous avez été connecté avec succès.");
    return true;
  };

  const onSubmitGithub = async () => {
    const response = await signIn("github", {
      redirect: false,
    });
    if (response?.error) {
      toast.error("Une erreur s'est produite lors de la connexion.");
      return false;
    }
    toast.success("Vous avez été connecté avec succès.");
    return true;
  };

  return (
    <>
      <div className="w-full max-w-xl space-y-6 align-center my-auto justify-start mx-auto py-40 md:px-8 md:p-24 md:py-4 min-h-screen md:min-h-fit md:max-w-[480px]">
        <Image width={imageWidth} height={imageHeight} className=" ml-4 md:ml-4 absolute md:relative top-12 md:top-0" src={logo} alt="Vigee - Make IT Simple" />
        <div className="flex flex-col justify-start mx-auto md:shadow-sm  md:border border-gray-100 rounded-xl px-4 md:p-8  md:bg-white dark:bg-slate-800">
          <div>
            <TypographyH1 className="text-primary py-2 pt-0">Connexion</TypographyH1>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(credentials ? onSubmitCredentials : onSubmitResend)} className="space-y-4 py-4" id="form">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">Email</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} className="text-[16px] md:text-sm bg-input text-black" />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              {credentials && (
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mot de passe</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="" {...field} className="text-[16px] md:text-sm bg-input text-black" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}

              <div className="flex  gap-4 w-full mx-auto">
                {github && <Button icon="github" onClick={onSubmitGithub} tooltip="Connexion avec GitHub" />}
                {google && <Button icon="google" onClick={onSubmitGoogle} tooltip="Connexion avec Google" />}
                {apple && <Button icon="apple" onClick={() => signIn("apple", { callbackUrl: "/app/dashboard" })} tooltip="Connexion avec Apple" />}
              </div>

              <div className="flex flex-col items-center ">
                <div className="absolute md:relative bottom-12 md:bottom-0 w-full px-4 md:px-0 items-center gap-2 ">
                  <Button pending={form.formState.isSubmitting} disabled={!form.formState.isValid} type="submit" variant={variant ? variant : "default"} className="w-full h-12 text-md font-bold">
                    Connexion
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>

        {!noCopyright && (
          <div className="hidden absolute md:flex items-center py-2">
            <Copyright clientName={clientName} />
          </div>
        )}
      </div>
    </>
  );
}
