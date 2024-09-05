import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "utils/apiClient";
import { GET_CLASSROOM_KEYS } from "./useGetClassroomStudents";
import { useUserStore } from "stores/user";

type AddStudentBody = {
  classroomId: string;
  studentId: string;
};

type AddStudentResponse = {
  id: string;
};

const addStudent = ({ classroomId, studentId }: AddStudentBody) => {
  const token = useUserStore.getState().user.token;
  return apiClient.post<AddStudentResponse>({
    url: "classroom/add",
    body: { classroom_id: classroomId, student_id: studentId },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const useAddStudentToClassroom = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: GET_CLASSROOM_KEYS });
    },
  });
};
