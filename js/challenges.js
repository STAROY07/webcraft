// WebCraft Coding Missions Controller (Clean, Professional, Zero-Emoji)
document.addEventListener('DOMContentLoaded', () => {
  WebCraftApp.init('challenges');

  let currentMissionIdx = 0;
  let playgroundInstance = null;

  const missionSelectorEl = document.getElementById('missionSelector');
  const missionTitleEl = document.getElementById('missionTitle');
  const missionXpEl = document.getElementById('missionXp');
  const missionObjEl = document.getElementById('missionObjective');
  const missionReqsEl = document.getElementById('missionRequirements');
  const checkMissionBtn = document.getElementById('checkMissionBtn');

  function renderMissionCards() {
    missionSelectorEl.innerHTML = '';
    const completedChallenges = WebCraftStorage.getCompletedChallenges();

    WebCraftData.challenges.forEach((ch, idx) => {
      const isCompleted = completedChallenges.includes(ch.id);
      const isCurrent = idx === currentMissionIdx;

      const card = document.createElement('div');
      card.className = `step-card ${isCurrent ? 'active' : ''}`;
      card.style.cursor = 'pointer';
      card.style.border = isCurrent ? '2px solid var(--primary-blue)' : '1px solid var(--border-light)';
      
      const iconSvg = WebCraftIcons[ch.icon] || WebCraftIcons.target;

      card.innerHTML = `
        <div class="step-num">${ch.number}</div>
        <div class="step-icon-svg" style="display:flex; justify-content:center; margin: 12px 0; color: var(--primary-blue);">
          ${iconSvg}
        </div>
        <div class="step-title">${ch.title.split(':')[1] || ch.title}</div>
        <div style="font-size: 12px; font-weight: 700; color: ${isCompleted ? 'var(--green)' : 'var(--primary-blue)'};">
          ${isCompleted ? '✓ COMPLETED' : `+${ch.xp} XP`}
        </div>
      `;

      card.addEventListener('click', () => {
        currentMissionIdx = idx;
        loadMission(idx);
        WebCraftAudio.click();
      });

      missionSelectorEl.appendChild(card);
    });
  }

  function loadMission(idx) {
    const ch = WebCraftData.challenges[idx];
    if (!ch) return;

    currentMissionIdx = idx;
    missionTitleEl.innerText = ch.title;
    missionXpEl.innerText = `+${ch.xp} XP`;
    missionObjEl.innerText = ch.objective;

    // Render requirements checklist
    missionReqsEl.innerHTML = '';
    ch.requirements.forEach(req => {
      const li = document.createElement('li');
      li.style.marginBottom = '8px';
      li.style.fontSize = '14px';
      li.innerHTML = `<span style="color:var(--primary-blue); font-weight:bold; margin-right:6px;">•</span> ${escapeHtml(req)}`;
      missionReqsEl.appendChild(li);
    });

    // Update playground
    if (!playgroundInstance) {
      playgroundInstance = WebCraftPlayground.create('challengePlayground', {
        multiTab: false,
        html: ch.starterCode
      });
    } else {
      playgroundInstance.setSingleCode(ch.starterCode);
    }

    renderMissionCards();

    // Check status
    const isCompleted = WebCraftStorage.getCompletedChallenges().includes(ch.id);
    if (isCompleted) {
      checkMissionBtn.innerText = '✓ Mission Completed (+150 XP)';
      checkMissionBtn.classList.remove('btn-primary');
      checkMissionBtn.classList.add('btn-success');
    } else {
      checkMissionBtn.innerText = 'Submit & Complete Mission';
      checkMissionBtn.classList.remove('btn-success');
      checkMissionBtn.classList.add('btn-primary');
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  checkMissionBtn.addEventListener('click', () => {
    const ch = WebCraftData.challenges[currentMissionIdx];
    const userCode = playgroundInstance ? playgroundInstance.getCode() : '';

    if (ch.validator(userCode)) {
      WebCraftAudio.success();
      WebCraftApp.confetti();
      WebCraftStorage.markChallengeComplete(ch.id, ch.xp);
      checkMissionBtn.innerText = '✓ Mission Completed (+150 XP)';
      checkMissionBtn.classList.remove('btn-primary');
      checkMissionBtn.classList.add('btn-success');
      renderMissionCards();
      WebCraftApp.toast(`Mission Accomplished! You completed "${ch.title}"!`, 'success', 'trophy');
    } else {
      WebCraftAudio.error();
      WebCraftApp.toast('Some requirements are still missing. Review the list and try again!', 'xp', 'lightbulb');
    }
  });

  loadMission(0);
});
