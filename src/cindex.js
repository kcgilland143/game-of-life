var cell = {
  live: true,
  color: '#000'
}

function main () {
  var target = document.getElementById('cgame')
  // target.style.margin = '0 auto'
  //var targetWidth = target.clientWidth
  var compStyle = getComputedStyle(target)
  console.log(compStyle.height)

  target.setAttribute('width', compStyle.width.toString())
  target.setAttribute('height', compStyle.height.toString())

  var ctx = target.getContext('2d')

  var cellXAmt = 100
  var cellYAmt = 100

// calculate cell size based off parent element

  var cells = setup(target, cellXAmt, cellYAmt)

  var speed = document.getElementById('speed')

  var playBtn = document.getElementById('play')
  var pp = playPause(playBtn, () => {
    cells = tick(cells)
    console.log('ticked')
    clearGrid(target)
    renderGrid(cells, target)
  }, speed)
  playBtn.addEventListener('click', (event) => {
    event.preventDefault()
   //if (!started) { renderGrid(cells, target); started = true; }
    pp()
  })

  var resetBtn = document.getElementById('reset')
  resetBtn.addEventListener('click', (event) => {
    event.preventDefault()
    cells = setup(target, cellXAmt, cellYAmt)
  })

}

function setup(target, cellXAmt, cellYAmt) {
  clearGrid(target)

  var compStyle = getComputedStyle(target)

  var targetWidth = parseInt(compStyle.width)

  var cellWidth = Math.floor(targetWidth / cellXAmt)
  var cellHeight = Math.min(Math.floor(parseInt(compStyle.height) / cellYAmt), cellWidth)

  var cellXMargin = Math.floor((targetWidth % cellXAmt) / 2)

  cell.width = cellWidth
  cell.height = cellHeight
  cell.__proto__.offset = cellXMargin

  console.log(cell.offset)

  var newCells = generateCells(cellXAmt, cellYAmt)

  notifyNeighbors(newCells)

  renderGrid(newCells, target);

  return newCells
}

function playPause(button, callback, speed) {
  var states = ['Play', 'Pause']
  var state = 0
  var hook
  return function () {
    if (state === 0) {
      state = 1
      hook = setInterval(callback, 1000 / (parseInt(speed.value) || 1))
    } else {
      state = 0
      clearInterval(hook)
    }
    button.textContent = states[state]
  }
}

// generate all cells needed to fill space in array of arrays
// "seed" the list of cells to be live and of particular color
function generateCells(cellXAmt, cellYAmt) {
  var cellAmt = cellXAmt * cellYAmt
  var res = []

  var cur

  for (var x = 0; x < cellXAmt; x++) {

    var col = []
    for (var y = 0; y < cellYAmt; y++) {
      var unique = {
        pos: {x, y},
        live: Math.round(Math.random()),
        color: Math.floor(Math.random() * Math.exp(16, 6))
      }
      cur = Object.assign({}, cell, unique)
      col.push(cur)
    }

    res.push(col)

  }

  return res
}

function colString(colInt) {
  return '#' + colInt.toString(16)
}

function changeCell(cell) {
  //var cur = document.getElementById('cell-' + cell.pos.x + '-' + cell.pos.y)
  cell.target.style.opacity = cell.live
  cell.target.style.color = cell.colorString
}

function renderCell(cell, ctx) {
  if (!cell.live) return

  var startX = (cell.pos.x * cell.width) + cell.offset
  var startY = cell.pos.y * cell.height

  ctx.fillStyle = cell.colorString
  ctx.fillRect(startX, startY, cell.width, cell.height)
}

function renderGrid(cellArray, target) {
  var ctx = target.getContext('2d')

  for (var i = 0; i < cellArray.length; i++) {
    var row = []

    for (var x = 0; x < cellArray[i].length; x++) {
      let child = renderCell(cellArray[i][x], ctx)
      // cellArray[i][x].target = child
      // target.appendChild(child)
    }
  }
}

function notifyNeighbors(cellArray) {
  // notify each cell of an array of its neighbors
  for (var row = 0; row < cellArray.length; row++) {

    for (var col = 0; col < cellArray[row].length; col++) {
      var neighbors = []

      var availableRows = [row]
      if (row !== 0) {
        availableRows.push(row - 1)
      } else availableRows.push(cellArray.length - 1)
      if (row !== cellArray.length - 1) {
        availableRows.push(row + 1)
      } else availableRows.push(0)

      var availableCols = [col]
      if (col !== 0) {
        availableCols.push(col - 1)
      } else (availableCols.push(cellArray[row].length - 1))
      if (col !== cellArray.length - 1) {
        availableCols.push(col + 1)
      } else availableCols.push(0)

      for (var aR = 0; aR < availableRows.length; aR++) {
        for (var aC = 0; aC < availableCols.length; aC++) {
          if (availableRows[aR] == row && availableCols[aC] == col) continue
          neighbors.push([availableRows[aR], availableCols[aC]])
        }
      }
      cellArray[row][col].neighbors = neighbors
      // console.log(cellArray[row][col])
    }
  }
}

// each "tick" calculate new cell state based off neighbors
function tick(cellArray) {
  var changed = []
  for (var row = 0; row < cellArray.length; row++) {
    for (var col = 0; col < cellArray[row].length; col++) {
      var curCell = cellArray[row][col]
      var activeNeighbors = curCell.neighbors
        .map((n) => cellArray[n[0]][n[1]])
        .filter((cell) => {
          return cell.live
        })
      var activeCount = activeNeighbors.length
      //console.log(activeCount )
      if (curCell.live) {
        if (activeCount < 2 || activeCount > 3) {
          changed.push(Object.assign({}, curCell, {live: 0}))
        }
      } else if (activeCount === 3) {
        let color = averageColor(activeNeighbors)
        changed.push(Object.assign({}, curCell, {live: 1, color: color, colorString: colString(color)}))
      }
    }
  }
  changed.forEach(c => cellArray[c.pos.x][c.pos.y] = c)
  //changed.forEach(changeCell)
  return cellArray
}

function averageColor(items) {
  var avg = items
    .map((item) => item.color)
    .reduce((acc, item) => acc += item)
  return Math.floor(avg / items.length)
}

function clearGrid(target) {
  var ctx = target.getContext('2d')
  ctx.clearRect(0,0,target.width, target.height)
}

window.addEventListener('load', main)
