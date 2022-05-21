export class Quiz {
  constructor(questions, quotes, score, userAnswers, gameOver, rematch) {
    this.questions = questions;
    this.quotes = quotes;
    this.score = score;
    this.userAnswers = userAnswers;
    this.gameOver = gameOver;
    this.rematch = rematch;
  }

  addQuestion(question) {
    return this.questions.push(question);
  }

  addQuote(quote) {
    return this.quotes.push(quote);
  }

  addQuestions(data, Question) {
    data.forEach((DataQuestion) => {
      const question = new Question(
        DataQuestion.question,
        DataQuestion["possible-answers"],
        DataQuestion["correct-answer"]
      );
      this.addQuestion(question);
    });
    return this.questions;
  }

  addQuotes(data, Quote) {
    data.forEach((DataQuote) => {
      const quote = new Quote(
        DataQuote["score-top"],
        DataQuote["score-bottom"],
        DataQuote.quote
      );
      this.addQuote(quote);
    });
    return this.quotes;
  }

  incrementScore(userResponse, i) {
    if (userResponse === this.questions[i].correctAnswer) {
      this.score++;
    } else {
      this.score += 0;
    }
    return this.score;
  }

  showQuote() {
    return this.quotes.find(
      (quote) => this.score >= quote.scoreBottom && this.score <= quote.scoreTop
    ).quote;
  }

  collectUserAnswers() {
    this.questions.map((question) => {
      const userAnswer = prompt(
        `${question.question}\n${Object.entries(
          question.possibleAnswers
        ).reduce((prev, curr) => {
          return `${prev + curr[0]}) ${curr[1]}\n`;
        }, ``)}`
      )
        .toString()
        .toUpperCase();
      this.userAnswers.push(userAnswer);
    });
    return this.userAnswers;
  }

  evaluate() {
    this.userAnswers.forEach((answer, i) => {
      return this.incrementScore(answer, i);
    });
  }

  endGame() {
    this.gameOver = !this.gameOver;
    return this.gameOver;
  }

  evaluateRematch() {
    if (this.rematch.toUpperCase() !== "A") {
      return this.endGame();
    } else {
      this.resetUserAnswers();
      this.resetScore();
      return this.rematch;
    }
  }

  resetScore() {
    this.score = 0;
    return this.score;
  }

  resetUserAnswers() {
    this.userAnswers.length = 0;
    return this.userAnswers;
  }

  askForRematch() {
    this.rematch = prompt(`¿Desea volver a jugar?\nA) SI \nB) NO`);
    return this.rematch;
  }

  showInstructions() {
    alert(
      `Bienvenido/a. Vamos a poner a prueba tu conocimiento en la serie FRIENDS. Elige A, B o C como respuesta las preguntas.`
    );
  }

  play() {
    this.showInstructions();
    this.collectUserAnswers();
    this.evaluate();
    alert(`Puntaje final: ${this.score}.${this.showQuote()}`);
    this.askForRematch();
    this.evaluateRematch();
  }
}
