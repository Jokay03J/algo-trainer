import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { queryClient } from "~/root";
import { useAuthStore } from "~/stores/auth";
import { GET_CLASSROOM_KEYS } from "./useGetClassroom";

const removeInviteStudent = async ({
  classroomId,
  studentId,
}: {
  classroomId: string;
  studentId: string;
}): Promise<boolean> => {
  const { token } = useAuthStore.getState();
  if (!token) throw new Error("Invalid token");
  const res = await fetch(
    `${
      import.meta.env.VITE_API_URL
    }/classrooms/${classroomId}/invite/${studentId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token.token}`,
        "Content-Type": "application/json",
      },
    }
  );
  if (res.status === 400) throw new Error(res.statusText);
  return res.ok;
};

export const REMOVE_INVITE_STUDENT_KEYS = ["remove_invite_student"];

export const useRemoveInviteStudent = () => {
  const { data, mutateAsync, isError, isPending, error } = useMutation({
    mutationKey: REMOVE_INVITE_STUDENT_KEYS,
    mutationFn: removeInviteStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: GET_CLASSROOM_KEYS });
    },
  });

  return { data, isError, isPending, mutateAsync, error };
};
