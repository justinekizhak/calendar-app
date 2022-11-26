import { render } from "solid-js/web";

import "~/css/index.css";
import App from "~/App";
import { Router } from "solid-app-router";
import { routes } from "~/routes";

render(
  () => (
    <Router routes={routes}>
      <App />
    </Router>
  ),
  document.getElementById("root")
);
