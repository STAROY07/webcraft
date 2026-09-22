// WebCraft Learning Path Controller (Clean, Professional, Zero-Emoji)
document.addEventListener('DOMContentLoaded', () => {
  WebCraftApp.init('learn');

  const urlParams = new URLSearchParams(window.location.search);
  let currentTrackId = urlParams.get('track') || 'html';
  let currentLessonIndex = parseInt(urlParams.get('lesson') || '0', 10);

  let playgroundInstance = null;

  const trackTabs = document.querySelectorAll('.track-tab-btn');
  const lessonListEl = document.getElementById('lessonList');
  const lessonTitleEl = document.getElementById('lessonTitle');
  const lessonBadgeEl = document.getElementById('lessonBadge');
  const lessonChildDescEl = document.getElementById('lessonChildDesc');
  const lessonDevDescEl = document.getElementById('lessonDevDesc');
  const lessonTaskEl = document.getElementById('lessonTask');
  const checkLessonBtn = document.getElementById('checkLessonBtn');
  const nextLessonBtn = document.getElementById('nextLessonBtn');
  const prevLessonBtn = document.getElementById('prevLessonBtn');
  const hintBtn = document.getElementById('hintBtn');
  const hintBoxEl = document.getElementById('hintBox');

  function renderTrackLessons() {
    const track = WebCraftData.tracks[currentTrackId];
    if (!track) return;

    // Update Track tabs UI
    trackTabs.forEach(tab => {
      const isMatch = tab.getAttribute('data-track') === currentTrackId;
      tab.classList.toggle('active', isMatch);
    });

    // Render sidebar lesson items
    lessonListEl.innerHTML = '';
    track.lessons.forEach((lesson, idx) => {
      const isCompleted = WebCraftStorage.isLessonCompleted(lesson.id);
      const isCurrent = idx === currentLessonIndex;

      const itemBtn = document.createElement('button');
      itemBtn.type = 'button';
      itemBtn.className = `lesson-item-btn ${isCurrent ? 'active' : ''}`;
      
      let statusBadge = '';
      if (isCompleted) {
        statusBadge = `<span class="lesson-status-pill done">✓ Done</span>`;
      } else if (isCurrent) {
        statusBadge = `<span class="lesson-status-pill active">Current</span>`;
      } else {
        statusBadge = `<span class="lesson-status-pill pending">Ready</span>`;
      }

      itemBtn.innerHTML = `
        <span class="lesson-num-title">${lesson.number}. ${escapeHtml(lesson.title)}</span>
        ${statusBadge}
      `;
      itemBtn.addEventListener('click', () => {
        currentLessonIndex = idx;
        loadLesson(currentLessonIndex);
        WebCraftAudio.click();
      });
      lessonListEl.appendChild(itemBtn);
    });
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function loadLesson(index) {
    const track = WebCraftData.tracks[currentTrackId];
    if (!track || !track.lessons[index]) return;

    const lesson = track.lessons[index];
    currentLessonIndex = index;

    // Update UI headers
    lessonTitleEl.innerText = `Module ${lesson.number}: ${lesson.title}`;
    lessonBadgeEl.innerText = `+${lesson.xp} XP`;
    lessonChildDescEl.innerText = lesson.childSummary;
    lessonDevDescEl.innerText = lesson.devSummary;
    lessonTaskEl.innerText = lesson.task;

    hintBoxEl.style.display = 'none';
    hintBoxEl.innerText = '';

    // Update playground
    if (!playgroundInstance) {
      playgroundInstance = WebCraftPlayground.create('lessonPlayground', {
        multiTab: false,
        html: lesson.interactiveSnippet
      });
    } else {
      playgroundInstance.setSingleCode(lesson.interactiveSnippet);
    }

    renderTrackLessons();

    // Check completion status
    const isCompleted = WebCraftStorage.isLessonCompleted(lesson.id);
    if (isCompleted) {
      checkLessonBtn.innerText = '✓ Completed (+50 XP Earned)';
      checkLessonBtn.classList.remove('btn-primary');
      checkLessonBtn.classList.add('btn-success');
    } else {
      checkLessonBtn.innerText = 'Check My Code & Earn XP';
      checkLessonBtn.classList.remove('btn-success');
      checkLessonBtn.classList.add('btn-primary');
    }

    // Prev / Next button states
    prevLessonBtn.disabled = index === 0;
    nextLessonBtn.disabled = index === track.lessons.length - 1;
  }

  // Track tab switcher
  trackTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      currentTrackId = tab.getAttribute('data-track');
      currentLessonIndex = 0;
      loadLesson(0);
      WebCraftAudio.click();
    });
  });

  // Check Task
  checkLessonBtn.addEventListener('click', () => {
    const track = WebCraftData.tracks[currentTrackId];
    const lesson = track.lessons[currentLessonIndex];
    const currentCode = playgroundInstance ? playgroundInstance.getCode() : '';

    if (lesson.targetValidation(currentCode)) {
      WebCraftAudio.success();
      WebCraftApp.confetti();
      WebCraftStorage.markLessonComplete(lesson.id, lesson.xp);
      checkLessonBtn.innerText = '✓ Completed (+50 XP Earned)';
      checkLessonBtn.classList.remove('btn-primary');
      checkLessonBtn.classList.add('btn-success');
      renderTrackLessons();

      WebCraftApp.toast(`Great job! You completed "${lesson.title}"!`, 'success', 'check');
    } else {
      WebCraftAudio.error();
      WebCraftApp.toast('Not quite there yet. Check the task and try again!', 'xp', 'lightbulb');
    }
  });

  // Hint Button
  hintBtn.addEventListener('click', () => {
    const track = WebCraftData.tracks[currentTrackId];
    const lesson = track.lessons[currentLessonIndex];
    hintBoxEl.innerHTML = `<strong>Hint:</strong> ${escapeHtml(lesson.hint)}`;
    hintBoxEl.style.display = 'block';
    WebCraftAudio.hint();
  });

  // Prev / Next Buttons
  prevLessonBtn.addEventListener('click', () => {
    if (currentLessonIndex > 0) {
      loadLesson(currentLessonIndex - 1);
      WebCraftAudio.click();
    }
  });

  nextLessonBtn.addEventListener('click', () => {
    const track = WebCraftData.tracks[currentTrackId];
    if (currentLessonIndex < track.lessons.length - 1) {
      loadLesson(currentLessonIndex + 1);
      WebCraftAudio.click();
    }
  });

  // Initialize first lesson
  loadLesson(currentLessonIndex);
});
