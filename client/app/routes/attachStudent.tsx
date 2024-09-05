import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@remix-run/react";
import { useAttachUser } from "hooks/useAttachUser";
import { useCreateAttachCode } from "hooks/useCreateAttachCode";
import { useForm } from "react-hook-form";
import { routes } from "types/routes";
import { hasRights, Rights } from "utils/hasRight";
import { z } from "zod";
import LoadingButton from "~/components/common/LoadingButton";
import { Alert } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

// Create zod form validation schema
const formSchema = z.object({
  code: z.string(),
});

const AttachStudent = () => {
  // HANDLE ERROR
  const { mutateAsync, isPending, isError, data } = useCreateAttachCode();
  const {
    mutateAsync: attachStudent,
    isPending: isAttachStudentPending,
    isError: isAttachStudentError,
    error: attachStudentError,
  } = useAttachUser();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
    },
  });
  const navigate = useNavigate();

  const handleCreateCode = async () => {
    await mutateAsync();
  };

  async function onSubmit({ code }: z.infer<typeof formSchema>) {
    await attachStudent({ code });
    navigate(routes.HOME);
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl">Associer votre compte à votre enseignent</h1>
      {hasRights(Rights.canAttachStudent) ? (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="my-2">Rejoindre votre enseignent</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Rejoindre votre enseignent</DialogTitle>
              {isAttachStudentError ? (
                <Alert variant={"destructive"}>
                  {attachStudentError.message}
                </Alert>
              ) : null}
              <DialogDescription>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 w-full"
                  >
                    <FormField
                      control={form.control}
                      name="code"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Code</FormLabel>
                          <FormControl>
                            <Input placeholder="Votre code..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <LoadingButton
                      type="submit"
                      loading={isAttachStudentPending}
                      className="w-full"
                    >
                      Ajouter
                    </LoadingButton>
                  </form>
                </Form>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      ) : (
        <>
          <h2>
            Vous devez associer vos élèves à votre compte pour qu'ils puissent
            être compter comme vos élèves et être ajouter dans une classe
          </h2>
          <LoadingButton onClick={handleCreateCode} loading={isPending}>
            Crée un code
          </LoadingButton>
          {data?.code ? <div>{data.code}</div> : null}
        </>
      )}
    </div>
  );
};

export default AttachStudent;
