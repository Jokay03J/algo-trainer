import { userAtom } from "atoms/user";
import { useAtomValue } from "jotai";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "utils/apiClient";
import { Classroom } from "types/classroom";

const GET_CLASSROOMS_KEYS = ["getClassrooms"];

function fetchClassrooms(token: string | null) {
  return apiClient.get({
    url: "classroom",
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function useGetClassrooms() {
  const user = useAtomValue(userAtom);
  const result = useQuery<Classroom[], Error>({
    queryKey: GET_CLASSROOMS_KEYS,
    queryFn: () => fetchClassrooms(user.token),
  });
  return result;
}
