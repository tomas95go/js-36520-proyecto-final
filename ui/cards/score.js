//Muestra la carta del puntaje
import {
  resetCardContent,
  resetCardFooter,
  changeCardTitle,
  makeCardFooter,
  makeCardContent,
  setMessage,
} from "./general.js";

import { showWelcomeCard } from "./welcome.js";
import { displayQuote } from "../../game.js";
export const showScoreCard = (quiz, player) => {
  resetCardContent();
  resetCardFooter();
  changeCardTitle(`Game Over`);
  const $cardBody = document.getElementById(`card-body`);
  const $cardContent = makeCardContent($cardBody);
  let $gameOverMessage = ``;
  //Busco al jugador en el localStorage.
  const playerLocalStorage = JSON.parse(localStorage.getItem("player"));
  if (!playerLocalStorage.name) {
    const quote = displayQuote(quiz.quotes, player.score);
    $gameOverMessage = setMessage(
      `${playerLocalStorage.name}, tu puntaje es de: ${player.score}.\n${quote}`
    );
  } else {
    const quote = displayQuote(quiz.quotes, player.score);
    $gameOverMessage = setMessage(
      `${playerLocalStorage.name}, tu puntaje es de: ${player.score}.\n${quote}`
    );
  }
  //Empieza de nuevo el juego
  player.resetScore();
  player.resetAnswers();
  $cardContent.appendChild($gameOverMessage);
  makeCardFooter(`¡Empezar de nuevo!`, ``, () => {
    showWelcomeCard(quiz, player);
  });
};
