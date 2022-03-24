import { notion2textile } from "./convert.js";
function btnClickNotion2textile(obj = NaN) {
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
    button.addEventListener("click", btnClickNotion2textile);
    elemNotion.addEventListener("keydown", function (event) {
        if (event.key == "Enter" && event.ctrlKey) {
            btnClickNotion2textile();
        }
    });
});
//# sourceMappingURL=notion2textile.js.map