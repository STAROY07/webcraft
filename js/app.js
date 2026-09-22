// WebCraft Global Application Controller (Clean, Professional, Photo & Seal Support)
const WebCraftApp = (function () {
  function getRootPath() {
    return window.location.pathname.includes('/pages/') ? '../' : './';
  }

  function getAvatarHtml(user, sizeClass = '') {
    if (user.photo) {
      return `<img src="${user.photo}" alt="${escapeHtml(user.name)}" class="avatar-photo-img ${sizeClass}" />`;
    }
    return `<span>${user.avatar || 'WC'}</span>`;
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function renderHeader(activePage = 'home') {
    const headerContainer = document.getElementById('webcraft-header');
    if (!headerContainer) return;

    const root = getRootPath();
    const stats = WebCraftStorage.getStats();
    const avatarContent = getAvatarHtml(stats.user);

    headerContainer.innerHTML = `
      <header class="main-header">
        <div class="container nav-container">
          <!-- Brand Logo -->
          <a href="${root}index.html" class="brand-logo">
            <img src="${root}assets/logo.png" alt="WebCraft Logo" onerror="this.src='${root}assets/favicon.svg'" />
            <div class="brand-text-wrap">
              <span class="brand-name">WebCraft</span>
              <span class="brand-tagline">Small Steps. Big Websites.</span>
            </div>
          </a>

          <!-- Streamlined Navigation Menu -->
          <nav>
            <ul class="nav-menu" id="navMenu">
              <li class="nav-item ${activePage === 'home' ? 'active' : ''}">
                <a href="${root}index.html">Home</a>
              </li>
              <li class="nav-item ${activePage === 'learn' ? 'active' : ''}">
                <a href="${root}pages/learn.html">Learn</a>
              </li>
              <li class="nav-item ${activePage === 'practice' ? 'active' : ''}">
                <a href="${root}pages/practice.html">Practice</a>
              </li>
              <li class="nav-item ${activePage === 'challenges' ? 'active' : ''}">
                <a href="${root}pages/challenges.html">Missions</a>
              </li>
              <li class="nav-item ${activePage === 'bug-hunter' ? 'active' : ''}">
                <a href="${root}pages/bug-hunter.html">Bug Hunter</a>
              </li>
              <li class="nav-item ${activePage === 'quiz' ? 'active' : ''}">
                <a href="${root}pages/quiz.html">Quiz</a>
              </li>
              <li class="nav-item ${activePage === 'build' ? 'active' : ''}">
                <a href="${root}pages/build.html">Build</a>
              </li>
              <li class="nav-item ${activePage === 'achievements' ? 'active' : ''}">
                <a href="${root}pages/achievements.html">Badges</a>
              </li>
            </ul>
          </nav>

          <!-- User Stats & Profile Controls -->
          <div class="nav-user-stats">
            <button class="audio-toggle-btn" id="audioToggleBtn" title="Toggle Sound" aria-label="Toggle Audio">
              ${WebCraftAudio.isSoundEnabled() ? WebCraftIcons.soundOn : WebCraftIcons.soundOff}
            </button>
            
            <div class="stat-pill level-pill" title="Current Level and XP">
              ${WebCraftIcons.zap}
              <span id="headerLevel">Lv ${stats.level.currentLevel}</span>
              <span style="opacity:0.4; margin:0 2px;">•</span>
              <span id="headerXP">${stats.xp} XP</span>
            </div>

            <a href="${root}pages/profile.html" class="profile-avatar-btn" id="headerAvatar" title="My Profile">
              ${avatarContent}
            </a>

            <button class="hamburger-btn" id="hamburgerBtn" aria-label="Toggle Navigation Menu">
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      <!-- Mobile Bottom Navigation Bar -->
      <nav class="mobile-bottom-nav">
        <a href="${root}index.html" class="bottom-nav-link ${activePage === 'home' ? 'active' : ''}">
          <span class="nav-icon">${WebCraftIcons.home}</span>
          <span>Home</span>
        </a>
        <a href="${root}pages/learn.html" class="bottom-nav-link ${activePage === 'learn' ? 'active' : ''}">
          <span class="nav-icon">${WebCraftIcons.book}</span>
          <span>Learn</span>
        </a>
        <a href="${root}pages/practice.html" class="bottom-nav-link ${activePage === 'practice' ? 'active' : ''}">
          <span class="nav-icon">${WebCraftIcons.target}</span>
          <span>Practice</span>
        </a>
        <a href="${root}pages/bug-hunter.html" class="bottom-nav-link ${activePage === 'bug-hunter' ? 'active' : ''}">
          <span class="nav-icon">${WebCraftIcons.bug}</span>
          <span>Bugs</span>
        </a>
        <a href="${root}pages/profile.html" class="bottom-nav-link ${activePage === 'profile' ? 'active' : ''}">
          <span class="nav-icon">${WebCraftIcons.user}</span>
          <span>Profile</span>
        </a>
      </nav>
    `;

    // Hamburger Menu Toggle
    const hamburger = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');
    if (hamburger && navMenu) {
      hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        WebCraftAudio.click();
      });
    }

    // Audio Toggle
    const audioBtn = document.getElementById('audioToggleBtn');
    if (audioBtn) {
      audioBtn.addEventListener('click', () => {
        const soundOn = WebCraftAudio.toggleSound();
        audioBtn.innerHTML = soundOn ? WebCraftIcons.soundOn : WebCraftIcons.soundOff;
        WebCraftAudio.click();
      });
    }
  }

  function renderFooter() {
    const footerContainer = document.getElementById('webcraft-footer');
    if (!footerContainer) return;

    const root = getRootPath();

    footerContainer.innerHTML = `
      <footer class="main-footer">
        <div class="container">
          <div class="footer-grid">
            <div class="footer-brand">
              <a href="${root}index.html" class="brand-logo" style="margin-bottom: 8px;">
                <img src="${root}assets/logo.png" alt="WebCraft Logo" onerror="this.src='${root}assets/favicon.svg'" style="height: 38px;" />
                <span class="brand-name" style="font-size: 20px;">WebCraft</span>
              </a>
              <p>Learn HTML, CSS & JavaScript by playing games, fixing bugs, and building real websites.</p>
              <div style="font-size: 13px; font-weight: 700; color: var(--primary-blue);">
                College Community Engagement Project (CEP)
              </div>
            </div>

            <div class="footer-col">
              <h4>Learning Paths</h4>
              <ul>
                <li><a href="${root}pages/learn.html?track=html">HTML Structure</a></li>
                <li><a href="${root}pages/learn.html?track=css">CSS Styling</a></li>
                <li><a href="${root}pages/learn.html?track=js">JavaScript Logic</a></li>
                <li><a href="${root}pages/build.html">Build First Website</a></li>
              </ul>
            </div>

            <div class="footer-col">
              <h4>Game Modes</h4>
              <ul>
                <li><a href="${root}pages/practice.html">Practice Tasks</a></li>
                <li><a href="${root}pages/challenges.html">Coding Missions</a></li>
                <li><a href="${root}pages/bug-hunter.html">Bug Hunter Arena</a></li>
                <li><a href="${root}pages/quiz.html">Knowledge Quiz</a></li>
              </ul>
            </div>

            <div class="footer-col">
              <h4>Progress & Profile</h4>
              <ul>
                <li><a href="${root}pages/achievements.html">Badge Showcase</a></li>
                <li><a href="${root}pages/profile.html">Learner Profile</a></li>
                <li><a href="#" id="footerResetBtn">Reset Progress</a></li>
              </ul>
            </div>
          </div>

          <div class="footer-bottom">
            <p>© 2026 WebCraft • "Small Steps. Big Websites." • Designed for School Children & Beginners</p>
          </div>
        </div>
      </footer>
    `;

    document.getElementById('footerResetBtn')?.addEventListener('click', (e) => {
      e.preventDefault();
      if (confirm("Are you sure you want to reset all your WebCraft XP and progress?")) {
        WebCraftStorage.resetAllProgress();
      }
    });
  }

  function showToast(message, type = 'success', iconName = 'sparkle') {
    let container = document.getElementById('webcraft-toasts');
    if (!container) {
      container = document.createElement('div');
      container.id = 'webcraft-toasts';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    const iconSvg = WebCraftIcons[iconName] || WebCraftIcons.sparkle;
    toast.innerHTML = `<span style="display:flex;align-items:center;">${iconSvg}</span><span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 10);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  function launchConfetti() {
    let canvas = document.getElementById('confetti-canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'confetti-canvas';
      document.body.appendChild(canvas);
    }

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#2563EB', '#38BDF8', '#8B5CF6', '#EC4899', '#F59E0B', '#22C55E', '#FACC15'];
    const particles = [];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 14,
        vy: (Math.random() - 0.7) * 14,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        alpha: 1
      });
    }

    let frames = 0;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.2;
        p.rotation += p.rotationSpeed;
        p.alpha -= 0.012;

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      });

      frames++;
      if (frames < 90) {
        requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    animate();
  }

  function checkOnboarding() {
    if (!WebCraftStorage.isOnboarded()) {
      let modal = document.getElementById('onboardingModal');
      if (!modal) {
        modal = document.createElement('div');
        modal.id = 'onboardingModal';
        modal.className = 'modal-backdrop active';
        modal.innerHTML = `
          <div class="modal-card">
            <div style="display: inline-flex; align-items: center; justify-content: center; width: 60px; height: 60px; border-radius: 50%; background: #EFF6FF; color: #2563EB; margin-bottom: 14px;">
              ${WebCraftIcons.rocket}
            </div>
            <h2 style="font-size: 24px; margin-bottom: 6px;">Welcome to WebCraft!</h2>
            <p style="color: var(--text-muted); font-size: 13.5px; margin-bottom: 18px;">
              Ready to learn HTML, CSS & JavaScript? Enter your name to get started.
            </p>
            
            <div style="margin-bottom: 12px; text-align: left;">
              <label for="onboardNameInput" style="display: block; font-size: 12.5px; font-weight: 700; color: var(--text-muted); margin-bottom: 6px;">
                Your Name <span style="color:#EF4444;">*</span>
              </label>
              <input type="text" id="onboardNameInput" placeholder="Enter your full name..." style="width: 100%; padding: 12px 14px; border: 1.5px solid var(--border-light); border-radius: var(--radius-md); font-size: 14.5px; font-weight: 600; color: var(--text-main); outline: none;" required />
              <div id="onboardError" style="display: none; color: #EF4444; font-size: 12px; font-weight: 700; margin-top: 5px;">
                Please enter your name to continue!
              </div>
            </div>

            <!-- Choose Avatar Badge or Photo -->
            <div style="margin-bottom: 20px;">
              <label style="display: block; font-size: 12.5px; font-weight: 700; color: var(--text-muted); margin-bottom: 8px; text-align: left;">
                Choose Avatar Badge:
              </label>
              <div style="display: flex; gap: 6px; justify-content: center;">
                <button type="button" class="avatar-pick-btn active" data-avatar="WC" style="font-weight: 800; font-size: 13px; padding: 8px 14px; border: 2px solid var(--primary-blue); border-radius: 8px; background: #EFF6FF; color: #2563EB; cursor: pointer;">WC</button>
                <button type="button" class="avatar-pick-btn" data-avatar="DEV" style="font-weight: 800; font-size: 13px; padding: 8px 14px; border: 1.5px solid var(--border-light); border-radius: 8px; background: white; color: var(--text-main); cursor: pointer;">DEV</button>
                <button type="button" class="avatar-pick-btn" data-avatar="JS" style="font-weight: 800; font-size: 13px; padding: 8px 14px; border: 1.5px solid var(--border-light); border-radius: 8px; background: white; color: var(--text-main); cursor: pointer;">JS</button>
                <button type="button" class="avatar-pick-btn" data-avatar="CSS" style="font-weight: 800; font-size: 13px; padding: 8px 14px; border: 1.5px solid var(--border-light); border-radius: 8px; background: white; color: var(--text-main); cursor: pointer;">CSS</button>
                <button type="button" class="avatar-pick-btn" data-avatar="HTML" style="font-weight: 800; font-size: 13px; padding: 8px 14px; border: 1.5px solid var(--border-light); border-radius: 8px; background: white; color: var(--text-main); cursor: pointer;">HTML</button>
              </div>
            </div>

            <button class="btn btn-primary btn-lg" id="onboardSubmitBtn" style="width: 100%;">
              START WEBCRAFT
            </button>
          </div>
        `;
        document.body.appendChild(modal);

        let selectedAvatar = 'WC';
        modal.querySelectorAll('.avatar-pick-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            modal.querySelectorAll('.avatar-pick-btn').forEach(b => {
              b.style.borderColor = 'var(--border-light)';
              b.style.background = 'white';
            });
            btn.style.borderColor = 'var(--primary-blue)';
            btn.style.background = '#EFF6FF';
            selectedAvatar = btn.getAttribute('data-avatar');
            WebCraftAudio.click();
          });
        });

        const nameInput = document.getElementById('onboardNameInput');
        const errorEl = document.getElementById('onboardError');

        function submitOnboarding() {
          const rawName = nameInput.value.trim();
          if (!rawName || rawName.length < 2) {
            errorEl.style.display = 'block';
            nameInput.style.borderColor = '#EF4444';
            nameInput.focus();
            WebCraftAudio.error();
            return;
          }

          errorEl.style.display = 'none';
          WebCraftStorage.setUser({ name: rawName, avatar: selectedAvatar, photo: null });
          modal.classList.remove('active');
          setTimeout(() => modal.remove(), 300);
          WebCraftAudio.levelUp();
          launchConfetti();
          showToast(`Welcome, ${rawName}! Your coding journey starts now.`, 'success', 'sparkle');
          updateHeaderStats();
        }

        document.getElementById('onboardSubmitBtn').addEventListener('click', submitOnboarding);
        nameInput.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') submitOnboarding();
        });
      }
    }
  }

  function updateHeaderStats() {
    const stats = WebCraftStorage.getStats();
    const xpEl = document.getElementById('headerXP');
    const levelEl = document.getElementById('headerLevel');
    const avatarEl = document.getElementById('headerAvatar');

    if (xpEl) xpEl.innerText = `${stats.xp} XP`;
    if (levelEl) levelEl.innerText = `Lv ${stats.level.currentLevel}`;
    if (avatarEl) avatarEl.innerHTML = getAvatarHtml(stats.user);
  }

  function setupGlobalListeners() {
    window.addEventListener('webcraft:xp_earned', (e) => {
      updateHeaderStats();
      showToast(`+${e.detail.amount} XP! ${e.detail.reason || ''}`, 'xp', 'zap');
    });

    window.addEventListener('webcraft:level_up', (e) => {
      WebCraftAudio.levelUp();
      launchConfetti();
      showToast(`Level Up! You reached Level ${e.detail.levelInfo.currentLevel}: ${e.detail.levelInfo.title}!`, 'success', 'trophy');
    });

    window.addEventListener('webcraft:badge_unlocked', (e) => {
      const badge = WebCraftData.badges.find(b => b.id === e.detail.badgeId);
      if (badge) {
        WebCraftAudio.badge();
        launchConfetti();
        showToast(`Badge Unlocked: ${badge.name}!`, 'success', 'award');
      }
    });

    window.addEventListener('webcraft:user_updated', () => {
      updateHeaderStats();
    });
  }

  return {
    init: function (activePage = 'home') {
      renderHeader(activePage);
      renderFooter();
      setupGlobalListeners();
      checkOnboarding();
    },
    toast: showToast,
    confetti: launchConfetti,
    updateStats: updateHeaderStats
  };
})();
