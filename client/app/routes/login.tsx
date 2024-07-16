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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useLogin } from "hooks/useLogin";
import { Alert } from "~/components/ui/alert";
import { Separator } from "~/components/ui/separator";
import { Link } from "@remix-run/react";
import { routes } from "types/routes";

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
  const { isLoading, error, login } = useLogin();
  // Create form from form schema
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit({ email, password }: z.infer<typeof formSchema>) {
    await login(email, password);
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
            <Alert variant={"destructive"}>{error.message}</Alert>
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
            <Button type="submit" disabled={isLoading} className="w-full">
              Se connecter
            </Button>
          </form>
        </Form>
        <Separator className="w-4/6 my-2" />
        <Button asChild variant={"secondary"} className="w-4/6">
          <Link to={routes.REGISTER}>S'enregistrer</Link>
        </Button>
      </section>
    </div>
  );
}
