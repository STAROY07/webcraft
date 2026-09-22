// WebCraft Storage, Multi-Account Authentication & State Management
// (Persistent Device Sessions, Passwords, Photo Compression, and Level Progression)
const WebCraftStorage = (function () {
  const KEYS = {
    ACCOUNTS: 'webcraft_accounts',
    ACTIVE_SESSION: 'webcraft_active_session',
    // Legacy fallback keys (kept in sync with active user for full backward compatibility)
    USER: 'webcraft_user',
    XP: 'webcraft_xp',
    LEVEL: 'webcraft_level',
    LESSONS: 'webcraft_lessons',
    PRACTICE: 'webcraft_practice',
    CHALLENGES: 'webcraft_challenges',
    BUGS: 'webcraft_bugs',
    BADGES: 'webcraft_badges',
    QUIZ: 'webcraft_quiz_scores',
    FINAL_PROJECT: 'webcraft_final_project',
    STREAK: 'webcraft_streak',
    LAST_ACTIVE: 'webcraft_last_active',
    SOUND: 'webcraft_sound_muted'
  };

  const LEVELS = [
    { level: 1, title: 'Code Beginner', minXP: 0, maxXP: 299 },
    { level: 2, title: 'HTML Explorer', minXP: 300, maxXP: 799 },
    { level: 3, title: 'CSS Creator', minXP: 800, maxXP: 1499 },
    { level: 4, title: 'JavaScript Explorer', minXP: 1500, maxXP: 2499 },
    { level: 5, title: 'Bug Hunter', minXP: 2500, maxXP: 3999 },
    { level: 6, title: 'Web Builder', minXP: 4000, maxXP: 5999 },
    { level: 7, title: 'Frontend Creator', minXP: 6000, maxXP: Infinity }
  ];

  function getJSON(key, defaultVal) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultVal;
    } catch (e) {
      console.warn("Error reading localStorage for", key, e);
      return defaultVal;
    }
  }

  function setJSON(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
      console.warn("Error saving to localStorage for", key, e);
    }
  }

  function generateCertId() {
    return 'WC-' + Math.floor(100000 + Math.random() * 900000);
  }

  function generateUserId() {
    return 'usr_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
  }

  // Auto-migration for legacy single-user storage
  function ensureMigration() {
    let accounts = getJSON(KEYS.ACCOUNTS, []);
    const activeSession = localStorage.getItem(KEYS.ACTIVE_SESSION);

    if (accounts.length === 0) {
      const legacyUser = getJSON(KEYS.USER, null);
      if (legacyUser && legacyUser.name) {
        const migratedAccount = {
          id: generateUserId(),
          username: (legacyUser.name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase() || 'learner') + '1',
          name: legacyUser.name || 'Web Explorer',
          password: '123', // default initial PIN
          avatar: legacyUser.avatar || 'WC',
          photo: legacyUser.photo || null,
          certId: legacyUser.certId || generateCertId(),
          joinedDate: legacyUser.joinedDate || new Date().toLocaleDateString(),
          xp: parseInt(localStorage.getItem(KEYS.XP) || '0', 10),
          lessons: getJSON(KEYS.LESSONS, []),
          practice: getJSON(KEYS.PRACTICE, []),
          challenges: getJSON(KEYS.CHALLENGES, []),
          bugs: getJSON(KEYS.BUGS, []),
          badges: getJSON(KEYS.BADGES, []),
          quizScores: getJSON(KEYS.QUIZ, {}),
          finalProject: getJSON(KEYS.FINAL_PROJECT, null),
          streak: parseInt(localStorage.getItem(KEYS.STREAK) || '1', 10),
          lastActive: localStorage.getItem(KEYS.LAST_ACTIVE) || new Date().toISOString().slice(0, 10)
        };
        accounts.push(migratedAccount);
        setJSON(KEYS.ACCOUNTS, accounts);
        localStorage.setItem(KEYS.ACTIVE_SESSION, migratedAccount.id);
      }
    } else if (!activeSession && accounts.length > 0) {
      // Default to first account if active session is missing
      localStorage.setItem(KEYS.ACTIVE_SESSION, accounts[0].id);
    }
  }

  ensureMigration();

  function getAccounts() {
    return getJSON(KEYS.ACCOUNTS, []);
  }

  function saveAccounts(accounts) {
    setJSON(KEYS.ACCOUNTS, accounts);
  }

  function getActiveAccount() {
    const accounts = getAccounts();
    const activeId = localStorage.getItem(KEYS.ACTIVE_SESSION);
    if (!activeId) return null;
    return accounts.find(a => a.id === activeId) || null;
  }

  function syncActiveToLegacy(account) {
    if (!account) return;
    setJSON(KEYS.USER, {
      name: account.name,
      avatar: account.avatar || 'WC',
      photo: account.photo || null,
      certId: account.certId,
      joinedDate: account.joinedDate
    });
    localStorage.setItem(KEYS.XP, (account.xp || 0).toString());
    setJSON(KEYS.LESSONS, account.lessons || []);
    setJSON(KEYS.PRACTICE, account.practice || []);
    setJSON(KEYS.CHALLENGES, account.challenges || []);
    setJSON(KEYS.BUGS, account.bugs || []);
    setJSON(KEYS.BADGES, account.badges || []);
    setJSON(KEYS.QUIZ, account.quizScores || {});
    setJSON(KEYS.FINAL_PROJECT, account.finalProject || null);
    localStorage.setItem(KEYS.STREAK, (account.streak || 1).toString());
    if (account.lastActive) localStorage.setItem(KEYS.LAST_ACTIVE, account.lastActive);
  }

  function updateActiveAccount(updates) {
    let accounts = getAccounts();
    const activeId = localStorage.getItem(KEYS.ACTIVE_SESSION);
    if (!activeId) return null;

    let index = accounts.findIndex(a => a.id === activeId);
    if (index === -1) return null;

    accounts[index] = {
      ...accounts[index],
      ...updates
    };

    saveAccounts(accounts);
    syncActiveToLegacy(accounts[index]);
    return accounts[index];
  }

  function getLevelInfo(xp) {
    let current = LEVELS[0];
    for (let i = 0; i < LEVELS.length; i++) {
      if (xp >= LEVELS[i].minXP) {
        current = LEVELS[i];
      }
    }
    const nextLevel = LEVELS.find(l => l.level === current.level + 1) || null;
    const progressXP = xp - current.minXP;
    const rangeXP = nextLevel ? (nextLevel.minXP - current.minXP) : 1000;
    const percentage = nextLevel ? Math.min(100, Math.round((progressXP / rangeXP) * 100)) : 100;

    return {
      currentLevel: current.level,
      title: current.title,
      minXP: current.minXP,
      nextXP: nextLevel ? nextLevel.minXP : null,
      percentage: percentage
    };
  }

  function updateStreak() {
    const today = new Date().toISOString().slice(0, 10);
    const account = getActiveAccount();
    if (!account) return 1;

    let streak = account.streak || 1;
    const lastActive = account.lastActive;

    if (!lastActive) {
      streak = 1;
    } else {
      const lastDate = new Date(lastActive);
      const currDate = new Date(today);
      const diffDays = Math.round((currDate - lastDate) / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        streak += 1;
      } else if (diffDays > 1) {
        streak = 1;
      }
    }

    updateActiveAccount({ streak: streak, lastActive: today });
    return streak;
  }

  return {
    LEVELS: LEVELS,

    // ==========================================
    // AUTHENTICATION & ACCOUNT MANAGEMENT
    // ==========================================
    isLoggedIn: function () {
      const active = getActiveAccount();
      return active !== null;
    },

    isOnboarded: function () {
      return this.isLoggedIn();
    },

    getActiveAccount: function () {
      return getActiveAccount();
    },

    getAllAccounts: function () {
      return getAccounts().map(acc => ({
        id: acc.id,
        username: acc.username,
        name: acc.name,
        avatar: acc.avatar || 'WC',
        photo: acc.photo || null,
        xp: acc.xp || 0,
        level: getLevelInfo(acc.xp || 0).currentLevel,
        joinedDate: acc.joinedDate
      }));
    },

    register: function ({ name, username, password, avatar = 'WC', photo = null }) {
      const accounts = getAccounts();
      const cleanUsername = username.trim().toLowerCase();
      const cleanName = name.trim();

      if (!cleanName || cleanName.length < 2) {
        return { success: false, error: 'Full Name must be at least 2 characters.' };
      }
      if (!cleanUsername || cleanUsername.length < 3) {
        return { success: false, error: 'Username must be at least 3 characters.' };
      }
      if (!password || password.length < 3) {
        return { success: false, error: 'Password / PIN must be at least 3 characters.' };
      }

      const exists = accounts.find(a => a.username.toLowerCase() === cleanUsername);
      if (exists) {
        return { success: false, error: `Username "${cleanUsername}" is already taken. Please choose another.` };
      }

      const newAccount = {
        id: generateUserId(),
        username: cleanUsername,
        name: cleanName,
        password: password,
        avatar: avatar || 'WC',
        photo: photo || null,
        certId: generateCertId(),
        joinedDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        xp: 0,
        lessons: [],
        practice: [],
        challenges: [],
        bugs: [],
        badges: [],
        quizScores: {},
        finalProject: null,
        streak: 1,
        lastActive: new Date().toISOString().slice(0, 10)
      };

      accounts.push(newAccount);
      saveAccounts(accounts);
      localStorage.setItem(KEYS.ACTIVE_SESSION, newAccount.id);
      syncActiveToLegacy(newAccount);

      window.dispatchEvent(new CustomEvent('webcraft:auth_changed', { detail: { account: newAccount, action: 'register' } }));
      return { success: true, account: newAccount };
    },

    login: function (usernameOrName, password) {
      const accounts = getAccounts();
      const query = usernameOrName.trim().toLowerCase();

      const account = accounts.find(a => 
        a.username.toLowerCase() === query || 
        a.name.toLowerCase() === query
      );

      if (!account) {
        return { success: false, error: 'Account not found. Please check username or create a new account.' };
      }

      if (account.password !== password.trim()) {
        return { success: false, error: 'Incorrect password or PIN. Please try again.' };
      }

      localStorage.setItem(KEYS.ACTIVE_SESSION, account.id);
      syncActiveToLegacy(account);
      window.dispatchEvent(new CustomEvent('webcraft:auth_changed', { detail: { account, action: 'login' } }));
      return { success: true, account };
    },

    switchAccount: function (userId) {
      const accounts = getAccounts();
      const target = accounts.find(a => a.id === userId);
      if (!target) return { success: false, error: 'Account not found.' };

      localStorage.setItem(KEYS.ACTIVE_SESSION, target.id);
      syncActiveToLegacy(target);
      window.dispatchEvent(new CustomEvent('webcraft:auth_changed', { detail: { account: target, action: 'switch' } }));
      return { success: true, account: target };
    },

    logout: function () {
      localStorage.removeItem(KEYS.ACTIVE_SESSION);
      window.dispatchEvent(new CustomEvent('webcraft:auth_changed', { detail: { account: null, action: 'logout' } }));
      window.location.reload();
    },

    changePassword: function (newPassword, oldPassword = null) {
      const active = getActiveAccount();
      if (!active) return { success: false, error: 'Not logged in.' };
      
      if (oldPassword !== null && oldPassword !== '') {
        if (active.password !== oldPassword.trim()) {
          return { success: false, error: 'Current password is incorrect.' };
        }
      }
      
      if (!newPassword || newPassword.trim().length < 3) {
        return { success: false, error: 'New password must be at least 3 characters.' };
      }

      updateActiveAccount({ password: newPassword.trim() });
      return { success: true };
    },

    resetForgottenPassword: function (username, fullName, newPassword) {
      const accounts = getAccounts();
      const cleanUsername = username.trim().toLowerCase();
      const cleanFullName = fullName.trim().toLowerCase();

      const account = accounts.find(a => 
        a.username.toLowerCase() === cleanUsername || 
        a.name.toLowerCase() === cleanUsername
      );

      if (!account) {
        return { success: false, error: `No account found with username "${username}".` };
      }

      if (account.name.toLowerCase() !== cleanFullName && account.username.toLowerCase() !== cleanFullName) {
        return { success: false, error: 'Full name does not match the registered account name.' };
      }

      if (!newPassword || newPassword.trim().length < 3) {
        return { success: false, error: 'New password must be at least 3 characters.' };
      }

      let index = accounts.findIndex(a => a.id === account.id);
      accounts[index].password = newPassword.trim();
      saveAccounts(accounts);
      localStorage.setItem(KEYS.ACTIVE_SESSION, account.id);
      syncActiveToLegacy(accounts[index]);

      window.dispatchEvent(new CustomEvent('webcraft:auth_changed', { detail: { account: accounts[index], action: 'reset_password' } }));
      return { success: true, account: accounts[index] };
    },

    // ==========================================
    // USER DATA & PROFILE METHODS
    // ==========================================
    getUser: function () {
      const active = getActiveAccount();
      if (active) {
        return {
          id: active.id,
          username: active.username,
          name: active.name || 'Web Explorer',
          avatar: active.avatar || 'WC',
          photo: active.photo || null,
          certId: active.certId || generateCertId(),
          joinedDate: active.joinedDate || '2026'
        };
      }
      return {
        id: 'guest',
        username: 'guest',
        name: 'Web Explorer',
        avatar: 'WC',
        photo: null,
        certId: generateCertId(),
        joinedDate: '2026'
      };
    },

    setUser: function (userData) {
      const active = getActiveAccount();
      if (!active) return this.getUser();

      const updated = updateActiveAccount({
        name: userData.name || active.name,
        avatar: userData.avatar || active.avatar,
        photo: userData.photo !== undefined ? userData.photo : active.photo,
        certId: active.certId || generateCertId()
      });

      window.dispatchEvent(new CustomEvent('webcraft:user_updated', { detail: updated }));
      return updated;
    },

    getXP: function () {
      const active = getActiveAccount();
      return active ? (active.xp || 0) : 0;
    },

    getLevel: function () {
      return getLevelInfo(this.getXP());
    },

    getStreak: function () {
      return updateStreak();
    },

    addXP: function (amount, reason = '') {
      const prevXP = this.getXP();
      const newXP = prevXP + amount;
      updateActiveAccount({ xp: newXP });

      const oldLevelInfo = getLevelInfo(prevXP);
      const newLevelInfo = getLevelInfo(newXP);
      const leveledUp = newLevelInfo.currentLevel > oldLevelInfo.currentLevel;

      window.dispatchEvent(new CustomEvent('webcraft:xp_earned', {
        detail: { amount, newXP, reason, leveledUp, levelInfo: newLevelInfo }
      }));

      if (leveledUp) {
        window.dispatchEvent(new CustomEvent('webcraft:level_up', {
          detail: { levelInfo: newLevelInfo, oldLevelInfo }
        }));
      }

      this.checkAutoBadges();
      return { newXP, leveledUp, levelInfo: newLevelInfo };
    },

    getCompletedLessons: function () {
      const active = getActiveAccount();
      return active ? (active.lessons || []) : [];
    },

    markLessonComplete: function (lessonId, xp = 50) {
      const list = [...this.getCompletedLessons()];
      if (!list.includes(lessonId)) {
        list.push(lessonId);
        updateActiveAccount({ lessons: list });
        this.addXP(xp, `Completed Lesson: ${lessonId}`);
        this.unlockBadge('first_code');
        this.checkTrackBadges();
      }
      return list;
    },

    isLessonCompleted: function (lessonId) {
      return this.getCompletedLessons().includes(lessonId);
    },

    getCompletedPractice: function () {
      const active = getActiveAccount();
      return active ? (active.practice || []) : [];
    },

    markPracticeComplete: function (practiceId, xp = 100) {
      const list = [...this.getCompletedPractice()];
      if (!list.includes(practiceId)) {
        list.push(practiceId);
        updateActiveAccount({ practice: list });
        this.addXP(xp, `Solved Practice #${practiceId}`);
        this.unlockBadge('first_code');
        if (list.length >= 5) {
          this.unlockBadge('problem_solver');
        }
      }
      return list;
    },

    getCompletedChallenges: function () {
      const active = getActiveAccount();
      return active ? (active.challenges || []) : [];
    },

    markChallengeComplete: function (challengeId, xp = 150) {
      const list = [...this.getCompletedChallenges()];
      if (!list.includes(challengeId)) {
        list.push(challengeId);
        updateActiveAccount({ challenges: list });
        this.addXP(xp, `Mission Complete: ${challengeId}`);
        this.unlockBadge('first_code');
      }
      return list;
    },

    getCompletedBugs: function () {
      const active = getActiveAccount();
      return active ? (active.bugs || []) : [];
    },

    markBugFixed: function (bugId, xp = 200) {
      const list = [...this.getCompletedBugs()];
      if (!list.includes(bugId)) {
        list.push(bugId);
        updateActiveAccount({ bugs: list });
        this.addXP(xp, `Bug Fixed: ${bugId}`);
        if (list.length >= 3) {
          this.unlockBadge('bug_hunter');
        }
      }
      return list;
    },

    getQuizScores: function () {
      const active = getActiveAccount();
      return active ? (active.quizScores || {}) : {};
    },

    saveQuizResult: function (quizId, score, totalQuestions, xp = 50) {
      const allScores = { ...this.getQuizScores() };
      const prevBest = allScores[quizId] ? allScores[quizId].score : 0;
      allScores[quizId] = {
        score: Math.max(prevBest, score),
        total: totalQuestions,
        lastAttempt: new Date().toLocaleDateString(),
        attempts: (allScores[quizId]?.attempts || 0) + 1
      };
      updateActiveAccount({ quizScores: allScores });
      this.addXP(xp, `Completed Quiz: ${quizId}`);
      if (score === totalQuestions) {
        this.unlockBadge('quiz_master');
      }
      return allScores[quizId];
    },

    getBadges: function () {
      const active = getActiveAccount();
      return active ? (active.badges || []) : [];
    },

    unlockBadge: function (badgeId) {
      const badges = [...this.getBadges()];
      if (!badges.includes(badgeId)) {
        badges.push(badgeId);
        updateActiveAccount({ badges: badges });
        window.dispatchEvent(new CustomEvent('webcraft:badge_unlocked', { detail: { badgeId } }));
      }
      return badges;
    },

    hasBadge: function (badgeId) {
      return this.getBadges().includes(badgeId);
    },

    saveFinalProject: function (projectData) {
      updateActiveAccount({
        finalProject: {
          ...projectData,
          completedAt: new Date().toISOString()
        }
      });
      this.unlockBadge('web_creator');
      this.addXP(1000, 'Completed Final Project!');
    },

    getFinalProject: function () {
      const active = getActiveAccount();
      return active ? active.finalProject : null;
    },

    checkTrackBadges: function () {
      const completed = this.getCompletedLessons();
      const htmlCount = completed.filter(id => id.startsWith('html_')).length;
      const cssCount = completed.filter(id => id.startsWith('css_')).length;
      const jsCount = completed.filter(id => id.startsWith('js_')).length;

      if (htmlCount >= 10) this.unlockBadge('html_hero');
      if (cssCount >= 10) this.unlockBadge('css_creator');
      if (jsCount >= 10) this.unlockBadge('js_explorer');
    },

    checkAutoBadges: function () {
      const xp = this.getXP();
      if (xp >= 50) this.unlockBadge('first_code');
    },

    getStats: function () {
      const lessons = this.getCompletedLessons();
      const practice = this.getCompletedPractice();
      const challenges = this.getCompletedChallenges();
      const bugs = this.getCompletedBugs();
      const badges = this.getBadges();
      const quizzes = this.getQuizScores();
      const level = this.getLevel();

      const totalLessons = 32;
      const totalPractice = 10;
      const totalChallenges = 8;
      const totalBugs = 10;
      const totalBadges = 8;

      const overallCompletedItems = lessons.length + practice.length + challenges.length + bugs.length + (this.getFinalProject() ? 1 : 0);
      const totalPossibleItems = totalLessons + totalPractice + totalChallenges + totalBugs + 1;
      const overallPercentage = Math.min(100, Math.round((overallCompletedItems / totalPossibleItems) * 100));

      return {
        user: this.getUser(),
        isLoggedIn: this.isLoggedIn(),
        xp: this.getXP(),
        level: level,
        streak: this.getStreak(),
        lessonsCount: lessons.length,
        totalLessons,
        htmlLessonsCount: lessons.filter(id => id.startsWith('html_')).length,
        cssLessonsCount: lessons.filter(id => id.startsWith('css_')).length,
        jsLessonsCount: lessons.filter(id => id.startsWith('js_')).length,
        practiceCount: practice.length,
        totalPractice,
        challengesCount: challenges.length,
        totalChallenges,
        bugsCount: bugs.length,
        totalBugs,
        badgesCount: badges.length,
        totalBadges,
        quizzesCompleted: Object.keys(quizzes).length,
        hasFinalProject: !!this.getFinalProject(),
        overallPercentage: overallPercentage
      };
    },

    resetAllProgress: function () {
      const active = getActiveAccount();
      if (active) {
        updateActiveAccount({
          xp: 0,
          lessons: [],
          practice: [],
          challenges: [],
          bugs: [],
          badges: [],
          quizScores: {},
          finalProject: null,
          streak: 1
        });
      }
      window.location.reload();
    }
  };
})();
