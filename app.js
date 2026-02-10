const quizQuestions = [
  {
    question: "Saint Valentin ? 💌",
    hint: "(bonne chance si jamais tu veux refuser...)",
    options: [
      "J'accepte ! 😻",
      "Je refuse ! 😿",
    ],
  },
  {
    question: "Tu préfères...",
    hint: "(Désolé, il faut prendre une décision ! 😬)",
    options: ["📽️🍝 Film / Resto", "🗝️ Escape Game", "🎞️🃏 Marathon Serie / Jeux Société"],
  },
  {
    question: "On fait ça ou ?",
    options: ["🧚‍♂️ Au sommet de la roche des fées !", "🏠 Chez moi comme d'hab", "🏠 Comme d'hab chez moi"],
  },
  {
    question: "Qu'est ce qu'on mange ?",
    hint: "Un choix important... (mais pas de pression)",
    options: ["🍕 Pizza (j'aurais faim)", "🥀😪 Mogette... (pas trouvé )", "🍿 Pop Corn ça me suffit"],
  },
  {
    question: "Un dessert brésilien *fait maison* ?",
    hint: "👀...🍫...",
    options: ["Oui ! Pour l'amour de dieu 😌", "Non, j'ai perdu mes neurones (🤨)"],
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

if (quizStep && questionEl && hintEl && optionsEl && backBtn && nextBtn) {
  const answers = Array(quizQuestions.length).fill(null);
  let currentIndex = 0;
  let isComplete = false;
  const refuseLabels = new Set(["i refuse", "je refuse", "no", "non"]);
  const acceptLabel = "J'accepte ! 😻";
  const refuseLabel = "Je refuse ! 😿";
  const refuseHoverEmoji = "\u{1F928}";
  const refuseTauntText = "oops, dommage !"; // \u{1F602}
  const isRefuseTauntEnabled = false;
  let refuseTauntTimer = null;
  const refuseTauntEl = document.createElement("div");

  refuseTauntEl.className = "refuse-taunt";
  refuseTauntEl.setAttribute("aria-hidden", "true");
  document.body.appendChild(refuseTauntEl);

  function showRefuseTaunt(x, y) {
    if (!isRefuseTauntEnabled) {
      return;
    }

    if (!Number.isFinite(x) || !Number.isFinite(y)) {
      return;
    }

    if (refuseTauntTimer) {
      clearTimeout(refuseTauntTimer);
    }

    refuseTauntEl.textContent = refuseTauntText;
    refuseTauntEl.style.left = `${x}px`;
    refuseTauntEl.style.top = `${y}px`;
    refuseTauntEl.classList.remove("is-visible");
    void refuseTauntEl.offsetWidth;
    refuseTauntEl.classList.add("is-visible");

    refuseTauntTimer = setTimeout(() => {
      refuseTauntEl.classList.remove("is-visible");
      refuseTauntTimer = null;
    }, 2000);
  }

  function normalizeOptionLabel(label) {
    return label
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z\s]/g, "")
      .trim()
      .toLowerCase();
  }

  function renderQuestion() {
    const currentQuestion = quizQuestions[currentIndex];
    const baseQuestionText = currentQuestion.question;
    isComplete = false;
    questionEl.classList.remove("is-refuse-hover");

    quizStep.textContent = `Question ${currentIndex + 1} / ${quizQuestions.length}`;
    questionEl.textContent = baseQuestionText;
    hintEl.textContent = currentQuestion.hint || "";
    optionsEl.innerHTML = "";
    optionsEl.dataset.count = String(currentQuestion.options.length);

    currentQuestion.options.forEach((optionLabel, optionIndex) => {
      const optionBtn = document.createElement("button");
      optionBtn.type = "button";
      optionBtn.className = "option";
      optionBtn.textContent = optionLabel;
      const normalized = normalizeOptionLabel(optionLabel);
      const isRefuseOption = currentIndex === 0 && refuseLabels.has(normalized);

      const isSelected = answers[currentIndex] === optionIndex;
      optionBtn.classList.toggle("is-selected", isSelected);
      optionBtn.setAttribute("aria-selected", String(isSelected));

      if (isRefuseOption) {
        optionBtn.addEventListener("mouseenter", (event) => {
          questionEl.classList.add("is-refuse-hover");
          questionEl.textContent = `${baseQuestionText} ${refuseHoverEmoji}`;
        });

        optionBtn.addEventListener("mouseleave", () => {
          questionEl.classList.remove("is-refuse-hover");
          questionEl.textContent = baseQuestionText;
        });

        optionBtn.addEventListener("focus", () => {
          questionEl.classList.add("is-refuse-hover");
          questionEl.textContent = `${baseQuestionText} ${refuseHoverEmoji}`;
        });

        optionBtn.addEventListener("blur", () => {
          questionEl.classList.remove("is-refuse-hover");
          questionEl.textContent = baseQuestionText;
        });
      }

      optionBtn.addEventListener("click", (event) => {
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

        answers[currentIndex] = optionIndex;
        renderQuestion();
      });

      optionsEl.appendChild(optionBtn);
    });

    backBtn.disabled = currentIndex === 0;
    nextBtn.disabled = answers[currentIndex] === null;
    nextBtn.textContent = currentIndex === quizQuestions.length - 1 ? "Finish" : "Next";
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

  nextBtn.addEventListener("click", () => {
    if (isComplete) {
      answers.fill(null);
      currentIndex = 0;
      renderQuestion();
      return;
    }

    if (answers[currentIndex] === null) {
      return;
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
