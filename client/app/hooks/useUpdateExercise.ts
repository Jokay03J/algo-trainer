import { Exercise } from "@/shared/types/Exercise";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "~/root";
import { useAuthStore } from "~/stores/auth";
import { GET_EXERCISE_KEYS } from "./useGetExercise";

const updateExercise = async ({
  classroomId,
  id,
  exercise,
}: {
  classroomId: string;
  id: string;
  exercise: Partial<Omit<Exercise, "language">>;
}): Promise<Exercise> => {
  const { token } = useAuthStore.getState();
  if (!token) throw new Error("Invalid token");
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/exercises/${classroomId}/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(exercise),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  if (res.status === 400) throw new Error(res.statusText);
  return await res.json();
};

export const UPDATE_EXERCISE_KEYS = ["getExercise"];

export const useUpdateExercise = (classroomId: string, id: string) => {
  return useMutation({
    mutationKey: UPDATE_EXERCISE_KEYS,
    mutationFn: (exercise: Partial<Omit<Exercise, "language">>) =>
      updateExercise({ classroomId, id, exercise }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: GET_EXERCISE_KEYS });
    },
  });
};
