import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { queryClient } from "~/root";
import { Token, useAuthStore, User } from "~/stores/auth";
import { GET_CLASSROOM_KEYS } from "./useGetClassroom";

type Response = {
  user: User;
  token: Token;
};

const inviteStudent = async ({
  classroomId,
  email,
}: {
  classroomId: string;
  email: string;
}): Promise<boolean> => {
  const { token } = useAuthStore.getState();
  if (!token) throw new Error("Invalid token");
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/classrooms/${classroomId}/invite`,
    {
      method: "POST",
      body: JSON.stringify({
        email,
      }),
      headers: {
        Authorization: `Bearer ${token.token}`,
        "Content-Type": "application/json",
      },
    }
  );
  if (res.status === 400) throw new Error(res.statusText);
  return res.ok;
};

export const INVITE_STUDENT_KEYS = ["invite_student"];

export const useInviteStudent = () => {
  const [params] = useSearchParams();
  const { data, mutateAsync, isError, isPending, error } = useMutation({
    mutationKey: INVITE_STUDENT_KEYS,
    mutationFn: inviteStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: GET_CLASSROOM_KEYS });
    },
  });

  return { data, isError, isPending, mutateAsync, error };
};
