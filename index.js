//Alumno: González Oviedo Tomás Emiliano

import { Quiz } from "./Classes/Quiz.js";
import { QuizData } from "./Data/Quiz.js";
import { Question } from "./Classes/Question.js";
import { Quote } from "./Classes/Quote.js";

const quiz = new Quiz([], [], 0);
let gameOver = false;

QuizData.questions.forEach((data) => {
  const question = new Question(
    data.question,
    data["possible-answers"],
    data["correct-answer"]
  );
  quiz.addQuestion(question);
});

QuizData.quotes.forEach((data) => {
  const quote = new Quote(data["score-top"], data["score-bottom"], data.quote);
  quiz.addQuote(quote);
});

const questionListLength = quiz.questions.length;

while (!gameOver) {
  quiz.questions.forEach((question) => {
    const response = prompt(
      `${question.question}\n${Object.entries(question.possibleAnswers).reduce(
        (prev, curr) => {
          return `${prev + curr[0]}) ${curr[1]}\n`;
        },
        ``
      )}`
    )
      .toString()
      .toUpperCase();

    if (response === question.correctAnswer) {
      quiz.incrementScore();
    }
  });

  if (quiz.questions.length === questionListLength) {
    gameOver = !gameOver;
    alert(`Tu puntaje es: ${quiz.score}.\n${quiz.showQuote(quiz.quotes)}`);
    quiz.score = 0;
  }

  const newGame = prompt("¿Desea volver a jugar\nA) SI B) NO");
  if (newGame.toUpperCase() === "A") {
    gameOver = !gameOver;
  }
}
