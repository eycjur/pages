import { notion2textile } from "./convert.js";

function btnClick(obj: any = NaN): void {  // eslint-disable-line
  const elemNotion: HTMLTextAreaElement = <HTMLTextAreaElement>(
    document.getElementById("notion-text")
  );
  const elemTextile: HTMLTextAreaElement = <HTMLTextAreaElement>(
    document.getElementById("textile-text")
  );

  elemTextile.value = "";

  const notionText: string = elemNotion.value;
  const textileText: string = notion2textile(notionText);

  elemTextile.value = textileText;
  elemNotion.value = "";

  navigator.clipboard.writeText(textileText);
}

document.addEventListener("DOMContentLoaded", function () {
  const elemNotion: HTMLTextAreaElement = <HTMLTextAreaElement>(
    document.getElementById("notion-text")
  );
  const button: HTMLButtonElement = <HTMLButtonElement>(
    document.getElementById("convert-button")
  );

  // buttonクリック時の挙動
  button.addEventListener("click", btnClick);
  //ctrl+enter時の挙動
  elemNotion.addEventListener("keydown", function (event) {
    if (event.key == "Enter" && event.ctrlKey) {
      btnClick();
    }
  });
});
