const neighbors = [[-1, -1],[0, -1],[1, -1],
  [-1, 0],[1, 0],
  [-1, 1],[0, 1],[1, 1]]

function getNeighbors(position, xMax, yMax) {
  return neighbors.map(n => {
    let res = {
      x: n[0] + position.x,
      y: n[1] + position.y
    }
    if (res.x < 0) {
      res.x = xMax
    } else if (res.x > xMax) {
      res.x = 0
    }
    if (res.y < 0) {
      res.y = yMax
    } else if (res.y > yMax) {
      res.y = 0
    }
    return res
  })
}

module.exports = getNeighbors