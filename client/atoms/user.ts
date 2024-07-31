import { atomWithStorage } from "jotai/utils";

export interface User {
  id: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  token: string | null;
  type: "teacher" | "student";
}

export const DEFAULT_USER_VALUE = <User>{
  id: null,
  token: null,
  email: null,
  lastName: null,
  firstName: null,
};

export const userAtom = atomWithStorage("user", <User>DEFAULT_USER_VALUE);
