import { Link } from "react-router";
import { Button } from "~/components/ui/button";

const NotFoundPage = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center flex-col gap-2">
      <h1 className="text-xl">Route non trouvé</h1>
      <Button asChild variant={"secondary"}>
        <Link to={"/"}>Accueil</Link>
      </Button>
    </div>
  );
};

export default NotFoundPage;
