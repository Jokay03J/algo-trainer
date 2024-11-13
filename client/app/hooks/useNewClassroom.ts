import { useMutation } from "@tanstack/react-query";
import { queryClient } from "~/root";
import { useAuthStore } from "~/stores/auth";
import { GET_CLASSROOMS_KEYS } from "./useGetClassrooms";
import { Classroom } from "@/shared/types/Classroom";

const createClassroom = async ({
  name,
}: {
  name: string;
}): Promise<Classroom> => {
  const { token } = useAuthStore.getState();
  if (!token) throw new Error("Invalid token");
  const res = await fetch(`${import.meta.env.VITE_API_URL}/classrooms`, {
    method: "POST",
    body: JSON.stringify({
      name,
    }),
    headers: {
      Authorization: `Bearer ${token.token}`,
      "Content-Type": "application/json",
    },
  });
  if (res.status === 400) throw new Error(res.statusText);
  return res.json();
};

export const NEW_CLASSROOM_KEYS = ["new_classroom"];

export const useNewClassroom = () => {
  return useMutation({
    mutationKey: NEW_CLASSROOM_KEYS,
    mutationFn: createClassroom,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: GET_CLASSROOMS_KEYS,
      });
    },
  });
};
