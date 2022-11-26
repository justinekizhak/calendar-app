import { Router } from "solid-app-router";
import "solid-devtools";
import { render } from "solid-js/web";
import App from "~/App";
import "~/css/index.css";
import { routes } from "~/routes";

render(
  () => (
    <Router routes={routes}>
      <App />
    </Router>
  ),
  document.getElementById("root")
);
