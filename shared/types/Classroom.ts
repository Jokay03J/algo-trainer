import { Exercise } from "./Exercise";
import { Student } from "./Student";

type ClassroomStudent = {
  id: string;
  status: string;
  user: Student;
};

export type Classroom = {
  id: string;
  name: string;
  classroomStudent?: ClassroomStudent[];
  exercises: Exercise[];
};
