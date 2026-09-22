// WebCraft Interactive Quiz Engine
document.addEventListener('DOMContentLoaded', () => {
  WebCraftApp.init('quiz');

  let currentCategory = 'html';
  let currentQuestionIdx = 0;
  let currentScore = 0;
  let questions = [];
  let answered = false;

  const categoryBtns = document.querySelectorAll('.category-tab-btn');
  const quizCardEl = document.getElementById('quizCard');
  const quizSummaryEl = document.getElementById('quizSummary');
  const progressFillEl = document.getElementById('quizProgressFill');
  const questionCountEl = document.getElementById('questionCount');
  const questionTextEl = document.getElementById('questionText');
  const optionsContainerEl = document.getElementById('optionsContainer');
  const explanationBoxEl = document.getElementById('explanationBox');
  const nextQBtn = document.getElementById('nextQuestionBtn');

  // Summary Elements
  const summaryScoreEl = document.getElementById('summaryScore');
  const summaryXpEl = document.getElementById('summaryXp');
  const summaryFeedbackEl = document.getElementById('summaryFeedback');
  const retryBtn = document.getElementById('retryQuizBtn');

  function startQuiz(category) {
    currentCategory = category;
    questions = WebCraftData.quizzes[category] || [];
    currentQuestionIdx = 0;
    currentScore = 0;
    answered = false;

    categoryBtns.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-category') === category);
    });

    quizSummaryEl.style.display = 'none';
    quizCardEl.style.display = 'block';

    loadQuestion();
  }

  function loadQuestion() {
    answered = false;
    explanationBoxEl.style.display = 'none';
    nextQBtn.style.display = 'none';

    const q = questions[currentQuestionIdx];
    if (!q) {
      showSummary();
      return;
    }

    // Progress bar
    const progressPercent = ((currentQuestionIdx) / questions.length) * 100;
    progressFillEl.style.width = `${progressPercent}%`;
    questionCountEl.innerText = `Question ${currentQuestionIdx + 1} of ${questions.length}`;
    questionTextEl.innerText = q.question;

    // Render Options
    optionsContainerEl.innerHTML = '';
    q.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option-btn';
      btn.innerHTML = `
        <span style="font-weight:800; color:var(--primary-blue); font-size:16px;">${String.fromCharCode(65 + idx)}.</span>
        <span>${escapeHtml(opt)}</span>
      `;

      btn.addEventListener('click', () => {
        if (answered) return;
        selectOption(idx, q);
      });

      optionsContainerEl.appendChild(btn);
    });
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function selectOption(selectedIdx, q) {
    answered = true;
    const optionBtns = optionsContainerEl.querySelectorAll('.quiz-option-btn');

    if (selectedIdx === q.correct) {
      currentScore++;
      optionBtns[selectedIdx].classList.add('correct');
      explanationBoxEl.innerHTML = `<strong>✓ Correct!</strong> ${q.explanation}`;
      explanationBoxEl.style.background = '#DCFCE7';
      explanationBoxEl.style.borderColor = '#22C55E';
      WebCraftAudio.success();
    } else {
      optionBtns[selectedIdx].classList.add('wrong');
      optionBtns[q.correct].classList.add('correct');
      explanationBoxEl.innerHTML = `<strong>💡 Explanation:</strong> ${q.explanation}`;
      explanationBoxEl.style.background = '#EFF6FF';
      explanationBoxEl.style.borderColor = '#BFDBFE';
      WebCraftAudio.error();
    }

    explanationBoxEl.style.display = 'block';
    nextQBtn.style.display = 'inline-flex';
    nextQBtn.innerText = currentQuestionIdx === questions.length - 1 ? 'See My Results 🏆' : 'Next Question ➔';
  }

  nextQBtn.addEventListener('click', () => {
    currentQuestionIdx++;
    if (currentQuestionIdx < questions.length) {
      loadQuestion();
    } else {
      showSummary();
    }
    WebCraftAudio.click();
  });

  function showSummary() {
    quizCardEl.style.display = 'none';
    quizSummaryEl.style.display = 'block';
    progressFillEl.style.width = '100%';

    const total = questions.length;
    const xpEarned = currentScore * 10;
    WebCraftStorage.saveQuizResult(currentCategory, currentScore, total, xpEarned);

    summaryScoreEl.innerText = `${currentScore} / ${total}`;
    summaryXpEl.innerText = `+${xpEarned} XP`;

    if (currentScore === total) {
      summaryFeedbackEl.innerText = "🌟 Perfect Score! You are an absolute Web Master!";
      WebCraftApp.confetti();
      WebCraftAudio.levelUp();
    } else if (currentScore >= total * 0.7) {
      summaryFeedbackEl.innerText = "🎉 Super Job! You have a great grasp of web development!";
      WebCraftAudio.success();
    } else {
      summaryFeedbackEl.innerText = "🌱 Good effort! Review the lessons and try again to level up!";
      WebCraftAudio.hint();
    }
  }

  categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      startQuiz(btn.getAttribute('data-category'));
      WebCraftAudio.click();
    });
  });

  retryBtn.addEventListener('click', () => {
    startQuiz(currentCategory);
    WebCraftAudio.click();
  });

  // Start with HTML quiz
  startQuiz('html');
});
