import { useMutation } from "@tanstack/react-query";
import { useUserStore } from "stores/user";
import { apiClient } from "utils/apiClient";

type CreateAttachCodeResponse = {
  code: string;
};

export const createCode = () => {
  const token = useUserStore.getState().user.token;
  return apiClient.post<CreateAttachCodeResponse>({
    url: "studentCode",
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const useCreateAttachCode = () => {
  return useMutation({ mutationFn: createCode });
};
