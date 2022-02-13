import { decorator } from './decorator.js';
window.onload = () => {
    const app = document.getElementById('hello');
    app.innerHTML = decorator(app.innerHTML);
};
//# sourceMappingURL=index.js.map