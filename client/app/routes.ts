import type { RouteConfig } from "@react-router/dev/routes";
import { index, layout, prefix, route } from "@react-router/dev/routes";

export const routes: RouteConfig = [
  layout("layouts/root.tsx", [
    index("routes/home.tsx"),
    ...prefix("dashboard", [
      index("routes/dashboard.tsx"),
      route("classrooms/:id", "routes/dashboard/classroom.tsx"),
      route("classrooms", "routes/dashboard/classrooms.tsx"),
      route("preferences", "routes/dashboard/preferences.tsx"),
    ]),
  ]),
  ...prefix("auth", [
    route("login", "routes/auth/login.tsx"),
    route("github/callback", "routes/auth/providers/github.tsx"),
  ]),
  route("*", "routes/notfound.tsx"),
];
