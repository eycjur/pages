import { markdown2xml, xml2TextileForNotion } from './convert.js';

function btnClick(obj: any = NaN): void {
  let elemMarkdown: HTMLTextAreaElement = <HTMLTextAreaElement>document.getElementById("markdown-text");
  let elemTextile: HTMLTextAreaElement = <HTMLTextAreaElement>document.getElementById("textile-text");

  elemTextile.value = "";

  let markdownText: string = elemMarkdown.value;
  let textileText: string = xml2TextileForNotion(markdown2xml(markdownText));

  elemTextile.value = textileText;
  elemMarkdown.value = "";

  navigator.clipboard.writeText(textileText);
}

document.addEventListener('DOMContentLoaded', function () {
  let elemMarkdown: HTMLTextAreaElement = <HTMLTextAreaElement>document.getElementById("markdown-text");
  let button: HTMLButtonElement = <HTMLButtonElement>document.getElementById("convert-button");

  // buttonクリック時の挙動
  button.addEventListener("click", btnClick);
  //ctrl+enter時の挙動
  elemMarkdown.addEventListener('keydown', function (event) {
    if (event.key == "Enter" && event.ctrlKey) {
      btnClick();
    }
  })
});

