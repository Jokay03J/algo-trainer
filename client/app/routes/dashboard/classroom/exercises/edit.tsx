import { Exercise } from "@/shared/types/Exercise";
import { zodResolver } from "@hookform/resolvers/zod";
import { TrashIcon, UpdateIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { z } from "zod";
import MarkdownRenderer from "~/components/MarkdownRenderer";
import { Alert, AlertTitle, AlertDescription } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "~/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Textarea } from "~/components/ui/textarea";
import { useGetExercise } from "~/hooks/useGetExercise";
import { useRemoveExercise } from "~/hooks/useRemoveExercise";
import { useUpdateExercise } from "~/hooks/useUpdateExercise";

const editExerciseSchema = z.object({
  name: z.string().min(3).max(255),
  instructions: z.string(),
  expected: z.string(),
});

const EditExercise = () => {
  const params = useParams();
  const { error, isPending, data } = useGetExercise(
    params.classroomId!,
    params.id!
  );
  const {
    mutateAsync: updateExercise,
    error: updateExerciseError,
    isPending: updateExercisePending,
  } = useUpdateExercise(params.classroomId!, params.id!);
  const navigate = useNavigate();

  if (error) return <p>error !</p>;

  if (isPending)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <UpdateIcon className="animate-spin" />
      </div>
    );

  const handleAdd = async (values: z.infer<typeof editExerciseSchema>) => {
    await updateExercise(values);
    if (!error) navigate(`/dashboard/classrooms/${params.classroomId}`);
  };

  return (
    <div className="p-2">
      {error ||
        (updateExerciseError && (
          <Alert className="mb-2" variant={"destructive"}>
            <AlertTitle>Une erreur est survenue !</AlertTitle>
            <AlertDescription>Veuillez réessayer plus tard.</AlertDescription>
          </Alert>
        ))}
      <div className="grid grid-cols-2 gap-2">
        <EditExerciseForm
          isPending={updateExercisePending}
          onSubmit={handleAdd}
          exercise={data}
        />
      </div>
    </div>
  );
};

const EditExerciseForm = ({
  isPending,
  onSubmit,
  exercise,
}: {
  isPending: boolean;
  onSubmit: (payload: z.infer<typeof editExerciseSchema>) => void;
  exercise: Exercise;
}) => {
  const params = useParams();
  const navigate = useNavigate();
  const {
    mutateAsync: removeExercise,
    error: removeExerciseError,
    isPending: removeExercisePending,
  } = useRemoveExercise();
  const editExerciseForm = useForm<z.infer<typeof editExerciseSchema>>({
    resolver: zodResolver(editExerciseSchema),
    defaultValues: exercise,
  });

  const handleDelete = async () => {
    if (!params.id || !params.classroomId) return;
    await removeExercise({
      classroomId: params.classroomId,
      exerciseId: params.id,
    });
    if (!removeExerciseError)
      navigate(`/dashboard/classrooms/${params.classroomId}`);
  };

  return (
    <>
      <Card>
        <Tabs defaultValue="text">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Consignes</CardTitle>
              <TabsList>
                <TabsTrigger value="text">Texte</TabsTrigger>
                <TabsTrigger value="preview">Rendu</TabsTrigger>
              </TabsList>
            </div>
            <CardDescription>Format Markdown supporter.</CardDescription>
          </CardHeader>
          <CardContent>
            <TabsContent value="text">
              <Textarea
                onChange={(e) =>
                  editExerciseForm.setValue(
                    "instructions",
                    e.currentTarget.value
                  )
                }
                value={editExerciseForm.watch("instructions")}
                fitContent
              />
            </TabsContent>
            <TabsContent value="preview">
              <MarkdownRenderer>
                {editExerciseForm.watch("instructions")}
              </MarkdownRenderer>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
      <Card>
        <CardHeader>
          {removeExerciseError && (
            <Alert variant={"destructive"}>
              Une erreur est survenue lors de supression de l'exercise.
            </Alert>
          )}

          <CardTitle>Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...editExerciseForm}>
            <form
              onSubmit={editExerciseForm.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <FormField
                control={editExerciseForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="#1 Javascript the basics"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editExerciseForm.control}
                name="expected"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Retour attendu</FormLabel>
                    <FormControl>
                      <Input placeholder="eg: 50, hello world" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-full flex justify-between">
                <Button type="submit" disabled={isPending}>
                  Mettre à jour
                </Button>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete();
                  }}
                  variant={"destructive"}
                  disabled={removeExercisePending}
                >
                  <TrashIcon />
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

export default EditExercise;
