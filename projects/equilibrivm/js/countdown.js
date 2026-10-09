/** Retrospectiva acelerada e ilustrativa do contador que existia antes do evento. */

// Retrospectiva curta; os valores não representam uma data histórica real.
const SIMULATION_DURATION_MS = 13000;
const SIMULATION_START_SECONDS = (10 * 24 * 60 * 60) + (14 * 60 * 60) + (32 * 60) + 18;

// Evita animar dígitos na primeira apresentação da retrospectiva.
let isInitialLoad = true;

/**
 * Executa a animação física de flip 3D em um dígito individual
 * @param {HTMLElement} cardElement - O elemento do cartão (.flip-card)
 * @param {string} newValue - O novo número (caractere) a ser exibido
 */
function flipDigit(cardElement, newValue) {
  const topElement = cardElement.querySelector('.top .digit-num');
  const bottomElement = cardElement.querySelector('.bottom .digit-num');

  if (!topElement || !bottomElement) return;

  const currentValue = topElement.textContent;

  // Se o valor não mudou, não faz nada
  if (currentValue === newValue) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    topElement.textContent = newValue;
    bottomElement.textContent = newValue;
    return;
  }

  // Remove animações anteriores pendentes (previne acúmulo se o navegador pausar na aba inativa)
  const pendingTopFlips = cardElement.querySelectorAll('.top-flip');
  const pendingBottomFlips = cardElement.querySelectorAll('.bottom-flip');
  pendingTopFlips.forEach(el => el.remove());
  pendingBottomFlips.forEach(el => el.remove());

  // Criar os flaps de animação temporários
  const topFlip = document.createElement('div');
  topFlip.classList.add('top-flip');
  topFlip.innerHTML = `<span class="digit-num">${currentValue}</span>`;

  const bottomFlip = document.createElement('div');
  bottomFlip.classList.add('bottom-flip');
  bottomFlip.innerHTML = `<span class="digit-num">${newValue}</span>`;

  // 1. Atualizar o topo estático imediatamente para o novo valor
  topElement.textContent = newValue;

  // 2. Quando a metade superior terminar de descer, removemos ela do DOM
  topFlip.addEventListener('animationend', () => {
    topFlip.remove();
  });

  // 3. Quando a metade inferior terminar de descer para a posição final,
  // atualizamos o fundo estático inferior com o novo valor e limpamos o flap
  bottomFlip.addEventListener('animationend', () => {
    bottomElement.textContent = newValue;
    bottomFlip.remove();
  });

  // Anexar os flaps animados para iniciar a transição CSS
  cardElement.appendChild(topFlip);
  cardElement.appendChild(bottomFlip);
}

/**
 * Seleciona o elemento HTML e atualiza seu valor de dígito
 * @param {string} cardId - O ID do elemento .flip-card
 * @param {string} newValue - O novo valor de um dígito ("0" a "9")
 */
function updateCard(cardId, newValue) {
  const card = document.getElementById(cardId);
  if (!card) return;

  const topSpan = card.querySelector('.top .digit-num');
  const bottomSpan = card.querySelector('.bottom .digit-num');

  if (isInitialLoad) {
    // No carregamento inicial, apenas inserimos o texto sem animar o flip
    if (topSpan) topSpan.textContent = newValue;
    if (bottomSpan) bottomSpan.textContent = newValue;
  } else {
    // Nas atualizações subsequentes, executamos a transição flip
    flipDigit(card, newValue);
  }
}

