//Muestra el formulario para obtener el nombre del jugador.
import {
  resetCardContent,
  resetCardFooter,
  changeCardTitle,
  makeCardFooter,
  makeCardContent,
} from "./general.js";
import { capturePlayerName, loadQuestion } from "../../game.js";
import { greetPlayerOn } from "../greeting.js";
export const showPlayerFormCard = (quiz, player, capturePlayerAnswer) => {
  resetCardContent();
  resetCardFooter();
  changeCardTitle(`Complete los datos`);
  const $cardBody = document.getElementById(`card-body`);
  const $cardContent = makeCardContent($cardBody);
  //Buscamos el jugador en el localStorage para saludarlo, en caso de que no esté, capturamos su nombre y lo cargamos al localStorage.
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
