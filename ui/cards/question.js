import {
  resetCardContent,
  resetCardFooter,
  changeCardTitle,
  makeCardFooter,
  makeCardContent,
} from "./general.js";
import { showScoreCard } from "./score.js";
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
