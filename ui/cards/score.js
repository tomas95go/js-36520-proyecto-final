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
