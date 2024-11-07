// src/index.js
import "./styles.css";

const root = document.createElement("div");
root.innerHTML = "<h1>Hello, Webpack!</h1>";
document.body.appendChild(root);

document.getElementById("loadFeatureButton").addEventListener("click", () => {
  import(/* webpackChunkName: "feature-module" */ "./featureModule")
    .then((module) => {
      module.default();
    })
    .catch((err) => {
      console.error("Failed to load feature module", err);
    });
});
