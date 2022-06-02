export const showInstructionsCard = (quiz, player) => {
  resetCardContent();
  resetCardFooter();
  changeCardTitle(`Instrucciones`);
  const $cardBody = document.getElementById(`card-body`);
  const $cardContent = makeCardContent($cardBody);
  const { instructions } = quiz;
  const $instructions = displayInstructions(instructions);
  $cardContent.appendChild($instructions);
  makeCardFooter(`Entendido`, ``, () => {
    showPlayerFormCard(quiz, player, capturePlayerName);
  });
};
const displayInstructions = (instructions) => {
  const $instructions = document.createElement(`ol`);
  $instructions.setAttribute(`type`, `1`);
  instructions.forEach((instruction) => {
    const $instruction = document.createElement(`li`);
    const $text = document.createTextNode(instruction.instruction);
    $instruction.appendChild($text);
    $instructions.appendChild($instruction);
  });
  return $instructions;
};
