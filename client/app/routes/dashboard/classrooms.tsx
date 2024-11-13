import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon, UpdateIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { useGetClassrooms } from "~/hooks/useGetClassrooms";
import { useNewClassroom } from "~/hooks/useNewClassroom";

const newClassroomFormSchema = z.object({
  name: z.string().min(3).max(255),
});

const Classrooms = () => {
  const { data, isPending, error } = useGetClassrooms();
  const {
    isPending: newCLassroomPending,
    error: newClassroomError,
    mutateAsync: createClassroom,
  } = useNewClassroom();
  const navigate = useNavigate();
  const newClassroomForm = useForm<z.infer<typeof newClassroomFormSchema>>({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(newClassroomFormSchema),
  });

  const handleNewClassroom = async (
    payload: z.infer<typeof newClassroomFormSchema>
  ) => {
    const createdClassroom = await createClassroom(payload);

    if (newClassroomError) return;
    navigate(`/dashboard/classrooms/${createdClassroom.id}`);
  };

  if (isPending)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <UpdateIcon className="animate-spin" />
      </div>
    );

  if (error) return <>error: {error.message}</>;

  return (
    <section className="p-3">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Mes classes</h1>
        <Dialog>
          <Button variant={"outline"} asChild>
            <DialogTrigger>
              <PlusIcon />
            </DialogTrigger>
          </Button>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nouvelle classe</DialogTitle>
              <DialogDescription>
                Vous pourrez toujours la modifier par la suite.
              </DialogDescription>
            </DialogHeader>
            <Form {...newClassroomForm}>
              <form
                onSubmit={newClassroomForm.handleSubmit(handleNewClassroom)}
                className="space-y-4"
              >
                <FormField
                  control={newClassroomForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom</FormLabel>
                      <FormControl>
                        <Input placeholder="6A 2024" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button disabled={newCLassroomPending}>Envoyer</Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex flex-wrap mt-2 gap-2">
        {data!.map((classroom) => {
          return (
            <Link
              to={"/dashboard/classrooms/" + classroom.id}
              key={classroom.id}
            >
              <Card className="w-fit h-full">
                <CardHeader>
                  <h2 className="font-bold">{classroom.name}</h2>
                </CardHeader>
                <CardContent>
                  {classroom.students && classroom.students.length > 0
                    ? classroom.students.map((student) => {
                        return (
                          <TooltipProvider key={student.id}>
                            <Tooltip>
                              <TooltipTrigger>
                                <Avatar>
                                  <AvatarImage
                                    src={student.avatar}
                                    alt={student.name}
                                  />
                                  <AvatarFallback>
                                    {student.name.slice(0, 2).toUpperCase()}
                                  </AvatarFallback>
                                </Avatar>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{student.name}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        );
                      })
                    : null}
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Classrooms;
