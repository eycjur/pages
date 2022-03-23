function text2notion(input: string): string {
  let output: string = input;

  output = output.replace(/\n/g, "\n\n");

  return output;
}

function btnClick(obj: any = NaN): void {  // eslint-disable-line
  const elemText: HTMLTextAreaElement = <HTMLTextAreaElement>(
    document.getElementById("text-text")
  );
  const elemNotion: HTMLTextAreaElement = <HTMLTextAreaElement>(
    document.getElementById("notion-text")
  );

  elemNotion.value = "";

  const textText: string = elemText.value;
  const notionText: string = text2notion(textText);

  elemNotion.value = notionText;
  elemText.value = "";

  navigator.clipboard.writeText(notionText);
}

document.addEventListener("DOMContentLoaded", function () {
  const elemText: HTMLTextAreaElement = <HTMLTextAreaElement>(
    document.getElementById("text-text")
  );
  const button: HTMLButtonElement = <HTMLButtonElement>(
    document.getElementById("convert-button")
  );

  // buttonクリック時の挙動
  button.addEventListener("click", btnClick);
  //ctrl+enter時の挙動
  elemText.addEventListener("keydown", function (event) {
    if (event.key == "Enter" && event.ctrlKey) {
      btnClick();
    }
  });
});
