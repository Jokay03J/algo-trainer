import { apiClient } from "utils/apiClient";
import { useMutation } from "@tanstack/react-query";

type RegisterStudentBody = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type RegisterStudentResponse = {
  id: string;
  token: string;
  type: "teacher" | "student";
};

const register = ({
  email,
  firstName,
  lastName,
  password,
}: RegisterStudentBody) => {
  return apiClient.post<RegisterStudentResponse>({
    url: "registerStudent",
    body: { first_name: firstName, last_name: lastName, email, password },
  });
};

/**
 * An hook for register a teacher, return loading, error states and register function.
 */
export function useRegisterStudent() {
  return useMutation({ mutationFn: register });
}
