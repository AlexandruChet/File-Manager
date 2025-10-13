class Point {
  constructor(x, y) {
    this.y = y;
    this.x = x;
  }
}

class Rect {
  constructor(x1, y1, x2, y2) {
    this.y1 = y1;
    this.x1 = x1;
    this.y2 = y2;
    this.x2 = x2;
  }
}

module.exports = async (name, x1, y1, x2, y2) => {
  const rect = new Rect(x1, y1, x2, y2);
  memory.set(name, rect);
  return "ok";
};
