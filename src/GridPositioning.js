class GridPositioning {
    constructor(canvas, rowAmount, colAmount){
        this.rAmt = rowAmount
        this.cAmt = colAmount

        if (canvas) {
            this.canvas = canvas
            this.setupSize()
        }
    }

    setupSize() {
        this.size = this.getSize()
        console.log(this.size)

        this.rowWidth = this.getRowWidth()
        this.rowOffset = this.getRowOffset()

        this.colHeight = this.getColHeight()
        this.colOffset = this.getColOffset()
    }

    getSize() {
        let style = getComputedStyle(this.canvas)

        return {
            width: parseInt(style.width),
            height: parseInt(style.height)
        }
    }

    getRowWidth() {
        let rW = Math.floor(this.size.width / this.rAmt)
        console.log(rW, typeof this.size.width, typeof this.rAmt)
        return rW
    }

    getRowOffset() {
        return Math.floor(
            (this.size.width % this.rowWidth)
            / 2
            )
    }

    getColHeight() {
        return Math.floor(this.size.height / this.cAmt)
    }

    getColOffset() {
        return Math.floor(
            (this.size.height % this.colHeight)
            / 2
            )
    }

    getStartPosition(x, y) {
        return {
            x: (x * this.rowWidth + this.rowOffset),
            y: (y * this.colHeight + this.colOffset)
        }
    }
}

module.exports = GridPositioning