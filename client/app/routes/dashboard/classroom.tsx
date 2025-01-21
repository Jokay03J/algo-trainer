import {
  ArrowLeftIcon,
  BarChartIcon,
  MixerVerticalIcon,
  Pencil2Icon,
  PlusIcon,
  QuestionMarkCircledIcon,
  TrashIcon,
  UpdateIcon,
} from "@radix-ui/react-icons";
import { Link, useParams } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { useGetClassroom } from "~/hooks/useGetClassroom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { useInviteStudent } from "~/hooks/useInviteStudent";
import { Alert } from "~/components/ui/alert";
import { useState } from "react";
import { useRemoveInviteStudent } from "~/hooks/useRemoveInviteStudent";

const inviteStudentSchema = z.object({
  email: z.string().email().max(255),
});

const ClassroomPage = () => {
  const params = useParams();
  const { data, isPending, error } = useGetClassroom(params.id!);
  const [inviteStudentModal, setInviteModal] = useState(false);
  const {
    mutateAsync: inviteStudent,
    isPending: inviteStudentLoading,
    error: inviteStudentError,
  } = useInviteStudent();
  const {
    mutateAsync: removeInviteStudent,
    isPending: removeInviteStudentLoading,
  } = useRemoveInviteStudent();
  const inviteStudentForm = useForm<z.infer<typeof inviteStudentSchema>>({
    resolver: zodResolver(inviteStudentSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleInviteStudent = async (
    payload: z.infer<typeof inviteStudentSchema>
  ) => {
    const invited = await inviteStudent({
      classroomId: params.id!,
      email: payload.email,
    });
    if (invited) setInviteModal(false);
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
      <div className="flex items-center gap-2">
        <Button variant={"ghost"} asChild>
          <Link to={"/dashboard/classrooms"}>
            <ArrowLeftIcon />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">{data?.name}</h1>
        <Button asChild>
          <Link to={"edit"}>
            <MixerVerticalIcon />
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-2 my-2">
        <Card>
          <CardHeader className="flex justify-between items-center flex-row">
            <CardTitle>Élèves</CardTitle>
            <Dialog
              open={inviteStudentModal}
              onOpenChange={(open) => setInviteModal(open)}
            >
              <Button variant={"secondary"} className="mt-0" asChild>
                <DialogTrigger>
                  <PlusIcon />
                </DialogTrigger>
              </Button>
              <DialogContent>
                <DialogHeader>
                  {inviteStudentError ? (
                    <Alert>L'étudiant est déjà présent !</Alert>
                  ) : null}
                  <DialogTitle>Inviter un élève</DialogTitle>
                  <DialogDescription>
                    L'élève recevra un email d'invitation.
                  </DialogDescription>
                </DialogHeader>
                <Form {...inviteStudentForm}>
                  <form
                    onSubmit={inviteStudentForm.handleSubmit(
                      handleInviteStudent
                    )}
                    className="space-y-8"
                  >
                    <FormField
                      control={inviteStudentForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="john@gmail.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" disabled={inviteStudentLoading}>
                      Inviter
                    </Button>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            {data.classroomStudent && data.classroomStudent.length >= 1 ? (
              <div className="flex flex-col justify-between gap-2">
                {data.classroomStudent.map((join) => (
                  <div
                    key={join.id}
                    className="flex items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src={join.user.email} />
                        <AvatarFallback>
                          {join.user.email.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <p className="text-xl">{join.user.email}</p>
                      <div className="p-1 rounded bg-slate-200">
                        {join.status}
                      </div>
                    </div>
                    <Button
                      variant={"destructive"}
                      disabled={removeInviteStudentLoading}
                      onClick={() =>
                        removeInviteStudent({
                          classroomId: params.id!,
                          joinId: join.id,
                        })
                      }
                    >
                      <TrashIcon />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-full flex flex-col items-center justify-center">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <QuestionMarkCircledIcon className="h-5 w-5" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Utiliser le "+" en haut à droite.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <p>Il semblerais qu'il n'y ai aucun élève.</p>
              </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex justify-between items-center flex-row">
            <CardTitle>Exercices</CardTitle>
            <Button variant={"secondary"} className="mt-0" asChild>
              <Link to={"exercises/new"}>
                <PlusIcon />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {data.exercises && data.exercises.length >= 1 ? (
              data.exercises.map((exercise) => {
                return (
                  <div
                    className="flex items-center justify-between gap-1"
                    key={exercise.id}
                  >
                    <p>{exercise.name}</p>
                    <div className="flex gap-2">
                      <Button
                        variant={"outline"}
                        onClick={() => "TODO: create stats for exercise"}
                      >
                        <BarChartIcon />
                      </Button>
                      <Button asChild variant={"outline"}>
                        <Link to={`exercises/${exercise.id}/edit`}>
                          <Pencil2Icon />
                        </Link>
                      </Button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="w-full flex flex-col items-center justify-center">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <QuestionMarkCircledIcon className="h-5 w-5" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Utiliser le "+" en haut à droite.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <p>Il semblerais qu'il n'y ai aucun exercise.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ClassroomPage;
