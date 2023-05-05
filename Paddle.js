class Paddle {
  constructor(x, y, width, height, color = "white") {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }
  // x: paddleX,
  // y: field.getHeigth() - 15 - gapY,
  // width: 140,
  // height: 15,

  move() {
    if (
      MouseInput.x <= 450 - this.width / 2 + 10 &&
      MouseInput.x >= this.width / 2
    ) {
      this.x = MouseInput.x;
    }
  }
  draw() {
    Game.canvasContext.fillStyle = this.color;
    Game.canvasContext.fillRect(
      this.x - this.width / 2,
      this.y,
      this.width,
      this.height
    );
    console.log();
  }
}
