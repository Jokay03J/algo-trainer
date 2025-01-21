import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { registerSchema } from "~/routes/auth/register";
import { User } from "~/stores/auth";

type AuthResponse = {
  access_token: string;
  user: User;
};

const auth = async (
  params: z.infer<typeof registerSchema>
): Promise<AuthResponse> => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
    method: "POST",
    body: JSON.stringify(params),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
};

export const useRegister = () => useMutation({ mutationFn: auth });
