import { atomWithStorage } from "jotai/utils";

export interface User {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  token: string | null;
}

export const DEFAULT_USER_VALUE = <User>{
  token: null,
  email: null,
  lastName: null,
  firstName: null,
};

export const userAtom = atomWithStorage("user", <User>DEFAULT_USER_VALUE);
