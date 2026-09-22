// WebCraft Practice Tasks Controller (Clean, Professional, Zero-Emoji)
document.addEventListener('DOMContentLoaded', () => {
  WebCraftApp.init('practice');

  let currentTaskIdx = 0;
  let hintStep = 0;
  let playgroundInstance = null;

  const taskListEl = document.getElementById('taskList');
  const taskTitleEl = document.getElementById('taskTitle');
  const taskTrackBadgeEl = document.getElementById('taskTrackBadge');
  const taskXpEl = document.getElementById('taskXp');
  const taskInstructionsEl = document.getElementById('taskInstructions');
  const checkBtn = document.getElementById('checkPracticeBtn');
  const hintBtn = document.getElementById('practiceHintBtn');
  const hintContainerEl = document.getElementById('practiceHintContainer');
  const prevBtn = document.getElementById('prevPracticeBtn');
  const nextBtn = document.getElementById('nextPracticeBtn');

  function renderTaskList() {
    taskListEl.innerHTML = '';
    const completedList = WebCraftStorage.getCompletedPractice();

    WebCraftData.practiceTasks.forEach((task, idx) => {
      const isCompleted = completedList.includes(task.id);
      const isCurrent = idx === currentTaskIdx;

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `lesson-item-btn ${isCurrent ? 'active' : ''}`;
      
      let statusBadge = '';
      if (isCompleted) {
        statusBadge = `<span class="lesson-status-pill done">✓ Done</span>`;
      } else if (isCurrent) {
        statusBadge = `<span class="lesson-status-pill active">Active</span>`;
      } else {
        statusBadge = `<span class="lesson-status-pill pending">Ready</span>`;
      }

      btn.innerHTML = `
        <span class="lesson-num-title">Task ${task.id}: ${escapeHtml(task.title)}</span>
        ${statusBadge}
      `;
      btn.addEventListener('click', () => {
        currentTaskIdx = idx;
        loadTask(currentTaskIdx);
        WebCraftAudio.click();
      });
      taskListEl.appendChild(btn);
    });
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function loadTask(idx) {
    const task = WebCraftData.practiceTasks[idx];
    if (!task) return;

    currentTaskIdx = idx;
    hintStep = 0;
    hintContainerEl.innerHTML = '';

    taskTitleEl.innerText = `Task #${task.id}: ${task.title}`;
    taskTrackBadgeEl.innerText = task.track;
    taskXpEl.innerText = `+${task.xp} XP`;
    taskInstructionsEl.innerText = task.instructions;

    // Load code into playground
    if (!playgroundInstance) {
      playgroundInstance = WebCraftPlayground.create('practicePlayground', {
        multiTab: false,
        html: task.starterCode
      });
    } else {
      playgroundInstance.setSingleCode(task.starterCode);
    }

    renderTaskList();

    // Check completion status
    const completedList = WebCraftStorage.getCompletedPractice();
    if (completedList.includes(task.id)) {
      checkBtn.innerText = '✓ Solved (+100 XP Earned)';
      checkBtn.classList.remove('btn-primary');
      checkBtn.classList.add('btn-success');
    } else {
      checkBtn.innerText = 'Check My Code';
      checkBtn.classList.remove('btn-success');
      checkBtn.classList.add('btn-primary');
    }

    prevBtn.disabled = idx === 0;
    nextBtn.disabled = idx === WebCraftData.practiceTasks.length - 1;
  }

  // Progressive Hint System (Hint 1 -> 2 -> 3)
  hintBtn.addEventListener('click', () => {
    const task = WebCraftData.practiceTasks[currentTaskIdx];
    if (hintStep < task.hints.length) {
      const hintText = task.hints[hintStep];
      const hintItem = document.createElement('div');
      hintItem.className = 'explain-box';
      hintItem.style.marginTop = '10px';
      hintItem.innerHTML = `<strong>Hint ${hintStep + 1} of ${task.hints.length}:</strong> ${escapeHtml(hintText)}`;
      hintContainerEl.appendChild(hintItem);
      hintStep++;
      WebCraftAudio.hint();

      if (hintStep >= task.hints.length) {
        hintBtn.innerText = 'All Hints Revealed';
        hintBtn.disabled = true;
      } else {
        hintBtn.innerText = `Reveal Hint ${hintStep + 1}`;
      }
    }
  });

  // Check Practice Code
  checkBtn.addEventListener('click', () => {
    const task = WebCraftData.practiceTasks[currentTaskIdx];
    const userCode = playgroundInstance ? playgroundInstance.getCode() : '';

    if (task.validator(userCode)) {
      WebCraftAudio.success();
      WebCraftApp.confetti();
      WebCraftStorage.markPracticeComplete(task.id, task.xp);
      checkBtn.innerText = '✓ Solved (+100 XP Earned)';
      checkBtn.classList.remove('btn-primary');
      checkBtn.classList.add('btn-success');
      renderTaskList();
      WebCraftApp.toast(`Well done! You solved "${task.title}"!`, 'success', 'check');
    } else {
      WebCraftAudio.error();
      WebCraftApp.toast('Not quite right. Try reading the hints!', 'xp', 'lightbulb');
    }
  });

  prevBtn.addEventListener('click', () => {
    if (currentTaskIdx > 0) {
      loadTask(currentTaskIdx - 1);
      WebCraftAudio.click();
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentTaskIdx < WebCraftData.practiceTasks.length - 1) {
      loadTask(currentTaskIdx + 1);
      WebCraftAudio.click();
    }
  });

  loadTask(0);
});
