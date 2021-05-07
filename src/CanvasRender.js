class CanvasRender {

    constructor(canvas, items) {
        this.canvas = canvas
        this.context = canvas.getContext('2d')
        this.items = items || []
    }

    render() {
        this.items.forEach(item => {
            item.render(this.context)
        });
    }
}