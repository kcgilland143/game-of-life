const Game = require('./game')
const Settings = require('./settings')

const settings = new Settings(1, {x: 100, y: 100})

const game = new Game(settings)

const canvas = document.getElementById('cgame')

const ctx = canvas.getContext('2d')

console.log('hi')

let t1 = performance.now()
game.tick()
let t2 = performance.now()

console.log(game.cells[0], t2 - t1)