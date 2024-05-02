import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useResetPassword } from "../../hooks/password/usePassword";
import { useRouter } from "next/navigation";
import Image, { StaticImageData } from "next/image";
import {TypographyH1} from "../Typography/Typography";
import {Form} from "../ui/form";
import Input from "../Forms/Input";
import {Button} from "../Buttons/Button";

type ResetPasswordProps = {
  token: string;
  logo?: StaticImageData;
};

export default function ResetPassword({ token, logo }: ResetPasswordProps) {
  const router = useRouter();
  type FormValues = {
    password: string;
    password_confirmation: string;
  };

  const schema = z
      .object({
        password: z
            .string()
            .min(6, "Le mot de passe doit comporter au moins 6 caractères."),
        password_confirmation: z.string(),
      })
      .refine((data) => data.password === data.password_confirmation, {
        message: "Les mots de passe doivent correspondre.",
        path: ["password_confirmation"], // précisez le chemin de l'erreur
      });

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const mutation = useResetPassword();

  const onSubmit = async (data: FormValues) => {
    try {
      await mutation.mutateAsync({ ...data, token });
      toast.success("Mot de passe réinitialisé avec succès !");
      router.push("/login");
    } catch (error) {
      toast.error(
          "Une erreur est survenue lors de la réinitialisation du mot de passe.",
      );
    }
  };

  return (
      <>
        <div className="w-full max-w-xl space-y-6 align-center my-auto justify-start mx-auto py-40 md:px-8 md:p-24 md:py-4 min-h-screen md:min-h-fit md:max-w-[480px]">
          {logo && (
              <Image
                  width={100}
                  height={100}
                  className=" ml-4 md:ml-4 absolute md:relative top-12 md:top-0"
                  src={logo}
                  alt="Vigee - Make IT Simple"
              />
          )}
          <div className="flex flex-col justify-start mx-auto md:shadow-sm  md:border border-gray-100 rounded-xl px-4 md:p-8  md:bg-white">
            <div>
              <TypographyH1 className="text-primary pb-4">
                Réinitialiser mon mot de passe
              </TypographyH1>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <Input
                    form={form}
                    name="password"
                    type="password"
                    label="Nouveau mot de passe"
                />

                <Input
                    form={form}
                    name="password_confirmation"
                    type="password"
                    label="Confirmez le mot de passe"
                />

                <div>
                  <Button
                      type="submit"
                      pending={mutation.isPending}
                      className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    Réinitialiser mon mot de passe
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </>
  );
}
