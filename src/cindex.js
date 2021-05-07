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

  var ctx = target.getContext('2d')
  ctx.zoom = 1

  var cellXAmt = 200
  var cellYAmt = 200

  let cColor = '#000' //current color for user added cells

  var cells = setup(target, cellXAmt, cellYAmt)

  document.getElementById('pin').addEventListener('click', (e) => {
    e.preventDefault()
    ctx.zoom = ctx.zoom + 0.1
    console.log('test')
    console.log('zoom level:', ctx.zoom, getCellWidth(cell, ctx.zoom))

  })
  document.getElementById('pout').addEventListener('click', (e) => {
    e.preventDefault()
    ctx.zoom = ctx.zoom - 0.1
  })

  document.getElementById('ccolor').addEventListener('change', (e) => {
    cColor = e.target.value
    console.log(colInt(cColor))
  })


// calculate cell size based off parent element
  let hx, hy

  target.addEventListener('mousemove', function (e) {
    // console.log('Hover: ', e.y, ', ', e.y)
    let specialCell;
    let hc;

    //console.log(hc)
    try {
      let hc = getIntersectingCell(e.x, e.y, cell, ctx.zoom)
      console.log(hc)
      if (hc.x > cellXAmt || hc.y > cellYAmt) return;
      specialCell = cells[hc.x][hc.y]
    } catch (err) {
      console.log(err)
      console.dir(specialCell, hc, e.x, e.y, cell)
    } 
    if (!specialCell) return;
    if (e.buttons) {
      specialCell.color = colInt(cColor)
      specialCell.colorString = cColor
      specialCell.live = true
    }
    outlineCell(specialCell, ctx, cColor)
  })

  // target.addEventListener('scroll', (e) => {
  //   console.log(e)
  // }) 

  var speed = document.getElementById('speed')

  var playBtn = document.getElementById('play')
  
  var pp = playPause(playBtn, () => {
    cells = tick(cells)
    console.log('ticked')

    clearGrid(target)
    renderGrid(cells, target)
    if (specialCell) outlineCell(specialCell, ctx, "#000");
  }, speed)

  speed.addEventListener('change', function (e) {
    pp(); pp();
  })

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

//setup method does too much.
//
function setup(target, cellXAmt, cellYAmt) {
  clearGrid(target)

  var compStyle = getComputedStyle(target)

  var targetWidth = parseInt(compStyle.width)

  target.setAttribute('width', compStyle.width.toString())
  target.setAttribute('height', compStyle.height.toString())

  var cellWidth = Math.floor(targetWidth / cellXAmt)
  var cellHeight = Math.min(Math.floor(parseInt(compStyle.height) / cellYAmt), cellWidth)

  var cellXMargin = Math.floor((targetWidth % cellXAmt) / 2)

  cell.width = cellWidth
  cell.height = cellHeight
  cell.__proto__.offset = cellXMargin

  console.log(cell.offset)

  var newCells = generateCells(cellXAmt, cellYAmt)

  notifyNeighbors(newCells)

  //renderGrid(newCells, target);

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
        live: Math.random() > 0.9,
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

function colInt(colString) {
  let s = colString.slice(1)
  return parseInt('0x' + s)
}

function changeCell(cell) {
  //var cur = document.getElementById('cell-' + cell.pos.x + '-' + cell.pos.y)
  cell.target.style.opacity = cell.live
  cell.target.style.color = cell.colorString
}

function getCellPosition(cell, zoom) {
  return {
    x: (cell.pos.x * getCellWidth(cell, zoom)) + cell.offset * zoom,
    y: cell.pos.y * getCellHeight(cell, zoom)
  }
}

function getIntersectingCell(x, y, cell, zoom) {
  let hx = x  - (cell.offset * zoom)
  let hy = y 

  hx = hx > 0 ? Math.floor(hx / (cell.width * zoom)) : 0
  hy = hy > 0 ? Math.floor(hy  / (cell.height * zoom)) : 0
  return {
    x: hx,
    y: hy
  }
    // hx = Math.floor((e.x  - cell.offset) / cell.width)
    // hy = Math.floor(e.y / cell.height)
}

function getCellWidth(cell, zoom) {
  let cw = cell.width * zoom
  return cw
}

function getCellHeight(cell, zoom) {
  return cell.height * zoom
}

function outlineCell(cell, ctx, colorString) {
  let pos = getCellPosition(cell, ctx.zoom)
  ctx.strokeStyle = colorString || '#000'
  ctx.strokeRect(pos.x, pos.y, getCellWidth(cell, ctx.zoom), getCellHeight(cell, ctx.zoom))
}

function renderCell(cell, ctx) {
  if (!cell.live) return

  let pos = getCellPosition(cell, ctx.zoom)

  ctx.fillStyle = cell.colorString
  ctx.fillRect(pos.x, pos.y, 
    getCellWidth(cell, ctx.zoom), 
    getCellHeight(cell, ctx.zoom))
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

      let cnx, cny
      let activeCount = 0
      let activeNeighbors = []
      for (var i = curCell.neighbors.length - 1; i >= 0; i--) {
        cnx = curCell.neighbors[i]
        cny = cnx[1]
        cnx = cnx[0]
        if (cellArray[cnx][cny].live) {
          activeCount++;
          activeNeighbors.push(cellArray[cnx][cny])
        }
      }
      // var activeNeighbors = curCell.neighbors
      //   .map((n) => cellArray[n[0]][n[1]])
      //   .filter((cell) => {
      //     return cell.live
      //   })
      // var activeCount = activeNeighbors.length
      //console.log(activeCount )
      if (curCell.live) {
        if (activeCount < 2 || activeCount > 3) {
          changed.push(Object.assign({}, curCell, {live: 0}))
        }
      } else if (activeCount === 3) {
        let color = averageColor(activeNeighbors)
        changed.push(Object.assign({}, curCell, 
          {
            live: 1, 
            color: color, 
            colorString: colString(color)
          }))
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
