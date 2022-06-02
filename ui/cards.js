//Todo lo que sea cartas o sus contenidos van en este archivo
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
