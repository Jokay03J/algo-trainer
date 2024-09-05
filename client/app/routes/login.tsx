import type { MetaFunction } from "@remix-run/node";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "@remix-run/react";
import { useLogin } from "hooks/useLogin";
import { useForm } from "react-hook-form";
import { routes } from "types/routes";
import { z } from "zod";
import { Alert } from "~/components/ui/alert";
import { Separator } from "~/components/ui/separator";
import LoadingButton from "~/components/common/LoadingButton";
import { useUserStore } from "stores/user";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

// Create zod form validation schema
const formSchema = z.object({
  email: z.string().email({ message: "L'email doit être valide" }),
  password: z
    .string({ message: "Le mot de passe est requis" })
    .min(6, { message: "Le mot de passe doit faire au moins 6 caractères" }),
});

export default function Login() {
  const { isPending, error, mutateAsync } = useLogin();
  // Create form from form schema
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const setUser = useUserStore((store) => store.setUser);
  const navigate = useNavigate();

  async function onSubmit({ email, password }: z.infer<typeof formSchema>) {
    const { id, token, type } = await mutateAsync({ email, password });
    setUser({ id, token, type });
    navigate(routes.CLASSES);
  }

  return (
    <div className="flex">
      <div className="w-6/12 h-screen bg-black flex flex-col items-center justify-center text-white">
        <p className="text-4xl font-bold">
          Faite monter vos élèves en comptétence
        </p>
      </div>
      <section className="w-6/12 flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold">Se connecter</h1>
        <Form {...form}>
          {error ? (
            <Alert variant={"destructive"} className="w-4/6 my-2">
              {error.message}
            </Alert>
          ) : null}
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-4/6"
          >
            <FormField
              control={form.control}
              name="email"
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mot de passe</FormLabel>
                  <FormControl>
                    <Input placeholder="Votre mot de passe..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <LoadingButton type="submit" loading={isPending} className="w-full">
              Se connecter
            </LoadingButton>
          </form>
        </Form>
        <Separator className="w-4/6 my-2" />
        <div className="flex items-center gap-1">
          <Button asChild variant={"secondary"} className="w-4/6">
            <Link to={routes.REGISTER_TEACHER}>enregistrer un professeur</Link>
          </Button>
          ou
          <Button asChild variant={"secondary"} className="w-4/6">
            <Link to={routes.REGISTER_STUDENT}>enregistrer un étudiant</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
