class Ball {
  constructor(x, y, r, speedX, speedY, fieldWidth, fieldHeigth) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.speedX = speedX;
    this.speedY = speedY;
    this.fieldWidth = fieldWidth;
    this.fieldHeigth = fieldHeigth;
  }
  //     x: field.getWidth()/2,
  //    y: this.fieldHeigth/2,
  //    r: 10,
  //    speedX: 5,
  //    speedY: 5,
  move() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x === this.fieldWidth - this.r || this.x === this.r) {
      this.speedX = -this.speedX;
    }
    if (this.y === this.fieldHeigth - this.r) {
      this.x = this.fieldWidth / 2;
      this.y = this.fieldHeigth / 2;
    }
    if (this.y === this.r) {
      this.speedY *= -1;
    }

    if (
      this.y === Game.paddle.y - this.r &&
      this.x >= Game.paddle.x - Game.paddle.width / 2 &&
      this.x <= Game.paddle.x + Game.paddle.width / 2
    ) {
      this.speedY = -this.speedY;
    }
  }

  draw() {
    Game.canvasContext.fillStyle = "#ffffff";
    Game.canvasContext.beginPath();
    Game.canvasContext.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
    Game.canvasContext.fill();
  }
}
