import { atomWithStorage } from "jotai/utils";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  id: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  token: string | null;
  type: "teacher" | "student" | null;
}

export const DEFAULT_USER_VALUE = <User>{
  id: null,
  token: null,
  email: null,
  lastName: null,
  firstName: null,
  type: null,
};

export const userAtom = atomWithStorage("user", <User>DEFAULT_USER_VALUE);

interface UserStore {
  user: User;
  setUser: (user: Pick<User, "id" | "token" | "type">) => void;
}

export const useUserStore = create(
  persist<UserStore>(
    (set, get) => ({
      user: DEFAULT_USER_VALUE,
      setUser: (state) => {
        const user = get().user;
        return set({ user: { ...user, ...state } });
      },
    }),
    { name: "auth" }
  )
);
