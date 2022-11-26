import type { Component } from "solid-js";
import "virtual:windi.css";
import "virtual:windi-devtools";
import { Route } from "solid-app-router";
import DefaultLayout from "~/layouts/default";

const App: Component = () => {
  return (
    <DefaultLayout>
      <Route />
    </DefaultLayout>
  );
};

export default App;
