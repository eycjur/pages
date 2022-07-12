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

/***/ "./src/tsc/notion2text.ts":
/*!********************************!*\
  !*** ./src/tsc/notion2text.ts ***!
  \********************************/
/***/ (() => {

eval("\nfunction notion2text(input) {\n    let output = input;\n    output = output.replace(/\\$/g, \"\");\n    output = output.replace(/{/g, \"(\");\n    output = output.replace(/}/g, \")\");\n    output = output.replace(/\\\\frac(.*?)}{/g, function (...args) {\n        return args[1] + \")/(\";\n    });\n    output = output.replace(/\\n\\n/g, \"\\n\");\n    output = output.replace(/^( *)[-*>] /gm, \"\");\n    output = output.replace(/^#{1,4} /gm, \"\");\n    return output;\n}\nfunction btnClickNotion2text(obj = NaN) {\n    const elemNotion = (document.getElementById(\"notion-text\"));\n    const elemText = (document.getElementById(\"text-text\"));\n    elemText.value = \"\";\n    const notionText = elemNotion.value;\n    const textText = notion2text(notionText);\n    elemText.value = textText;\n    elemNotion.value = \"\";\n    navigator.clipboard.writeText(textText);\n}\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n    const elemNotion = (document.getElementById(\"notion-text\"));\n    const button = (document.getElementById(\"convert-button\"));\n    button.addEventListener(\"click\", btnClickNotion2text);\n    elemNotion.addEventListener(\"keydown\", function (event) {\n        if (event.key == \"Enter\" && event.ctrlKey) {\n            btnClickNotion2text();\n        }\n    });\n});\n\n\n//# sourceURL=webpack://pages/./src/tsc/notion2text.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/tsc/notion2text.ts"]();
/******/ 	
/******/ })()
;