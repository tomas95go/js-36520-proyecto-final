//Muestra la carta de bienvenida.
import {
  resetCardContent,
  resetCardFooter,
  changeCardTitle,
  makeCardFooter,
  makeCardContent,
  setMessage,
} from "./general.js";

import { showInstructionsCard } from "./instructions.js";

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
