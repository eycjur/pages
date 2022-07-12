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

/***/ "./src/tsc/convert.ts":
/*!****************************!*\
  !*** ./src/tsc/convert.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"markdown2xml\": () => (/* binding */ markdown2xml),\n/* harmony export */   \"notion2textile\": () => (/* binding */ notion2textile),\n/* harmony export */   \"xml2textile\": () => (/* binding */ xml2textile)\n/* harmony export */ });\nfunction notion2textile(input) {\n    input = markdown2xml(input);\n    input = xmlCareForNotion(input);\n    input = xml2textile(input);\n    return input;\n}\nfunction markdown2xml(input) {\n    let output = input;\n    output = output.replace(/^(#{1,3})(?= )/gm, function (...args) {\n        return args[0].replace(/#/g, \"<h>\");\n    });\n    output = output.replace(/^((?: {4})*)[*-](?= )/gm, function (...args) {\n        const spaceNum = Math.floor(args[1].length / 4);\n        return args[1] + \"<ul>\".repeat(spaceNum + 1);\n    });\n    output = output.replace(/^((?: {4})*)([0-9]\\.)(?= )/gm, function (...args) {\n        const spaceNum = Math.floor(args[1].length / 4);\n        return args[1] + \"<ol>\".repeat(spaceNum + 1);\n    });\n    output = output.replace(/!\\[(.*?)\\]\\((.*?)\\)/gs, function (...args) {\n        return \"<picture_start>\" + args[2] + \"<picture_end>\";\n    });\n    output = output.replace(/\\[(.*?)\\]\\((.*?)\\)/gm, function (...args) {\n        return \"<link_start>\" + args[1] + \"<link_middle>\" + args[2] + \"<link_end>\";\n    });\n    output = output.replace(/`{3}(.*?)(\\n.*?)`{3}/gs, function (...args) {\n        if (args[1] == \"\") {\n            return \"<codeblock_start>\" + args[2] + \"<codeblock_end>\";\n        }\n        return ('<codeblock_start><code class=\"' +\n            args[1] +\n            '\">' +\n            args[2] +\n            \"</code><codeblock_end>\");\n    });\n    output = output.replace(/^>(?= )/gm, \"<quote>\");\n    output = output.replace(/(?<=^| )`(.*?)`(?=$| )/gm, function (...args) {\n        return \"<code_start>\" + args[1] + \"<code_end>\";\n    });\n    output = output.replace(/(?<=^| )\\*\\*(.*?)\\*\\*(?=$| )/gm, function (...args) {\n        return \"<bold_start>\" + args[1] + \"<bold_end>\";\n    });\n    output = output.replace(/(?<=^| )\\*(.*?)\\*(?=$| )/gm, function (...args) {\n        return \"<italic_start>\" + args[1] + \"<italic_end>\";\n    });\n    output = output.replace(/(?<=^| )~~(.*?)~~(?=$| )/gm, function (...args) {\n        return \"<strikethrough_start>\" + args[1] + \"<strikethrough_end>\";\n    });\n    return output;\n}\nfunction xml2textile(input) {\n    let output = input;\n    output = output.replace(/^((<h>){1,4})(?= )/gm, function (...args) {\n        return \"h\" + (args[1].split(\"<h>\").length - 1) + \".\";\n    });\n    output = output.replace(/<ul>/g, \"*\");\n    output = output.replace(/<ol>/g, \"#\");\n    output = output.replace(/<picture_start>/g, \"!\");\n    output = output.replace(/<picture_end>/g, \"!\");\n    output = output.replace(/<link_start>/g, '\"');\n    output = output.replace(/<link_middle>/g, '\":');\n    output = output.replace(/<link_end>/g, \"\");\n    output = output.replace(/<codeblock_start>/g, \"<pre>\");\n    output = output.replace(/<codeblock_end>/g, \"</pre>\");\n    output = output.replace(/<quote>/gm, \"bq.\");\n    output = output.replace(/<code_start>/g, \"@\");\n    output = output.replace(/<code_end>/g, \"@\");\n    output = output.replace(/<bold_start>/g, \"*\");\n    output = output.replace(/<bold_end>/g, \"*\");\n    output = output.replace(/<italic_start>/g, \"_\");\n    output = output.replace(/<italic_end>/g, \"_\");\n    output = output.replace(/<strikethrough_start>/g, \"-\");\n    output = output.replace(/<strikethrough_end>/g, \"-\");\n    output = output.replace(/^ */gm, \"\");\n    return output;\n}\nfunction xmlCareForNotion(input) {\n    let output = input;\n    output = output.replace(/(\\n( *)[^<\\n]+?)\\n(?=\\n( *)[^ <])/gs, function (...args) {\n        if (args[2].length > args[3].length) {\n            return args[1] + \"\\n\";\n        }\n        return args[1];\n    });\n    output = output.replace(/\\n\\n<ul><ul>/gm, \"\\n<ul><ul>\");\n    output = output.replace(/\\n\\n<ol><ol>/gm, \"\\n<ol><ol>\");\n    output = output.replace(/\\n\\n +?(?=[^< ])/, function (...args) {\n        return args[0].replace(\"\\n\\n\", \"\\n\");\n    });\n    output = output.replace(/\\n *\\n(?= )/g, \"\\n\");\n    return output;\n}\n\n\n//# sourceURL=webpack://pages/./src/tsc/convert.ts?");

/***/ }),

/***/ "./src/tsc/notion2textile.ts":
/*!***********************************!*\
  !*** ./src/tsc/notion2textile.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _convert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./convert */ \"./src/tsc/convert.ts\");\n\nfunction btnClickNotion2textile(obj = NaN) {\n    const elemNotion = (document.getElementById(\"notion-text\"));\n    const elemTextile = (document.getElementById(\"textile-text\"));\n    elemTextile.value = \"\";\n    const notionText = elemNotion.value;\n    const textileText = (0,_convert__WEBPACK_IMPORTED_MODULE_0__.notion2textile)(notionText);\n    elemTextile.value = textileText;\n    elemNotion.value = \"\";\n    navigator.clipboard.writeText(textileText);\n}\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n    const elemNotion = (document.getElementById(\"notion-text\"));\n    const button = (document.getElementById(\"convert-button\"));\n    button.addEventListener(\"click\", btnClickNotion2textile);\n    elemNotion.addEventListener(\"keydown\", function (event) {\n        if (event.key == \"Enter\" && event.ctrlKey) {\n            btnClickNotion2textile();\n        }\n    });\n});\n\n\n//# sourceURL=webpack://pages/./src/tsc/notion2textile.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/tsc/notion2textile.ts");
/******/ 	
/******/ })()
;