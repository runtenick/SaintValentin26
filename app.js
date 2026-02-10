const quizQuestions = [
  {
    question: "Saint Valentin ? ",
    hint: "(bonne chance si jamais tu veux refuser...)",
    options: [
      "J'accepte ! 😻",
      "Je refuse ! 😿",
    ],
  },
  {
    question: "Tu préfères...",
    hint: "Désolé, il faut prendre une décision... ",
    options: ["📽️🍝 Film / Resto", "🗝️ Escape Game", "🎞️🃏 Marathon Serie / Jeux Société"],
  },
  {
    question: "Où se passe la soirée ?",
    options: ["🏠 Chez moi comme d'hab", "🏚️ Comme d'hab chez moi", "🧚‍♀️Au sommet de la roche des fées !"],
  },
  {
    question: "Qu'est ce qu'on mange ?",
    hint: "Un choix important... (mais pas de pression)",
    options: ["🍕 Pizza (j'aurais faim)", "🥀😪 Mogette... (pas trouvé )", "🍿 PopCorn, ça me suffit"],
  },
  {
    question: "Un dessert brésilien *fait maison* ?",
    hint: "👀...🍫...",
    options: ["Oui! Pour l'amour de dieu", "Non, j'ai perdu mes neurones..."],
  },
  {
    question: "Boisson ?",
    hint: "(Chacun ses goûts... 😅)",
    options: ["De l'eau (🤩)", "Du coca (🤢)", "De l'alcool (😮)"],
  },
  {
    question: "Heure d'arrivée ?",
    hint: "🕰️",
    options: ["18h", "19h", "20h", "21h"],
  }
];

const quizStep = document.getElementById("quiz-step");
const questionEl = document.getElementById("question");
const hintEl = document.getElementById("hint");
const optionsEl = document.getElementById("options");
const backBtn = document.getElementById("back-btn");
const nextBtn = document.getElementById("next-btn");
const cardEl = document.querySelector(".card");

