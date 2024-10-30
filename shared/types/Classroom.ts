import { Student } from "./Student";

export type Classroom = {
  id: string;
  name: string;
  students?: Student[];
};
