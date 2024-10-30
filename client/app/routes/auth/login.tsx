import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";

const LoginRoute = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center flex-col">
      <h1 className="text-3xl">Authentification</h1>
      <Button variant={"ghost"} asChild>
        <Link to={import.meta.env.VITE_API_URL + "/auth/github/redirect"}>
          <GitHubLogoIcon />
          <span className="text-xl">Github</span>
        </Link>
      </Button>
    </div>
  );
};

export default LoginRoute;
