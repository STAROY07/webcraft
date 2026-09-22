// WebCraft Storage and State Management (with Photo & Certificate Support)
const WebCraftStorage = (function () {
  const KEYS = {
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
    const lastActive = localStorage.getItem(KEYS.LAST_ACTIVE);
    let streak = parseInt(localStorage.getItem(KEYS.STREAK) || '0', 10);

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

    localStorage.setItem(KEYS.STREAK, streak.toString());
    localStorage.setItem(KEYS.LAST_ACTIVE, today);
    return streak;
  }

  function generateCertId() {
    return 'WC-' + Math.floor(100000 + Math.random() * 900000);
  }

  return {
    LEVELS: LEVELS,

    getUser: function () {
      return getJSON(KEYS.USER, {
        name: 'Web Explorer',
        avatar: 'WC',
        photo: null,
        certId: generateCertId(),
        joinedDate: new Date().toLocaleDateString()
      });
    },

    setUser: function (userData) {
      const current = this.getUser();
      const updated = {
        ...current,
        ...userData,
        certId: current.certId || generateCertId()
      };
      setJSON(KEYS.USER, updated);
      window.dispatchEvent(new CustomEvent('webcraft:user_updated', { detail: updated }));
      return updated;
    },

    isOnboarded: function () {
      const user = localStorage.getItem(KEYS.USER);
      return user !== null;
    },

    getXP: function () {
      return parseInt(localStorage.getItem(KEYS.XP) || '0', 10);
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
      localStorage.setItem(KEYS.XP, newXP.toString());

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
      return getJSON(KEYS.LESSONS, []);
    },

    markLessonComplete: function (lessonId, xp = 50) {
      const list = this.getCompletedLessons();
      if (!list.includes(lessonId)) {
        list.push(lessonId);
        setJSON(KEYS.LESSONS, list);
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
      return getJSON(KEYS.PRACTICE, []);
    },

    markPracticeComplete: function (practiceId, xp = 100) {
      const list = this.getCompletedPractice();
      if (!list.includes(practiceId)) {
        list.push(practiceId);
        setJSON(KEYS.PRACTICE, list);
        this.addXP(xp, `Solved Practice #${practiceId}`);
        this.unlockBadge('first_code');
        if (list.length >= 5) {
          this.unlockBadge('problem_solver');
        }
      }
      return list;
    },

    getCompletedChallenges: function () {
      return getJSON(KEYS.CHALLENGES, []);
    },

    markChallengeComplete: function (challengeId, xp = 150) {
      const list = this.getCompletedChallenges();
      if (!list.includes(challengeId)) {
        list.push(challengeId);
        setJSON(KEYS.CHALLENGES, list);
        this.addXP(xp, `Mission Complete: ${challengeId}`);
        this.unlockBadge('first_code');
      }
      return list;
    },

    getCompletedBugs: function () {
      return getJSON(KEYS.BUGS, []);
    },

    markBugFixed: function (bugId, xp = 200) {
      const list = this.getCompletedBugs();
      if (!list.includes(bugId)) {
        list.push(bugId);
        setJSON(KEYS.BUGS, list);
        this.addXP(xp, `Bug Fixed: ${bugId}`);
        if (list.length >= 3) {
          this.unlockBadge('bug_hunter');
        }
      }
      return list;
    },

    getQuizScores: function () {
      return getJSON(KEYS.QUIZ, {});
    },

    saveQuizResult: function (quizId, score, totalQuestions, xp = 50) {
      const allScores = this.getQuizScores();
      const prevBest = allScores[quizId] ? allScores[quizId].score : 0;
      allScores[quizId] = {
        score: Math.max(prevBest, score),
        total: totalQuestions,
        lastAttempt: new Date().toLocaleDateString(),
        attempts: (allScores[quizId]?.attempts || 0) + 1
      };
      setJSON(KEYS.QUIZ, allScores);
      this.addXP(xp, `Completed Quiz: ${quizId}`);
      if (score === totalQuestions) {
        this.unlockBadge('quiz_master');
      }
      return allScores[quizId];
    },

    getBadges: function () {
      return getJSON(KEYS.BADGES, []);
    },

    unlockBadge: function (badgeId) {
      const badges = this.getBadges();
      if (!badges.includes(badgeId)) {
        badges.push(badgeId);
        setJSON(KEYS.BADGES, badges);
        window.dispatchEvent(new CustomEvent('webcraft:badge_unlocked', { detail: { badgeId } }));
      }
      return badges;
    },

    hasBadge: function (badgeId) {
      return this.getBadges().includes(badgeId);
    },

    saveFinalProject: function (projectData) {
      setJSON(KEYS.FINAL_PROJECT, {
        ...projectData,
        completedAt: new Date().toISOString()
      });
      this.unlockBadge('web_creator');
      this.addXP(1000, 'Completed Final Project!');
    },

    getFinalProject: function () {
      return getJSON(KEYS.FINAL_PROJECT, null);
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
      localStorage.removeItem(KEYS.USER);
      localStorage.removeItem(KEYS.XP);
      localStorage.removeItem(KEYS.LEVEL);
      localStorage.removeItem(KEYS.LESSONS);
      localStorage.removeItem(KEYS.PRACTICE);
      localStorage.removeItem(KEYS.CHALLENGES);
      localStorage.removeItem(KEYS.BUGS);
      localStorage.removeItem(KEYS.BADGES);
      localStorage.removeItem(KEYS.QUIZ);
      localStorage.removeItem(KEYS.FINAL_PROJECT);
      localStorage.removeItem(KEYS.STREAK);
      localStorage.removeItem(KEYS.LAST_ACTIVE);
      window.location.reload();
    }
  };
})();
