import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@remix-run/react";
import { useCreateClassroom } from "hooks/useNewClassroom";
import { useForm } from "react-hook-form";
import { routes } from "types/routes";
import { z } from "zod";
import LoadingButton from "~/components/common/LoadingButton";
import { Alert } from "~/components/ui/alert";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

// Create zod form validation schema
const formSchema = z.object({
  name: z
    .string()
    .min(3, "Le nom de la classe doit faire au moins 3 caractères !")
    .max(50),
});

export default function NewClass() {
  const { error, isPending, mutateAsync } = useCreateClassroom();
  // Create form from form schema
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  const navigate = useNavigate();

  async function onSubmit({ name }: z.infer<typeof formSchema>) {
    // Create a classroom
    const response = await mutateAsync({ name });
    navigate(routes.CLASSE + "/" + response.id);
  }

  return (
    <div className="flex flex-col items-center">
      <Form {...form}>
        {error ? (
          <Alert variant={"destructive"} className="w-4/6 mt-5">
            {error.message}
          </Alert>
        ) : null}
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-4/6 mt-3"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input placeholder="Nom de la classe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <LoadingButton type="submit" className="w-full" loading={isPending}>
            Crée une classe
          </LoadingButton>
        </form>
      </Form>
    </div>
  );
}
