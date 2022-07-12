/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/tsc/excel2tex.ts":
/*!******************************!*\
  !*** ./src/tsc/excel2tex.ts ***!
  \******************************/
/***/ (() => {

eval("\nfunction excel2tex(input, is_shrink) {\n    const tab_character = input.split(\"\\n\")[0].match(/\\t/g);\n    let cnt;\n    if (tab_character === null) {\n        cnt = 0;\n    }\n    else {\n        cnt = tab_character.length;\n    }\n    input = input.replace(/\\t/g, \" & \");\n    input = input.replace(/\\n/g, \" \\\\\\\\\\n\");\n    if (input.slice(-1) == \"\\n\") {\n        input = input.slice(0, -1);\n    }\n    input = `\\\\begin{tabular}{${\"c\".repeat(cnt + 1)}}\\n${input}\\n\\\\end{tabular}\\n`;\n    if (is_shrink) {\n        input = \"\\\\scalebox{0.85}{\\n\" + input + \"}\\n\";\n    }\n    input = \"\\\\caption{}\\n\" + input;\n    input = \"\\\\label{table:}\\n\" + input;\n    input = \"\\\\begin{center}\\n\" + input + \"\\\\end{center}\" + \"\\n\";\n    input = \"\\\\begin{table}[htbp]\\n\" + input + \"\\\\end{table}\" + \"\\n\";\n    return input;\n}\nfunction pad0(num) {\n    return String(num).padStart(2, \"0\");\n}\nfunction bunClickExcel2tex(obj = NaN) {\n    const elemExcel = (document.getElementById(\"excel-text\"));\n    const elemTex = (document.getElementById(\"tex-text\"));\n    const elemShrink = (document.getElementById(\"shrink-check\"));\n    const is_shrink = elemShrink.checked;\n    const elemDone = (document.getElementById(\"done-text\"));\n    elemTex.value = \"\";\n    const excelText = elemExcel.value;\n    const texText = excel2tex(excelText, is_shrink);\n    elemTex.value = texText;\n    elemExcel.value = \"\";\n    navigator.clipboard.writeText(texText);\n    const date = new Date();\n    const time = `${pad0(date.getHours())}:${pad0(date.getMinutes())}:${pad0(date.getSeconds())}`;\n    elemDone.innerText = `変更&コピーしました(${time})`;\n}\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n    const elemExcel = (document.getElementById(\"excel-text\"));\n    const button = (document.getElementById(\"convert-button\"));\n    button.addEventListener(\"click\", bunClickExcel2tex);\n    elemExcel.addEventListener(\"keydown\", function (event) {\n        if (event.key == \"Enter\" && event.ctrlKey) {\n            bunClickExcel2tex();\n        }\n    });\n});\n\n\n//# sourceURL=webpack://pages/./src/tsc/excel2tex.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/tsc/excel2tex.ts"]();
/******/ 	
/******/ })()
;