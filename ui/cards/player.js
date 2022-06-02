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
