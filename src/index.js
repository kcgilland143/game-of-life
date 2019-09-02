const Game = require('./game')
const Settings = require('./settings')

const settings = new Settings()

const game = new Game(settings)

console.log('hi')

game.tick()