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
} from "./toasts.js";

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
  const gameOver = false;
  const isReady = true;
  const quiz = new Quiz(questions, quotes, instructions, gameOver, isReady);
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

const makeCardContent = ($cardBody) => {
  const $content = document.createElement("div");
  $content.classList.add(`content`);
  $cardBody.appendChild($content);
  return $content;
};

const setMessage = (message) => {
  const $message = document.createElement(`h2`);
  $message.textContent = message;
  return $message;
};

const displayInstructions = (instructions) => {
  const $instructions = document.createElement(`ol`);
  $instructions.setAttribute(`type`, `1`);
  instructions.forEach((instruction) => {
    const $instruction = document.createElement(`li`);
    const $text = document.createTextNode(instruction.instruction);
    $instruction.appendChild($text);
    $instructions.appendChild($instruction);
  });
  return $instructions;
};

const displayPlayerForm = ($cardContent) => {
  const $playerForm = document.createElement(`form`);
  $playerForm.setAttribute(`id`, `player-form`);
  $cardContent.appendChild($playerForm);

  const $field = document.createElement(`div`);
  $field.classList.add(`field`);
  $playerForm.appendChild($field);

  const $label = document.createElement(`label`);
  $label.classList.add(`label`);
  $label.textContent = `Nombre:`;
  $field.appendChild($label);

  const $control = document.createElement(`div`);
  $control.classList.add(`control`);
  $field.appendChild($control);

  const $input = document.createElement(`input`);
  $input.classList.add(`input`);
  $input.setAttribute("name", "name");
  $input.setAttribute(`type`, `text`);
  $input.setAttribute(`placeholder`, `Nombre`);
  $control.appendChild($input);

  return $playerForm;
};

export const makeQuestionCardBody = ($content, gif, options) => {
  const $mainWrapper = document.createElement("div");
  $mainWrapper.classList.add(`columns`, `is-flex`, `is-flex-direction-column`);
  $content.appendChild($mainWrapper);

  const $mainColumn = document.createElement("div");
  $mainColumn.classList.add(`column`);
  $mainWrapper.appendChild($mainColumn);

  const $questionWrapper = document.createElement("div");
  $questionWrapper.classList.add(`columns`);
  $mainColumn.appendChild($questionWrapper);

  const $gifWrapper = document.createElement("div");
  $gifWrapper.classList.add(`column`);
  $questionWrapper.appendChild($gifWrapper);

  const $cardGif = document.createElement("div");
  $cardGif.classList.add(`card-image`);
  $gifWrapper.appendChild($cardGif);

  const $figure = document.createElement("figure");
  $figure.classList.add(`image`, `is-4by3`);
  $cardGif.appendChild($figure);

  const $img = document.createElement("img");
  $img.setAttribute(`src`, gif);
  $img.setAttribute(`alt`, `friends character`);
  $figure.appendChild($img);

  const $mainOptionsColumn = document.createElement("div");
  $mainOptionsColumn.classList.add(
    `column`,
    `is-flex`,
    `is-align-items-center`
  );
  $questionWrapper.appendChild($mainOptionsColumn);

  const $optionsWrapper = document.createElement("form");
  $optionsWrapper.setAttribute(`id`, `options-form`);
  $optionsWrapper.classList.add(
    `columns`,
    `is-flex`,
    `is-flex-direction-column`
  );
  $mainOptionsColumn.appendChild($optionsWrapper);

  Object.keys(options).forEach((option) => {
    const $singleOptionColumn = document.createElement("div");
    $singleOptionColumn.classList.add(`column`, `is-align-self-flex-start`);
    $optionsWrapper.appendChild($singleOptionColumn);

    const $optionLabel = document.createElement("label");
    $optionLabel.classList.add(`radio`, `is-flex`, `is-align-items-center`);
    $singleOptionColumn.appendChild($optionLabel);

    const $optionInput = document.createElement("input");
    $optionInput.setAttribute(`type`, `radio`);
    $optionInput.setAttribute(`name`, `question`);
    $optionInput.setAttribute(`value`, option);
    $optionLabel.appendChild($optionInput);

    const $span = document.createElement("span");
    $span.classList.add(`mx-1`);
    $span.textContent = `${options[option]}`;
    $optionLabel.appendChild($span);
  });
  return $mainWrapper;
};

export const makeCardFooter = (text, formId, event) => {
  const $cardFooter = document.getElementById(`card-footer`);

  const $button = document.createElement(`button`);

  $button.setAttribute(`form`, formId);

  $button.addEventListener(`click`, event);

  $button.textContent = text;

  $button.classList.add(`button`, `is-dark`, `m-2`);

  $cardFooter.appendChild($button);

  return $cardFooter;
};

export const changeCardTitle = (title) => {
  const $title = document.getElementById(`card-title`);
  $title.textContent = title;
  return $title;
};

