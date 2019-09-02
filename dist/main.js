/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/cindex.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/cindex.js":
/*!***********************!*\
  !*** ./src/cindex.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var cell = {\r\n  live: true,\r\n  color: '#000'\r\n}\r\n\r\nfunction main () {\r\n  var target = document.getElementById('cgame')\r\n  // target.style.margin = '0 auto'\r\n  //var targetWidth = target.clientWidth\r\n  var compStyle = getComputedStyle(target)\r\n  console.log(compStyle.height)\r\n\r\n  target.setAttribute('width', compStyle.width.toString())\r\n  target.setAttribute('height', compStyle.height.toString())\r\n\r\n  var ctx = target.getContext('2d')\r\n\r\n  var cellXAmt = 100\r\n  var cellYAmt = 100\r\n\r\n// calculate cell size based off parent element\r\n\r\n  var cells = setup(target, cellXAmt, cellYAmt)\r\n\r\n  var speed = document.getElementById('speed')\r\n\r\n  var playBtn = document.getElementById('play')\r\n  var pp = playPause(playBtn, () => {\r\n    cells = tick(cells)\r\n    console.log('ticked')\r\n    clearGrid(target)\r\n    renderGrid(cells, target)\r\n  }, speed)\r\n  playBtn.addEventListener('click', (event) => {\r\n    event.preventDefault()\r\n   //if (!started) { renderGrid(cells, target); started = true; }\r\n    pp()\r\n  })\r\n\r\n  var resetBtn = document.getElementById('reset')\r\n  resetBtn.addEventListener('click', (event) => {\r\n    event.preventDefault()\r\n    cells = setup(target, cellXAmt, cellYAmt)\r\n  })\r\n\r\n}\r\n\r\nfunction setup(target, cellXAmt, cellYAmt) {\r\n  clearGrid(target)\r\n\r\n  var compStyle = getComputedStyle(target)\r\n\r\n  var targetWidth = parseInt(compStyle.width)\r\n\r\n  var cellWidth = Math.floor(targetWidth / cellXAmt)\r\n  var cellHeight = Math.min(Math.floor(parseInt(compStyle.height) / cellYAmt), cellWidth)\r\n\r\n  var cellXMargin = Math.floor((targetWidth % cellXAmt) / 2)\r\n\r\n  cell.width = cellWidth\r\n  cell.height = cellHeight\r\n  cell.__proto__.offset = cellXMargin\r\n\r\n  console.log(cell.offset)\r\n\r\n  var newCells = generateCells(cellXAmt, cellYAmt)\r\n\r\n  notifyNeighbors(newCells)\r\n\r\n  renderGrid(newCells, target);\r\n\r\n  return newCells\r\n}\r\n\r\nfunction playPause(button, callback, speed) {\r\n  var states = ['Play', 'Pause']\r\n  var state = 0\r\n  var hook\r\n  return function () {\r\n    if (state === 0) {\r\n      state = 1\r\n      hook = setInterval(callback, 1000 / (parseInt(speed.value) || 1))\r\n    } else {\r\n      state = 0\r\n      clearInterval(hook)\r\n    }\r\n    button.textContent = states[state]\r\n  }\r\n}\r\n\r\n// generate all cells needed to fill space in array of arrays\r\n// \"seed\" the list of cells to be live and of particular color\r\nfunction generateCells(cellXAmt, cellYAmt) {\r\n  var cellAmt = cellXAmt * cellYAmt\r\n  var res = []\r\n\r\n  var cur\r\n\r\n  for (var x = 0; x < cellXAmt; x++) {\r\n\r\n    var col = []\r\n    for (var y = 0; y < cellYAmt; y++) {\r\n      var unique = {\r\n        pos: {x, y},\r\n        live: Math.round(Math.random()),\r\n        color: Math.floor(Math.random() * Math.exp(16, 6))\r\n      }\r\n      cur = Object.assign({}, cell, unique)\r\n      col.push(cur)\r\n    }\r\n\r\n    res.push(col)\r\n\r\n  }\r\n\r\n  return res\r\n}\r\n\r\nfunction colString(colInt) {\r\n  return '#' + colInt.toString(16)\r\n}\r\n\r\nfunction changeCell(cell) {\r\n  //var cur = document.getElementById('cell-' + cell.pos.x + '-' + cell.pos.y)\r\n  cell.target.style.opacity = cell.live\r\n  cell.target.style.color = cell.colorString\r\n}\r\n\r\nfunction renderCell(cell, ctx) {\r\n  if (!cell.live) return\r\n\r\n  var startX = (cell.pos.x * cell.width) + cell.offset\r\n  var startY = cell.pos.y * cell.height\r\n\r\n  ctx.fillStyle = cell.colorString\r\n  ctx.fillRect(startX, startY, cell.width, cell.height)\r\n}\r\n\r\nfunction renderGrid(cellArray, target) {\r\n  var ctx = target.getContext('2d')\r\n\r\n  for (var i = 0; i < cellArray.length; i++) {\r\n    var row = []\r\n\r\n    for (var x = 0; x < cellArray[i].length; x++) {\r\n      let child = renderCell(cellArray[i][x], ctx)\r\n      // cellArray[i][x].target = child\r\n      // target.appendChild(child)\r\n    }\r\n  }\r\n}\r\n\r\nfunction notifyNeighbors(cellArray) {\r\n  // notify each cell of an array of its neighbors\r\n  for (var row = 0; row < cellArray.length; row++) {\r\n\r\n    for (var col = 0; col < cellArray[row].length; col++) {\r\n      var neighbors = []\r\n\r\n      var availableRows = [row]\r\n      if (row !== 0) {\r\n        availableRows.push(row - 1)\r\n      } else availableRows.push(cellArray.length - 1)\r\n      if (row !== cellArray.length - 1) {\r\n        availableRows.push(row + 1)\r\n      } else availableRows.push(0)\r\n\r\n      var availableCols = [col]\r\n      if (col !== 0) {\r\n        availableCols.push(col - 1)\r\n      } else (availableCols.push(cellArray[row].length - 1))\r\n      if (col !== cellArray.length - 1) {\r\n        availableCols.push(col + 1)\r\n      } else availableCols.push(0)\r\n\r\n      for (var aR = 0; aR < availableRows.length; aR++) {\r\n        for (var aC = 0; aC < availableCols.length; aC++) {\r\n          if (availableRows[aR] == row && availableCols[aC] == col) continue\r\n          neighbors.push([availableRows[aR], availableCols[aC]])\r\n        }\r\n      }\r\n      cellArray[row][col].neighbors = neighbors\r\n      // console.log(cellArray[row][col])\r\n    }\r\n  }\r\n}\r\n\r\n// each \"tick\" calculate new cell state based off neighbors\r\nfunction tick(cellArray) {\r\n  var changed = []\r\n  for (var row = 0; row < cellArray.length; row++) {\r\n    for (var col = 0; col < cellArray[row].length; col++) {\r\n      var curCell = cellArray[row][col]\r\n      var activeNeighbors = curCell.neighbors\r\n        .map((n) => cellArray[n[0]][n[1]])\r\n        .filter((cell) => {\r\n          return cell.live\r\n        })\r\n      var activeCount = activeNeighbors.length\r\n      //console.log(activeCount )\r\n      if (curCell.live) {\r\n        if (activeCount < 2 || activeCount > 3) {\r\n          changed.push(Object.assign({}, curCell, {live: 0}))\r\n        }\r\n      } else if (activeCount === 3) {\r\n        let color = averageColor(activeNeighbors)\r\n        changed.push(Object.assign({}, curCell, {live: 1, color: color, colorString: colString(color)}))\r\n      }\r\n    }\r\n  }\r\n  changed.forEach(c => cellArray[c.pos.x][c.pos.y] = c)\r\n  //changed.forEach(changeCell)\r\n  return cellArray\r\n}\r\n\r\nfunction averageColor(items) {\r\n  var avg = items\r\n    .map((item) => item.color)\r\n    .reduce((acc, item) => acc += item)\r\n  return Math.floor(avg / items.length)\r\n}\r\n\r\nfunction clearGrid(target) {\r\n  var ctx = target.getContext('2d')\r\n  ctx.clearRect(0,0,target.width, target.height)\r\n}\r\n\r\nwindow.addEventListener('load', main)\r\n\n\n//# sourceURL=webpack:///./src/cindex.js?");

/***/ })

/******/ });