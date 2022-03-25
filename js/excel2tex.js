"use strict";
function excel2tex(input, is_shrink) {
    const tab_character = input.split("\n")[0].match(/\t/g);
    let cnt;
    if (tab_character === null) {
        cnt = 0;
    }
    else {
        cnt = tab_character.length;
    }
    input = input.replace(/\t/g, " & ");
    input = input.replace(/\n/g, " \\\\\n");
    if (input.slice(-1) == "\n") {
        input = input.slice(0, -1);
    }
    input = `\\begin{tabular}{${"c".repeat(cnt + 1)}}\n${input}\n\\end{tabular}\n`;
    if (is_shrink) {
        input = "\\scalebox{0.85}{\n" + input + "}\n";
    }
    input = "\\caption{}\n" + input;
    input = "\\label{table:}\n" + input;
    input = "\\begin{center}\n" + input + "\\end{center}" + "\n";
    input = "\\begin{table}[htbp]\n" + input + "\\end{table}" + "\n";
    return input;
}
function pad0(num) {
    return String(num).padStart(2, "0");
}
function bunClickExcel2tex(obj = NaN) {
    const elemExcel = (document.getElementById("excel-text"));
    const elemTex = (document.getElementById("tex-text"));
    const elemShrink = (document.getElementById("shrink-check"));
    const is_shrink = elemShrink.checked;
    const elemDone = (document.getElementById("done-text"));
    elemTex.value = "";
    const excelText = elemExcel.value;
    const texText = excel2tex(excelText, is_shrink);
    elemTex.value = texText;
    elemExcel.value = "";
    navigator.clipboard.writeText(texText);
    const date = new Date();
    const time = `${pad0(date.getHours())}:${pad0(date.getMinutes())}:${pad0(date.getSeconds())}`;
    elemDone.innerText = `変更&コピーしました(${time})`;
}
document.addEventListener("DOMContentLoaded", function () {
    const elemExcel = (document.getElementById("excel-text"));
    const button = (document.getElementById("convert-button"));
    button.addEventListener("click", bunClickExcel2tex);
    elemExcel.addEventListener("keydown", function (event) {
        if (event.key == "Enter" && event.ctrlKey) {
            bunClickExcel2tex();
        }
    });
});
//# sourceMappingURL=excel2tex.js.map