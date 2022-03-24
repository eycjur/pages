"use strict";
function text2notion(input) {
    let output = input;
    output = output.replace(/\n/g, "\n\n");
    return output;
}
function btnClickText2Notion(obj = NaN) {
    const elemText = (document.getElementById("text-text"));
    const elemNotion = (document.getElementById("notion-text"));
    elemNotion.value = "";
    const textText = elemText.value;
    const notionText = text2notion(textText);
    elemNotion.value = notionText;
    elemText.value = "";
    navigator.clipboard.writeText(notionText);
}
document.addEventListener("DOMContentLoaded", function () {
    const elemText = (document.getElementById("text-text"));
    const button = (document.getElementById("convert-button"));
    button.addEventListener("click", btnClickText2Notion);
    elemText.addEventListener("keydown", function (event) {
        if (event.key == "Enter" && event.ctrlKey) {
            btnClickText2Notion();
        }
    });
});
//# sourceMappingURL=text2notion.js.map