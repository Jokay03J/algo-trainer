import { useNavigate } from "@remix-run/react";
import { userAtom } from "stores/user";
import { useAtom } from "jotai";
import { useState } from "react";
import { apiClient } from "utils/apiClient";
import { useMutation } from "@tanstack/react-query";

type RegisterTeacherBody = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  code: string;
};

type RegisterTeacherResponse = {
  id: string;
  token: string;
  type: "teacher";
};

const register = ({
  email,
  firstName,
  lastName,
  password,
  code,
}: RegisterTeacherBody) => {
  return apiClient.post<RegisterTeacherResponse>({
    url: "registerTeacher",
    body: { first_name: firstName, last_name: lastName, email, password, code },
  });
};

/**
 * An hook for register a teacher, return loading, error states and register function.
 */
export function useRegisterTeacher() {
  return useMutation({ mutationFn: register });
}
