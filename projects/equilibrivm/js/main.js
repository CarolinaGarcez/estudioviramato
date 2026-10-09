/**
 * Arquivo: js/main.js
 * Finalidade: Ponto de entrada (Entrypoint) principal do JavaScript.
 * Responsabilidade:
 *   - Importar os inicializadores da retrospectiva, do vinil e do arquivo histórico.
 *   - Registrar o ouvinte de carregamento do DOM (DOMContentLoaded).
 *   - Inicializar as rotinas de cada módulo na ordem adequada.
 * Relação com outros módulos:
 *   - É o único arquivo Javascript incluído diretamente no HTML (via script type="module").
 *   - Importa countdown.js, vinyl.js e archive.js.
 */

// Importa as rotinas de inicialização dos submódulos
import { initCountdown } from './countdown.js';
import { initVinyl } from './vinyl.js';
import { initArchive } from './archive.js';

// Executa a inicialização quando o DOM estiver completamente montado
document.addEventListener("DOMContentLoaded", () => {
  // 1. Inicializa a retrospectiva ilustrativa do contador
  initCountdown();

  // 2. Inicializa os controles interativos do disco de vinil
  initVinyl();

  // 3. Disponibiliza o registro histórico somente quando houver capturas reais
  initArchive();
});
