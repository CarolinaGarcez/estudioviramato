/* ========================================
   TEXTO ANIMADO
======================================== */

document.addEventListener("DOMContentLoaded", () => {
  const element = document.querySelector("#element");

  // Inicia a troca de textos somente quando a biblioteca estiver disponÃ­vel.
  if (element && typeof Typed !== "undefined") {
    new Typed("#element", {
      strings: [
        "Front-End Developer em formaÃ§Ã£o",
        "Explorando Product Design & UX/UI",
        "Criando interfaces limpas e modernas",
      ],
      startDelay: 800,
      typeSpeed: 55,
      backSpeed: 30,
      backDelay: 1800,
      loop: true,
    });
  }

  // Mostra cada seÃ§Ã£o quando ela entra na Ã¡rea visÃ­vel da pÃ¡gina.
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show-animate");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  const hiddenElements = document.querySelectorAll(".animate-section");
  hiddenElements.forEach((el) => observer.observe(el));

  // Ajusta o cabeÃ§alho depois que a pÃ¡gina comeÃ§a a rolar.
  const header = document.querySelector("header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
});

/* ========================================
   NAVEGAÃ‡ÃƒO ENTRE SEÃ‡Ã•ES
======================================== */

document.addEventListener("DOMContentLoaded", () => {
  const scrollBtn = document.getElementById("scrollBtn");

  if (scrollBtn) {
    scrollBtn.addEventListener("click", () => {
      const sections = document.querySelectorAll("main section, footer");
      const scrollPosition = window.scrollY;

      // Procura a prÃ³xima seÃ§Ã£o abaixo da posiÃ§Ã£o atual.
      for (let i = 0; i < sections.length; i++) {
        const sectionTop = sections[i].offsetTop;

        if (sectionTop > scrollPosition + 90) {
          window.scrollTo({
            top: sectionTop - 80,
            behavior: "smooth",
          });
          break;
        }
      }
    });
  }
});

/* ========================================
   TEMA CLARO E ESCURO
======================================== */

(() => {
  const toggleThemeBtn = document.getElementById("toggle-theme");
  const toggleIcon = toggleThemeBtn
    ? toggleThemeBtn.querySelector("i")
    : null;

  const updateIcon = (isDark) => {
    if (!toggleIcon) return;

    if (isDark) {
      toggleIcon.className = "fa-solid fa-sun";
    } else {
      toggleIcon.className = "fa-solid fa-moon";
    }
  };

  // MantÃ©m a escolha salva; sem preferÃªncia, acompanha o tema do sistema.
  const currentTheme = localStorage.getItem("theme");
  const isDarkMode =
    currentTheme === "dark" ||
    (!currentTheme &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  if (isDarkMode) {
    document.body.classList.add("dark-mode");
    updateIcon(true);
  } else {
    document.body.classList.remove("dark-mode");
    updateIcon(false);
  }

  if (toggleThemeBtn) {
    toggleThemeBtn.addEventListener("click", () => {
      const isDark = document.body.classList.toggle("dark-mode");

      updateIcon(isDark);
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  }
})();

/* ========================================
   MENU MOBILE
======================================== */

document.addEventListener("DOMContentLoaded", () => {
  const bars = document.querySelector(".bars");
  const menu = document.querySelector("#menu");
  const menuLinks = document.querySelectorAll("#menu a");

  if (bars && menu) {
    bars.addEventListener("click", (event) => {
      event.stopPropagation();
      menu.classList.toggle("mobile-menu");

      const icon = bars.querySelector("i");

      if (icon) {
        if (menu.classList.contains("mobile-menu")) {
          icon.className = "fa-solid fa-xmark";
        } else {
          icon.className = "fa-solid fa-bars";
        }
      }
    });

    // Fecha o menu ao clicar fora dele.
    document.addEventListener("click", (event) => {
      if (
        menu.classList.contains("mobile-menu") &&
        !menu.contains(event.target) &&
        !bars.contains(event.target)
      ) {
        menu.classList.remove("mobile-menu");

        const icon = bars.querySelector("i");
        if (icon) icon.className = "fa-solid fa-bars";
      }
    });

    // TambÃ©m fecha o menu depois que um destino Ã© escolhido.
    menuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.remove("mobile-menu");

        const icon = bars.querySelector("i");
        if (icon) icon.className = "fa-solid fa-bars";
      });
    });
  }
});
