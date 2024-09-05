import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "utils/apiClient";
import { GET_CLASSROOMS_KEYS } from "./useGetClassrooms";
import { useAtomValue } from "jotai";
import { userAtom, useUserStore } from "stores/user";

type NewClassroomBody = {
  name: string;
};

type NewClassroom = {
  id: string;
};

const createClassroom = (
  createRequest: NewClassroomBody,
  token: string | null
) => {
  return apiClient.post<NewClassroom>({
    url: "classroom",
    body: createRequest,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const useCreateClassroom = () => {
  const queryClient = useQueryClient();
  const user = useUserStore((store) => store.user);
  return useMutation({
    mutationFn: (classroom: NewClassroomBody) =>
      createClassroom(classroom, user.token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: GET_CLASSROOMS_KEYS });
    },
  });
};
