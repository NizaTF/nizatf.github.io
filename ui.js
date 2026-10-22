document.addEventListener('DOMContentLoaded', () => {
  const html = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');

  // --- 1. DETECTAR TEMA ---
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  const currentTheme = savedTheme || (systemPrefersLight ? 'light' : 'dark');

  // --- 2. FAVICON Y LOGO DINÁMICOS ---
  const dynamicFavicon = document.getElementById('dynamic-favicon');
  const logoDinamico = document.getElementById('logo-dinamico');

  function updateAssets(theme) {
    // Actualizar Favicon
    if (dynamicFavicon) {
      const newIcon = theme === 'dark' ? 'assets/img/favicon_oscuro.png' : 'assets/img/favicon_claro.png';
      if (!dynamicFavicon.href.includes(newIcon)) {
        dynamicFavicon.href = `${newIcon}?v=${new Date().getTime()}`; // Cache buster
      }
    }

    // Actualizar Logo del Avatar
    if (logoDinamico) {
      if (theme === 'dark') {
        logoDinamico.src = 'assets/img/logo_oscuro.png';
      } else {
        logoDinamico.src = 'assets/img/logo_claro.png';
      }
    }
  }

  // --- 3. APLICAR TEMA AL CARGAR ---
  html.setAttribute('data-theme', currentTheme);
  updateIcon(currentTheme);

  // --- 4. ESCUCHAR EL CLIC DEL BOTÓN ---
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const newTheme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateIcon(newTheme);
    });
  }

  // --- 5. ACTUALIZAR TODO ---
  function updateIcon(theme) {
    if (themeToggle) {
      themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
    // Llamamos a la función que actualiza favicon y logo con un pequeño delay para evitar lag
    setTimeout(() => {
      updateAssets(theme);
    }, 150);
  }

  // --- 6. INDICADOR DE SCROLL Y BOTÓN VOLVER ARRIBA ---
  const progressBar = document.getElementById('scroll-progress');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (progressBar) {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      progressBar.style.width = scrolled + '%';
    }

    if (backToTopBtn) {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('is-visible');
      } else {
        backToTopBtn.classList.remove('is-visible');
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});