import { Exercise } from "@/shared/types/Exercise";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "~/stores/auth";

const getExercise = async ({
  classroomId,
  id,
}: {
  classroomId: string;
  id: string;
}): Promise<Exercise> => {
  const { token } = useAuthStore.getState();
  if (!token) throw new Error("Invalid token");
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/classrooms/${classroomId}/exercises/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    }
  );
  if (res.status === 400) throw new Error(res.statusText);
  return await res.json();
};

export const GET_EXERCISE_KEYS = ["getExercise"];

export const useGetExercise = (classroomId: string, id: string) => {
  return useQuery({
    queryKey: GET_EXERCISE_KEYS,
    queryFn: () => getExercise({ classroomId, id }),
  });
};
