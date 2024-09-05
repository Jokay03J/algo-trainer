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
import { useForm } from "react-hook-form";
import { routes } from "types/routes";
import { z } from "zod";
import { Alert } from "~/components/ui/alert";
import { Separator } from "~/components/ui/separator";
import { useRegisterStudent } from "hooks/useRegisterStudent";
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
  firstName: z.string().min(1, { message: "Le prénom est requis" }),
  lastName: z.string().min(1, { message: "Le nom de famille est requis" }),
  email: z.string().email({ message: "L'email doit être valide" }),
  password: z
    .string({ message: "Le mot de passe est requis" })
    .min(6, { message: "Le mot de passe doit faire au moins 6 caractères" }),
});

export default function Register() {
  const { isPending, error, mutateAsync } = useRegisterStudent();
  // Create form from form schema
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();

  async function onSubmit({
    firstName,
    lastName,
    email,
    password,
  }: z.infer<typeof formSchema>) {
    // Register student
    const { id, token, type } = await mutateAsync({
      firstName,
      lastName,
      email,
      password,
    });
    setUser({ id, token, type });
    navigate(routes.HOME);
  }

  return (
    <div className="flex">
      <div className="w-6/12 min-h-screen bg-black flex flex-col items-center justify-center text-white">
        <p className="text-4xl font-bold">
          Faite monter vos élèves en compétence
        </p>
      </div>
      <section className="w-6/12 flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-5xl font-bold">S'enregistrer</h1>
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
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prénom</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Votre prénom..."
                      autoComplete="cc-given-name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Votre nom..."
                      autoComplete="cc-name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                    <Input
                      placeholder="Votre mot de passe..."
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <LoadingButton type="submit" loading={isPending} className="w-full">
              S'enregistrer
            </LoadingButton>
          </form>
        </Form>
        <Separator className="w-4/6 my-2" />
        <Button asChild variant={"secondary"} className="w-4/6">
          <Link to={routes.LOGIN}>Se connecter</Link>
        </Button>
      </section>
    </div>
  );
}
