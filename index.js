//Alumno: González Oviedo Tomás Emiliano

import { Quiz } from "./Classes/Quiz.js";
import { QuizData } from "./Data/Quiz.js";
import { Question } from "./Classes/Question.js";
import { Quote } from "./Classes/Quote.js";

const quiz = new Quiz([], [], 0, [], false, "A");

quiz.addQuestions(QuizData.questions, Question);
quiz.addQuotes(QuizData.quotes, Quote);

while (!quiz.gameOver) {
  quiz.play();
}
