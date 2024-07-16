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

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useLogin } from "hooks/useLogin";
import { Alert } from "~/components/ui/alert";

const formSchema = z.object({
  email: z.string().email({ message: "Email must be valid !" }),
  password: z.string().min(6, { message: "Password must be 6 length" }),
});

export default function Login() {
  const { isLoading, error, login } = useLogin();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit({ email, password }: z.infer<typeof formSchema>) {
    await login(email, password);
  }

  return (
    <Form {...form}>
      {error ? <Alert variant={"destructive"}>{error.message}</Alert> : null}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Your email..." {...field} />
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Your password..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          Submit
        </Button>
      </form>
    </Form>
  );
}
