import { zodResolver } from "@hookform/resolvers/zod";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
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
import { useRegister } from "~/hooks/useRegister";
import { useAuthStore } from "~/stores/auth";

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

const RegisterRoute = () => {
  const form = useForm<z.infer<typeof registerSchema>>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(registerSchema),
  });
  const { mutateAsync, isError, isPending } = useRegister();
  const { setToken, setUser } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (data: z.infer<typeof registerSchema>) => {
    const authReponse = await mutateAsync(data);
    setToken(authReponse.access_token);
    setUser(authReponse.user);
    navigate("/");
  };

  return (
    <div className="w-full flex items-center flex-col">
      {isError && (
        <Alert variant={"destructive"}>
          <AlertTitle>Erreur</AlertTitle>
          <AlertDescription>
            Une erreur est survenue lors de l'authentification
          </AlertDescription>
        </Alert>
      )}
      <h1 className="text-3xl font-bold">Enregistrement</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Entrer votre email" {...field} />
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
                  <Input placeholder="Entrer votre mot de passe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending} className="w-full my-2">
            Me connecter
          </Button>
        </form>
      </Form>
      <hr className="my-4 w-1/12" />
      <Button variant={"outline"} onClick={() => navigate("/auth/login")}>
        S'identifier
      </Button>
    </div>
  );
};

export default RegisterRoute;
