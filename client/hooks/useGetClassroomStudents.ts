import { useUserStore } from "stores/user";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "utils/apiClient";
import { Student } from "types/student";

export const GET_CLASSROOM_KEYS = ["getClassroom"];

function fetchClassroomStudents(token: string | null, id: string | undefined) {
  return apiClient.get<Student[]>({
    url: `classroom/${id}/students`,
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function useGetClassroomStudent(id: string | undefined) {
  const user = useUserStore((store) => store.user);
  const result = useQuery<Student[], Error>({
    queryKey: GET_CLASSROOM_KEYS,
    queryFn: () => fetchClassroomStudents(user.token, id),
  });
  return result;
}
