//Alumno: González Oviedo Tomás Emiliano
console.log(`Probando!`);

import {
  makeQuestionCardBody,
  makeCardFooter,
  showWelcomeCard,
} from "./card.js";

showWelcomeCard();

/*makeQuestionCardBody();
makeCardFooter(`Siguiente`, `question`, `options-form`);

const $form = document.getElementById("options-form");

$form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formPotencia = new FormData(e.target);
  const question = formPotencia.get("question");
  console.log(question);
});


  To do:

  1_ Do "welcome_card".
  2_ Do "instructions_card".
  3_ Do "player_data_form_card".
  4_ After the player loaded his/her data, start loading the questions.
  5_ When the question is the last question in the array, go to another screen.
  6_ Do the "score_card" to show the user the result.

*/
