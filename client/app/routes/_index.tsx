import type { MetaFunction } from "@remix-run/node";
import { userAtom } from "atoms/user";
import { useAtomValue } from "jotai";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const user = useAtomValue(userAtom);
  return <div>{user.token ?? "pas de token"}</div>;
}
