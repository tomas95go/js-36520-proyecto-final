export class Quiz {
  constructor(questions, quotes, instructions, gameOver, rematch, isReady) {
    this.questions = questions;
    this.quotes = quotes;
    this.instructions = instructions;
    this.gameOver = gameOver;
    this.rematch = rematch;
    this.isReady = isReady;
  }

  resetQuestions() {
    this.questions.length = 0;
    return this.questions;
  }

  resetQuotes() {
    this.quotes.length = 0;
    return this.quotes;
  }

  resetInstructions() {
    this.instructions.length = 0;
    return this.instructions;
  }

  resetGame() {
    this.gameOver != this.gameOver;
    return this.gameOver;
  }

  prepareGame() {
    this.isReady = false;
    const instructions = this.resetInstructions();
    const questions = this.resetQuestions();
    const quotes = this.resetQuotes();
    const gameOver = this.resetGame();
    this.isReady = instructions && questions && quotes && !gameOver;
    return this.isReady;
  }
}
