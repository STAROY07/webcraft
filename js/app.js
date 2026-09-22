// WebCraft Global Application Controller
// (Multi-Account Authentication Modal, Header Dropdown, Persistent Session & Audio Feedback)
const WebCraftApp = (function () {
  function getRootPath() {
    return window.location.pathname.includes('/pages/') ? '../' : './';
  }

  function getAvatarHtml(user, sizeClass = '') {
    if (user && user.photo) {
      return `<img src="${user.photo}" alt="${escapeHtml(user.name || 'User')}" class="avatar-photo-img ${sizeClass}" />`;
    }
    return `<span>${(user && user.avatar) ? user.avatar : 'WC'}</span>`;
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // Compress image before saving (<40KB base64)
  function compressImage(file, callback) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = new Image();
      img.onload = function () {
        const canvas = document.createElement('canvas');
        const maxSize = 180;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxSize) {
            height = Math.round((height * maxSize) / width);
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width = Math.round((width * maxSize) / height);
            height = maxSize;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        callback(dataUrl);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  function renderHeader(activePage = 'home') {
    const headerContainer = document.getElementById('webcraft-header');
    if (!headerContainer) return;

    const root = getRootPath();
    const stats = WebCraftStorage.getStats();
    const isLoggedIn = WebCraftStorage.isLoggedIn();
    const user = stats.user;
    const avatarContent = getAvatarHtml(user);

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

            <!-- Profile / Account Trigger with Dropdown -->
            <div class="user-menu-wrapper" style="position: relative;">
              <button class="profile-avatar-btn" id="headerAvatarBtn" title="Account Menu" aria-label="Account Options">
                ${avatarContent}
              </button>

              <div class="user-dropdown-menu" id="userDropdownMenu">
                <div class="dropdown-header">
                  <div style="font-weight:800; font-size:14px; color:#0F172A;" id="dropdownUserName">${escapeHtml(user.name || 'Web Explorer')}</div>
                  <div style="font-size:11.5px; color:var(--text-muted);">@<span id="dropdownUserHandle">${escapeHtml(user.username || 'learner')}</span> • Lv ${stats.level.currentLevel}</div>
                </div>
                <div class="dropdown-divider"></div>
                <a href="${root}pages/profile.html" class="dropdown-item">
                  <span class="dropdown-icon">${WebCraftIcons.user}</span> My Profile & Certificate
                </a>
                <a href="${root}pages/achievements.html" class="dropdown-item">
                  <span class="dropdown-icon">${WebCraftIcons.trophy}</span> My Badges & XP
                </a>
                <button type="button" class="dropdown-item" id="headerSwitchAccountBtn">
                  <span class="dropdown-icon">${WebCraftIcons.refresh}</span> Switch Account / Log In
                </button>
                <div class="dropdown-divider"></div>
                <button type="button" class="dropdown-item dropdown-logout" id="headerLogoutBtn">
                  <span class="dropdown-icon" style="color:#EF4444;">${WebCraftIcons.lock}</span> Log Out
                </button>
              </div>
            </div>

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

    // Dropdown toggle
    const avatarBtn = document.getElementById('headerAvatarBtn');
    const dropdown = document.getElementById('userDropdownMenu');

    if (avatarBtn && dropdown) {
      avatarBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('open');
        WebCraftAudio.click();
      });

      document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target) && e.target !== avatarBtn) {
          dropdown.classList.remove('open');
        }
      });
    }

    // Switch Account from header
    document.getElementById('headerSwitchAccountBtn')?.addEventListener('click', () => {
      dropdown?.classList.remove('open');
      showAuthModal('login');
      WebCraftAudio.click();
    });

    // Logout from header
    document.getElementById('headerLogoutBtn')?.addEventListener('click', () => {
      dropdown?.classList.remove('open');
      if (confirm("Do you want to log out of your WebCraft account? Your progress is safely saved on this device.")) {
        WebCraftStorage.logout();
      }
    });

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
              <h4>Account & Progress</h4>
              <ul>
                <li><a href="${root}pages/achievements.html">Badge Showcase</a></li>
                <li><a href="${root}pages/profile.html">Learner Profile</a></li>
                <li><a href="#" id="footerSwitchAccountBtn">Switch Account</a></li>
                <li><a href="#" id="footerResetBtn">Reset Active Progress</a></li>
              </ul>
            </div>
          </div>

          <div class="footer-bottom">
            <p>© 2026 WebCraft • "Small Steps. Big Websites." • Designed for School Children & Beginners</p>
          </div>
        </div>
      </footer>
    `;

    document.getElementById('footerSwitchAccountBtn')?.addEventListener('click', (e) => {
      e.preventDefault();
      showAuthModal('login');
    });

    document.getElementById('footerResetBtn')?.addEventListener('click', (e) => {
      e.preventDefault();
      if (confirm("Are you sure you want to reset XP and completed lessons for the currently logged in student?")) {
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

  // =========================================================================
  // MULTI-ACCOUNT AUTHENTICATION & ONBOARDING MODAL (Persistent Sessions)
  // =========================================================================
  function showAuthModal(defaultTab = 'login') {
    let modal = document.getElementById('webcraftAuthModal');
    if (modal) modal.remove();

    const accounts = WebCraftStorage.getAllAccounts();
    const hasExistingAccounts = accounts.length > 0;
    const initialTab = hasExistingAccounts ? defaultTab : 'register';

    modal = document.createElement('div');
    modal.id = 'webcraftAuthModal';
    modal.className = 'modal-backdrop active';

    // Build Saved Accounts list for quick 1-click selection
    let savedAccountsHtml = '';
    if (accounts.length > 0) {
      savedAccountsHtml = `
        <div style="margin-bottom: 16px; text-align: left;">
          <div style="font-size: 11.5px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">
            Saved Profiles on this PC:
          </div>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            ${accounts.map(acc => `
              <button type="button" class="quick-acc-btn" data-username="${escapeHtml(acc.username)}" style="display: flex; align-items: center; gap: 6px; padding: 6px 12px; background: #F8FAFC; border: 1.5px solid var(--border-light); border-radius: var(--radius-pill); cursor: pointer; font-size: 12.5px; font-weight: 700; color: #0F172A;">
                <span style="display: inline-block; width: 22px; height: 22px; border-radius: 50%; background: #EFF6FF; color: #2563EB; font-size: 10px; font-weight: 800; line-height: 22px; text-align: center; overflow: hidden;">
                  ${acc.photo ? `<img src="${acc.photo}" style="width:100%;height:100%;object-fit:cover;" />` : acc.avatar}
                </span>
                <span>${escapeHtml(acc.name)}</span>
                <span style="font-size: 10.5px; color: var(--text-muted); font-weight: 600;">(Lv ${acc.level})</span>
              </button>
            `).join('')}
          </div>
        </div>
      `;
    }

    modal.innerHTML = `
      <div class="modal-card" style="max-width: 500px; padding: 28px 24px; text-align: left;">
        <div style="text-align: center; margin-bottom: 18px;">
          <img src="${getRootPath()}assets/logo.png" alt="WebCraft Logo" onerror="this.src='${getRootPath()}assets/favicon.svg'" style="height: 46px; margin: 0 auto 6px;" />
          <h2 style="font-size: 22px; color: #0F172A; margin-bottom: 4px;">Welcome to WebCraft!</h2>
          <p style="color: var(--text-muted); font-size: 13px;">Save your coding progress, XP, and get your graduation certificate.</p>
        </div>

        <!-- Auth Tabs Switcher -->
        <div class="auth-tabs" style="display: flex; border-bottom: 2px solid #E2E8F0; margin-bottom: 20px;">
          <button type="button" id="authTabLoginBtn" class="auth-tab-btn ${initialTab === 'login' ? 'active' : ''}" style="flex: 1; padding: 10px; text-align: center; font-weight: 800; font-size: 14px; border: none; background: none; cursor: pointer; border-bottom: 3px solid ${initialTab === 'login' ? 'var(--primary-blue)' : 'transparent'}; color: ${initialTab === 'login' ? 'var(--primary-blue)' : 'var(--text-muted)'};">
            Log In
          </button>
          <button type="button" id="authTabRegisterBtn" class="auth-tab-btn ${initialTab === 'register' ? 'active' : ''}" style="flex: 1; padding: 10px; text-align: center; font-weight: 800; font-size: 14px; border: none; background: none; cursor: pointer; border-bottom: 3px solid ${initialTab === 'register' ? 'var(--primary-blue)' : 'transparent'}; color: ${initialTab === 'register' ? 'var(--primary-blue)' : 'var(--text-muted)'};">
            Create Account
          </button>
        </div>

        <!-- TAB 1: LOG IN -->
        <div id="authLoginTabContent" style="display: ${initialTab === 'login' ? 'block' : 'none'};">
          ${savedAccountsHtml}

          <div style="margin-bottom: 14px;">
            <label for="loginUsernameInput" style="display: block; font-size: 12.5px; font-weight: 700; color: var(--text-muted); margin-bottom: 6px;">
              Username or Full Name:
            </label>
            <input type="text" id="loginUsernameInput" placeholder="e.g. rahul1 or Rahul Sharma" style="width: 100%; padding: 11px 14px; border: 1.5px solid var(--border-light); border-radius: var(--radius-md); font-size: 14px; font-weight: 600; outline: none;" />
          </div>

          <div style="margin-bottom: 8px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <label for="loginPasswordInput" style="font-size: 12.5px; font-weight: 700; color: var(--text-muted);">
                Password / PIN:
              </label>
              <button type="button" id="forgotPassTriggerBtn" style="background: none; border: none; font-size: 12px; color: var(--primary-blue); font-weight: 700; cursor: pointer; padding: 0;">
                Forgot Password?
              </button>
            </div>
            <div style="position: relative;">
              <input type="password" id="loginPasswordInput" placeholder="Enter your password..." style="width: 100%; padding: 11px 40px 11px 14px; border: 1.5px solid var(--border-light); border-radius: var(--radius-md); font-size: 14px; font-weight: 600; outline: none;" />
              <button type="button" class="pwd-toggle-btn" data-target="loginPasswordInput" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: none; border: none; font-size: 11px; font-weight: 800; color: var(--text-muted); cursor: pointer;">SHOW</button>
            </div>
          </div>

          <div id="loginErrorMsg" style="display: none; color: #EF4444; font-size: 12.5px; font-weight: 700; margin: 10px 0; background: #FEF2F2; padding: 8px 12px; border-radius: 6px;"></div>

          <button class="btn btn-primary btn-lg" id="submitLoginBtn" style="width: 100%; margin-top: 10px;">
            LOG IN TO WEBCRAFT
          </button>
        </div>

        <!-- TAB 1.5: FORGOT PASSWORD RECOVERY VIEW -->
        <div id="authForgotTabContent" style="display: none;">
          <div style="background: #EFF6FF; border: 1.5px solid #BFDBFE; border-radius: var(--radius-md); padding: 12px 14px; margin-bottom: 16px;">
            <div style="font-size: 13px; font-weight: 800; color: #1E3A8A; margin-bottom: 2px;">Account Recovery & Password Reset</div>
            <div style="font-size: 12px; color: #3B82F6;">Enter your registered Username and Full Name to reset your password instantly.</div>
          </div>

          <div style="margin-bottom: 12px;">
            <label for="forgotUsernameInput" style="display: block; font-size: 12px; font-weight: 700; color: var(--text-muted); margin-bottom: 5px;">
              Your Username <span style="color:#EF4444;">*</span>:
            </label>
            <input type="text" id="forgotUsernameInput" placeholder="e.g. rahul123" style="width: 100%; padding: 10px 12px; border: 1.5px solid var(--border-light); border-radius: var(--radius-md); font-size: 13.5px; font-weight: 600; outline: none;" required />
          </div>

          <div style="margin-bottom: 12px;">
            <label for="forgotFullNameInput" style="display: block; font-size: 12px; font-weight: 700; color: var(--text-muted); margin-bottom: 5px;">
              Registered Full Name <span style="color:#EF4444;">*</span>:
            </label>
            <input type="text" id="forgotFullNameInput" placeholder="e.g. Rahul Sharma (as on certificate)" style="width: 100%; padding: 10px 12px; border: 1.5px solid var(--border-light); border-radius: var(--radius-md); font-size: 13.5px; font-weight: 600; outline: none;" required />
          </div>

          <div style="margin-bottom: 16px;">
            <label for="forgotNewPassInput" style="display: block; font-size: 12px; font-weight: 700; color: var(--text-muted); margin-bottom: 5px;">
              Set New Password / PIN <span style="color:#EF4444;">*</span>:
            </label>
            <div style="position: relative;">
              <input type="password" id="forgotNewPassInput" placeholder="At least 3 characters" style="width: 100%; padding: 10px 40px 10px 12px; border: 1.5px solid var(--border-light); border-radius: var(--radius-md); font-size: 13.5px; font-weight: 600; outline: none;" required />
              <button type="button" class="pwd-toggle-btn" data-target="forgotNewPassInput" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: none; border: none; font-size: 11px; font-weight: 800; color: var(--text-muted); cursor: pointer;">SHOW</button>
            </div>
          </div>

          <div id="forgotErrorMsg" style="display: none; color: #EF4444; font-size: 12px; font-weight: 700; margin-bottom: 12px; background: #FEF2F2; padding: 8px 12px; border-radius: 6px;"></div>

          <div style="display: flex; gap: 8px;">
            <button type="button" class="btn btn-secondary btn-lg" id="backToLoginFromForgotBtn" style="flex: 1;">
              Back to Login
            </button>
            <button type="button" class="btn btn-primary btn-lg" id="submitForgotBtn" style="flex: 1.5;">
              Reset & Log In
            </button>
          </div>
        </div>

        <!-- TAB 2: CREATE ACCOUNT -->
        <div id="authRegisterTabContent" style="display: ${initialTab === 'register' ? 'block' : 'none'};">
          <div style="margin-bottom: 12px;">
            <label for="regNameInput" style="display: block; font-size: 12.5px; font-weight: 700; color: var(--text-muted); margin-bottom: 5px;">
              Full Name <span style="color:#EF4444;">*</span> (Printed on Official Certificate):
            </label>
            <input type="text" id="regNameInput" placeholder="e.g. Rahul Sharma" style="width: 100%; padding: 11px 14px; border: 1.5px solid var(--border-light); border-radius: var(--radius-md); font-size: 14px; font-weight: 600; outline: none;" required />
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 12px;">
            <div>
              <label for="regUsernameInput" style="display: block; font-size: 12px; font-weight: 700; color: var(--text-muted); margin-bottom: 5px;">
                Choose Username <span style="color:#EF4444;">*</span>:
              </label>
              <input type="text" id="regUsernameInput" placeholder="e.g. rahul123" style="width: 100%; padding: 11px 12px; border: 1.5px solid var(--border-light); border-radius: var(--radius-md); font-size: 13.5px; font-weight: 600; outline: none;" required />
            </div>

            <div>
              <label for="regPasswordInput" style="display: block; font-size: 12px; font-weight: 700; color: var(--text-muted); margin-bottom: 5px;">
                Password / PIN <span style="color:#EF4444;">*</span>:
              </label>
              <div style="position: relative;">
                <input type="password" id="regPasswordInput" placeholder="At least 3 characters" style="width: 100%; padding: 11px 40px 11px 12px; border: 1.5px solid var(--border-light); border-radius: var(--radius-md); font-size: 13.5px; font-weight: 600; outline: none;" required />
                <button type="button" class="pwd-toggle-btn" data-target="regPasswordInput" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: none; border: none; font-size: 11px; font-weight: 800; color: var(--text-muted); cursor: pointer;">SHOW</button>
              </div>
            </div>
          </div>

          <!-- Photo Upload / Avatar Picker -->
          <div style="margin-bottom: 16px;">
            <label style="display: block; font-size: 12px; font-weight: 700; color: var(--text-muted); margin-bottom: 6px;">
              Profile Photo (Laptop File / Mobile Gallery) or Avatar:
            </label>
            
            <input type="file" id="regFileInput" accept="image/*" style="display: none;" />

            <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
              <button type="button" class="btn btn-secondary btn-sm" id="regUploadPhotoBtn" style="font-size: 12px;">
                Upload Photo
              </button>
              
              <div style="display: flex; gap: 4px;">
                <button type="button" class="reg-avatar-btn active" data-avatar="WC" style="font-size: 12px; font-weight:800; padding: 5px 10px; border-radius: 6px; cursor: pointer; background: #EFF6FF; border: 2px solid var(--primary-blue); color: #2563EB;">WC</button>
                <button type="button" class="reg-avatar-btn" data-avatar="DEV" style="font-size: 12px; font-weight:800; padding: 5px 10px; border-radius: 6px; cursor: pointer; background: white; border: 1.5px solid var(--border-light);">DEV</button>
                <button type="button" class="reg-avatar-btn" data-avatar="JS" style="font-size: 12px; font-weight:800; padding: 5px 10px; border-radius: 6px; cursor: pointer; background: white; border: 1.5px solid var(--border-light);">JS</button>
                <button type="button" class="reg-avatar-btn" data-avatar="CSS" style="font-size: 12px; font-weight:800; padding: 5px 10px; border-radius: 6px; cursor: pointer; background: white; border: 1.5px solid var(--border-light);">CSS</button>
                <button type="button" class="reg-avatar-btn" data-avatar="HTML" style="font-size: 12px; font-weight:800; padding: 5px 10px; border-radius: 6px; cursor: pointer; background: white; border: 1.5px solid var(--border-light);">HTML</button>
              </div>
            </div>

            <!-- Preview Wrap -->
            <div id="regPhotoPreviewWrap" style="display: none; margin-top: 8px;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <img id="regPhotoPreviewImg" src="" alt="Photo" style="width: 38px; height: 38px; border-radius: 50%; object-fit: cover; border: 2px solid var(--primary-blue);" />
                <span style="font-size: 11.5px; color: var(--green); font-weight: 700;">Photo added!</span>
                <button type="button" id="regRemovePhotoBtn" style="background:none; border:none; color:#EF4444; font-size:11.5px; cursor:pointer; font-weight:700;">Remove</button>
              </div>
            </div>
          </div>

          <div id="regErrorMsg" style="display: none; color: #EF4444; font-size: 12.5px; font-weight: 700; margin-bottom: 12px; background: #FEF2F2; padding: 8px 12px; border-radius: 6px;"></div>

          <button class="btn btn-primary btn-lg" id="submitRegisterBtn" style="width: 100%;">
            CREATE ACCOUNT & START
          </button>
        </div>

        ${WebCraftStorage.isLoggedIn() ? `
          <div style="text-align: center; margin-top: 14px;">
            <button type="button" id="authModalCloseBtn" style="background: none; border: none; font-size: 13px; color: var(--text-muted); cursor: pointer; font-weight: 700;">
              ✕ Close / Keep current session
            </button>
          </div>
        ` : ''}
      </div>
    `;

    document.body.appendChild(modal);

    // Tab switching logic
    const tabLoginBtn = document.getElementById('authTabLoginBtn');
    const tabRegBtn = document.getElementById('authTabRegisterBtn');
    const loginContent = document.getElementById('authLoginTabContent');
    const regContent = document.getElementById('authRegisterTabContent');

    function switchTab(tab) {
      if (tab === 'login') {
        tabLoginBtn.style.borderBottom = '3px solid var(--primary-blue)';
        tabLoginBtn.style.color = 'var(--primary-blue)';
        tabRegBtn.style.borderBottom = '3px solid transparent';
        tabRegBtn.style.color = 'var(--text-muted)';
        loginContent.style.display = 'block';
        regContent.style.display = 'none';
      } else {
        tabRegBtn.style.borderBottom = '3px solid var(--primary-blue)';
        tabRegBtn.style.color = 'var(--primary-blue)';
        tabLoginBtn.style.borderBottom = '3px solid transparent';
        tabLoginBtn.style.color = 'var(--text-muted)';
        regContent.style.display = 'block';
        loginContent.style.display = 'none';
      }
    }

    tabLoginBtn?.addEventListener('click', () => { switchTab('login'); WebCraftAudio.click(); });
    tabRegBtn?.addEventListener('click', () => { switchTab('register'); WebCraftAudio.click(); });

    // Quick account buttons fill username
    modal.querySelectorAll('.quick-acc-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const username = btn.getAttribute('data-username');
        const loginUserInput = document.getElementById('loginUsernameInput');
        const loginPassInput = document.getElementById('loginPasswordInput');
        if (loginUserInput) {
          loginUserInput.value = username;
          loginPassInput?.focus();
          WebCraftAudio.click();
        }
      });
    });

    // Photo Upload Registration logic
    let regPhotoBase64 = null;
    let selectedRegAvatar = 'WC';

    const regFileInput = document.getElementById('regFileInput');
    const regUploadBtn = document.getElementById('regUploadPhotoBtn');
    const regRemovePhotoBtn = document.getElementById('regRemovePhotoBtn');
    const regPreviewWrap = document.getElementById('regPhotoPreviewWrap');
    const regPreviewImg = document.getElementById('regPhotoPreviewImg');

    regUploadBtn?.addEventListener('click', () => regFileInput?.click());

    regFileInput?.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        compressImage(file, (base64) => {
          regPhotoBase64 = base64;
          regPreviewImg.src = base64;
          regPreviewWrap.style.display = 'block';
          WebCraftAudio.success();
        });
      }
    });

    regRemovePhotoBtn?.addEventListener('click', () => {
      regPhotoBase64 = null;
      regPreviewWrap.style.display = 'none';
      if (regFileInput) regFileInput.value = '';
    });

    modal.querySelectorAll('.reg-avatar-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        modal.querySelectorAll('.reg-avatar-btn').forEach(b => {
          b.style.borderColor = 'var(--border-light)';
          b.style.background = 'white';
          b.style.color = 'var(--text-main)';
        });
        btn.style.borderColor = 'var(--primary-blue)';
        btn.style.background = '#EFF6FF';
        btn.style.color = '#2563EB';
        selectedRegAvatar = btn.getAttribute('data-avatar');
        WebCraftAudio.click();
      });
    });

    // Handle Login Submit
    const submitLoginBtn = document.getElementById('submitLoginBtn');
    const loginUserInput = document.getElementById('loginUsernameInput');
    const loginPassInput = document.getElementById('loginPasswordInput');
    const loginError = document.getElementById('loginErrorMsg');

    function performLogin() {
      const userVal = loginUserInput.value.trim();
      const passVal = loginPassInput.value.trim();

      if (!userVal || !passVal) {
        loginError.innerText = 'Please enter both username and password.';
        loginError.style.display = 'block';
        WebCraftAudio.error();
        return;
      }

      const res = WebCraftStorage.login(userVal, passVal);
      if (!res.success) {
        loginError.innerText = res.error;
        loginError.style.display = 'block';
        WebCraftAudio.error();
        return;
      }

      loginError.style.display = 'none';
      modal.classList.remove('active');
      setTimeout(() => modal.remove(), 300);
      WebCraftAudio.success();
      showToast(`Welcome back, ${res.account.name}! Your account is loaded.`, 'success', 'sparkle');
      updateHeaderStats();
      setTimeout(() => window.location.reload(), 500);
    }

    submitLoginBtn?.addEventListener('click', performLogin);
    loginPassInput?.addEventListener('keydown', (e) => { if (e.key === 'Enter') performLogin(); });

    // Password Show/Hide Toggle Buttons
    modal.querySelectorAll('.pwd-toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        const input = document.getElementById(targetId);
        if (input) {
          if (input.type === 'password') {
            input.type = 'text';
            btn.innerText = 'HIDE';
            btn.style.color = 'var(--primary-blue)';
          } else {
            input.type = 'password';
            btn.innerText = 'SHOW';
            btn.style.color = 'var(--text-muted)';
          }
        }
      });
    });

    // Forgot Password Triggers
    const forgotTriggerBtn = document.getElementById('forgotPassTriggerBtn');
    const forgotContent = document.getElementById('authForgotTabContent');
    const backToLoginBtn = document.getElementById('backToLoginFromForgotBtn');
    const submitForgotBtn = document.getElementById('submitForgotBtn');
    const forgotUserInput = document.getElementById('forgotUsernameInput');
    const forgotFullNameInput = document.getElementById('forgotFullNameInput');
    const forgotNewPassInput = document.getElementById('forgotNewPassInput');
    const forgotError = document.getElementById('forgotErrorMsg');

    forgotTriggerBtn?.addEventListener('click', () => {
      loginContent.style.display = 'none';
      regContent.style.display = 'none';
      forgotContent.style.display = 'block';
      tabLoginBtn.style.borderBottom = '3px solid transparent';
      tabLoginBtn.style.color = 'var(--text-muted)';
      tabRegBtn.style.borderBottom = '3px solid transparent';
      tabRegBtn.style.color = 'var(--text-muted)';
      
      // Auto-fill username if entered in login
      if (loginUserInput.value.trim()) {
        forgotUserInput.value = loginUserInput.value.trim();
        forgotFullNameInput.focus();
      } else {
        forgotUserInput.focus();
      }
      WebCraftAudio.click();
    });

    backToLoginBtn?.addEventListener('click', () => {
      forgotContent.style.display = 'none';
      switchTab('login');
      WebCraftAudio.click();
    });

    function performForgotReset() {
      const uVal = forgotUserInput.value.trim();
      const nVal = forgotFullNameInput.value.trim();
      const pVal = forgotNewPassInput.value.trim();

      if (!uVal || !nVal || !pVal) {
        forgotError.innerText = 'Please fill in all fields.';
        forgotError.style.display = 'block';
        WebCraftAudio.error();
        return;
      }

      const res = WebCraftStorage.resetForgottenPassword(uVal, nVal, pVal);
      if (!res.success) {
        forgotError.innerText = res.error;
        forgotError.style.display = 'block';
        WebCraftAudio.error();
        return;
      }

      forgotError.style.display = 'none';
      modal.classList.remove('active');
      setTimeout(() => modal.remove(), 300);
      WebCraftAudio.success();
      showToast(`Password reset successfully! Welcome back, ${res.account.name}!`, 'success', 'sparkle');
      updateHeaderStats();
      setTimeout(() => window.location.reload(), 500);
    }

    submitForgotBtn?.addEventListener('click', performForgotReset);
    forgotNewPassInput?.addEventListener('keydown', (e) => { if (e.key === 'Enter') performForgotReset(); });

    // Handle Register Submit
    const submitRegBtn = document.getElementById('submitRegisterBtn');
    const regNameInput = document.getElementById('regNameInput');
    const regUsernameInput = document.getElementById('regUsernameInput');
    const regPasswordInput = document.getElementById('regPasswordInput');
    const regError = document.getElementById('regErrorMsg');

    function performRegister() {
      const nameVal = regNameInput.value.trim();
      const userVal = regUsernameInput.value.trim();
      const passVal = regPasswordInput.value.trim();

      const res = WebCraftStorage.register({
        name: nameVal,
        username: userVal,
        password: passVal,
        avatar: selectedRegAvatar,
        photo: regPhotoBase64
      });

      if (!res.success) {
        regError.innerText = res.error;
        regError.style.display = 'block';
        WebCraftAudio.error();
        return;
      }

      regError.style.display = 'none';
      modal.classList.remove('active');
      setTimeout(() => modal.remove(), 300);
      WebCraftAudio.levelUp();
      launchConfetti();
      showToast(`Account created! Welcome to WebCraft, ${res.account.name}!`, 'success', 'trophy');
      updateHeaderStats();
      setTimeout(() => window.location.reload(), 600);
    }

    submitRegBtn?.addEventListener('click', performRegister);
    regPasswordInput?.addEventListener('keydown', (e) => { if (e.key === 'Enter') performRegister(); });

    // Close button if already logged in
    document.getElementById('authModalCloseBtn')?.addEventListener('click', () => {
      modal.classList.remove('active');
      setTimeout(() => modal.remove(), 300);
    });
  }

  function checkSession() {
    if (!WebCraftStorage.isLoggedIn()) {
      showAuthModal('register');
    }
  }

  function updateHeaderStats() {
    const stats = WebCraftStorage.getStats();
    const xpEl = document.getElementById('headerXP');
    const levelEl = document.getElementById('headerLevel');
    const avatarBtn = document.getElementById('headerAvatarBtn');
    const dropdownName = document.getElementById('dropdownUserName');
    const dropdownHandle = document.getElementById('dropdownUserHandle');

    if (xpEl) xpEl.innerText = `${stats.xp} XP`;
    if (levelEl) levelEl.innerText = `Lv ${stats.level.currentLevel}`;
    if (avatarBtn) avatarBtn.innerHTML = getAvatarHtml(stats.user);
    if (dropdownName) dropdownName.innerText = stats.user.name || 'Web Explorer';
    if (dropdownHandle) dropdownHandle.innerText = stats.user.username || 'learner';
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

    window.addEventListener('webcraft:auth_changed', () => {
      updateHeaderStats();
    });
  }

  return {
    init: function (activePage = 'home') {
      renderHeader(activePage);
      renderFooter();
      setupGlobalListeners();
      checkSession();
    },
    showAuthModal: showAuthModal,
    toast: showToast,
    confetti: launchConfetti,
    updateStats: updateHeaderStats
  };
})();
