import "./styles.css";
import { methodOne } from "./utils/methods";
// import map from "lodash/map";
//^ try uncommenting

//base starting point
const root = document.createElement("div");
root.innerHTML = "<h1>Hello, Webpack!</h1>";
document.body.appendChild(root);

// code-splitting
document.getElementById("loadFeatureButton").addEventListener("click", () => {
  import(/* webpackChunkName: "feature-module" */ "./featureModule")
    .then((module) => {
      module.default();
    })
    .catch((err) => {
      console.error("Failed to load feature module", err);
    });
});

//tree shaking
methodOne();
