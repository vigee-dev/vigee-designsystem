import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { z } from "zod";

const ResetPasswordSchema = z.object({
  token: z.string(),
  password: z.string(),
  password_confirmation: z.string(),
});
type ResetPasswordData = z.infer<typeof ResetPasswordSchema>;

export const useSendResetEmail = (): UseMutationResult<
  string,
  Error,
  string,
  unknown
> => {
  return useMutation<string, Error, string>({
    mutationFn: async (email: string) => {
      // Assurez-vous d'utiliser la clé mutationFn ici
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}password/forgot`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return await response.json();
    },
  });
};

export const useCheckTokenValidity = () => {
  return useMutation<boolean, Error, string>({
    mutationFn: async (token: string) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}password/check-token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        }
      );

      if (!response.ok) {
        throw new Error("Token is invalid or expired");
      }

      return await response.json(); // Assurez-vous que le retour de cette API correspond au type attendu ici
    },
  });
};

export const useResetPassword = () => {
  return useMutation<any, Error, ResetPasswordData>({
    mutationFn: async (data: ResetPasswordData) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}password/reset`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return await response.json();
    },
  });
};
