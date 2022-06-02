//Todo lo que sea cartas o sus contenidos van en este archivo
import { capturePlayerName, loadQuestion } from "../game.js";
import { greetPlayerOn } from "./greeting.js";
export const resetCardContent = () => {
  const $cardBody = document.getElementById(`card-body`);
  while ($cardBody.firstChild) {
    $cardBody.removeChild($cardBody.firstChild);
  }
  return $cardBody;
};

export const resetCardFooter = () => {
  const $cardFooter = document.getElementById(`card-footer`);
  while ($cardFooter.firstChild) {
    $cardFooter.removeChild($cardFooter.firstChild);
  }
  return $cardFooter;
};

export const changeCardTitle = (title) => {
  const $title = document.getElementById(`card-title`);
  $title.textContent = title;
  return $title;
};

export const makeCardContent = ($cardBody) => {
  const $content = document.createElement("div");
  $content.classList.add(`content`);
  $cardBody.appendChild($content);
  return $content;
};

export const setMessage = (message) => {
  const $message = document.createElement(`h2`);
  $message.textContent = message;
  return $message;
};

export const displayPlayerForm = ($cardContent) => {
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

export const displayInstructions = (instructions) => {
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

export const showQuestionCard = (
  quiz,
  player,
  questionId,
  capturePlayerAnswer,
  evaluatePlayerAnswers
) => {
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

const makeQuestionCardBody = ($content, gif, options) => {
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
    showPlayerFormCard(quiz, player, capturePlayerName);
  });
};

const showPlayerFormCard = (quiz, player, capturePlayerAnswer) => {
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
