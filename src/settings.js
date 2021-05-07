class Settings {
  constructor(speed, size) {
    this.speed = speed || 1
    this.size = size || {x: 10, y: 10}
  }
}

module.exports = Settings