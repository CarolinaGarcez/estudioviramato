// ========================================
// MENU MOBILE
// Abre, fecha e mantém o estado acessível do menu
// ========================================
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.top-nav');

navToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
});

// Ao escolher um link, fecho o menu para liberar a tela no celular.
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
}));

// ========================================
// TROCA DE TEMA
// Recupera e salva a escolha entre Light e Dark Mode
// ========================================
const themeButton = document.querySelector('.theme-toggle');
const savedTheme = localStorage.getItem('ds-theme');

// Sem escolha salva, sigo o tema configurado no dispositivo.
if (savedTheme === 'dark' || (!savedTheme && matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.body.classList.add('dark-mode');
}

themeButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('ds-theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});

// ========================================
// DEMONSTRAÇÕES DE MOTION
// Toca os exemplos quando eles aparecem na tela
// ========================================
const motionLibrary = document.querySelector('.motion-library');
const motionReplay = document.querySelector('.motion-replay');
const reducedMotionPreference = matchMedia('(prefers-reduced-motion: reduce)').matches;

// Removo e devolvo a classe para reiniciar as animações desde o começo.
const playMotionLibrary = () => {
  if (!motionLibrary || reducedMotionPreference) return;
  motionLibrary.classList.remove('is-playing');
  // A leitura da largura força o navegador a reconhecer a remoção da classe.
  void motionLibrary.offsetWidth;
  motionLibrary.classList.add('is-playing');
};

// O observer toca a biblioteca uma vez, quando 18% dela entra na tela.
if (motionLibrary && !reducedMotionPreference && 'IntersectionObserver' in window) {
  const motionObserver = new IntersectionObserver(([entry], observer) => {
    if (!entry.isIntersecting) return;
    playMotionLibrary();
    observer.unobserve(entry.target);
  }, { threshold: 0.18 });
  motionObserver.observe(motionLibrary);
}

// O botão é opcional, por isso uso ?. antes de adicionar o clique.
motionReplay?.addEventListener('click', playMotionLibrary);

// ========================================
// ASSINATURA FINAL
// Escreve a frase quando o encerramento entra na tela
// ========================================
const finalStatement = document.querySelector('.final-statement');

// Não ativo o efeito se a pessoa preferir menos movimento.
if (finalStatement && !matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
  finalStatement.classList.add('has-motion');
  const statementObserver = new IntersectionObserver(([entry], observer) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-written');
    observer.unobserve(entry.target);
  }, { threshold: 0.65 });
  statementObserver.observe(finalStatement);
}
