import { useMutation } from "@tanstack/react-query";
import { apiClient } from "utils/apiClient";

interface Login {
  email: string;
  password: string;
}

type AuthLoginResponse = {
  id: string;
  token: string;
  type: "teacher" | "student";
};

const login = ({ ...params }: Login) => {
  return apiClient.post<AuthLoginResponse>({
    url: "login",
    body: { ...params },
  });
};

/**
 * An hook for login user, return loading, error states and login function.
 */
export function useLogin() {
  return useMutation({ mutationFn: login });
}
