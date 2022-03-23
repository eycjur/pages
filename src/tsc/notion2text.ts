function notion2text(input: string): string {
  let output: string = input;

  // 数式関連
  output = output.replace(/\$/g, "");
  output = output.replace(/{/g, "(");
  output = output.replace(/}/g, ")");

  // 改行関連
  output = output.replace(/\\frac(.*?)}{/g, function (...args) {
    return args[1] + ")/(";
  });
  output = output.replace(/\n\n/g, "\n");

  // 装飾文字関連
  output = output.replace(/^( *)[-*>] /gm, "");
  output = output.replace(/^#{1,4} /gm, "");

  return output;
}

function btnClick(obj: any = NaN): void {  // eslint-disable-line
  const elemNotion: HTMLTextAreaElement = <HTMLTextAreaElement>(
    document.getElementById("notion-text")
  );
  const elemText: HTMLTextAreaElement = <HTMLTextAreaElement>(
    document.getElementById("text-text")
  );

  elemText.value = "";

  const notionText: string = elemNotion.value;
  const textText: string = notion2text(notionText);

  elemText.value = textText;
  elemNotion.value = "";

  navigator.clipboard.writeText(textText);
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
