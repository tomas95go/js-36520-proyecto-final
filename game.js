console.log(`Funciona!`);

const getQuiz = async () => {
  const response = await fetch(`./quiz.json`);
  const quiz = await response.json();
  const $easy = document.getElementById("easy");
  console.log($easy);

  const {
    quiz: {
      questions: { "warm-up": warmUp, easy, medium, hard },
      score,
      timer,
      difficulty: {
        "warm-up": warmUpDifficulty,
        easy: easyDifficulty,
        medium: mediumDifficulty,
        hard: hardDifficulty,
      },
    },
  } = quiz;

  easy.forEach((element, i) => {
    $box = document.createElement("div");
    $box.classList.add(
      "box-border",
      "w-3/6",
      "h-3/6",
      "border-2",
      "border-double",
      "border-black",
      "rounded-lg",
      "text-pastel-pink"
    );

    $questionNumber = document.createElement("h3");
    $questionNumber.innerText = `${i + 1}/${easy.length}`;
    $box.appendChild($questionNumber);

    $difficulty = document.createElement("h3");
    $difficulty.innerText = easyDifficulty;
    $box.appendChild($difficulty);

    $question = document.createElement("h3");
    $question.innerText = element.question;
    $box.appendChild($question);

    $optionsWrapper = document.createElement("div");
    $optionsWrapper.classList.add("flex", "justify-center");
    $box.appendChild($optionsWrapper);

    $imgContainer = document.createElement("div");
    $imgContainer.classList.add(
      "box-border",
      "w-72",
      "h-72",
      "bg-puce",
      "rounded-lg",
      "overflow-hidden"
    );

    $image = document.createElement("img");
    $image.classList.add(`object-cover`, "w-72", "h-72");
    $image.src = element.gif;
    $imgContainer.appendChild($image);
    $optionsWrapper.appendChild($imgContainer);
    $box.appendChild($optionsWrapper);
    $easy.appendChild($box);
  });

  console.log(
    $questionNumber,
    warmUp,
    easy,
    medium,
    hard,
    warmUpDifficulty,
    easyDifficulty,
    mediumDifficulty,
    hardDifficulty,
    score,
    timer
  );
};

getQuiz();
