import { decorator } from "./decorator";

window.onload = () => {
  const app = document.getElementById("hello") as HTMLElement;
  app.innerHTML = decorator(app.innerHTML);
};
