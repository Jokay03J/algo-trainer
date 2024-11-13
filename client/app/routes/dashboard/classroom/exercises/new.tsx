import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Textarea } from "~/components/ui/textarea";
import MarkdownRenderer from "~/components/MarkdownRenderer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCreateExercise } from "~/hooks/useCreateExercise";
import { useNavigate, useParams } from "react-router";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";

const newExerciseSchema = z.object({
  name: z.string().min(3).max(255),
  instructions: z.string(),
  language: z.enum(["javascript", "typescript"]),
  expected: z.string(),
});

const NewExercicePage = () => {
  const { isPending, error, mutateAsync } = useCreateExercise();
  const navigate = useNavigate();
  const params = useParams();
  const addExerciseForm = useForm<z.infer<typeof newExerciseSchema>>({
    resolver: zodResolver(newExerciseSchema),
    defaultValues: {
      name: "",
      expected: "",
      instructions: "",
      language: "javascript",
    },
  });

  const handleAdd = async (exercise: z.infer<typeof newExerciseSchema>) => {
    await mutateAsync({ exercise, classroomId: params.id! });
    navigate(`/dashboard/classrooms/${params.id}`);
  };
  return (
    <div className="p-2">
      {error && (
        <Alert className="mb-2" variant={"destructive"}>
          <AlertTitle>Une erreur est survenue !</AlertTitle>
          <AlertDescription>Veuillez réessayer plus tard.</AlertDescription>
        </Alert>
      )}
      <div className="grid grid-cols-2 gap-2">
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
                    addExerciseForm.setValue(
                      "instructions",
                      e.currentTarget.value
                    )
                  }
                  value={addExerciseForm.watch("instructions")}
                  fitContent
                />
              </TabsContent>
              <TabsContent value="preview">
                <MarkdownRenderer>
                  {addExerciseForm.watch("instructions")}
                </MarkdownRenderer>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...addExerciseForm}>
              <form
                onSubmit={addExerciseForm.handleSubmit(handleAdd)}
                className="space-y-4"
              >
                <FormField
                  control={addExerciseForm.control}
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
                  control={addExerciseForm.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Language utilisé</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Language" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="javascript">Javascript</SelectItem>
                          <SelectItem value="typescript">Typescript</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Une fois crée, vous ne pourrez plus modifer le language
                        utilisé.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={addExerciseForm.control}
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
                <Button type="submit" disabled={isPending}>
                  Crée l'exercice
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NewExercicePage;
