import { markdown2xml, xml2TextileForNotion } from './convert.js';
function btnClick(obj = NaN) {
    let elemMarkdown = document.getElementById("markdown-text");
    let elemTextile = document.getElementById("textile-text");
    elemTextile.value = "";
    let markdownText = elemMarkdown.value;
    let textileText = xml2TextileForNotion(markdown2xml(markdownText));
    elemTextile.value = textileText;
    elemMarkdown.value = "";
    navigator.clipboard.writeText(textileText);
}
document.addEventListener('DOMContentLoaded', function () {
    let elemMarkdown = document.getElementById("markdown-text");
    let button = document.getElementById("convert-button");
    button.addEventListener("click", btnClick);
    elemMarkdown.addEventListener('keydown', function (event) {
        if (event.key == "Enter" && event.ctrlKey) {
            btnClick();
        }
    });
});
//# sourceMappingURL=markdown2textile.js.map