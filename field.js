class Field {
  constructor() {
    this.width = 450;
    this.height = 600;
  }

  move() {}
  draw() {
    Game.canvasContext.fillStyle = "#000";
    Game.canvasContext.fillRect(0, 0, Game.canvas.width, Game.canvas.height);
  }

  getWidth() {
    return this.width;
  }

  getHeigth() {
    return this.height;
  }
}
