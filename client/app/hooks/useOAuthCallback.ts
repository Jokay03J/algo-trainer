import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Token, useAuthStore, User } from "~/stores/auth";

type Response = {
  user: User;
  token: Token;
};

const getOAuthCallback = async (params: any): Promise<Response> => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/auth/${params.provider}/callback?code=${
      params.code
    }&state=${params.state}`
  );
  if (res.status === 400) throw new Error(res.statusText);
  return await res.json();
};

export const OAUTH_CALLBACK_KEYS = ["oauth_callback"];

export const useOAuthCallback = (provider: string) => {
  const [params] = useSearchParams();
  const { setToken, setUser } = useAuthStore();
  const navigate = useNavigate();
  const { data, mutateAsync, isError, isPending } = useMutation({
    mutationKey: OAUTH_CALLBACK_KEYS,
    mutationFn: getOAuthCallback,
    retry: false,
  });

  useEffect(() => {
    const fetchRes = async () => {
      const { token, user } = await mutateAsync({
        code: params.get("code"),
        state: params.get("state"),
        provider,
      });
      setToken(token);
      setUser(user);
      navigate("/");
    };
    fetchRes();
  }, []);

  return { data, isError, isPending };
};
