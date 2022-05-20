export class Quiz {
  constructor(questions, quotes, score) {
    this.questions = questions;
    this.quotes = quotes;
    this.score = score;
  }

  addQuestion(question) {
    return this.questions.push(question);
  }

  addQuote(quote) {
    return this.quotes.push(quote);
  }

  incrementScore() {
    return this.score++;
  }

  showQuote(quotes) {
    return quotes.find(
      (quote) => this.score >= quote.scoreBottom && this.score <= quote.scoreTop
    ).quote;
  }
}
