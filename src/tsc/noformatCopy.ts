function btnClickPastClipboard(obj: any = NaN): void {  // eslint-disable-line
  const elemText: HTMLTextAreaElement = <HTMLTextAreaElement>(
    document.getElementById("text")
  );

  const text: string = elemText.value;

  navigator.clipboard.writeText(text);
}

document.addEventListener("DOMContentLoaded", function () {
  const elemNotion: HTMLTextAreaElement = <HTMLTextAreaElement>(
    document.getElementById("text")
  );
  const button: HTMLButtonElement = <HTMLButtonElement>(
    document.getElementById("copy-button")
  );

  // buttonクリック時の挙動
  button.addEventListener("click", btnClickPastClipboard);
  //ctrl+enter時の挙動
  elemNotion.addEventListener("keydown", function (event) {
    if (event.key == "Enter" && event.ctrlKey) {
      btnClickPastClipboard();
    }
  });
});
