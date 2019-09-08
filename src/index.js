const Game = require('./game')
const Settings = require('./settings')
const GridRenderer = require('./GridRenderer')
const CanvasRenderer = require('./CanvasRenderer')

const settings = new Settings(1, {x: 10, y: 10})

const game = new Game(settings)

const canvas = document.getElementById('cgame')

const ctx = canvas.getContext('2d')

//const positioning = new GridPositioning(canvas, settings.size.x, settings.size.y)
const canvasRenderer = new CanvasRenderer(canvas, [new GridRenderer(game.cells, canvas)])

console.log('hi')

let t1 = performance.now()
game.tick()
let t2 = performance.now()
canvasRenderer.render()
let t3 = performance.now()

// console.log(positioning)

// console.log(positioning.getStartPosition(0, 0), t2 - t1)