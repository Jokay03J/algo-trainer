import { useNavigate } from "@remix-run/react";
import { userAtom } from "atoms/user";
import { useAtom } from "jotai";
import { useState } from "react";

export function useLogin() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [user, setUser] = useAtom(userAtom);
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        Accept: "application/json",
      },
    });
    const data = await res.json();
    setIsLoading(false);
    // Handle error
    if (!res.ok) {
      setError(new Error(data.message));
      return;
    }
    setUser({ ...user, token: data.token });
    navigate("/");
  };

  return { isLoading, error, login };
}
