class cell {
  constructor(position, color, live=false, neighbors) {
    this.position = position
    this.color = color
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