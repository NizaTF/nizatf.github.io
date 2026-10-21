document.addEventListener('DOMContentLoaded', () => {
  // 1. Comprobar si ya ha pasado la verificación
  if (localStorage.getItem('auth_verified') === 'true') {
    return; 
  }

  // 2. Bloquear el scroll del body
  document.body.style.overflow = 'hidden';

  // 3. Inyectar la pasarela de seguridad
  const overlay = document.createElement('div');
  overlay.className = 'auth-overlay';
  overlay.innerHTML = `
    <div class="auth-box">
      <div class="auth-header">
        <span class="eyebrow">[ gateway ]</span>
        <span class="auth-terminal">SECURE_CONNECTION</span>
      </div>
      
      <h2 class="auth-title">Verificación de seguridad</h2>
      <p class="auth-desc">
        Para acceder al portfolio, confirma que eres un visitante humano. 
        Este paso se solicita únicamente la primera vez.
      </p>
      
      <button class="btn btn-primary auth-btn" id="auth-action">
        Verificar y acceder
      </button>
      
      <p class="auth-footer">Protección de datos y prevención de scraping activa.</p>
    </div>
  `;

  document.body.appendChild(overlay);

  // 4. Lógica de verificación
  const btn = document.getElementById('auth-action');
  btn.addEventListener('click', () => {
    btn.textContent = 'Validando...';
    btn.disabled = true;

    // Retardo simulado de verificación
    setTimeout(() => {
      localStorage.setItem('auth_verified', 'true');
      
      overlay.style.opacity = '0';
      setTimeout(() => {
        overlay.remove();
        document.body.style.overflow = ''; 
      }, 300);
    }, 600);
  });
});
// Ofuscar email contra scrapers (OSINT)
document.querySelectorAll('.js-obfuscate-email').forEach(el => {
  const user = el.dataset.user;
  const domain = el.dataset.domain;
  const email = `${user}@${domain}`;
  
  el.href = `mailto:${email}`;
  el.textContent = email;
});