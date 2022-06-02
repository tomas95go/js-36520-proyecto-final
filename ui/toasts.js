//Agrupo todos los toasts aquí para ser utilizados en otros archivos.
export const showNoOptionSelectedToast = () => {
  return Toastify({
    text: "Por favor, elija una opción para continuar",
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    className: "has-background-warning-dark",
    style: {
      background: "unset",
    },
  }).showToast();
};

export const showEncouragementToast = (name) => {
  return Toastify({
    text: `¡Éxitos ${name}!`,
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    className: "has-background-success",
    style: {
      background: "unset",
    },
  }).showToast();
};

export const showNotValidNameToast = () => {
  return Toastify({
    text: "El campo nombre no puede estar vacío",
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    className: "has-background-warning-dark",
    style: {
      background: "unset",
    },
  }).showToast();
};

export const showQuestionAnsweredToast = () => {
  return Toastify({
    text: "Se ha guardado tu respuesta :)",
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    className: "has-background-success",
    style: {
      background: "unset",
    },
  }).showToast();
};
