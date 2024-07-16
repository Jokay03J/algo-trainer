import { atom } from "jotai";

export interface User {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  token: string | null;
}

export const userAtom = atom(<User>{
  token: null,
  email: null,
  lastName: null,
  firstName: null,
});
