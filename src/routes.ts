import { lazy } from "solid-js";
import { RouteDefinitionWithLayout } from "~/interfaces/router";
import Home from "~/pages/home";

export const routes: RouteDefinitionWithLayout[] = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "**",
    component: lazy(() => import("./errors/404")),
  },
];
