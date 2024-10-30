import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "~/stores/auth";
import { Classroom } from "@/shared/types/Classroom";

const getClassroom = async (classroomId: string): Promise<Classroom> => {
  const { token } = useAuthStore.getState();
  if (!token) throw new Error("Invalid token");
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/classrooms/${classroomId}`,
    {
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    }
  );
  if (res.status === 400) throw new Error(res.statusText);
  return await res.json();
};

export const GET_CLASSROOM_KEYS = ["getClassroom"];

export const useGetClassroom = (classroomId: string) => {
  return useQuery({
    queryKey: GET_CLASSROOM_KEYS,
    queryFn: () => getClassroom(classroomId),
  });
};
