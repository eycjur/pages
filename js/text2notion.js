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

/***/ "./src/tsc/text2notion.ts":
/*!********************************!*\
  !*** ./src/tsc/text2notion.ts ***!
  \********************************/
/***/ (() => {

eval("\nfunction text2notion(input) {\n    let output = input;\n    output = output.replace(/\\n/g, \"\\n\\n\");\n    return output;\n}\nfunction btnClickText2Notion(obj = NaN) {\n    const elemText = (document.getElementById(\"text-text\"));\n    const elemNotion = (document.getElementById(\"notion-text\"));\n    elemNotion.value = \"\";\n    const textText = elemText.value;\n    const notionText = text2notion(textText);\n    elemNotion.value = notionText;\n    elemText.value = \"\";\n    navigator.clipboard.writeText(notionText);\n}\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n    const elemText = (document.getElementById(\"text-text\"));\n    const button = (document.getElementById(\"convert-button\"));\n    button.addEventListener(\"click\", btnClickText2Notion);\n    elemText.addEventListener(\"keydown\", function (event) {\n        if (event.key == \"Enter\" && event.ctrlKey) {\n            btnClickText2Notion();\n        }\n    });\n});\n\n\n//# sourceURL=webpack://pages/./src/tsc/text2notion.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/tsc/text2notion.ts"]();
/******/ 	
/******/ })()
;