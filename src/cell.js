const Color = require('./color')

class cell {
  constructor(position, color, live=false, neighbors) {
    this.position = position
    this.color = color || new Color({r: 10, g: 20, b: 30, a: 1})
    this.live = live
    this.neighbors = []
  }

  setLive(live) {
    this.live = live
  }

  setColor(color) {
    this.color = color
  }

  setNeighbors(neighbors) {
    this.neighbors = neighbors
  }
}

module.exports = cell