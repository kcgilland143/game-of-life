class GridPositioning {
    constructor(canvas, rowAmount, colAmount){
        if (canvas) {
            this.canvas = canvas
            this.size = this.getSize()
        }

        this.rAmt = rowAmount
        this.cAmt = colAmount
    }

    getSize() {
        return getComputedStyle(this.canvas)
    }

    getRowWidth() {
        return Math.floor(this.size.width / this.rAmt)
    }

    getColHeight() {
        return Math.floor(this.size.height / this.cAmt)
    }
}