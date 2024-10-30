import { Link, useNavigate } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useAuthStore } from "~/stores/auth";

const Preferences = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  if (!user) return navigate("/");

  return (
    <div className="flex">
      <aside className="w-2/12 flex flex-col gap-1 p-2">
        <Button variant={"ghost"} asChild>
          <Link to={"#infos"}>Mes informations</Link>
        </Button>
      </aside>
      <div className="w-10/12">
        <article className="p-2">
          <h2 id="infos" className="text-2xl font-bold">
            Mes informations
          </h2>
          <div className="w-fit">
            <p>Email</p>
            <Input value={user.email} disabled />
          </div>
        </article>
      </div>
    </div>
  );
};

export default Preferences;
