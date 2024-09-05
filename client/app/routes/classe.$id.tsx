import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "@remix-run/react";
import { useAddStudentToClassroom } from "hooks/useAddStudentToClassroom";
import { useGetClassroomStudent } from "hooks/useGetClassroomStudents";
import { useRemoveClassroomStudent } from "hooks/useRemoveClassroomStudent";
import { CircleX } from "lucide-react";
import { useForm } from "react-hook-form";
import { hasRights, Rights } from "utils/hasRight";
import { z } from "zod";
import LoadingButton from "~/components/common/LoadingButton";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Skeleton } from "~/components/ui/skeleton";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "~/components/ui/table";

// Create zod form validation schema
const formSchema = z.object({
  id: z.string(),
});

export default function Classroom() {
  const params = useParams();
  const {
    data: students,
    isLoading,
    isError,
  } = useGetClassroomStudent(params.id);
  const { mutateAsync: removeStudent, isPending: isLoadingRemoveStudent } =
    useRemoveClassroomStudent();
  const { mutateAsync: addStudent, isPending: isPendingAddStudent } =
    useAddStudentToClassroom();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
    },
  });

  function handleRemove(studentId: string) {
    // Remove student
    removeStudent({ studentId, classroomId: params.id! });
  }

  async function onSubmit({ id }: z.infer<typeof formSchema>) {
    await addStudent({ classroomId: params.id!, studentId: id });
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
      {hasRights(Rights.canManageStudents) ? (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="my-2">Ajouter un étudiant</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter un étudiant</DialogTitle>
              <DialogDescription>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 w-full"
                  >
                    <FormField
                      control={form.control}
                      name="id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Votre email..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <LoadingButton
                      type="submit"
                      loading={isPendingAddStudent}
                      className="w-full"
                    >
                      Ajouter
                    </LoadingButton>
                  </form>
                </Form>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      ) : null}
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
