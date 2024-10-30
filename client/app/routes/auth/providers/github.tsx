import { ExclamationTriangleIcon, UpdateIcon } from "@radix-ui/react-icons";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { useOAuthCallback } from "~/hooks/useOAuthCallback";

const GithubProviderCallback = () => {
  const { isError } = useOAuthCallback("github");

  if (isError)
    return (
      <div className="h-screen w-screen flex items-center justify-center flex-col">
        <ExclamationTriangleIcon className="w-8 h-8" />
        <h1>Une erreur est survenue</h1>
        <Button asChild className="mt-2">
          <Link to={"/"}>Retourner à l'accueil</Link>
        </Button>
      </div>
    );

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <UpdateIcon className="animate-spin" />
    </div>
  );
};

export default GithubProviderCallback;
