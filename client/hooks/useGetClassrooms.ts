import { useUserStore } from "stores/user";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "utils/apiClient";
import { Classroom } from "types/classroom";

export const GET_CLASSROOMS_KEYS = ["getClassrooms"];

function fetchClassrooms(token: string | null) {
  return apiClient.get<Classroom[]>({
    url: "classroom",
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function useGetClassrooms() {
  const user = useUserStore((store) => store.user);
  const result = useQuery<Classroom[], Error>({
    queryKey: GET_CLASSROOMS_KEYS,
    queryFn: () => fetchClassrooms(user.token),
  });
  return result;
}
