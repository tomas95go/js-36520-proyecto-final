export class Quiz {
  gameOver = false;
  rematch = false;

  constructor(questions, quotes, instructions) {
    this.questions = questions;
    this.quotes = quotes;
    this.instructions = instructions;
  }
}
