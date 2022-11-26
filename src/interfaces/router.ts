import { RouteDefinition } from "solid-app-router";

export interface RouteDefinitionWithLayout extends RouteDefinition {
  layout?: string;
}
