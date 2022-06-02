//Esta función saluda a un jugador si ya existe en el localStorage.
export const greetPlayerOn = ($cardContent, playerName) => {
  const $greeting = document.createElement("h3");
  $greeting.textContent = `Bienvenido nuevamente: ${playerName}`;
  $cardContent.appendChild($greeting);
  return $cardContent;
};
