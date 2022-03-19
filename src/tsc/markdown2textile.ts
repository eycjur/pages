import { markdown2xml, xml2textile, xmlCareForNotion } from "./convert.js";

function btnClick(obj: any = NaN): void {  // eslint-disable-line
  const elemMarkdown: HTMLTextAreaElement = <HTMLTextAreaElement>(
    document.getElementById("markdown-text")
  );
  const elemTextile: HTMLTextAreaElement = <HTMLTextAreaElement>(
    document.getElementById("textile-text")
  );

  elemTextile.value = "";

  const markdownText: string = elemMarkdown.value;
  const textileText: string = xml2textile(
    xmlCareForNotion(markdown2xml(markdownText))
  );

  elemTextile.value = textileText;
  elemMarkdown.value = "";

  navigator.clipboard.writeText(textileText);
}

document.addEventListener("DOMContentLoaded", function () {
  const elemMarkdown: HTMLTextAreaElement = <HTMLTextAreaElement>(
    document.getElementById("markdown-text")
  );
  const button: HTMLButtonElement = <HTMLButtonElement>(
    document.getElementById("convert-button")
  );

  // buttonクリック時の挙動
  button.addEventListener("click", btnClick);
  //ctrl+enter時の挙動
  elemMarkdown.addEventListener("keydown", function (event) {
    if (event.key == "Enter" && event.ctrlKey) {
      btnClick();
    }
  });
});
