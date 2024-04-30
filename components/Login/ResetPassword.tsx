import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useResetPassword } from "../../hooks/password/usePassword";

type ResetPasswordProps = {
  token: string;
};

export default function ResetPassword({ token }: ResetPasswordProps) {
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
    .refine(data => data.password === data.password_confirmation, {
      message: "Les mots de passe doivent correspondre.",
      path: ["password_confirmation"], // précisez le chemin de l'erreur
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const mutation = useResetPassword();

  const onSubmit = async (data: FormValues) => {
    try {
      await mutation.mutateAsync({ ...data, token });
      toast.success("Mot de passe réinitialisé avec succès !");
      reset();
    } catch (error) {
      toast.error(
        "Une erreur est survenue lors de la réinitialisation du mot de passe."
      );
    }
  };

  return (
    <div className="w-full max-w-sm space-y-6 align-center my-auto justify-center mx-auto">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="password" className="sr-only">
            Nouveau mot de passe
          </label>
          <input
            {...register("password")}
            id="password"
            type="password"
            required
            className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
            placeholder="Nouveau mot de passe"
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </div>

        <div>
          <label htmlFor="password_confirmation" className="sr-only">
            Confirmez le mot de passe
          </label>
          <input
            {...register("password_confirmation")}
            id="password_confirmation"
            type="password"
            required
            className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
            placeholder="Confirmez le mot de passe"
          />
          {errors.password_confirmation && (
            <span className="text-red-500">
              {errors.password_confirmation.message}
            </span>
          )}
        </div>

        <div>
          <button
            type="submit"
            disabled={mutation.isPending}
            className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Réinitialiser mon mot de passe
          </button>
        </div>
      </form>
    </div>
  );
}
