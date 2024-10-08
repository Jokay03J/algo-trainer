import { useMutation } from "@tanstack/react-query";
import { useUserStore } from "stores/user";
import { apiClient } from "utils/apiClient";
import { GET_CLASSROOM_KEYS } from "./useGetClassroomStudents";

function removeStudent(
  token: string,
  studentId: string | undefined,
  classroomId: string
) {
  return apiClient.get({
    url: `classroom/remove`,
    headers: { Authorization: `Bearer ${token}` },
    body: {
      student_id: studentId,
      classroom_id: classroomId,
    },
  });
}

export function useRemoveClassroomStudent() {
  const user = useUserStore((store) => store.user);
  const mutation = useMutation({
    mutationKey: GET_CLASSROOM_KEYS,
    mutationFn: (params: { classroomId: string; studentId: string }) =>
      removeStudent(user.token!, params.studentId, params.classroomId),
  });

  return mutation;
}
