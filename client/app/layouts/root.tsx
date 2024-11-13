import { Link, Outlet, useNavigate } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown";
import { isTeacher } from "~/libs/isTeacher";
import { useAuthStore } from "~/stores/auth";

const RootLayout = () => {
  const { user, setToken, setUser } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    navigate("/");
  };

  return (
    <>
      <div className="w-full p-3 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold">Algo Trainer</h1>
        <ul>
          {user ? (
            <li>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>
                      {user.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Comptes</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link to={"/dashboard/preferences"}>Mes préférences</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to={"/dashboard/classrooms"}>Mes classes</Link>
                  </DropdownMenuItem>
                  {isTeacher() && (
                    <DropdownMenuItem>
                      <Link to={"/dashboard/students"}>Mes élèves</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem
                    className="bg-red-500 text-white hover:bg-red-600 cursor-pointer"
                    onClick={handleLogout}
                  >
                    Déconnexion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          ) : (
            <li>
              <Button asChild>
                <Link to={"/auth/login"}>Se connecter</Link>
              </Button>
            </li>
          )}
        </ul>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default RootLayout;
