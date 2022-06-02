import { Player } from "./classes/Player.js";
import { Instruction } from "./classes/Instruction.js";
import { Question } from "./classes/Question.js";
import { Quote } from "./classes/Quote.js";
import { Quiz } from "./classes/Quiz.js";
import {
  showNoOptionSelectedToast,
  showEncouragementToast,
  showNotValidNameToast,
  showQuestionAnsweredToast,
} from "./ui/toasts.js";
import { showWelcomeCard } from "./ui/cards/welcome.js";
import { showQuestionCard } from "./ui/cards/question.js";

const getQuizData = async () => {
  const response = await fetch(`./data/quiz.json`);
  const data = await response.json();
  return data;
};

const setUpQuiz = async () => {
  const data = await getQuizData();
  const instructions = data.quiz.instructions.map(
    (instruction) => new Instruction(instruction.id, instruction.instruction)
  );
  const questions = data.quiz.questions.map(
    (question) =>
      new Question(
        question.id,
        question.question,
        question.gif,
        question["possible-answers"],
        question["correct-answer"]
      )
  );
  const quotes = data.quiz.quotes.map(
    (quote) =>
      new Quote(
        quote.id,
        quote["score-top"],
        quote["score-bottom"],
        quote.quote
      )
  );
  const quiz = new Quiz(questions, quotes, instructions);
  return quiz;
};

const setUpPlayer = () => {
  const player = new Player(``, 0, []);
  return player;
};

export const startGame = async () => {
  const quiz = await setUpQuiz();
  const player = setUpPlayer();
  showWelcomeCard(quiz, player);
};

export const capturePlayerName = ($form, quiz, player) => {
  $form.addEventListener("submit", (e) => {
    e.preventDefault();
    const playerForm = new FormData(e.target);
    const name = playerForm.get("name");
    const isValid = validate(name);
    if (isValid) {
      player.name = name;
      localStorage.setItem("player", JSON.stringify(player));
      showEncouragementToast(player.name);
      loadQuestion(quiz, player);
    } else {
      showNotValidNameToast();
    }
  });
  return $form;
};

const loadNextQuestion = (quiz, player, questionId) => {
  questionId = questionId + 1;
  showQuestionCard(
    quiz,
    player,
    questionId,
    capturePlayerAnswer,
    evaluatePlayerAnswers
  );
};

export const loadQuestion = (quiz, player) => {
  const questionId = 1;
  showQuestionCard(
    quiz,
    player,
    questionId,
    capturePlayerAnswer,
    evaluatePlayerAnswers
  );
};

const evaluatePlayerAnswers = (quiz, player) => {
  quiz.questions.forEach((question, i) =>
    question.correctAnswer === player.answers[i]
      ? player.incrementScore()
      : false
  );
  return player.answers;
};

const validate = (input) => {
  let isValid = true;
  if (!input) {
    isValid = false;
  }
  return isValid;
};

const capturePlayerAnswer = ($form, quiz, player, questionId) => {
  $form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formQuestion = new FormData(e.target);
    const answer = formQuestion.get("question");
    const isValid = validate(answer);
    if (isValid) {
      showQuestionAnsweredToast();
      player.add(answer);
      loadNextQuestion(quiz, player, questionId);
    } else {
      showNoOptionSelectedToast();
    }
  });
  return $form;
};
