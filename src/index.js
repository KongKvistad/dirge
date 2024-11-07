// src/index.js
import "./styles.css";

const root = document.createElement("div");
root.innerHTML = "<h1>Hello, Webpack!</h1>";
document.body.appendChild(root);

document.getElementById("loadFeatureButton").addEventListener("click", () => {
  import("./featureModule") // Path to your module
    .then((module) => {
      module.default(); // Call the default export from featureModule
    })
    .catch((err) => {
      console.error("Failed to load feature module", err);
    });
});
