import { useAuthStore } from "~/stores/auth";

export const isStudent = () => {
  const { user } = useAuthStore.getState();
  return user && user.type === "STUDENT";
};
