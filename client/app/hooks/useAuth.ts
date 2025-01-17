import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { loginSchema } from "~/routes/auth/login";
import { User } from "~/stores/auth";

type AuthReponse = {
  access_token: string;
  user: User;
};

const auth = async (
  params: z.infer<typeof loginSchema>
): Promise<AuthReponse> => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify(params),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
};

export const useAuth = () => useMutation({ mutationFn: auth });
