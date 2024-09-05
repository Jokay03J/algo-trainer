import { useMutation } from "@tanstack/react-query";
import { useUserStore } from "stores/user";
import { apiClient } from "utils/apiClient";

type AttachStudentBody = {
  code: string;
};

const attach = ({ code }: AttachStudentBody) => {
  const token = useUserStore.getState().user.token;
  return apiClient.post({
    url: "attachStudent",
    body: { code },
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const useAttachUser = () => {
  return useMutation({ mutationFn: attach });
};
