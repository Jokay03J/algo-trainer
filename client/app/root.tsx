import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import "./tailwind.css";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "./components/ui/button";
import { useAtom } from "jotai";
import { DEFAULT_USER_VALUE, userAtom } from "atoms/user";
import { routes } from "types/routes";

export function Layout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useAtom(userAtom);
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
                  <NavigationMenuItem>
                    <Button variant={"secondary"} asChild>
                      <Link to={routes.STUDENTS}>Mes étudiants</Link>
                    </Button>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink>
                      <Button onClick={() => setUser(DEFAULT_USER_VALUE)}>
                        Se déconnecter
                      </Button>
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

export default function App() {
  return <Outlet />;
}
