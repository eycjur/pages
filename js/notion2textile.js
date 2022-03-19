import { notion2textile } from "./convert.js";
function btnClick(obj = NaN) {
    const elemNotion = (document.getElementById("notion-text"));
    const elemTextile = (document.getElementById("textile-text"));
    elemTextile.value = "";
    const notionText = elemNotion.value;
    const textileText = notion2textile(notionText);
    elemTextile.value = textileText;
    elemNotion.value = "";
    navigator.clipboard.writeText(textileText);
}
document.addEventListener("DOMContentLoaded", function () {
    const elemNotion = (document.getElementById("notion-text"));
    const button = (document.getElementById("convert-button"));
    button.addEventListener("click", btnClick);
    elemNotion.addEventListener("keydown", function (event) {
        if (event.key == "Enter" && event.ctrlKey) {
            btnClick();
        }
    });
});
//# sourceMappingURL=notion2textile.js.map