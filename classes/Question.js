export class Question {
  constructor(id, question, gif, possibleAnswers, correctAnswer, last) {
    this.id = id;
    this.question = question;
    this.gif = gif;
    this.possibleAnswers = possibleAnswers;
    this.correctAnswer = correctAnswer;
    this.last = last;
  }
}
