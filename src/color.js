class Color {
  constructor(r, g, b, a) {
    this.r = r || 0
    this.g = g || 0
    this.b = b || 0
    this.a = a || 0
  }

  toString() {
    let {r, g, b, a} = this
    return `rgba(${r},${g},${b},${a},)`
  }

  static add(colors) {
    colors.reduce((acc, item) => {
      return {
        r: acc.r + item.r,
        g: acc.g + item.g,
        b: acc.b + item.b,
        a: acc.a + item.a,
      }
    })
  }

  static average(colors) {
    let sum = add(colors)
    let len = colors.length
    
    return new Color(
      avg.r / len,
      avg.g / len,
      avg.b / len,
      avg.a / len
      )
  }
}

module.exports = Color