import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { queryClient } from "~/root";
import { useAuthStore } from "~/stores/auth";
import { GET_CLASSROOM_KEYS } from "./useGetClassroom";
import { z } from "zod";
import { updateClassroomSchema } from "~/routes/dashboard/classroom/edit";

const updateClassroom = async ({
  classroomId,
  payload,
}: {
  classroomId: string;
  payload: z.infer<typeof updateClassroomSchema>;
}): Promise<boolean> => {
  const { token } = useAuthStore.getState();
  if (!token) throw new Error("Invalid token");
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/classrooms/${classroomId}`,
    {
      method: "PUT",
      body: JSON.stringify(payload),
      headers: {
        Authorization: `Bearer ${token.token}`,
        "Content-Type": "application/json",
      },
    }
  );
  if (res.status === 400) throw new Error(res.statusText);
  return res.ok;
};

export const UPDATE_CLASSROOM_KEYS = ["removeInviteStudent"];

export const useUpdateClassroom = () => {
  const { data, mutateAsync, isError, isPending, error } = useMutation({
    mutationKey: UPDATE_CLASSROOM_KEYS,
    mutationFn: updateClassroom,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: GET_CLASSROOM_KEYS });
    },
  });

  return { data, isError, isPending, mutateAsync, error };
};
