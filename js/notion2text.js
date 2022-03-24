"use strict";
function notion2text(input) {
    let output = input;
    output = output.replace(/\$/g, "");
    output = output.replace(/{/g, "(");
    output = output.replace(/}/g, ")");
    output = output.replace(/\\frac(.*?)}{/g, function (...args) {
        return args[1] + ")/(";
    });
    output = output.replace(/\n\n/g, "\n");
    output = output.replace(/^( *)[-*>] /gm, "");
    output = output.replace(/^#{1,4} /gm, "");
    return output;
}
function btnClickNotion2text(obj = NaN) {
    const elemNotion = (document.getElementById("notion-text"));
    const elemText = (document.getElementById("text-text"));
    elemText.value = "";
    const notionText = elemNotion.value;
    const textText = notion2text(notionText);
    elemText.value = textText;
    elemNotion.value = "";
    navigator.clipboard.writeText(textText);
}
document.addEventListener("DOMContentLoaded", function () {
    const elemNotion = (document.getElementById("notion-text"));
    const button = (document.getElementById("convert-button"));
    button.addEventListener("click", btnClickNotion2text);
    elemNotion.addEventListener("keydown", function (event) {
        if (event.key == "Enter" && event.ctrlKey) {
            btnClickNotion2text();
        }
    });
});
//# sourceMappingURL=notion2text.js.map