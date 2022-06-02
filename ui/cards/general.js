//Este archivo tiene como objetivo contener las funciones mas generales/comunes/repetitivas que utilizan la mayoría de las cartas.
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