export const showWelcomeCard = (quiz, player) => {
  resetCardContent();
  resetCardFooter();
  changeCardTitle(`FRIENDS QUIZ`);
  const $cardBody = document.getElementById(`card-body`);
  const $cardContent = makeCardContent($cardBody);
  const $welcomeMessage = setMessage(
    `Bienvenido, con este pequeño juego vamos a poner a prueba tu conocimiento en FRIENDS, la famosa serie de TV.`
  );
  $cardContent.appendChild($welcomeMessage);
  makeCardFooter(`Siguiente`, ``, () => {
    showInstructionsCard(quiz, player);
  });
};

const resetCardContent = () => {
  const $cardBody = document.getElementById(`card-body`);
  while ($cardBody.firstChild) {
    $cardBody.removeChild($cardBody.firstChild);
  }
  return $cardBody;
};

const resetCardFooter = () => {
  const $cardFooter = document.getElementById(`card-footer`);
  while ($cardFooter.firstChild) {
    $cardFooter.removeChild($cardFooter.firstChild);
  }
  return $cardFooter;
};

const greetPlayerOn = ($cardContent, playerName) => {
  const $greeting = document.createElement("h3");
  $greeting.textContent = `Bienvenido nuevamente: ${playerName}`;
  $cardContent.appendChild($greeting);
  return $cardContent;
};

const showPlayerFormCard = (quiz, player) => {
  resetCardContent();
  resetCardFooter();
  changeCardTitle(`Complete los datos`);
  const $cardBody = document.getElementById(`card-body`);
  const $cardContent = makeCardContent($cardBody);
  const playerLocalStorage = JSON.parse(localStorage.getItem("player"));
  if (!playerLocalStorage) {
    displayPlayerForm($cardContent);
    const $playerForm = document.getElementById("player-form");
    capturePlayerName($playerForm, quiz, player);
    makeCardFooter(`¡Empezar!`, `player-form`);
  } else {
    greetPlayerOn($cardContent, playerLocalStorage.name);
    makeCardFooter(`¡Empezar!`, ``, () => {
      loadQuestion(quiz, player);
    });
  }
};

const capturePlayerName = ($form, quiz, player) => {
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

const showInstructionsCard = (quiz, player) => {
  resetCardContent();
  resetCardFooter();
  changeCardTitle(`Instrucciones`);
  const $cardBody = document.getElementById(`card-body`);
  const $cardContent = makeCardContent($cardBody);
  const { instructions } = quiz;
  const $instructions = displayInstructions(instructions);
  $cardContent.appendChild($instructions);
  makeCardFooter(`Entendido`, ``, () => {
    showPlayerFormCard(quiz, player);
  });
};

const loadNextQuestion = (quiz, player, questionId) => {
  questionId = questionId + 1;
  showQuestionCard(quiz, player, questionId);
};

const loadQuestion = (quiz, player) => {
  const questionId = 1;
  showQuestionCard(quiz, player, questionId);
};
const showQuestionCard = (quiz, player, questionId) => {
  resetCardContent();
  resetCardFooter();
  const question = quiz.questions.find(
    (question) => question.id === questionId
  );
  if (questionId > quiz.questions.length) {
    evaluatePlayerAnswers(quiz, player);
    showScoreCard(quiz, player);
  } else {
    changeCardTitle(question.question);
    const $cardBody = document.getElementById(`card-body`);
    const $cardContent = makeCardContent($cardBody);
    makeQuestionCardBody($cardContent, question.gif, question.possibleAnswers);
    makeCardFooter(`Siguiente`, `options-form`);
    const $form = document.getElementById("options-form");
    capturePlayerAnswer($form, quiz, player, questionId);
  }
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

const evaluatePlayerAnswers = (quiz, player) => {
  quiz.questions.forEach((question, i) =>
    question.correctAnswer === player.answers[i]
      ? player.incrementScore()
      : false
  );
  return player.answers;
};

const showScoreCard = (quiz, player) => {
  resetCardContent();
  resetCardFooter();
  changeCardTitle(`Game Over`);
  const $cardBody = document.getElementById(`card-body`);
  const $cardContent = makeCardContent($cardBody);
  let $gameOverMessage = ``;
  const playerLocalStorage = JSON.parse(localStorage.getItem("player"));
  if (!playerLocalStorage.name) {
    $gameOverMessage = setMessage(
      `${player.name}, tu puntaje es de: ${player.score}`
    );
  } else {
    $gameOverMessage = setMessage(
      `${playerLocalStorage.name}, tu puntaje es de: ${player.score}`
    );
  }
  player.resetScore();
  player.resetAnswers();
  $cardContent.appendChild($gameOverMessage);
  makeCardFooter(`¡Empezar de nuevo!`, ``, () => {
    showWelcomeCard(quiz, player);
  });
};

const validate = (input) => {
  let isValid = true;
  if (!input) {
    isValid = false;
  }
  return isValid;
};
