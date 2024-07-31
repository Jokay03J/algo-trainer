import { useParams } from "@remix-run/react";
import { useGetClassroomStudent } from "hooks/useGetClassroomStudents";
import { useRemoveClassroomStudent } from "hooks/useRemoveClassroomStudent";
import { CircleX } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "~/components/ui/table";

export default function Classroom() {
  const params = useParams();
  const {
    data: students,
    isLoading,
    isError,
  } = useGetClassroomStudent(params.id);
  const { mutateAsync: removeStudent, isPending: isLoadingRemoveStudent } =
    useRemoveClassroomStudent();

  function handleRemove(studentId: string) {
    // Remove student
    removeStudent({ studentId, classroomId: params.id! });
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center w-full gap-2 my-3">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant={"destructive"} className="mt-4">
        <CircleX className="h-4 w-4" />
        <AlertTitle>Erreur !</AlertTitle>
        <AlertDescription>Une erreur est survenue !</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <Table className="w-fit">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Nom</TableHead>
            <TableHead className="w-[100px]">Prénom</TableHead>
            <TableHead className="w-[100px]">Email</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students!.map((student, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                {student.first_name}
              </TableCell>
              <TableCell className="font-medium">{student.last_name}</TableCell>
              <TableCell className="font-medium">{student.email}</TableCell>
              <TableCell>
                <Button
                  variant={"destructive"}
                  disabled={isLoadingRemoveStudent}
                  onClick={() => handleRemove(student.id)}
                >
                  Supprimer
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
