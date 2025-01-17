import type { RouteConfig } from "@react-router/dev/routes";
import { index, layout, prefix, route } from "@react-router/dev/routes";

const routes: RouteConfig = [
  layout("layouts/root.tsx", [
    index("routes/home.tsx"),
    ...prefix("dashboard", [
      index("routes/dashboard.tsx"),
      route("preferences", "routes/dashboard/preferences.tsx"),
      ...prefix("classrooms", [
        index("routes/dashboard/classrooms.tsx"),
        route(":id", "routes/dashboard/classroom.tsx"),
        route(":id/edit", "routes/dashboard/classroom/edit.tsx"),
        ...prefix(":classroomId/exercises", [
          route("new", "routes/dashboard/classroom/exercises/new.tsx"),
          route(":id/edit", "routes/dashboard/classroom/exercises/edit.tsx"),
        ]),
      ]),
    ]),
    ...prefix("auth", [
      route("login", "routes/auth/login.tsx"),
      route("github/callback", "routes/auth/providers/github.tsx"),
    ]),
  ]),
  route("*", "routes/notfound.tsx"),
];

export default routes;
