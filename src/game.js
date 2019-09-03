var Cell = require('./cell')
var Color = require('./color')
var getNeighbors = require('./neighbors')

class game {

  constructor(settings) {
    this.settings = settings
    this.cells = []
    this.initializeCells()
  }

  initializeCells() {
    var res = []
    for (var x = 0; x < this.settings.size.x; x++) {
      var col = []
      for (var y = 0; y < this.settings.size.y; y++) {
        let cc = new Cell({x:x, y:y})
        cc.setNeighbors(getNeighbors(cc.position, this.settings.size.x - 1, this.settings.size.y - 1))
        col.push(cc)
      }

      res.push(col)
    }
    this.cells = res
  }

  getActiveNeighbors(tCell) {
    return tCell.neighbors
      .map((n) => {
        return this.cells[n.x][n.y]
      })
      .filter((cell) => {
        return cell.live
      })
  }

  getChangedCells() {
    var changed = []
    for (var row = 0; row < this.cells.length; row++) {
      for (var col = 0; col < this.cells[row].length; col++) {
        var curCell = this.cells[row][col]
        var activeNeighbors = this.getActiveNeighbors(curCell)
        var activeCount = activeNeighbors.length
        //console.log(activeCount )
        if (curCell.live) {
          if (activeCount < 2 || activeCount > 3) {
            changed.push(new Cell(curCell.position, curCell.color, false, curCell.neighbors))
          }
        } else if (activeCount === 3) {
          let color = Color.average(activeNeighbors.map(a => a.color))
          changed.push(new Cell(curCell.position, color, true, curCell.neighbors))
        }
      }
    }
    return changed
  }

  applyChanges(changed) {
    changed.forEach(c => (this.cells[c.pos.x][c.pos.y] = c))
  }

  tick() {
    this.applyChanges(this.getChangedCells())
  }

  render(ctx, time) {
    this.cells.forEach(row => {
      row.forEach(cell => {
        
      })
    })
    console.log(this.cells[0])
  }
}

module.exports = game