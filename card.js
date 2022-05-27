let questionId = 1;

const makeCardContent = ($cardBody) => {
  const $content = document.createElement("div");
  $content.classList.add(`content`);
  $cardBody.appendChild($content);
  return $content;
};

const setWelcomeMessage = (message) => {
  const $message = document.createElement(`h2`);
  $message.textContent = message;
  return $message;
};

const displayInstructions = (instructions) => {
  const $instructions = document.createElement(`ol`);
  $instructions.setAttribute(`type`, `1`);
  instructions.forEach((instruction) => {
    const $instruction = document.createElement(`li`);
    const $text = document.createTextNode(instruction);
    $instruction.appendChild($text);
    $instructions.appendChild($instruction);
  });
  return $instructions;
};

const displayPlayerForm = ($cardContent) => {
  const $playerForm = document.createElement(`form`);
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

export const makeQuestionCardBody = (gif, options) => {
  const $cardBody = document.getElementById(`card-body`);

  const $content = document.createElement("div");
  $content.classList.add(`content`);
  $cardBody.appendChild($content);

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
    $singleOptionColumn.classList.add(`column`);
    $optionsWrapper.appendChild($singleOptionColumn);

    const $optionLabel = document.createElement("label");
    $optionLabel.classList.add(`radio`);
    $singleOptionColumn.appendChild($optionLabel);

    const $optionInput = document.createElement("input");
    $optionInput.setAttribute(`type`, `radio`);
    $optionInput.setAttribute(`name`, `question`);
    $optionInput.setAttribute(`value`, options[option]);
    $optionLabel.appendChild($optionInput);

    const $span = document.createElement("span");
    $span.textContent = `${options[option]}`;
    $optionLabel.appendChild($span);
  });
  return $cardBody;
};

export const makeCardFooter = (text, type, formId, event) => {
  const $cardFooter = document.getElementById(`card-footer`);

  const $button = document.createElement(`button`);

  if (type === `question`) {
    $button.setAttribute(`form`, formId);
    $button.addEventListener(`click`, event);
  }

  if (type === `welcome`) {
    $button.addEventListener(`click`, event);
  }

  if (type === `instructions`) {
    $button.addEventListener(`click`, event);
  }

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

export const showWelcomeCard = () => {
  changeCardTitle(`FRIENDS QUIZ`);
  const $cardBody = document.getElementById(`card-body`);
  const $cardContent = makeCardContent($cardBody);
  const $welcomeMessage = setWelcomeMessage(
    `Bienvenido, con este pequeño juego vamos a poner a prueba tu conocimiento en FRIENDS, la famosa serie de TV.`
  );
  $cardContent.appendChild($welcomeMessage);
  makeCardFooter(`Siguiente`, `welcome`, ``, showInstructionsCard);
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

const showPlayerFormCard = () => {
  resetCardContent();
  resetCardFooter();
  changeCardTitle(`Complete los datos`);
  const $cardBody = document.getElementById(`card-body`);
  const $cardContent = makeCardContent($cardBody);
  const $playerForm = displayPlayerForm($cardContent);
  makeCardFooter(`¡Empezar!`, `welcome`, ``, showQuestionCard);
};

const showInstructionsCard = () => {
  resetCardContent();
  resetCardFooter();
  changeCardTitle(`Instrucciones`);
  const $cardBody = document.getElementById(`card-body`);
  const $cardContent = makeCardContent($cardBody);
  const $instructions = displayInstructions([
    "Elegir una de las 3 opciones: A, B o C.",
    "No hacer trampa",
    "Seguir la regla N°2",
  ]);
  $cardContent.appendChild($instructions);
  makeCardFooter(`Entendido`, `welcome`, ``, showPlayerFormCard);
};

const loadNextQuestion = () => {
  questionId++;
  showQuestionCard();
};
const showQuestionCard = async () => {
  resetCardContent();
  resetCardFooter();
  const data = await getQuiz();
  const question = data.quiz.questions.find(
    (question) => question.id === questionId
  );
  if (question.last) {
    console.log(`No hay mas preguntas!`);
  } else {
    changeCardTitle(question.question);
    makeQuestionCardBody(question.gif, question["possible-answers"]);
    makeCardFooter(`Siguiente`, `question`, `options-form`, loadNextQuestion);
    const $form = document.getElementById("options-form");
    $form.addEventListener("submit", (e) => {
      e.preventDefault();
      const formPotencia = new FormData(e.target);
      const question = formPotencia.get("question");
    });
  }
};

const getQuiz = async () => {
  const response = await fetch(`./data/quiz.json`);
  const quiz = await response.json();
  return quiz;
};
