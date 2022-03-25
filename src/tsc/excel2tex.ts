function excel2tex(input: string, is_shrink: boolean): string {
  const tab_character = input.split("\n")[0].match(/\t/g);
  let cnt;
  if (tab_character === null) {
    cnt = 0;
  } else {
    cnt = tab_character.length;
  }

  input = input.replace(/\t/g, " & ");
  input = input.replace(/\n/g, " \\\\\n");
  // 最後の文字が改行だったら削除
  if (input.slice(-1) == "\n") {
    input = input.slice(0, -1);
  }

  input = `\\begin{tabular}{${"c".repeat(
    cnt + 1
  )}}\n${input}\n\\end{tabular}\n`;

  if (is_shrink) {
    input = "\\scalebox{0.85}{\n" + input + "}\n";
  }

  input = "\\caption{}\n" + input;
  input = "\\label{table:}\n" + input;
  input = "\\begin{center}\n" + input + "\\end{center}" + "\n";
  input = "\\begin{table}[htbp]\n" + input + "\\end{table}" + "\n";

  return input;
}

function pad0(num: number): string {
  return String(num).padStart(2, "0");
}

function bunClickExcel2tex(obj: any = NaN): void {  // eslint-disable-line
  const elemExcel: HTMLTextAreaElement = <HTMLTextAreaElement>(
    document.getElementById("excel-text")
  );
  const elemTex: HTMLTextAreaElement = <HTMLTextAreaElement>(
    document.getElementById("tex-text")
  );
  const elemShrink: HTMLInputElement = <HTMLInputElement>(
    document.getElementById("shrink-check")
  );
  const is_shrink = elemShrink.checked;
  const elemDone: HTMLButtonElement = <HTMLButtonElement>(
    document.getElementById("done-text")
  );
  elemTex.value = "";

  const excelText: string = elemExcel.value;
  const texText: string = excel2tex(excelText, is_shrink);

  elemTex.value = texText;
  elemExcel.value = "";

  navigator.clipboard.writeText(texText);

  // 変換した時刻を表示する
  const date = new Date();
  const time = `${pad0(date.getHours())}:${pad0(date.getMinutes())}:${pad0(
    date.getSeconds()
  )}`;
  elemDone.innerText = `変更&コピーしました(${time})`;
}

//enter時の挙動
document.addEventListener("DOMContentLoaded", function () {
  const elemExcel: HTMLFormElement = <HTMLFormElement>(
    document.getElementById("excel-text")
  );
  const button: HTMLButtonElement = <HTMLButtonElement>(
    document.getElementById("convert-button")
  );

  // buttonクリック時の挙動
  button.addEventListener("click", bunClickExcel2tex);
  //ctrl+enter時の挙動
  elemExcel.addEventListener("keydown", function (event) {
    if (event.key == "Enter" && event.ctrlKey) {
      bunClickExcel2tex();
    }
  });
});