function renderCountdown(totalSeconds) {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const days = Math.floor(safeSeconds / 86400);
  const hours = Math.floor((safeSeconds % 86400) / 3600);
  const minutes = Math.floor((safeSeconds % 3600) / 60);
  const seconds = safeSeconds % 60;
  const values = [days, hours, minutes, seconds].map(value => String(value).padStart(2, '0'));
  const ids = [
    ['days-tens', 'days-ones'],
    ['hours-tens', 'hours-ones'],
    ['minutes-tens', 'minutes-ones'],
    ['seconds-tens', 'seconds-ones']
  ];

  values.forEach((value, index) => {
    updateCard(ids[index][0], value[0]);
    updateCard(ids[index][1], value[1]);
  });

  const readable = document.getElementById('countdown-readable');
  if (readable) {
    readable.textContent = `${days} ${days === 1 ? 'dia' : 'dias'}, ${hours} ${hours === 1 ? 'hora' : 'horas'}, ${minutes} ${minutes === 1 ? 'minuto' : 'minutos'} e ${seconds} ${seconds === 1 ? 'segundo' : 'segundos'}. Valores ilustrativos.`;
  }

  isInitialLoad = false;
}

export function initCountdown() {
  const title = document.getElementById('countdown-title');
  const countdown = document.getElementById('countdown-container');
  const note = document.getElementById('retrospective-note');
  const toggle = document.getElementById('retrospective-toggle');
  const status = document.getElementById('experience-status');
  if (!title || !countdown || !toggle) return;

  let intervalId = null;
  let completionTimeout = null;
  let isRunning = false;
  let isStaticView = false;

  const returnToMemory = (announcement = '') => {
    clearInterval(intervalId);
    clearTimeout(completionTimeout);
    intervalId = null;
    completionTimeout = null;
    isRunning = false;
    isStaticView = false;
    countdown.hidden = true;
    if (note) note.hidden = true;
    title.textContent = 'EVENTO REALIZADO';
    toggle.textContent = 'Reviver a espera';
    if (announcement && status) status.textContent = announcement;
  };

  const finishSimulation = () => {
    isRunning = false;
    intervalId = null;
    renderCountdown(0);
    toggle.textContent = 'Reviver novamente';
    if (status) status.textContent = 'Retrospectiva concluída. A espera virou memória.';
    completionTimeout = setTimeout(() => returnToMemory(), 750);
  };

  const startSimulation = () => {
    clearTimeout(completionTimeout);
    isStaticView = false;
    countdown.hidden = false;
    if (note) {
      note.textContent = 'Simulação acelerada; os valores são ilustrativos e não representam uma data histórica.';
      note.hidden = false;
    }
    title.textContent = 'RETROSPECTIVA SIMULADA';
    toggle.textContent = 'Interromper retrospectiva';
    isRunning = true;
    if (status) status.textContent = 'Retrospectiva simulada iniciada. O contador será acelerado por cerca de 13 segundos.';

    const startedAt = performance.now();
    renderCountdown(SIMULATION_START_SECONDS);
    intervalId = setInterval(() => {
      const elapsed = performance.now() - startedAt;
      if (elapsed >= SIMULATION_DURATION_MS) {
        clearInterval(intervalId);
        finishSimulation();
        return;
      }

      const remaining = Math.ceil(SIMULATION_START_SECONDS * (1 - (elapsed / SIMULATION_DURATION_MS)));
      renderCountdown(remaining);
    }, 650);
  };

  const showReducedMotionVersion = () => {
    isStaticView = true;
    countdown.hidden = false;
    if (note) {
      note.textContent = 'Versão estática da retrospectiva: valores ilustrativos, sem animação acelerada.';
      note.hidden = false;
    }
    title.textContent = 'RETROSPECTIVA SIMULADA · SEM ANIMAÇÃO';
    toggle.textContent = 'Voltar à memória';
    renderCountdown(SIMULATION_START_SECONDS);
    if (status) status.textContent = 'Retrospectiva estática exibida conforme sua preferência por movimento reduzido.';
  };

  toggle.hidden = false;
  toggle.addEventListener('click', () => {
    if (isRunning) {
      returnToMemory('Retrospectiva interrompida. Estado de memória restaurado.');
      return;
    }

    if (isStaticView) {
      returnToMemory('Estado de memória restaurado.');
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      showReducedMotionVersion();
      return;
    }

    startSimulation();
  });
}
