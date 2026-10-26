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

  // --- TRAMPA: Simulación de Inyección SQL Exitosa ---
(function() {
  const url = decodeURIComponent(window.location.href).toLowerCase();
  
  // Buscamos firmas típicas de ataques SQL
  if (url.includes("or 1=1") || url.includes("union select") || url.includes("drop table")) {
    
    // Evitamos que se active en la página secreta o en el admin real
    if (window.location.href.includes("secret.html") || window.location.href.includes("admin.html")) return;

    // Sobrescribimos la página entera con un diseño 100% realista de error/volcado
    document.documentElement.innerHTML = `
      <head><title>Database Error</title></head>
      <body style="background:#f8f9fa; color:#333; font-family:monospace; padding:40px;">
        <h2 style="color:#d9534f; font-family:Arial, sans-serif;">SQLSTATE[42000]: Syntax error or access violation</h2>
        <p>Unauthorized query detected. Initiating database dump to prevent data loss...</p>
        
        <div style="background:#fff; border:1px solid #ddd; padding:20px; margin-top:20px; overflow-x:auto;">
          <pre>
Table: users
+----+----------+------------------------------------------+---------------------+
| id | username | password                                 | email               |
+----+----------+------------------------------------------+---------------------+
| 1  | admin    | $2y$10$e0MYzXyjpJS7Pd0RVvHwHe1HlCS4bZJ18Juywd | admin@portfolio.com |
| 2  | nico     | $2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og | nico@portfolio.com  |
| 3  | root     | $2y$10$TKh8H1.PfQx37YgCzwiKb.KjNyWgaHb9cbcoQgd | root@localhost      |
+----+----------+------------------------------------------+---------------------+
3 rows in set (0.001 sec)
          </pre>
        </div>
        <p style="margin-top:20px; color:#666;">Fatal error: Uncaught PDOException: SQLSTATE[42000] in /var/www/html/index.php:42</p>
      </body>
    `;

    // Falsa esperanza: Dejamos que lean la tabla durante 3 segundos
    setTimeout(() => {
      window.location.replace("secret.html");
    }, 3500);
  }
})();

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

  // --- 5. ACTUALIZAR ICONO (AHORA CON TUS IMÁGENES) ---
  function updateIcon(theme) {
    if (themeToggle) {
      // Definimos la ruta de la imagen dependiendo del tema
      // (Si el tema es oscuro, mostramos el sol para pasar a claro. Y viceversa).
      const iconSrc = theme === 'dark' ? 'assets/img/boton_oscuro.png' : 'assets/img/boton_claro.png';
      
      // Comprobamos si la etiqueta <img> ya existe dentro del botón
      let iconImg = document.getElementById('theme-icon-img');
      
      if (!iconImg) {
        // Si no existe, la creamos (reemplazando el emoji que hubiera)
        themeToggle.innerHTML = `<img id="theme-icon-img" src="${iconSrc}" alt="Cambiar tema" class="theme-icon-img">`;
      } else {
        // Si ya existe, solo actualizamos la ruta (mucho más eficiente)
        iconImg.src = iconSrc;
      }
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
    // --- 7. TRANSICIÓN SUAVE ENTRE PESTAÑAS (Fade Out) ---
  const navLinks = document.querySelectorAll('.nav-links a, .card, .btn'); // Añadimos botones y tarjetas
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Ignorar si es la página actual, si es un enlace externo o si abre en otra pestaña
      if (this.classList.contains('active') || !href || href.startsWith('http') || href.startsWith('#') || this.target === '_blank') {
        return;
      }

      e.preventDefault();
      
      // Creamos la capa de fundido
      const overlay = document.createElement('div');
      overlay.style.position = 'fixed';
      overlay.style.inset = '0';
      overlay.style.backgroundColor = 'var(--bg)'; // Color de fondo de tu web
      overlay.style.zIndex = '99999';
      overlay.style.opacity = '0';
      overlay.style.transition = 'opacity 0.3s ease';
      overlay.style.pointerEvents = 'none';
      document.body.appendChild(overlay);

      // Hacemos que la capa aparezca suavemente
      requestAnimationFrame(() => {
        overlay.style.opacity = '1';
      });

      // Esperamos 300ms (lo que dura el fundido) y cambiamos de página
      setTimeout(() => {
        window.location.href = href;
      }, 300);
    });
  });
    // --- 11. STATUS DEL SISTEMA (Footer) ---
  const sysLastDeploy = document.getElementById('sys-last-deploy');
  
  if (sysLastDeploy) {
    // Obtenemos la fecha y hora actual
    const now = new Date();
    
    // Formateamos la fecha (Año-Mes-Día Hora:Minutos)
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
    
    // Lo inyectamos en el HTML
    sysLastDeploy.textContent = `LAST DEPLOY: ${formattedDate}`;
  }
});

// --- TRAMPA: Falso XSS Exitoso ---
(function detectXSS() {
  const url = decodeURIComponent(window.location.href).toLowerCase();
  
  // Detectamos etiquetas de script o alertas en la URL
  if (url.includes("<script>") || url.includes("alert(") || url.includes("onerror=")) {
    
    if (window.location.href.includes("secret.html")) return;

    document.documentElement.innerHTML = `
      <head><title>XSS Vulnerability</title></head>
      <body style="background:#0d1117; color:#c9d1d9; font-family:monospace; padding:40px;">
        <h2 style="color:#ff7b72;">[!] Reflected XSS Detected</h2>
        <p style="color:#8b949e;">The application reflects unsanitized user input. Executing payload...</p>
        
        <div style="background:#161b22; border:1px solid #30363d; padding:20px; margin-top:20px;">
          <p>> Payload ejecutado: <span style="color:#79c0ff;">${window.location.href.split('?')[1]}</span></p>
          <p>> Cookie de sesión obtenida: <span style="color:#3ddc97;">session_id=8f7d6a5s4d3f2g1h0j</span></p>
          <p>> Elevando privilegios...</p>
          <p>> Acceso concedido al panel de administrador.</p>
        </div>
      </body>
    `;

    // Falsa esperanza: 3.5 segundos para que se crea el rey del hacking
    setTimeout(() => {
      window.location.replace("secret.html");
    }, 3500);
  }
})();

// --- TRAMPA: Falsa vulnerabilidad LFI ---
(function fakeLFI() {
  const url = decodeURIComponent(window.location.href).toLowerCase();
  
  // Buscamos intentos de leer /etc/passwd o retroceder directorios (../)
  if (url.includes("etc/passwd") || url.includes("file=") || url.includes("page=../")) {
    
    if (window.location.href.includes("secret.html")) return;

    // Mostramos una falsa lectura del archivo del sistema
    document.documentElement.innerHTML = `
      <head><title>Reading file...</title></head>
      <body style="background:#fff; color:#000; font-family:monospace; padding:20px; font-size:14px;">
        <pre style="margin:0; line-height:1.5;">
root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
sys:x:3:3:sys:/dev:/usr/sbin/nologin
sync:x:4:65534:sync:/bin:/bin/sync
www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin
mysql:x:105:110:MySQL Server,,,:/nonexistent:/bin/false
nico:x:1000:1000:Nico Talens,,,:/home/nico:/bin/bash
        </pre>
        <p style="color:#888; margin-top:20px;">[!] Warning: File read successful. Escalating privileges...</p>
      </body>
    `;

    // Falsa esperanza: 3 segundos leyendo las contraseñas del sistema
    setTimeout(() => {
      window.location.replace("secret.html");
    }, 3000);
  }
})();