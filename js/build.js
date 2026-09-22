// WebCraft Final Boss: Build Your First Website Controller
document.addEventListener('DOMContentLoaded', () => {
  WebCraftApp.init('build');

  let playgroundInstance = null;
  const checklistContainerEl = document.getElementById('buildChecklist');
  const checkWebsiteBtn = document.getElementById('checkWebsiteBtn');
  const exportBtn = document.getElementById('exportWebsiteBtn');
  const victoryModalEl = document.getElementById('buildVictoryModal');
  const claimRewardBtn = document.getElementById('claimRewardBtn');

  const fpData = WebCraftData.finalProject;

  function renderChecklist(currentCodeState) {
    checklistContainerEl.innerHTML = '';
    const html = currentCodeState?.html || '';
    const css = currentCodeState?.css || '';
    const js = currentCodeState?.js || '';

    const checks = {
      req_html_heading: /<h1/i.test(html),
      req_html_nav: /<nav/i.test(html) && /<a/i.test(html),
      req_html_img: /<img|card-icon/i.test(html),
      req_html_sections: /class=["'](card|container|grid|hero)/i.test(html),
      req_html_form: /<form|<input|<button/i.test(html),
      req_css_colors: /color:|background:|background-color:/i.test(css),
      req_css_layout: /display:\s*(flex|grid)/i.test(css),
      req_css_card: /border-radius:|box-shadow:/i.test(css),
      req_css_responsive: /@media/i.test(css),
      req_js_event: /addEventListener|onclick/i.test(js),
      req_js_dom: /getElementById|querySelector|innerText|textContent|style/i.test(js)
    };

    let allPassed = true;

    fpData.requirements.forEach(req => {
      const isPassed = !!checks[req.id];
      if (!isPassed) allPassed = false;

      const item = document.createElement('div');
      item.style.display = 'flex';
      item.style.alignItems = 'center';
      item.style.justifyContent = 'space-between';
      item.style.padding = '8px 12px';
      item.style.borderRadius = '8px';
      item.style.marginBottom = '6px';
      item.style.fontSize = '13px';
      item.style.background = isPassed ? '#DCFCE7' : '#F8FAFC';
      item.style.color = isPassed ? '#15803D' : '#64748B';
      item.style.border = `1px solid ${isPassed ? '#86EFAC' : '#E2E8F0'}`;

      item.innerHTML = `
        <span><strong>${req.category}:</strong> ${req.text}</span>
        <span style="font-weight: 800;">${isPassed ? '✓' : '○'}</span>
      `;

      checklistContainerEl.appendChild(item);
    });

    return allPassed;
  }

  // Initialize Playground with starter template
  playgroundInstance = WebCraftPlayground.create('buildPlayground', {
    multiTab: true,
    html: fpData.starterTemplate.html,
    css: fpData.starterTemplate.css,
    js: fpData.starterTemplate.js,
    onRun: (codeState) => {
      renderChecklist(codeState);
    }
  });

  // Initial checklist render
  renderChecklist(fpData.starterTemplate);

  // Check Website Complete
  checkWebsiteBtn.addEventListener('click', () => {
    const codeState = playgroundInstance.getCodeState();
    const passed = renderChecklist(codeState);

    if (passed) {
      WebCraftAudio.levelUp();
      WebCraftApp.confetti();
      victoryModalEl.classList.add('active');
    } else {
      WebCraftAudio.error();
      WebCraftApp.toast('Some requirements are not met yet. Look at the checklist on the left!', 'xp', '🔍');
    }
  });

  // Claim Reward
  claimRewardBtn.addEventListener('click', () => {
    const codeState = playgroundInstance.getCodeState();
    WebCraftStorage.saveFinalProject(codeState);
    victoryModalEl.classList.remove('active');
    WebCraftApp.toast('Congratulations! You earned the WEB CREATOR badge + 1000 XP!', 'success', '👑');
    WebCraftApp.updateStats();
  });

  // Export HTML File
  exportBtn.addEventListener('click', () => {
    const state = playgroundInstance.getCodeState();
    const completeDoc = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My WebCraft Website</title>
  <style>
${state.css}
  </style>
</head>
<body>
${state.html}
  <script>
${state.js}
  </script>
</body>
</html>`;

    const blob = new Blob([completeDoc], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my-webcraft-website.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    WebCraftApp.toast('Website HTML downloaded successfully! You can open it in any browser!', 'success', '💾');
    WebCraftAudio.success();
  });
});
