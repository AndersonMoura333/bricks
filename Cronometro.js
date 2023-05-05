class Cronometro {
  constructor(tempoInicial = 180) {
    this.tempoRestante = tempoInicial;
    this.intervalId = null;
    this.tempoFormatado = `${Math.floor(this.tempoRestante / 60)
      .toString()
      .padStart(2, "0")}:${(this.tempoRestante % 60)
      .toString()
      .padStart(2, "0")}`;
  }

  atualizarCronometro() {
    const minutos = Math.floor(this.tempoRestante / 60);
    const segundos = this.tempoRestante % 60;
    this.tempoFormatado = `${minutos.toString().padStart(2, "0")}:${segundos
      .toString()
      .padStart(2, "0")}`;
    this.tempoRestante--;
    if (this.tempoRestante < -1) {
      clearInterval(this.intervalId);
      Game.gameOver = true;
    }
  }

  iniciar() {
    this.intervalId = setInterval(() => {
      this.atualizarCronometro();
    }, 1000);
  }

  parar() {
    clearInterval(this.intervalId);
  }

  reiniciar() {
    this.tempoRestante = 120;
    this.atualizarCronometro();
    this.iniciar();
  }

  move() {}
  draw() {
    Game.canvasContext.font = "15px serif";
    Game.canvasContext.fillText(
      this.tempoFormatado,
      Game.field.getWidth() - 50,
      20
    );
  }
}
