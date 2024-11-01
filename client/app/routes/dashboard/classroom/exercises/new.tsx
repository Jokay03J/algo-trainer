import { useState } from "react";
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
import { Label } from "~/components/ui/label";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const newExerciseSchema = z.object({
  instructions: z.string(),
  language: z.string(),
  expected: z.string(),
});

const NewExercicePage = () => {
  const addExerciseForm = useForm<z.infer<typeof newExerciseSchema>>({
    resolver: zodResolver(newExerciseSchema),
    defaultValues: {
      expected: "",
      instructions: "",
      language: "",
    },
  });

  const handleAdd = (payload: z.infer<typeof newExerciseSchema>) => {
    console.log(payload);
  };
  return (
    <div className="grid grid-cols-2 p-2 gap-2">
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
                name="language"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Language</FormLabel>
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
              <Button type="submit">Crée l'exercice</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewExercicePage;
