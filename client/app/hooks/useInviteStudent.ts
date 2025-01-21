import { useMutation } from "@tanstack/react-query";
import { queryClient } from "~/root";
import { useAuthStore } from "~/stores/auth";
import { GET_CLASSROOM_KEYS } from "./useGetClassroom";

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
    `${import.meta.env.VITE_API_URL}/classrooms/${classroomId}/join`,
    {
      method: "POST",
      body: JSON.stringify({
        email,
      }),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  if (res.status === 400) throw new Error(res.statusText);
  return res.ok;
};

export const INVITE_STUDENT_KEYS = ["invite_student"];

export const useInviteStudent = () => {
  return useMutation({
    mutationKey: INVITE_STUDENT_KEYS,
    mutationFn: inviteStudent,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: GET_CLASSROOM_KEYS });
    },
  });
};
