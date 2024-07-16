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
        <header className="flex justify-between p-2 shadow-md">
          <h1 className="text-2xl font-bold uppercase">algo-trainer</h1>
          <NavigationMenu>
            <NavigationMenuList>
              {!user.token ? (
                <NavigationMenuItem>
                  <NavigationMenuLink>
                    <Button asChild>
                      <Link to={"/login"}>Se connecter</Link>
                    </Button>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ) : (
                <>
                  <NavigationMenuItem>
                    <NavigationMenuLink>
                      <Button variant={"secondary"} asChild>
                        <Link to={"/clasess"}>Mes classes</Link>
                      </Button>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink>
                      <Button variant={"secondary"} asChild>
                        <Link to={"/students"}>Mes étudiants</Link>
                      </Button>
                    </NavigationMenuLink>
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
