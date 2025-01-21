import { create } from "zustand";
import { persist } from "zustand/middleware";

export type User = {
  avatar?: string;
  email: string;
  role: "STUDENT" | "TEACHER" | "ADMIN";
};

export type Token = string;

type InitialState = {
  user: User | null;
  token: Token | null;
};

type Action = {
  setUser: (user: User | null) => void;
  setToken: (token: Token | null) => void;
};

export const useAuthStore = create(
  persist<InitialState & Action>(
    (set, get) => ({
      user: null,
      token: null,
      setToken: (token) => set({ token }),
      setUser: (user) => set({ user }),
    }),
    {
      name: "auth",
    }
  )
);
