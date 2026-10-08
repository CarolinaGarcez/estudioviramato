/**
 * Arquivo: js/vinyl.js
 * Finalidade: Módulo de controle do Disco de Vinil.
 * Responsabilidade:
 *   - Gerenciar o estado do disco de vinil.
 *   - Implementar interações de play/pause da rotação contínua através do clique no vinil.
 * Métodos exportados:
 *   - initVinyl(): Configura os ouvintes de eventos de clique no elemento do vinil.
 * Relação com outros módulos:
 *   - Inicializado pelo módulo principal js/main.js.
 */

/**
 * Inicializa os controles interativos do disco de vinil
 */
export function initVinyl() {
  const vinylRecord = document.querySelector('.vinyl-record');
  if (!vinylRecord) return;

  // Interação extra: pausar/iniciar a rotação do vinil ao clicar nele
  const updateControlName = (isPaused) => {
    vinylRecord.setAttribute('aria-pressed', String(isPaused));
    vinylRecord.setAttribute('aria-label', `${isPaused ? 'Retomar' : 'Pausar'} a animação do disco`);
  };

  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (motionPreference.matches) {
    vinylRecord.style.animationPlayState = 'paused';
    updateControlName(true);
  }

  vinylRecord.addEventListener('click', () => {
    // Captura o estilo computado atual da animação do vinil
    const currentPlayState = window.getComputedStyle(vinylRecord).animationPlayState;

    // Altera o play-state para pausar ou continuar
    if (currentPlayState === 'running') {
      vinylRecord.style.animationPlayState = 'paused';
      updateControlName(true);
    } else {
      vinylRecord.style.animationPlayState = 'running';
      updateControlName(false);
    }
  });
}
