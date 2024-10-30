import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "~/stores/auth";
import { Classroom } from "@/shared/types/Classroom";

const getClassrooms = async (): Promise<Classroom[]> => {
  const { token } = useAuthStore.getState();
  if (!token) throw new Error("Invalid token");
  const res = await fetch(`${import.meta.env.VITE_API_URL}/classrooms`, {
    headers: {
      Authorization: `Bearer ${token.token}`,
    },
  });
  if (res.status === 400) throw new Error(res.statusText);
  return await res.json();
};

export const GET_CLASSROOMS_KEYS = ["getClassrooms"];

export const useGetClassrooms = () => {
  return useQuery({ queryKey: GET_CLASSROOMS_KEYS, queryFn: getClassrooms });
};
