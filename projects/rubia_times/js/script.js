/* Rúbia Times — interações serão adicionadas nas próximas etapas. */

"use strict";

// elementos da página e preferências de movimento
const motionPreferences = {
  reduced: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  compact: window.matchMedia("(max-width: 48rem)").matches
};

const scrollEntryHandlers = new Map();
const canObserveScroll = !motionPreferences.reduced && "IntersectionObserver" in window;
const scrollEntryObserver = canObserveScroll
  ? new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const handler = scrollEntryHandlers.get(entry.target);
      if (handler) {
        handler();
      }

      scrollEntryHandlers.delete(entry.target);
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.16,
    rootMargin: "0px 0px -8% 0px"
  })
  : null;

function observeScrollEntry(element, handler) {
  if (!element) {
    return;
  }

  if (!canObserveScroll) {
    handler();
    return;
  }

  scrollEntryHandlers.set(element, handler);
  scrollEntryObserver.observe(element);
}

function revealEditorialElement(element) {
  element.classList.add("is-visible");

  const releaseCompositorHint = (event) => {
    if (event.propertyName === "opacity") {
      element.classList.remove("editorial-reveal--will-change");
      element.removeEventListener("transitionend", releaseCompositorHint);
    }
  };

  element.addEventListener("transitionend", releaseCompositorHint);
  const revealDelay = Number.parseFloat(element.style.getPropertyValue("--reveal-delay")) || 0;
  window.setTimeout(() => element.classList.remove("editorial-reveal--will-change"), revealDelay + 600);
}

function prepareEditorialSequence(sectionSelector, selectors, triggerSelector = null) {
  const section = document.querySelector(sectionSelector);
  if (!section) {
    return;
  }

  const targets = selectors
    .map((selector) => section.querySelector(selector))
    .filter(Boolean);
  const trigger = triggerSelector ? section.querySelector(triggerSelector) : targets[0];
  const delayStep = motionPreferences.compact ? 70 : 120;

  targets.forEach((target, index) => {
    target.classList.add("editorial-reveal", "editorial-reveal--will-change");
    target.style.setProperty("--reveal-delay", `${index * delayStep}ms`);
  });

  observeScrollEntry(trigger, () => targets.forEach(revealEditorialElement));
}

prepareEditorialSequence("#breaking-news", [
  ".breaking-news__stamp", ".breaking-news__story h2", ".breaking-news__copy", ".breaking-news__photo", ".breaking-news__visual .sheep-cameo"
]);
prepareEditorialSequence("#dossier", [
  ".dossier__stamp", ".dossier__code", ".dossier__header h2", ".dossier__records", ".dossier__expression-file", ".sheep-cameo--seated"
]);
prepareEditorialSequence("#photo-archive", [
  ".photo-archive__kicker", ".photo-archive__header h2", ".photo-archive__intro", ".archive-carousel", ".sheep-spot--archive"
]);
prepareEditorialSequence("#sports", [
  ".sports__kicker", ".sports__emblem", ".sports__header h2", ".sports__story", ".sports__main-photo", ".sports__photo", ".sports__illustrations", ".sheep-cameo--back"
]);
prepareEditorialSequence("#inss-history", [
  ".inss-history__kicker", ".inss-history__header h2", ".inss-history__subhead", ".inss-history__milestone", ".inss-history__article"
]);
prepareEditorialSequence("#classifieds", [
  ".classified-ad__section-title", ".classified-ad__headline", ".classified-ad__waiting", ".classified-ad__body", ".classified-note", ".classified-ad__rings", ".anthony-scene--original", ".anthony-scene--peeking", ".anthony-scene--whisper", ".anthony-closing"
]);
prepareEditorialSequence("#lost-and-found", [
  ".lost-found-ad__kicker", ".lost-found-ad__header h2", ".lost-found-ad__questions", ".lost-found-ad__method", ".lost-found-ad__details", ".sheep-spot--lost"
]);
prepareEditorialSequence("#horoscope", [
  ".horoscope__kicker", ".horoscope__identity > div", ".horoscope-forecast"
], ".horoscope__header");
prepareEditorialSequence("#husbands-bingo", [
  ".husbands-bingo__kicker", ".husbands-bingo__header h2", ".husbands-bingo__subhead", ".husbands-ledger", ".rubia-bingo-card", ".data-analysis", ".passport-sheep"
], ".husbands-bingo__header");
prepareEditorialSequence("#news-notes", [
  ".news-note--sources", ".news-note--weather", ".news-note--quote", ".news-note--notice", ".news-note--correction", ".news-note--title", ".saint-cameo--scroll", ".sheep-cameo--sleeping"
]);
prepareEditorialSequence("#editorial", [
  ".special-divider--editorial", ".editorial-article__kicker", ".editorial-article__header h2", ".editorial-article__copy", ".editorial-article__closing"
]);

