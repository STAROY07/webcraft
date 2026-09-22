// WebCraft Bug Hunter Arena Controller (Clean, Professional, Zero-Emoji)
document.addEventListener('DOMContentLoaded', () => {
  WebCraftApp.init('bug-hunter');

  let currentBugIdx = 0;
  let attempts = 0;
  let timerSeconds = 0;
  let timerInterval = null;
  let playgroundInstance = null;

  const levelSelectorEl = document.getElementById('bugLevelSelector');
  const bugTitleEl = document.getElementById('bugTitle');
  const bugCategoryEl = document.getElementById('bugCategory');
  const bugXpEl = document.getElementById('bugXp');
  const bugStoryEl = document.getElementById('bugStory');
  const bugAttemptsEl = document.getElementById('bugAttempts');
  const bugTimerEl = document.getElementById('bugTimer');
  const squashBtn = document.getElementById('squashBugBtn');
  const hintBtn = document.getElementById('bugHintBtn');
  const hintBoxEl = document.getElementById('bugHintBox');
  const nextLevelBtn = document.getElementById('nextBugBtn');

  function startTimer() {
    clearInterval(timerInterval);
    timerSeconds = 0;
    bugTimerEl.innerText = '00:00';
    timerInterval = setInterval(() => {
      timerSeconds++;
      const mins = String(Math.floor(timerSeconds / 60)).padStart(2, '0');
      const secs = String(timerSeconds % 60).padStart(2, '0');
      bugTimerEl.innerText = `${mins}:${secs}`;
    }, 1000);
  }

  function renderLevelGrid() {
    levelSelectorEl.innerHTML = '';
    const completedBugs = WebCraftStorage.getCompletedBugs();

    WebCraftData.bugHunterLevels.forEach((bug, idx) => {
      const isCompleted = completedBugs.includes(bug.id);
      const isCurrent = idx === currentBugIdx;
      const isBoss = bug.difficulty === 'Boss Level';

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `btn btn-sm ${isCurrent ? 'btn-primary' : (isCompleted ? 'btn-success' : 'btn-secondary')}`;
      btn.style.position = 'relative';
      if (isBoss) {
        btn.style.border = '2px solid #EF4444';
      }

      btn.innerHTML = `
        <span>${isBoss ? 'Boss' : 'Lv'} ${bug.level}</span> ${isCompleted ? '✓' : ''}
      `;

      btn.addEventListener('click', () => {
        currentBugIdx = idx;
        loadBugLevel(idx);
        WebCraftAudio.click();
      });

      levelSelectorEl.appendChild(btn);
    });
  }

  function loadBugLevel(idx) {
    const bug = WebCraftData.bugHunterLevels[idx];
    if (!bug) return;

    currentBugIdx = idx;
    attempts = 0;
    bugAttemptsEl.innerText = '0';
    startTimer();

    bugTitleEl.innerText = bug.title;
    bugCategoryEl.innerText = `${bug.category} • ${bug.difficulty}`;
    bugXpEl.innerText = `+${bug.xp} XP`;
    bugStoryEl.innerText = bug.story;

    hintBoxEl.style.display = 'none';
    hintBoxEl.innerText = '';

    // Initialize or set code in playground
    if (!playgroundInstance) {
      playgroundInstance = WebCraftPlayground.create('bugPlayground', {
        multiTab: false,
        html: bug.brokenCode
      });
    } else {
      playgroundInstance.setSingleCode(bug.brokenCode);
    }

    renderLevelGrid();

    // Check completion status
    const isCompleted = WebCraftStorage.getCompletedBugs().includes(bug.id);
    if (isCompleted) {
      squashBtn.innerText = '✓ Bug Fixed (+XP Earned)';
      squashBtn.classList.remove('btn-primary');
      squashBtn.classList.add('btn-success');
    } else {
      squashBtn.innerText = 'FIX THE CODE';
      squashBtn.classList.remove('btn-success');
      squashBtn.classList.add('btn-primary');
    }

    nextLevelBtn.disabled = idx === WebCraftData.bugHunterLevels.length - 1;
  }

  // Squash bug verification
  squashBtn.addEventListener('click', () => {
    attempts++;
    bugAttemptsEl.innerText = attempts.toString();

    const bug = WebCraftData.bugHunterLevels[currentBugIdx];
    const userCode = playgroundInstance ? playgroundInstance.getCode() : '';

    if (bug.validator(userCode)) {
      clearInterval(timerInterval);
      WebCraftAudio.success();
      WebCraftApp.confetti();
      WebCraftStorage.markBugFixed(bug.id, bug.xp);

      squashBtn.innerText = '✓ Bug Fixed (+XP Earned)';
      squashBtn.classList.remove('btn-primary');
      squashBtn.classList.add('btn-success');

      renderLevelGrid();

      if (bug.difficulty === 'Boss Level') {
        WebCraftApp.toast('Boss Battle Complete! All bugs squashed!', 'success', 'trophy');
      } else {
        WebCraftApp.toast(`Bug fixed in ${timerSeconds} seconds!`, 'success', 'check');
      }
    } else {
      WebCraftAudio.error();
      WebCraftApp.toast('The bug is still present. Inspect the code closely!', 'xp', 'lightbulb');
    }
  });

  // Reveal Hint
  hintBtn.addEventListener('click', () => {
    const bug = WebCraftData.bugHunterLevels[currentBugIdx];
    hintBoxEl.innerHTML = `<strong>Inspector Hint:</strong> ${bug.hint}`;
    hintBoxEl.style.display = 'block';
    WebCraftAudio.hint();
  });

  // Next level button
  nextLevelBtn.addEventListener('click', () => {
    if (currentBugIdx < WebCraftData.bugHunterLevels.length - 1) {
      loadBugLevel(currentBugIdx + 1);
      WebCraftAudio.click();
    }
  });

  loadBugLevel(0);
});
