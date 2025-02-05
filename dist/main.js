/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("function component() {\n  /* callbacks - functions that are passed into another function as an argument \n  this is a function declaration:\n  - has function keyword\n  1. it's hoisted, can be called before it appears in the code\n  2. it's named, always has an identifier that's useful in stack traces\n  3. more readable, useful for stack traces and debugging */\n  function namedFunkyFunction(music, isWhiteBoy) {\n    if (isWhiteBoy) {\n      // function body\n      console.log(\"Play: \" + music);\n    }\n  }\n  /* this is a function expression:\n  1. it's not hoisted\n  2. can be used as an argument to another function or assigned dynamically\n  3. can be anonymous or named - naming helps in debugging \n  \n  anonymous functions are mostly used by passing them into other functions as a callback */\n  const anonymousFunkyFunction = function (music, isWhiteBoy) {\n    if (isWhiteBoy) {\n      console.log(\"Play: \" + music);\n    }\n  };\n\n  /* arrow functions are a shorter way to to write functions\n  if there is only one argument - parenthesis can be omitted\n  if arrow function is only one line, brackets and return keyword can be omitted */\n  const arrowFunkyFunction = (music, isWhiteBoy) => {\n    if (isWhiteBoy) {\n      console.log(\"Play: \" + music);\n    }\n  };\n\n  // each of the above functions can be called exactly the same way\n  namedFunkyFunction(\"that funky music\", true);\n\n  // I can call all of these functions like: `playThe('blues')`\n  const playTheOne = (funky) => {\n    return funky + \" music\";\n  };\n\n  const playTheTwo = (funky) => {\n    return funky + \" music\";\n  };\n\n  const playTheThree = (funky) => funky + \" music\";\n\n  // these functions are identical, they're arrow functions without an argument\n  const playThatFour = () => \"funky music\";\n\n  const playThatFive = () => {\n    return \"funky music\";\n  };\n\n  const playThatSix = () => {\n    return \"funky music\";\n  };\n\n  const notes = [\"do\", \"re\", \"me\"];\n\n  /* forEach array method takes a callback as its argument \n  all these do the same thing */\n  notes.forEach((note) => console.log(note));\n\n  notes.forEach(function (note) {\n    console.log(note);\n  });\n\n  notes.forEach(console.log);\n\n  // what forEach might look like under the hood\n  function myForEach(array, callback) {\n    // calls callback function each time it loops over an item\n    for (let i = 0; i < array.length; i++) {\n      // calls the callback function\n      callback(array[i]);\n    }\n  }\n\n  const myArry = [2, 3, 4, 2];\n  /* item comes from the function calling the callback with an argument\n  callback(array[i*]) calls the callback with an argument, which is \n  defined here inline as an anonymous function */\n  myForEach(myArry, (item) => {\n    console.log(item + 2);\n  });\n\n  // () not needed since there's only one argument\n  myForEach(myArry, (item) => console.log(item + 2));\n\n  myForEach(myArry, function (item) {\n    console.log(item + 2);\n  });\n\n  /* declares the function I want to use as a callback \n  defines item as a parameter to be passed in when it's called by the myForEach function */\n  function printItemPlusTwo(item) {\n    console.log(item + 2);\n  }\n\n  // item already declared elsewhere\n  myForEach(myArry, printItemPlusTwo);\n\n  function myMap(array, callback) {\n    const myNewArray = [];\n\n    for (let i = 0; i < array.length; i++) {\n      const callbackResult = callback(array[i]);\n      myNewArray.push(callbackResult);\n    }\n\n    return myNewArray;\n  }\n\n  const addedArrayOne = myMap([1, 2, 3], (arrayNum) => {\n    return arrayNum + 2;\n  });\n  console.log(addedArrayOne);\n\n  // or\n  const addedArrayTwo = myMap([1, 2, 3], (arrayNum) => arrayNum + 2);\n  console.log(addedArrayTwo);\n\n  const elementOne = document.querySelector(\"#myId\");\n  /* event is passed into the callback from the .addEventListener function\n  when it receives a click event \n  the callback is an anonymous arrow function */\n  elementOne.addEventListener(\"click\", (event) => {\n    console.log(event.target.value);\n  });\n\n  // callback here is a function declaration\n  const elementTwo = document.querySelector(\"#myId\");\n  /* event object is passed into the callback function by the .addEventListener \n  function, .addEventListener function calling the callback function */\n  elementTwo.addEventListener(\"click\", function (event) {\n    console.log(event.target.value);\n  });\n\n  /* I could declare a function outside of the argument list and just add it by\n  its name as well */\n  function myEventHandler(event) {\n    // do something, probably with 'event'\n  }\n\n  const elementThree = document.querySelector(\"#otherId\");\n  elementThree.addEventListener(\"click\", myEventHandler);\n\n  const element = document.createElement(\"div\");\n\n  element.innerHTML = \"Hello\";\n\n  return element;\n}\n\ndocument.body.appendChild(component());\n\n\n//# sourceURL=webpack://intro-to-nodejs/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;