class Game {
  static canvas;
  static gameOver = false;
  static canvasContext;
  static gapY = 10;
  static gameOver = false;
  static lag = 0;
  static lastFrameTimeMs = 0;
  static maxFPS = 60;
  static timeStep = 1000 / Game.maxFPS;
  static field = new Field();
  static cronometro = new Cronometro(120);
  static ball = new Ball(
    Game.field.getWidth() / 2,
    Game.field.getHeigth() / 2,
    10,
    5,
    5,
    Game.field.getWidth(),
    Game.field.getHeigth()
  );
  static bricks = new Bricks(100, 25, 6, 4);
  static paddle = new Paddle(
    20,
    Game.field.getHeigth() - 15 - Game.gapY,
    140,
    15
  );
  static entities = [
    Game.field,
    Game.ball,
    Game.bricks,
    Game.paddle,
    Game.cronometro,
  ];

  static gameOverAndResert() {
    if (Game.cronometro.tempoRestante <= 0) {
      Game.canvasContext.font = "35px serif";
      Game.canvasContext.fillText(
        "Tempo acabou",
        Game.field.getWidth() / 2 - 100,
        Game.field.getHeigth() / 2 + 40
      );
      Game.canvasContext.font = "15px serif";
      Game.canvasContext.fillText(
        "clique para reiniciar",
        Game.field.getWidth() / 2 - 60,
        Game.field.getHeigth() / 2 + 70
      );
    } else {
      Game.canvasContext.font = "35px serif";
      Game.canvasContext.fillText(
        "Jogador venceu",
        Game.field.getWidth() / 2 - 100,
        Game.field.getHeigth() / 2 + 40
      );
      Game.canvasContext.font = "15px serif";
      Game.canvasContext.fillText(
        "clique para reiniciar",
        Game.field.getWidth() / 2 - 60,
        Game.field.getHeigth() / 2 + 70
      );
    }
  }

  static mainLoop(timeStamp) {
    // max FPS control
    if (timeStamp < Game.lastFrameTimeMs + Game.timeStep) {
      requestAnimationFrame(Game.mainLoop);
      return;
    }

    //pattern game loop
    Game.lag += timeStamp - Game.lastFrameTimeMs;
    Game.lastFrameTimeMs = timeStamp;
    if (Game.gameOver) {
      console.log("entrou");
      Game.gameOverAndResert();
    } else {
      while (Game.lag >= Game.timeStep) {
        Game.move(Game.timeStep);
        Game.lag -= Game.timeStep;
      }
      Game.draw();
    }
    requestAnimationFrame(Game.mainLoop);
  }

  static move(deltaTime) {
    for (var i = 0; i < Game.entities.length; i++)
      Game.entities[i].move(deltaTime);
  }

  static draw() {
    //background
    Game.colorRect(0, 0, Game.canvas.width, Game.canvas.height, "black");

    for (var i = 0; i < Game.entities.length; i++) Game.entities[i].draw();
  }

  static main() {
    Game.canvas = document.getElementById("gameCanvas");
    Game.canvasContext = Game.canvas.getContext("2d");
    requestAnimationFrame(Game.mainLoop);
    Game.cronometro.iniciar();
    Game.canvas.addEventListener("mousemove", MouseInput.calculateMousePos);
    Game.canvas.addEventListener("click", function (e) {
      if (Game.gameOver) {
        console.log("click");
        Game.cronometro.reiniciar();
        Game.bricks.bricksArray = Array(6)
          .fill()
          .map(() => Array(4).fill(true));
        Game.gameOver = false;
        Game.ball.x = 450 / 2;
        Game.ball.y = 600 / 2;
      }
      // console.log(mousePos.x)
    });
  }

  static colorRect(leftX, topY, width, height, fillColor) {
    Game.canvasContext.fillStyle = fillColor;
    Game.canvasContext.fillRect(leftX, topY, width, height);
  }
}
Game.main();

// window.onload = function () {

// };

// class World {
//   static cronometro = new Cronometro(180);
//   static canvas;
//   static canvasContext;
//   static gapY = 10;
//   static gameOver = false;
//   static lag = 0;
//   static lastFrameTimeMs = 0;
//   static maxFPS = 60;
//   static timeStep = 1000 / World.maxFPS;
//   static bricks = new Bricks(100, 25, 6, 4);
//   static paddle = new Paddle(20, 600 - 15 - World.gapY, 140, 15);
//   static ball = new Ball(450 / 2, 600 / 2, 10, 5, 5, 450, 600, World.paddle);
//   static entities = [World.ball, World.bricks, World.paddle, World.cronometro];

//   constructor() {
//     World.cronometro.iniciar();
//     this.iniciar();
//   }

//   iniciar() {
//     World.canvas = document.getElementById("gameCanvas");
//     World.canvasContext = World.canvas.getContext("2d");
//     requestAnimationFrame(this.mainLoop.bind(this));
//     World.canvas.addEventListener("mousemove", MouseInput.calculateMousePos);
//   }

//   mainLoop(timeStamp) {
//     // max FPS control
//     if (timeStamp < World.lastFrameTimeMs + World.timeStep) {
//       requestAnimationFrame(this.mainLoop.bind(this));
//       return;
//     }

//     //pattern game loop
//     World.lag += timeStamp - World.lastFrameTimeMs;
//     World.lastFrameTimeMs = timeStamp;

//     while (World.lag >= World.timeStep) {
//       this.move(World.timeStep);
//       World.lag -= World.timeStep;
//     }
//     this.draw(World.canvasContext);
//     requestAnimationFrame(this.mainLoop.bind(this));
//   }

//   move(deltaTime) {
//     for (var i = 0; i < World.entities.length; i++)
//       World.entities[i].move(deltaTime);
//   }

//   draw(canvasContext) {
//     //background
//     this.colorRect(0, 0, World.canvas.width, World.canvas.height, "black");

//     for (var i = 0; i < World.entities.length; i++)
//       World.entities[i].draw(canvasContext);
//   }

//   colorRect(leftX, topY, width, height, drawColor) {
//     World.canvasContext.fillStyle = drawColor;
//     World.canvasContext.fillRect(leftX, topY, width, height);
//   }
// }
