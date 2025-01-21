import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftIcon, UpdateIcon } from "@radix-ui/react-icons";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { useGetClassroom } from "~/hooks/useGetClassroom";
import { useUpdateClassroom } from "~/hooks/useUpdateClassroom";

export const updateClassroomSchema = z.object({
  name: z.string(),
});

const EditClassroomPage = () => {
  const params = useParams();
  const { data, isPending, error } = useGetClassroom(params.id!);
  const { isPending: updateClassroomLoading, mutateAsync: updateClassroom } =
    useUpdateClassroom();
  const navigate = useNavigate();
  const editClassroomForm = useForm<z.infer<typeof updateClassroomSchema>>({
    resolver: zodResolver(updateClassroomSchema),
    defaultValues: data,
  });

  useEffect(() => {
    if (data && !isPending) editClassroomForm.setValue("name", data.name);
  }, [isPending]);

  if (isPending)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <UpdateIcon className="animate-spin" />
      </div>
    );

  if (error) return <>error: {error.message}</>;

  const handleUpdate = async (
    payload: z.infer<typeof updateClassroomSchema>
  ) => {
    if (!params.id) return;
    await updateClassroom({ classroomId: params.id, payload });
    navigate(`/dashboard/classrooms/${params.id}`);
  };

  return (
    <section className="p-3">
      <div className="flex items-center gap-2">
        <Button variant={"ghost"} onClick={() => navigate(-1)}>
          <ArrowLeftIcon />
        </Button>
        <h1 className="text-3xl font-bold">{data?.name}</h1>
      </div>
      <div className="">
        <Form {...editClassroomForm}>
          <form
            onSubmit={editClassroomForm.handleSubmit(handleUpdate)}
            className="space-y-8"
          >
            <FormField
              control={editClassroomForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input placeholder="Année 2024" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={updateClassroomLoading}>
              Mettre à jour
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default EditClassroomPage;
