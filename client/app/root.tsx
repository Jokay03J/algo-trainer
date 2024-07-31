import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigate,
} from "@remix-run/react";
import "./tailwind.css";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { DEFAULT_USER_VALUE, userAtom } from "atoms/user";
import { useAtom } from "jotai";
import { routes } from "types/routes";
import { Button } from "./components/ui/button";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function Layout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useAtom(userAtom);
  const navigate = useNavigate();

  function handleDisconnect() {
    setUser(DEFAULT_USER_VALUE);
    navigate("/");
  }
  return (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen">
        <header className="flex justify-between items-center p-2 shadow-md">
          <Link to={"/"} className="text-2xl font-bold uppercase">
            algo-trainer
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Button asChild variant={"secondary"}>
                  <Link to={routes.HOME}>Accueil</Link>
                </Button>
              </NavigationMenuItem>
              {!user.token ? (
                <NavigationMenuItem>
                  <Button asChild>
                    <Link to={routes.LOGIN}>Se connecter</Link>
                  </Button>
                </NavigationMenuItem>
              ) : (
                <>
                  <NavigationMenuItem>
                    <Button variant={"secondary"} asChild>
                      <Link to={routes.CLASSES}>Mes classes</Link>
                    </Button>
                  </NavigationMenuItem>
                  {user.type === "teacher" ? (
                    <NavigationMenuItem>
                      <Button variant={"secondary"} asChild>
                        <Link to={routes.STUDENTS}>Mes étudiants</Link>
                      </Button>
                    </NavigationMenuItem>
                  ) : null}
                  <NavigationMenuItem>
                    <NavigationMenuLink>
                      <Button onClick={handleDisconnect}>Se déconnecter</Button>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </>
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </header>
        <main>{children}</main>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
