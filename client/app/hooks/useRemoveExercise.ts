import { useMutation } from "@tanstack/react-query";
import { queryClient } from "~/root";
import { useAuthStore } from "~/stores/auth";
import { Exercise } from "@/shared/types/Exercise";
import { GET_CLASSROOM_KEYS } from "./useGetClassroom";

type Params = {
  exerciseId: string;
  classroomId: string;
};

const deleteExercise = async ({
  exerciseId,
  classroomId,
}: Params): Promise<Exercise> => {
  const { token } = useAuthStore.getState();
  if (!token) throw new Error("Invalid token");
  const res = await fetch(
    `${
      import.meta.env.VITE_API_URL
    }/classrooms/${classroomId}/exercises/${exerciseId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    }
  );
  if (res.status === 400) throw new Error(res.statusText);
  return res.json();
};

export const DELETE_EXERCISE_KEYS = ["deleteExercise"];

export const useRemoveExercise = () => {
  return useMutation({
    mutationKey: DELETE_EXERCISE_KEYS,
    mutationFn: deleteExercise,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: GET_CLASSROOM_KEYS,
      });
    },
  });
};