// Faz a bola quicar uma vez quando a ilustração entra em cena.
const sportsBall = document.querySelector("#sports .sports__ball");
observeScrollEntry(sportsBall, () => sportsBall.classList.add("sports-ball--bounce"));

// carrossel de fotos
const archiveCarousel = document.querySelector(".archive-carousel");

if (archiveCarousel) {
  const archiveFiles = [
    {
      category: "ELA",
      description: "  Virginiana por natureza, incrível por escolha!",
      src: "asssets/img/Arquivo_01.png",
      alt: "Retrato de Rúbia ao ar livre"
    },
    {
      category: "MÃE",
      description: "Mãe é mãe, né?",
      src: "asssets/img/Arquivo_02.png",
      alt: "Rúbia com os dois filhos em um parque"
    },
    {
      category: "AMIZADE VERDADEIRA",
      description: "Vai Corinthians!",
      src: "asssets/img/amizades.png",
      alt: "Rúbia em frente à Neo Química Arena"
    },
    {
      category: "FILHA",
      description: "Antes de ser mãe, chefinha e resolvedora oficial de Problemas., ela já ocupava este cargo de filha.",
      src: "asssets/img/Memórias.png",
      alt: "Rúbia com a mãe em uma fotografia em preto e branco"
    },
    {
      category: "AMIGA",
      description: "Reunião extraordinária convocada. Pauta oficial: fofocar.",
      src: "asssets/img/Amizades1.jpeg",
      alt: "Rúbia sentada à mesa com duas amigas"
    },
    {
      category: "CHEFINHA 💛",
      description: "Carol + Rúbia.",
      src: "asssets/img/Arquivo 06.png",
      alt: "Carol e Rúbia sorrindo juntas"
    }
  ];

  const image = archiveCarousel.querySelector(".archive-carousel__image");
  const placeholder = archiveCarousel.querySelector(".archive-carousel__placeholder");
  const fileNumber = archiveCarousel.querySelector(".archive-carousel__file");
  const category = archiveCarousel.querySelector(".archive-carousel__category");
  const description = archiveCarousel.querySelector(".archive-carousel__description");
  const counter = archiveCarousel.querySelector(".archive-carousel__counter");
  const currentCounter = counter.querySelector("span:first-child");
  const previousButton = archiveCarousel.querySelector(".archive-carousel__button--previous");
  const nextButton = archiveCarousel.querySelector(".archive-carousel__button--next");
  let currentIndex = 0;

  function formatNumber(number) {
    return String(number).padStart(2, "0");
  }

  function showArchiveFile(index) {
    currentIndex = (index + archiveFiles.length) % archiveFiles.length;
    const file = archiveFiles[currentIndex];
    const displayedNumber = formatNumber(currentIndex + 1);

    if (file.src) {
      image.src = file.src;
      image.alt = file.alt;
      image.hidden = false;
      placeholder.hidden = true;
    } else {
      image.removeAttribute("src");
      image.alt = file.alt;
      image.hidden = true;
      placeholder.hidden = false;
    }
    fileNumber.textContent = `ARQUIVO ${displayedNumber} / ${formatNumber(archiveFiles.length)}`;
    category.textContent = file.category;
    description.textContent = file.description;
    currentCounter.textContent = displayedNumber;
    counter.setAttribute("aria-label", `Arquivo ${currentIndex + 1} de ${archiveFiles.length}`);
  }

  previousButton.addEventListener("click", () => showArchiveFile(currentIndex - 1));
  nextButton.addEventListener("click", () => showArchiveFile(currentIndex + 1));

  archiveCarousel.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showArchiveFile(currentIndex - 1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      showArchiveFile(currentIndex + 1);
    }
  });
}

