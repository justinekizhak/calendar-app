import { lazy } from "solid-js";
import { RouteDefinitionWithLayout } from "~/interfaces/router";

export const routes: RouteDefinitionWithLayout[] = [
  {
    path: "/",
    component: lazy(() => import("~/pages/home")),
  },
  {
    path: "**",
    component: lazy(() => import("./errors/404")),
  },
];
