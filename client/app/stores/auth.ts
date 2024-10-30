import { create } from "zustand";
import { persist } from "zustand/middleware";

export type User = {
  avatar: string;
  createdAt: string;
  email: string;
  githubId: number;
  id: string;
  name: string;
  nickName: string;
  type: "STUDENT" | "TEACHER";
  updatedAt: string;
};

export type Token = {
  token: string;
  name: string | null;
  abilities: string[];
  expiredAt: string | null;
  lastUsedAt: string | null;
  type: string;
};

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