/* =========================
   OPERAÇÃO OVELHA
========================= */
const sheepMessages = [
  "Bé. Você não me viu aqui.",
  "Eu não estou perdida. Estou explorando.",
  "São Longuinho sabe que eu tô aqui?",
  "Eu também estava perdida.",
  "Bééé... falta quantas?",
  "Bé. Só conferindo o expediente.",
  "Shhh. Estou dormindo de propósito.",
  "Cheguei para a festa. Bé!",
  "Virei de costas para ninguém me achar.",
  "Estou só espiando a edição.",
  "BÉÉÉÉ! Demorou, hein?"
];

const existingSheepButtons = document.querySelectorAll("[data-sheep-id]");
const cameoSheep = [...document.querySelectorAll("img.sheep-cameo")];

cameoSheep.forEach((image, index) => {
  const parent = image.parentElement;
  const spot = document.createElement("div");
  spot.className = `sheep-spot sheep-cameo ${[...image.classList].filter((name) => name !== "sheep-cameo").join(" ")}`;
  spot.dataset.sheepId = String(existingSheepButtons.length + index + 1);

  const button = document.createElement("button");
  button.type = "button";
  button.className = "sheep-button";
  button.setAttribute("aria-label", `Ovelha escondida número ${spot.dataset.sheepId}`);
  button.setAttribute("aria-pressed", "false");

  image.className = "sheep-illustration";
  image.removeAttribute("aria-hidden");
  image.alt = "Ovelha escondida";

  const message = document.createElement("span");
  message.className = "sheep-message";
  message.role = "status";
  message.hidden = true;
  message.textContent = sheepMessages[existingSheepButtons.length + index];

  spot.append(button, message);
  parent.replaceChild(spot, image);
  button.append(image);
});

const sheepButtons = document.querySelectorAll("[data-sheep-id]");
const sheepProgress = document.querySelector("#sheep-progress");
const sheepComplete = document.querySelector(".sheep-complete");

if (sheepButtons.length && sheepProgress && sheepComplete) {
  const foundSheep = new Set();
  const totalSheep = sheepButtons.length;
  sheepProgress.textContent = `OVELHAS ENCONTRADAS\n0 / ${totalSheep}`;

  sheepButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const sheepId = button.dataset.sheepId;
      const message = button.closest(".sheep-spot").querySelector(".sheep-message");

      message.textContent = sheepMessages[Number(sheepId) - 1] || "Bé. Achei você.";
      message.hidden = false;
      clearTimeout(message.hideTimer);
      message.hideTimer = setTimeout(() => {
        message.hidden = true;
      }, 3600);
      button.classList.add("is-found");
      button.setAttribute("aria-pressed", "true");

      if (foundSheep.has(sheepId)) {
        return;
      }

      foundSheep.add(sheepId);
      sheepProgress.textContent = `OVELHAS ENCONTRADAS\n${foundSheep.size} / ${totalSheep}`;

      if (foundSheep.size === totalSheep) {
        sheepComplete.hidden = false;
      }
    });
  });
}

/* =========================
   MICROINTERAÇÕES EDITORIAIS
========================= */
/* =========================
   PESQUISA CORINTHIANS
========================= */
const sportsPoll = document.querySelector(".sports-poll");
const corinthiansBar = sportsPoll?.querySelector(".sports-poll__bar--full");
const pollCelebration = sportsPoll?.querySelector(".sports-poll__celebration");

