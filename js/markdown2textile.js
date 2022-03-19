import { markdown2xml, xml2textile, xmlCareForNotion } from "./convert.js";
function btnClick(obj = NaN) {
    const elemMarkdown = (document.getElementById("markdown-text"));
    const elemTextile = (document.getElementById("textile-text"));
    elemTextile.value = "";
    const markdownText = elemMarkdown.value;
    const textileText = xml2textile(xmlCareForNotion(markdown2xml(markdownText)));
    elemTextile.value = textileText;
    elemMarkdown.value = "";
    navigator.clipboard.writeText(textileText);
}
document.addEventListener("DOMContentLoaded", function () {
    const elemMarkdown = (document.getElementById("markdown-text"));
    const button = (document.getElementById("convert-button"));
    button.addEventListener("click", btnClick);
    elemMarkdown.addEventListener("keydown", function (event) {
        if (event.key == "Enter" && event.ctrlKey) {
            btnClick();
        }
    });
});
//# sourceMappingURL=markdown2textile.js.map