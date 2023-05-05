class Bricks {
  constructor(width, heigth, rows, columns) {
    this.width = width;
    this.heigth = heigth;
    this.hasBricks = true;
    this.aux = 1;
    this.bricksArray = Array(rows)
      .fill()
      .map(() => Array(columns).fill(true));
  }
  // width: 100,
  // heigth: 25,
  // bricksArray : ,
  move() {}
  draw() {
    var colorList = [
      "#ff7f50",
      "#87cefa",
      "#da70d6",
      "#32cd32",
      "#6495ed",
      "#ff69b4",
      "#ba55d3",
      "#cd5c5c",
      "#ffa500",
      "#40e0d0",
    ];
    this.bricksArray.forEach((row, i) => {
      row.forEach((column, j) => {
        if (column) {
          Game.canvasContext.fillStyle =
            colorList[Math.floor(Math.random() * 10)];
          var positionX = 10 + +(this.width + 10) * j;
          var positionY = this.heigth + 35 * i;
          Game.canvasContext.fillRect(
            positionX,
            positionY,
            this.width,
            this.heigth
          );
        }
        if (
          Game.ball.y >= positionY - Game.ball.r &&
          Game.ball.y <= positionY + this.heigth + Game.ball.r &&
          Game.ball.x >= positionX + Game.ball.r &&
          Game.ball.x <= positionX + this.width + Game.ball.r
        ) {
          this.bricksArray[i][j] = false;
          Game.ball.speedY *= -1;
        }
      });
    });
    this.hasBricks = this.bricksArray.some((row) => row.includes(true));
    if (!this.hasBricks) {
      Game.gameOver = true;
    }
  }
}
