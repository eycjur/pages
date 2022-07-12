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

/***/ "./src/tsc/noformatCopy.ts":
/*!*********************************!*\
  !*** ./src/tsc/noformatCopy.ts ***!
  \*********************************/
/***/ (() => {

eval("\nfunction btnClickPastClipboard(obj = NaN) {\n    const elemText = (document.getElementById(\"text\"));\n    const text = elemText.value;\n    navigator.clipboard.writeText(text);\n}\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n    const elemNotion = (document.getElementById(\"text\"));\n    const button = (document.getElementById(\"copy-button\"));\n    button.addEventListener(\"click\", btnClickPastClipboard);\n    elemNotion.addEventListener(\"keydown\", function (event) {\n        if (event.key == \"Enter\" && event.ctrlKey) {\n            btnClickPastClipboard();\n        }\n    });\n});\n\n\n//# sourceURL=webpack://pages/./src/tsc/noformatCopy.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/tsc/noformatCopy.ts"]();
/******/ 	
/******/ })()
;