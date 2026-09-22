// WebCraft Achievements Controller (Clean, Professional, Zero-Emoji)
document.addEventListener('DOMContentLoaded', () => {
  WebCraftApp.init('achievements');

  const badgesGridEl = document.getElementById('badgesGrid');
  const totalXpEl = document.getElementById('achieveTotalXp');
  const currentLevelEl = document.getElementById('achieveCurrentLevel');
  const lessonsCompletedEl = document.getElementById('achieveLessonsCount');
  const bugsFixedEl = document.getElementById('achieveBugsCount');
  const challengesSolvedEl = document.getElementById('achieveChallengesCount');
  const levelProgressFillEl = document.getElementById('achieveLevelProgressFill');
  const levelProgressTextEl = document.getElementById('achieveLevelProgressText');

  function renderAchievements() {
    const stats = WebCraftStorage.getStats();
    const earnedBadges = WebCraftStorage.getBadges();

    // Stats
    totalXpEl.innerText = `${stats.xp} XP`;
    currentLevelEl.innerText = `Level ${stats.level.currentLevel}: ${stats.level.title}`;
    lessonsCompletedEl.innerText = `${stats.lessonsCount} / ${stats.totalLessons}`;
    bugsFixedEl.innerText = `${stats.bugsCount} / ${stats.totalBugs}`;
    challengesSolvedEl.innerText = `${stats.challengesCount} / ${stats.totalChallenges}`;

    // Level progress
    levelProgressFillEl.style.width = `${stats.level.percentage}%`;
    levelProgressTextEl.innerText = stats.level.nextXP 
      ? `${stats.xp - stats.level.minXP} / ${stats.level.nextXP - stats.level.minXP} XP to Level ${stats.level.currentLevel + 1}`
      : 'Max Level Reached';

    // Render Badges
    badgesGridEl.innerHTML = '';
    WebCraftData.badges.forEach(badge => {
      const isUnlocked = earnedBadges.includes(badge.id);
      const iconSvg = WebCraftIcons[badge.icon] || WebCraftIcons.award;

      const card = document.createElement('div');
      card.className = `badge-card ${isUnlocked ? 'unlocked' : 'locked'}`;

      card.innerHTML = `
        <div class="badge-circle" style="background: ${isUnlocked ? badge.color : '#E2E8F0'}; color: ${isUnlocked ? 'white' : '#94A3B8'}; display:flex; align-items:center; justify-content:center;">
          ${iconSvg}
        </div>
        <div class="badge-name">${badge.name}</div>
        <div class="badge-desc">${badge.description}</div>
        <div style="margin-top: 14px; font-size: 11px; font-weight: 800; color: ${isUnlocked ? 'var(--green)' : 'var(--text-muted)'};">
          ${isUnlocked ? '✓ UNLOCKED' : 'LOCKED'}
        </div>
      `;

      card.addEventListener('click', () => {
        if (isUnlocked) {
          WebCraftAudio.badge();
          WebCraftApp.toast(`Badge: ${badge.name} — ${badge.unlockedMessage}`, 'success', badge.icon);
        } else {
          WebCraftAudio.hint();
          WebCraftApp.toast(`How to unlock: ${badge.description}`, 'xp', 'lightbulb');
        }
      });

      badgesGridEl.appendChild(card);
    });
  }

  renderAchievements();
});
