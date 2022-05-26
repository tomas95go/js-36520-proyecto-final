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

export const makeQuestionCardBody = () => {
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
  $img.setAttribute(
    `src`,
    `https://c.tenor.com/mkfEFX1eXJoAAAAC/gunther-smirk.gif`
  );
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

  for (let x = 0; x < 3; x++) {
    const $singleOptionColumn = document.createElement("div");
    $singleOptionColumn.classList.add(`column`);
    $optionsWrapper.appendChild($singleOptionColumn);

    const $optionLabel = document.createElement("label");
    $optionLabel.classList.add(`radio`);
    $singleOptionColumn.appendChild($optionLabel);

    const $optionInput = document.createElement("input");
    $optionInput.setAttribute(`type`, `radio`);
    $optionInput.setAttribute(`name`, `question`);
    $optionInput.setAttribute(`value`, x);
    $optionLabel.appendChild($optionInput);

    const $span = document.createElement("span");
    $span.textContent = ` ${x} `;
    $optionLabel.appendChild($span);
  }

  return $cardBody;
};

export const makeCardFooter = (text, type, formId, event) => {
  const $cardFooter = document.getElementById(`card-footer`);

  const $button = document.createElement(`button`);

  if (type === `question`) {
    $button.setAttribute(`form`, formId);
  }

  if (type === `welcome`) {
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
  makeCardFooter(`¡Comenzar!`, `welcome`, ``, showInstructionsCard);
};

const resetCardContent = () => {
  const $cardBody = document.getElementById(`card-body`);
  while ($cardBody.firstChild) {
    $cardBody.removeChild($cardBody.firstChild);
  }
  return $cardBody;
};

const showInstructionsCard = () => {
  resetCardContent();
  makeQuestionCardBody();
};