if (sportsPoll && corinthiansBar && pollCelebration) {
  let hasAnimated = false;

  const celebrateResult = () => {
    if (motionPreferences.reduced || sportsPoll.classList.contains("is-celebrating")) {
      return;
    }

    const colors = ["var(--ink)", "var(--accent)", "#9a792f"];
    const origins = [
      { left: 12, top: 58 },
      { left: 32, top: 42 },
      { left: 50, top: 55 },
      { left: 68, top: 42 },
      { left: 88, top: 58 }
    ];
    const particleCount = 84;
    let finishedParticles = 0;

    for (let index = 0; index < particleCount; index += 1) {
      const particle = document.createElement("i");
      const origin = origins[index % origins.length];
      const angle = ((Math.PI * 2) / 16) * (index % 16) + ((index % 5) * 0.11);
      const distance = 65 + ((index * 29) % 116);
      const isDot = index % 3 === 0;
      const isStrip = index % 4 === 0;

      particle.className = `sports-poll__confetti ${isStrip ? "sports-poll__confetti--strip" : isDot ? "sports-poll__confetti--dot" : "sports-poll__confetti--fragment"}`;
      particle.style.setProperty("--confetti-left", `${origin.left}%`);
      particle.style.setProperty("--confetti-top", `${origin.top}%`);
      particle.style.setProperty("--confetti-x", `${Math.cos(angle) * distance}px`);
      particle.style.setProperty("--confetti-y", `${Math.sin(angle) * distance}px`);
      particle.style.setProperty("--confetti-rotation", `${140 + (index * 47)}deg`);
      particle.style.setProperty("--confetti-delay", `${(index % 8) * 24}ms`);
      particle.style.setProperty("--confetti-duration", `${680 + ((index * 37) % 241)}ms`);
      particle.style.setProperty("--confetti-scale", `${0.95 + ((index % 6) * 0.12)}`);
      particle.style.setProperty("--confetti-color", colors[index % colors.length]);
      particle.addEventListener("animationend", () => {
        particle.remove();
        finishedParticles += 1;

        if (finishedParticles === particleCount) {
          sportsPoll.classList.remove("is-celebrating");
        }
      }, { once: true });
      pollCelebration.append(particle);
    }

    sportsPoll.classList.add("is-celebrating");
  };

  const startPollAnimation = () => {
    if (hasAnimated) {
      return;
    }

    hasAnimated = true;
    sportsPoll.classList.add("is-animating");

    if (!motionPreferences.reduced) {
      corinthiansBar.addEventListener("transitionend", celebrateResult, { once: true });
    }
  };

  observeScrollEntry(sportsPoll, startPollAnimation);
}

/* =========================
   CONSTELAÇÃO E AVALIAÇÕES
========================= */
const horoscopeSection = document.querySelector("#horoscope");

if (horoscopeSection) {
  const ratingRows = horoscopeSection.querySelectorAll(".horoscope-ratings__item");

  ratingRows.forEach((row, ratingIndex) => {
    const stars = row.querySelector("dd > span");

    if (!stars) {
      return;
    }

    const characters = [...stars.textContent.trim()];
    stars.replaceChildren(...characters.map((character, starIndex) => {
      const star = document.createElement("i");
      star.className = `horoscope-ratings__star${character === "☆" ? " horoscope-ratings__star--empty" : ""}`;
      star.textContent = character;
      star.style.setProperty("--star-delay", `${180 + (starIndex * 90) + (ratingIndex * 65)}ms`);
      return star;
    }));
  });

  const revealAstrology = () => {
    horoscopeSection.classList.add("is-constellation-visible");

    if (motionPreferences.reduced) {
      horoscopeSection.classList.add("is-ratings-visible");
      return;
    }

    window.setTimeout(() => horoscopeSection.classList.add("is-ratings-visible"), motionPreferences.compact ? 1560 : 1880);
  };

  observeScrollEntry(horoscopeSection, revealAstrology);
}
