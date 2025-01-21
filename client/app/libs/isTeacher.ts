import { useAuthStore } from "~/stores/auth";

export const isTeacher = () => {
  const { user } = useAuthStore.getState();
  return user && user.role === "TEACHER";
};
