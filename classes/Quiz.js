export class Quiz {
  gameOver = false;
  rematch = false;

  constructor(questions, quotes) {
    this.questions = questions;
    this.quotes = quotes;
  }
}
