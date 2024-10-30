import {
  ArrowLeftIcon,
  BarChartIcon,
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
    isError: inviteStudentIsError,
  } = useInviteStudent();
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
          <Link to={"/dashboard"}>
            <ArrowLeftIcon />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">{data?.name}</h1>
      </div>
      <div className="grid grid-cols-2 gap-2">
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
            {data.students && data.students.length >= 1 ? (
              data.students.map((student) => (
                <div
                  key={student.id}
                  className="flex items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src={student.avatar} />
                      <AvatarFallback>
                        {student.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <p className="text-xl">{student.name}</p>
                  </div>
                  <Button
                    variant={"destructive"}
                    onClick={() => console.log("TODO: make supress")}
                  >
                    <TrashIcon />
                  </Button>
                </div>
              ))
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
            <Button variant={"secondary"} className="mt-0">
              <PlusIcon />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between gap-1">
              <p>#1 les boucles</p>
              <div className="flex gap-2">
                <Button variant={"outline"}>
                  <BarChartIcon />
                </Button>
                <Button variant={"outline"}>
                  <Pencil2Icon />
                </Button>
                <Button variant={"destructive"}>
                  <TrashIcon />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ClassroomPage;