if (quizStep && questionEl && hintEl && optionsEl && backBtn && nextBtn && cardEl) {
  const answers = Array(quizQuestions.length).fill(null);
  let currentIndex = 0;
  let isComplete = false;
  const fakeQuestionIndex = 1;
  const fakeQuestionCorrectOptionIndex = 2;
  const fakeQuestionDisabledOptions = new Set();
  const houseQuestionIndex = 2;
  const bourbouleOptionIndex = 2;
  const houseOptionIndexes = new Set([0, 1]);
  const foodQuestionIndex = 3;
  const pizzaOptionIndex = 0;
  const mogetteOptionIndex = 1;
  const popcornOptionIndex = 2;
  const dessertQuestionIndex = 4;
  const dessertYesOptionIndex = 0;
  const dessertNoOptionIndex = 1;
  const drinksQuestionIndex = 5;
  const waterOptionIndex = 0;
  const cocaOptionIndex = 1;
  const alcoholOptionIndex = 2;
  const pizzaTauntText = "😮";
  const popcornTauntText = "sal\u00E9e cette fois \u{1F924}";
  const pizzaHoverHintText = "elle veut de la vrai bouffe \u{1F631} !!";
  const dessertAcceptEmoji = "\u{1F929}";
  const dessertRefuseEmoji = "\u{1F611}";
  const dessertRefuseTeaseOneText = "vraiment ?";
  const dessertRefuseTeaseTwoText = "tu refuse ??";
  const dessertRefuseTeaseThreeText = "\u{1F62D}\u{1F62D}\u{1F62D}\u{1F62D}";
  const dessertAcceptTauntText = "tu ne sera pas déçu !";
  const dessertRefuseStepOneEmoji = "\u{1F632}";
  const dessertRefuseStepTwoEmoji = "\u{1F620}";
  const waterHoverEmoji = "\u{1F632}";
  const waterHoverStepTwoEmoji = "\u{1F631}";
  const waterHoverStepThreeEmoji = "\u{1F628}";
  const waterTeaseOneText = "prends le coca allez";
  const waterTeaseTwoText = "je sais tu le veux";
  const waterTeaseThreeText = "?????";
  const waterTeaseFinalText = "\u{1F632}\u{1F632}\u{1F632}\u{1F632}";
  const cocaTauntText = "surprenant dit donc";
  const houseOptionTauntText = "très original de ma part oui \u{1F60C}";
  const bourbouleSelectionTauntText = "ah merde \u{1F605}";
  const bourbouleStepOneTauntText = "t'est sur ? il neige ce jour \u{1F976}";
  const bourbouleStepTwoTauntText = "on part a la bourboule ?";
  const bourbouleStepThreeTauntText = "ok, bizzare mais ok \u{1F605}";
  const bourbouleSelectedEmoji = "\u{1F632}";
  const bourbouleStepOneEmoji = "\u{1F605}";
  const bourbouleStepTwoEmoji = "\u{1F630}";
  const fakeQuestionHintSuffix = "Pas vraiment enfaite... \u{1F605}";
  const refuseLabels = new Set(["i refuse", "je refuse", "no", "non"]);
  const acceptLabels = new Set(["i accept", "jaccepte", "yes", "oui"]);
  const acceptLabel = "J'accepte ! 😻";
  const refuseLabel = "Je refuse ! 😿";
  const acceptHoverEmoji = "\u{1F60C}";
  const refuseHoverEmoji = "\u{1F928}";
  const refuseTauntText = "oops dommage"; // \u{1F602}
  const isRefuseTauntEnabled = false;
  let bourbouleTeaseStep = 0;
  let dessertRefuseTeaseStep = 0;
  let waterTeaseStep = 0;
  let refuseTauntTimer = null;
  const refuseTauntEl = document.createElement("div");
  const cornerGifEl = document.createElement("img");
  const happyCornerGifEl = document.createElement("img");
  const sadCornerGifEl = document.createElement("img");
  const classicCornerGifEl = document.createElement("img");
  const surprisedCornerGifEl = document.createElement("img");
  const fatCornerGifEl = document.createElement("img");
  const drunkCornerGifEl = document.createElement("img");

  refuseTauntEl.className = "refuse-taunt";
  refuseTauntEl.setAttribute("aria-hidden", "true");
  document.body.appendChild(refuseTauntEl);

  cornerGifEl.className = "corner-gif";
  cornerGifEl.src = "./assets/nervous.gif";
  cornerGifEl.alt = "";
  cornerGifEl.setAttribute("aria-hidden", "true");
  cardEl.appendChild(cornerGifEl);

  happyCornerGifEl.className = "corner-gif corner-gif-happy";
  happyCornerGifEl.src = "./assets/happy cat.gif";
  happyCornerGifEl.alt = "";
  happyCornerGifEl.setAttribute("aria-hidden", "true");
  cardEl.appendChild(happyCornerGifEl);

  sadCornerGifEl.className = "corner-gif corner-gif-sad";
  sadCornerGifEl.src = "./assets/sad.gif";
  sadCornerGifEl.alt = "";
  sadCornerGifEl.setAttribute("aria-hidden", "true");
  cardEl.appendChild(sadCornerGifEl);

  classicCornerGifEl.className = "corner-gif corner-gif-classic";
  classicCornerGifEl.src = "./assets/classic.gif";
  classicCornerGifEl.alt = "";
  classicCornerGifEl.setAttribute("aria-hidden", "true");
  cardEl.appendChild(classicCornerGifEl);

  surprisedCornerGifEl.className = "corner-gif corner-gif-surprised";
  surprisedCornerGifEl.src = "./assets/surprised.gif";
  surprisedCornerGifEl.alt = "";
  surprisedCornerGifEl.setAttribute("aria-hidden", "true");
  cardEl.appendChild(surprisedCornerGifEl);

  fatCornerGifEl.className = "corner-gif corner-gif-fat";
  fatCornerGifEl.src = "./assets/fat.gif";
  fatCornerGifEl.alt = "";
  fatCornerGifEl.setAttribute("aria-hidden", "true");
  cardEl.appendChild(fatCornerGifEl);

  drunkCornerGifEl.className = "corner-gif corner-gif-drunk";
  drunkCornerGifEl.src = "./assets/drunk.gif";
  drunkCornerGifEl.alt = "";
  drunkCornerGifEl.setAttribute("aria-hidden", "true");
  cardEl.appendChild(drunkCornerGifEl);

  function showCornerGif() {
    cornerGifEl.classList.add("is-visible");
  }

  function hideCornerGif() {
    cornerGifEl.classList.remove("is-visible");
  }

  function showHappyCornerGif() {
    happyCornerGifEl.classList.add("is-visible");
  }

  function hideHappyCornerGif() {
    happyCornerGifEl.classList.remove("is-visible");
  }

  function showSadCornerGif() {
    sadCornerGifEl.classList.add("is-visible");
  }

  function hideSadCornerGif() {
    sadCornerGifEl.classList.remove("is-visible");
  }

  function showClassicCornerGif() {
    classicCornerGifEl.classList.add("is-visible");
  }

  function hideClassicCornerGif() {
    classicCornerGifEl.classList.remove("is-visible");
  }

  function showSurprisedCornerGif() {
    surprisedCornerGifEl.classList.add("is-visible");
  }

  function hideSurprisedCornerGif() {
    surprisedCornerGifEl.classList.remove("is-visible");
  }

  function showFatCornerGif() {
    fatCornerGifEl.classList.add("is-visible");
  }

  function hideFatCornerGif() {
    fatCornerGifEl.classList.remove("is-visible");
  }

  function showDrunkCornerGif() {
    drunkCornerGifEl.classList.add("is-visible");
  }

  function hideDrunkCornerGif() {
    drunkCornerGifEl.classList.remove("is-visible");
  }

  function showRefuseTaunt(
    x,
    y,
    forceVisible = false,
    tauntText = refuseTauntText,
    durationMs = 2000
  ) {
    if (!isRefuseTauntEnabled && !forceVisible) {
      return;
    }

    if (!Number.isFinite(x) || !Number.isFinite(y)) {
      return;
    }

    if (refuseTauntTimer) {
      clearTimeout(refuseTauntTimer);
    }

    refuseTauntEl.textContent = tauntText;
    refuseTauntEl.style.left = `${x}px`;
    refuseTauntEl.style.top = `${y}px`;
    refuseTauntEl.classList.remove("is-visible");
    void refuseTauntEl.offsetWidth;
    refuseTauntEl.classList.add("is-visible");

    refuseTauntTimer = setTimeout(() => {
      refuseTauntEl.classList.remove("is-visible");
      refuseTauntTimer = null;
    }, durationMs);
  }

  function getBourbouleTitleEmoji() {
    if (currentIndex !== houseQuestionIndex || answers[currentIndex] !== bourbouleOptionIndex) {
      return "";
    }

    if (bourbouleTeaseStep === 0) {
      return bourbouleSelectedEmoji;
    }

    if (bourbouleTeaseStep === 1) {
      return bourbouleStepOneEmoji;
    }

    return bourbouleStepTwoEmoji;
  }

  function getQuestionOneTitleEmoji() {
    if (currentIndex !== 0 || answers[currentIndex] === null) {
      return "";
    }

    const selectedIndex = answers[currentIndex];
    const selectedLabel = quizQuestions[0].options[selectedIndex] || "";
    const normalized = normalizeOptionLabel(selectedLabel);

    if (acceptLabels.has(normalized)) {
      return acceptHoverEmoji;
    }

    if (refuseLabels.has(normalized)) {
      return refuseHoverEmoji;
    }

    return "";
  }

  function getDessertTitleEmoji() {
    if (currentIndex !== dessertQuestionIndex || answers[currentIndex] === null) {
      return "";
    }

    if (answers[currentIndex] === dessertYesOptionIndex) {
      return dessertAcceptEmoji;
    }

    if (answers[currentIndex] === dessertNoOptionIndex) {
      if (dessertRefuseTeaseStep === 1) {
        return dessertRefuseStepOneEmoji;
      }

      if (dessertRefuseTeaseStep >= 2) {
        return dessertRefuseStepTwoEmoji;
      }

      return dessertRefuseEmoji;
    }

    return "";
  }

  function getDrinksTitleEmoji() {
    if (currentIndex !== drinksQuestionIndex || answers[currentIndex] === null) {
      return "";
    }

    if (answers[currentIndex] === waterOptionIndex) {
      if (waterTeaseStep === 1) {
        return waterHoverEmoji;
      }

      if (waterTeaseStep === 2) {
        return waterHoverStepTwoEmoji;
      }

      if (waterTeaseStep >= 3) {
        return waterHoverStepThreeEmoji;
      }
    }

    return "";
  }

  function normalizeOptionLabel(label) {
    return label
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z\s]/g, "")
      .trim()
      .toLowerCase();
  }

  function setHint(baseHint, isFakeHintReveal) {
    if (!baseHint && !isFakeHintReveal) {
      hintEl.textContent = "";
      return;
    }

    if (!isFakeHintReveal) {
      hintEl.textContent = baseHint;
      return;
    }

    hintEl.innerHTML = "";

    if (baseHint) {
      const oldHint = document.createElement("span");
      oldHint.className = "hint-original is-obsolete";
      oldHint.textContent = baseHint;
      hintEl.appendChild(oldHint);
      hintEl.appendChild(document.createTextNode(" "));
    }

    const newHint = document.createElement("span");
    newHint.className = "hint-reveal";
    newHint.textContent = fakeQuestionHintSuffix;
    hintEl.appendChild(newHint);
  }

  function renderQuestion() {
    const currentQuestion = quizQuestions[currentIndex];
    const baseQuestionText = currentQuestion.question;
    isComplete = false;
    questionEl.classList.remove("is-refuse-hover");
    hideCornerGif();
    hideHappyCornerGif();
    hideSadCornerGif();
    hideClassicCornerGif();
    hideSurprisedCornerGif();
    hideFatCornerGif();
    hideDrunkCornerGif();

    quizStep.textContent = `Question ${currentIndex + 1} / ${quizQuestions.length}`;
    const getPersistentTitleEmoji = () => {
      const questionOneEmoji = getQuestionOneTitleEmoji();
      if (questionOneEmoji) {
        return questionOneEmoji;
      }
      const dessertEmoji = getDessertTitleEmoji();
      if (dessertEmoji) {
        return dessertEmoji;
      }
      const drinksEmoji = getDrinksTitleEmoji();
      if (drinksEmoji) {
        return drinksEmoji;
      }
      return getBourbouleTitleEmoji();
    };
    const resetQuestionTitle = () => {
      const persistentEmoji = getPersistentTitleEmoji();
      questionEl.textContent = persistentEmoji
        ? `${baseQuestionText} ${persistentEmoji}`
        : baseQuestionText;
    };
    resetQuestionTitle();
    const baseHint = currentQuestion.hint || "";
    const isFakeHintReveal =
      currentIndex === fakeQuestionIndex &&
      answers[currentIndex] === fakeQuestionCorrectOptionIndex;
    const restoreHint = () => {
      if (currentIndex === foodQuestionIndex && answers[currentIndex] === pizzaOptionIndex) {
        hintEl.textContent = pizzaHoverHintText;
        return;
      }
      setHint(baseHint, isFakeHintReveal);
    };
    restoreHint();
    optionsEl.innerHTML = "";
    optionsEl.dataset.count = String(currentQuestion.options.length);

    currentQuestion.options.forEach((optionLabel, optionIndex) => {
      const optionBtn = document.createElement("button");
      optionBtn.type = "button";
      optionBtn.className = "option";
      optionBtn.textContent = optionLabel;
      const normalized = normalizeOptionLabel(optionLabel);
      const isRefuseOption = currentIndex === 0 && refuseLabels.has(normalized);
      const isAcceptOption = currentIndex === 0 && acceptLabels.has(normalized);
      const isFakeQuestionWrongOption =
        currentIndex === fakeQuestionIndex && optionIndex !== fakeQuestionCorrectOptionIndex;
      const isFakeQuestionOptionDisabled =
        isFakeQuestionWrongOption && fakeQuestionDisabledOptions.has(optionIndex);
      const isHouseOption =
        currentIndex === houseQuestionIndex && houseOptionIndexes.has(optionIndex);
      const isMogetteOption =
        currentIndex === foodQuestionIndex && optionIndex === mogetteOptionIndex;
      const isPopcornOption =
        currentIndex === foodQuestionIndex && optionIndex === popcornOptionIndex;
      const isPizzaOption =
        currentIndex === foodQuestionIndex && optionIndex === pizzaOptionIndex;
      const isDessertYesOption =
        currentIndex === dessertQuestionIndex && optionIndex === dessertYesOptionIndex;
      const isDessertNoOption =
        currentIndex === dessertQuestionIndex && optionIndex === dessertNoOptionIndex;
      const isWaterOption =
        currentIndex === drinksQuestionIndex && optionIndex === waterOptionIndex;
      const isCocaOption =
        currentIndex === drinksQuestionIndex && optionIndex === cocaOptionIndex;
      const isAlcoholOption =
        currentIndex === drinksQuestionIndex && optionIndex === alcoholOptionIndex;

      const isSelected = answers[currentIndex] === optionIndex;
      optionBtn.classList.toggle("is-selected", isSelected);
      optionBtn.setAttribute("aria-selected", String(isSelected));
      optionBtn.classList.toggle(
        "is-fake-disabled",
        isMogetteOption || isFakeQuestionOptionDisabled
      );
      optionBtn.disabled = isFakeQuestionOptionDisabled;

      if (isRefuseOption) {
        optionBtn.addEventListener("mouseenter", (event) => {
          questionEl.classList.add("is-refuse-hover");
          questionEl.textContent = `${baseQuestionText} ${refuseHoverEmoji}`;
        });

        optionBtn.addEventListener("mouseleave", () => {
          questionEl.classList.remove("is-refuse-hover");
          resetQuestionTitle();
        });

        optionBtn.addEventListener("focus", () => {
          questionEl.classList.add("is-refuse-hover");
          questionEl.textContent = `${baseQuestionText} ${refuseHoverEmoji}`;
        });

        optionBtn.addEventListener("blur", () => {
          questionEl.classList.remove("is-refuse-hover");
          resetQuestionTitle();
        });
      }

      if (isAcceptOption) {
        optionBtn.addEventListener("mouseenter", () => {
          questionEl.textContent = `${baseQuestionText} ${acceptHoverEmoji}`;
        });

        optionBtn.addEventListener("mouseleave", () => {
          resetQuestionTitle();
        });

        optionBtn.addEventListener("focus", () => {
          questionEl.textContent = `${baseQuestionText} ${acceptHoverEmoji}`;
        });

        optionBtn.addEventListener("blur", () => {
          resetQuestionTitle();
        });
      }

      if (isFakeQuestionWrongOption && !isFakeQuestionOptionDisabled) {
        optionBtn.addEventListener("mouseenter", () => {
          showCornerGif();
        });

        optionBtn.addEventListener("mouseleave", () => {
          hideCornerGif();
        });

        optionBtn.addEventListener("focus", () => {
          showCornerGif();
        });

        optionBtn.addEventListener("blur", () => {
          hideCornerGif();
        });
      }

      if (isHouseOption) {
        optionBtn.addEventListener("mouseenter", () => {
          showHappyCornerGif();
        });

        optionBtn.addEventListener("mouseleave", () => {
          hideHappyCornerGif();
        });

        optionBtn.addEventListener("focus", () => {
          showHappyCornerGif();
        });

        optionBtn.addEventListener("blur", () => {
          hideHappyCornerGif();
        });
      }

      if (isMogetteOption) {
        optionBtn.addEventListener("mouseenter", () => {
          showSadCornerGif();
        });

        optionBtn.addEventListener("mouseleave", () => {
          hideSadCornerGif();
        });

        optionBtn.addEventListener("focus", () => {
          showSadCornerGif();
        });

        optionBtn.addEventListener("blur", () => {
          hideSadCornerGif();
        });
      }

      if (isPopcornOption) {
        optionBtn.addEventListener("mouseenter", () => {
          showClassicCornerGif();
        });

        optionBtn.addEventListener("mouseleave", () => {
          hideClassicCornerGif();
        });

        optionBtn.addEventListener("focus", () => {
          showClassicCornerGif();
        });

        optionBtn.addEventListener("blur", () => {
          hideClassicCornerGif();
        });
      }

      if (isPizzaOption) {
        optionBtn.addEventListener("mouseenter", () => {
          showSurprisedCornerGif();
          hintEl.textContent = pizzaHoverHintText;
        });

        optionBtn.addEventListener("mouseleave", () => {
          hideSurprisedCornerGif();
          restoreHint();
        });

        optionBtn.addEventListener("focus", () => {
          showSurprisedCornerGif();
          hintEl.textContent = pizzaHoverHintText;
        });

        optionBtn.addEventListener("blur", () => {
          hideSurprisedCornerGif();
          restoreHint();
        });
      }

      if (isDessertYesOption) {
        optionBtn.addEventListener("mouseenter", () => {
          showFatCornerGif();
          questionEl.textContent = `${baseQuestionText} ${dessertAcceptEmoji}`;
        });

        optionBtn.addEventListener("mouseleave", () => {
          hideFatCornerGif();
          resetQuestionTitle();
        });

        optionBtn.addEventListener("focus", () => {
          showFatCornerGif();
          questionEl.textContent = `${baseQuestionText} ${dessertAcceptEmoji}`;
        });

        optionBtn.addEventListener("blur", () => {
          hideFatCornerGif();
          resetQuestionTitle();
        });
      }

      if (isDessertNoOption) {
        optionBtn.addEventListener("mouseenter", () => {
          questionEl.textContent = `${baseQuestionText} ${dessertRefuseEmoji}`;
        });

        optionBtn.addEventListener("mouseleave", () => {
          resetQuestionTitle();
        });

        optionBtn.addEventListener("focus", () => {
          questionEl.textContent = `${baseQuestionText} ${dessertRefuseEmoji}`;
        });

        optionBtn.addEventListener("blur", () => {
          resetQuestionTitle();
        });
      }

      if (isWaterOption) {
        optionBtn.addEventListener("mouseenter", () => {
          questionEl.textContent = `${baseQuestionText} ${waterHoverEmoji}`;
        });

        optionBtn.addEventListener("mouseleave", () => {
          resetQuestionTitle();
        });

        optionBtn.addEventListener("focus", () => {
          questionEl.textContent = `${baseQuestionText} ${waterHoverEmoji}`;
        });

        optionBtn.addEventListener("blur", () => {
          resetQuestionTitle();
        });
      }

      if (isCocaOption) {
        optionBtn.addEventListener("mouseenter", () => {
          showClassicCornerGif();
        });

        optionBtn.addEventListener("mouseleave", () => {
          hideClassicCornerGif();
          resetQuestionTitle();
        });

        optionBtn.addEventListener("focus", () => {
          showClassicCornerGif();
        });

        optionBtn.addEventListener("blur", () => {
          hideClassicCornerGif();
          resetQuestionTitle();
        });
      }

      if (isAlcoholOption) {
        optionBtn.addEventListener("mouseenter", () => {
          showDrunkCornerGif();
        });

        optionBtn.addEventListener("mouseleave", () => {
          hideDrunkCornerGif();
        });

        optionBtn.addEventListener("focus", () => {
          showDrunkCornerGif();
        });

        optionBtn.addEventListener("blur", () => {
          hideDrunkCornerGif();
        });
      }

      optionBtn.addEventListener("click", (event) => {
        hideHappyCornerGif();
        hideSadCornerGif();
        hideClassicCornerGif();
        hideSurprisedCornerGif();
        hideFatCornerGif();
        hideDrunkCornerGif();
        if (isMogetteOption) {
          return;
        }
        if (isFakeQuestionWrongOption) {
          hideCornerGif();
          fakeQuestionDisabledOptions.add(optionIndex);

          const hasPointerCoords = event.clientX !== 0 || event.clientY !== 0;
          if (hasPointerCoords) {
            showRefuseTaunt(event.clientX + 10, event.clientY - 12, true);
          } else {
            const optionRect = optionBtn.getBoundingClientRect();
            showRefuseTaunt(optionRect.right + 10, optionRect.top + optionRect.height / 2, true);
          }

          renderQuestion();
          return;
        }

        if (currentIndex === 0 && refuseLabels.has(normalized)) {
          const hasPointerCoords = event.clientX !== 0 || event.clientY !== 0;
          if (hasPointerCoords) {
            showRefuseTaunt(event.clientX + 10, event.clientY - 12);
          } else {
            const optionRect = optionBtn.getBoundingClientRect();
            showRefuseTaunt(optionRect.right + 10, optionRect.top + optionRect.height / 2);
          }

          quizQuestions[0].options = quizQuestions[0].options.map((_, idx) =>
            idx === optionIndex ? acceptLabel : refuseLabel
          );
        }

        if (currentIndex === houseQuestionIndex) {
          if (optionIndex === bourbouleOptionIndex) {
            bourbouleTeaseStep = 0;
            const hasPointerCoords = event.clientX !== 0 || event.clientY !== 0;
            if (hasPointerCoords) {
              showRefuseTaunt(
                event.clientX + 10,
                event.clientY - 12,
                true,
                bourbouleSelectionTauntText,
                5000
              );
            } else {
              const optionRect = optionBtn.getBoundingClientRect();
              showRefuseTaunt(
                optionRect.right + 10,
                optionRect.top + optionRect.height / 2,
                true,
                bourbouleSelectionTauntText,
                5000
              );
            }
          } else {
            bourbouleTeaseStep = 0;
            const hasPointerCoords = event.clientX !== 0 || event.clientY !== 0;
            if (hasPointerCoords) {
              showRefuseTaunt(event.clientX + 10, event.clientY - 12, true, houseOptionTauntText, 5000);
            } else {
              const optionRect = optionBtn.getBoundingClientRect();
              showRefuseTaunt(optionRect.right + 10, optionRect.top + optionRect.height / 2, true, houseOptionTauntText, 5000);
            }
          }
        }

        if (
          currentIndex === foodQuestionIndex &&
          (optionIndex === pizzaOptionIndex || optionIndex === popcornOptionIndex)
        ) {
          const hasPointerCoords = event.clientX !== 0 || event.clientY !== 0;
          const tauntText = optionIndex === pizzaOptionIndex ? pizzaTauntText : popcornTauntText;
          if (hasPointerCoords) {
            showRefuseTaunt(event.clientX + 10, event.clientY - 12, true, tauntText);
          } else {
            const optionRect = optionBtn.getBoundingClientRect();
            showRefuseTaunt(optionRect.right + 10, optionRect.top + optionRect.height / 2, true, tauntText);
          }
        }

        if (currentIndex === dessertQuestionIndex) {
          dessertRefuseTeaseStep = 0;
          if (optionIndex === dessertYesOptionIndex) {
            const hasPointerCoords = event.clientX !== 0 || event.clientY !== 0;
            if (hasPointerCoords) {
              showRefuseTaunt(event.clientX + 10, event.clientY - 12, true, dessertAcceptTauntText, 5000);
            } else {
              const optionRect = optionBtn.getBoundingClientRect();
              showRefuseTaunt(optionRect.right + 10, optionRect.top + optionRect.height / 2, true, dessertAcceptTauntText, 5000);
            }
          }
        }

        if (currentIndex === drinksQuestionIndex) {
          waterTeaseStep = 0;
          if (optionIndex === cocaOptionIndex) {
            const hasPointerCoords = event.clientX !== 0 || event.clientY !== 0;
            if (hasPointerCoords) {
              showRefuseTaunt(event.clientX + 10, event.clientY - 12, true, cocaTauntText);
            } else {
              const optionRect = optionBtn.getBoundingClientRect();
              showRefuseTaunt(optionRect.right + 10, optionRect.top + optionRect.height / 2, true, cocaTauntText);
            }
          }
        }

        answers[currentIndex] = optionIndex;
        renderQuestion();
      });

      optionsEl.appendChild(optionBtn);
    });

    backBtn.disabled = currentIndex === 0;
    nextBtn.disabled = answers[currentIndex] === null;
    nextBtn.textContent = currentIndex === quizQuestions.length - 1 ? "Finish" : "Prochain";
  }

  function renderCompletion() {
    isComplete = true;
    quizStep.textContent = "All done";
    questionEl.textContent = "You finished the quiz.";
    hintEl.textContent = "Review your answers below or restart.";
    optionsEl.innerHTML = "";
    optionsEl.dataset.count = "1";

    quizQuestions.forEach((quizItem, index) => {
      const reviewItem = document.createElement("article");
      reviewItem.className = "review-item";

      const reviewQuestion = document.createElement("h3");
      reviewQuestion.className = "review-question";
      reviewQuestion.textContent = `${index + 1}. ${quizItem.question}`;

      const reviewAnswer = document.createElement("p");
      reviewAnswer.className = "review-answer";
      reviewAnswer.textContent = quizItem.options[answers[index]] || "No answer";

      reviewItem.append(reviewQuestion, reviewAnswer);
      optionsEl.appendChild(reviewItem);
    });

    backBtn.disabled = false;
    nextBtn.disabled = false;
    nextBtn.textContent = "Restart";
  }

  backBtn.addEventListener("click", () => {
    if (isComplete) {
      currentIndex = quizQuestions.length - 1;
      renderQuestion();
      return;
    }

    if (currentIndex > 0) {
      currentIndex -= 1;
      renderQuestion();
    }
  });

  nextBtn.addEventListener("click", (event) => {
    if (isComplete) {
      answers.fill(null);
      fakeQuestionDisabledOptions.clear();
      bourbouleTeaseStep = 0;
      dessertRefuseTeaseStep = 0;
      waterTeaseStep = 0;
      currentIndex = 0;
      renderQuestion();
      return;
    }

    if (answers[currentIndex] === null) {
      return;
    }

    if (currentIndex === dessertQuestionIndex && answers[currentIndex] === dessertNoOptionIndex) {
      const hasPointerCoords = event.clientX !== 0 || event.clientY !== 0;
      if (dessertRefuseTeaseStep === 0) {
        dessertRefuseTeaseStep = 1;
        if (hasPointerCoords) {
          showRefuseTaunt(event.clientX + 10, event.clientY - 12, true, dessertRefuseTeaseOneText, 5000);
        } else {
          const nextRect = nextBtn.getBoundingClientRect();
          showRefuseTaunt(nextRect.left + nextRect.width / 2, nextRect.top - 12, true, dessertRefuseTeaseOneText, 5000);
        }
        renderQuestion();
        return;
      }

      if (dessertRefuseTeaseStep === 1) {
        dessertRefuseTeaseStep = 2;
        if (hasPointerCoords) {
          showRefuseTaunt(event.clientX + 10, event.clientY - 12, true, dessertRefuseTeaseTwoText, 5000);
        } else {
          const nextRect = nextBtn.getBoundingClientRect();
          showRefuseTaunt(nextRect.left + nextRect.width / 2, nextRect.top - 12, true, dessertRefuseTeaseTwoText, 5000);
        }
        renderQuestion();
        return;
      }

      if (hasPointerCoords) {
        showRefuseTaunt(event.clientX + 10, event.clientY - 12, true, dessertRefuseTeaseThreeText, 5000);
      } else {
        const nextRect = nextBtn.getBoundingClientRect();
        showRefuseTaunt(nextRect.left + nextRect.width / 2, nextRect.top - 12, true, dessertRefuseTeaseThreeText, 5000);
      }
      dessertRefuseTeaseStep = 0;
    }

    if (currentIndex === drinksQuestionIndex && answers[currentIndex] === waterOptionIndex) {
      const hasPointerCoords = event.clientX !== 0 || event.clientY !== 0;
      if (waterTeaseStep === 0) {
        waterTeaseStep = 1;
        if (hasPointerCoords) {
          showRefuseTaunt(event.clientX + 10, event.clientY - 12, true, waterTeaseOneText, 5000);
        } else {
          const nextRect = nextBtn.getBoundingClientRect();
          showRefuseTaunt(nextRect.left + nextRect.width / 2, nextRect.top - 12, true, waterTeaseOneText, 5000);
        }
        renderQuestion();
        return;
      }

      if (waterTeaseStep === 1) {
        waterTeaseStep = 2;
        if (hasPointerCoords) {
          showRefuseTaunt(event.clientX + 10, event.clientY - 12, true, waterTeaseTwoText, 5000);
        } else {
          const nextRect = nextBtn.getBoundingClientRect();
          showRefuseTaunt(nextRect.left + nextRect.width / 2, nextRect.top - 12, true, waterTeaseTwoText, 5000);
        }
        renderQuestion();
        return;
      }

      if (waterTeaseStep === 2) {
        waterTeaseStep = 3;
        if (hasPointerCoords) {
          showRefuseTaunt(event.clientX + 10, event.clientY - 12, true, waterTeaseThreeText, 5000);
        } else {
          const nextRect = nextBtn.getBoundingClientRect();
          showRefuseTaunt(nextRect.left + nextRect.width / 2, nextRect.top - 12, true, waterTeaseThreeText, 5000);
        }
        renderQuestion();
        return;
      }

      if (hasPointerCoords) {
        showRefuseTaunt(event.clientX + 10, event.clientY - 12, true, waterTeaseFinalText, 5000);
      } else {
        const nextRect = nextBtn.getBoundingClientRect();
        showRefuseTaunt(nextRect.left + nextRect.width / 2, nextRect.top - 12, true, waterTeaseFinalText, 5000);
      }
      waterTeaseStep = 0;
    }

    if (currentIndex === houseQuestionIndex && answers[currentIndex] === bourbouleOptionIndex) {
      const hasPointerCoords = event.clientX !== 0 || event.clientY !== 0;
      if (bourbouleTeaseStep === 0) {
        bourbouleTeaseStep = 1;
        if (hasPointerCoords) {
          showRefuseTaunt(event.clientX + 10, event.clientY - 12, true, bourbouleStepOneTauntText, 3000);
        } else {
          const nextRect = nextBtn.getBoundingClientRect();
          showRefuseTaunt(nextRect.left + nextRect.width / 2, nextRect.top - 12, true, bourbouleStepOneTauntText, 3000);
        }
        renderQuestion();
        return;
      }

      if (bourbouleTeaseStep === 1) {
        bourbouleTeaseStep = 2;
        if (hasPointerCoords) {
          showRefuseTaunt(event.clientX + 10, event.clientY - 12, true, bourbouleStepTwoTauntText, 3000);
        } else {
          const nextRect = nextBtn.getBoundingClientRect();
          showRefuseTaunt(nextRect.left + nextRect.width / 2, nextRect.top - 12, true, bourbouleStepTwoTauntText, 3000);
        }
        renderQuestion();
        return;
      }

      if (hasPointerCoords) {
        showRefuseTaunt(event.clientX + 10, event.clientY - 12, true, bourbouleStepThreeTauntText, 3000);
      } else {
        const nextRect = nextBtn.getBoundingClientRect();
        showRefuseTaunt(nextRect.left + nextRect.width / 2, nextRect.top - 12, true, bourbouleStepThreeTauntText, 3000);
      }
      bourbouleTeaseStep = 0;
    }

    if (currentIndex < quizQuestions.length - 1) {
      currentIndex += 1;
      renderQuestion();
      return;
    }

    renderCompletion();
  });

  renderQuestion();
}
