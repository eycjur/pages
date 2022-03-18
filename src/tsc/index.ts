import { decorator } from "./decorator.js";

window.onload = () => {
  const app = document.getElementById("hello") as HTMLElement;
  app.innerHTML = decorator(app.innerHTML);
};
