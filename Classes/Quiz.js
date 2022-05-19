export class Quizz {
  constructor(questions, quotes, score) {
    this.questions = questions;
    this.quotes = quotes;
    this.score = score;
  }

  increment() {
    return this.score++;
  }

  showQuote(quotes) {
    return quotes.find(
      (quote) => this.score >= quote.scoreBottom && this.score <= quote.scoreTop
    ).quote;
  }
}
