export class Player {
  constructor(name, score, answers) {
    this.name = name;
    this.score = score;
    this.answers = answers;
  }

  incrementScore() {
    return this.score++;
  }

  resetScore() {
    this.score = 0;
    return this.score;
  }

  add(answer) {
    this.answers.push(answer);
    return this.answers;
  }

  resetAnswers() {
    this.answers.length = 0;
    return this.answers;
  }
}
