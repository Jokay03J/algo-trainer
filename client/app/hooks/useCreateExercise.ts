import { useMutation } from "@tanstack/react-query";
import { queryClient } from "~/root";
import { useAuthStore } from "~/stores/auth";
import { Exercise } from "@/shared/types/Exercise";
import { GET_CLASSROOM_KEYS } from "./useGetClassroom";

type Params = {
  exercise: Omit<Exercise, "id">;
  classroomId: string;
};

const createExercise = async ({
  exercise,
  classroomId,
}: Params): Promise<Exercise> => {
  const { token } = useAuthStore.getState();
  if (!token) throw new Error("Invalid token");
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/classrooms/${classroomId}/exercises`,
    {
      method: "POST",
      body: JSON.stringify({ ...exercise }),
      headers: {
        Authorization: `Bearer ${token.token}`,
        "Content-Type": "application/json",
      },
    }
  );
  if (res.status === 400) throw new Error(res.statusText);
  return res.json();
};

export const NEW_EXERCISE_KEYS = ["newExercise"];

export const useCreateExercise = () => {
  return useMutation({
    mutationKey: NEW_EXERCISE_KEYS,
    mutationFn: createExercise,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: GET_CLASSROOM_KEYS,
      });
    },
  });
};
