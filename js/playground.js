// WebCraft Interactive Code Playground & Sandboxed Execution Engine
const WebCraftPlayground = (function () {
  function createPlayground(containerId, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) return null;

    const defaultHtml = options.html || '<!-- Write your HTML code here -->\n<h1>Hello WebCraft!</h1>\n<p>Start editing to see magic happen.</p>';
    const defaultCss = options.css || '/* Write your CSS styling here */\nbody {\n  font-family: sans-serif;\n  background: #F8FBFF;\n  padding: 20px;\n}\nh1 {\n  color: #2563EB;\n}';
    const defaultJs = options.js || '// Write your JavaScript here\nconsole.log("WebCraft Playground Ready!");';

    const showTabs = options.multiTab !== false;
    let currentTab = 'html';
    let codeState = {
      html: defaultHtml,
      css: defaultCss,
      js: defaultJs
    };

    container.innerHTML = `
      <div class="playground-wrapper">
        <!-- Playground Header -->
        <div class="playground-header">
          ${showTabs ? `
            <div class="playground-tabs">
              <button class="tab-btn active" data-tab="html">🧱 HTML</button>
              <button class="tab-btn" data-tab="css">🎨 CSS</button>
              <button class="tab-btn" data-tab="js">⚡ JS</button>
            </div>
          ` : `
            <div style="font-weight: 700; color: var(--text-main); font-size: 14px;">
              💻 Code Workspace
            </div>
          `}

          <div class="playground-controls">
            <!-- Viewport Switcher -->
            <div class="viewport-toggle" id="${containerId}-vp">
              <button class="vp-btn active" data-vp="desktop" title="Desktop View">💻 Desktop</button>
              <button class="vp-btn" data-vp="tablet" title="Tablet View">📱 Tablet</button>
              <button class="vp-btn" data-vp="mobile" title="Mobile View">📱 Mobile</button>
            </div>

            <!-- Run & Reset Buttons -->
            <button class="btn btn-sm btn-secondary" id="${containerId}-resetBtn">🔄 Reset</button>
            <button class="btn btn-sm btn-success" id="${containerId}-runBtn">▶ RUN CODE</button>
          </div>
        </div>

        <!-- Mobile Segmented View Toggle (Code vs Preview) -->
        <div class="mobile-view-toggle" id="${containerId}-mobileToggle">
          <button class="active" data-view="code">📝 Code Editor</button>
          <button data-view="preview">👁️ Live Preview</button>
        </div>

        <!-- Playground Body (Editor + Sandboxed Preview) -->
        <div class="playground-body">
          <div class="editor-pane mobile-active" id="${containerId}-editorPane">
            <textarea
              class="editor-textarea"
              id="${containerId}-textarea"
              placeholder="Type your code here..."
              spellcheck="false"
              autocomplete="off"
              autocapitalize="off"
            ></textarea>
          </div>
          <div class="preview-pane" id="${containerId}-previewPane">
            <iframe
              class="preview-frame"
              id="${containerId}-iframe"
              sandbox="allow-scripts allow-modals"
              title="Live Code Preview"
            ></iframe>
          </div>
        </div>
      </div>
    `;

    const textarea = document.getElementById(`${containerId}-textarea`);
    const iframe = document.getElementById(`${containerId}-iframe`);
    const runBtn = document.getElementById(`${containerId}-runBtn`);
    const resetBtn = document.getElementById(`${containerId}-resetBtn`);
    const vpButtons = container.querySelectorAll(`#${containerId}-vp .vp-btn`);
    const tabButtons = container.querySelectorAll('.tab-btn');
    const mobileToggleBtns = container.querySelectorAll(`#${containerId}-mobileToggle button`);
    const editorPane = document.getElementById(`${containerId}-editorPane`);
    const previewPane = document.getElementById(`${containerId}-previewPane`);

    // Set initial text
    textarea.value = codeState[currentTab];

    function renderIframe() {
      let fullDoc = '';
      if (showTabs) {
        fullDoc = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              ${codeState.css}
            </style>
          </head>
          <body>
            ${codeState.html}
            <script>
              try {
                ${codeState.js}
              } catch (err) {
                console.error("Runtime error:", err);
              }
            <\/script>
          </body>
          </html>
        `;
      } else {
        // Single combined snippet
        fullDoc = codeState.html;
      }

      iframe.srcdoc = fullDoc;
    }

    // Run code
    function run() {
      codeState[currentTab] = textarea.value;
      renderIframe();
      WebCraftAudio.click();
      if (typeof options.onRun === 'function') {
        options.onRun(codeState, getCombinedCode());
      }
    }

    function getCombinedCode() {
      if (showTabs) {
        return `<style>${codeState.css}</style>\n${codeState.html}\n<script>${codeState.js}</script>`;
      }
      return textarea.value;
    }

    // Tab Switching
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        codeState[currentTab] = textarea.value;
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentTab = btn.getAttribute('data-tab');
        textarea.value = codeState[currentTab];
        WebCraftAudio.click();
      });
    });

    // Viewport Toggle
    vpButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        vpButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const vp = btn.getAttribute('data-vp');
        iframe.className = `preview-frame vp-${vp}`;
        WebCraftAudio.click();
      });
    });

    // Mobile View Toggle
    mobileToggleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        mobileToggleBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const view = btn.getAttribute('data-view');
        if (view === 'code') {
          editorPane.classList.add('mobile-active');
          previewPane.classList.remove('mobile-active');
        } else {
          editorPane.classList.remove('mobile-active');
          previewPane.classList.add('mobile-active');
          run(); // auto refresh preview on toggle
        }
        WebCraftAudio.click();
      });
    });

    // Reset button
    resetBtn.addEventListener('click', () => {
      if (confirm("Reset code to default starter template?")) {
        codeState = {
          html: defaultHtml,
          css: defaultCss,
          js: defaultJs
        };
        textarea.value = codeState[currentTab];
        renderIframe();
        WebCraftAudio.click();
      }
    });

    // Run button
    runBtn.addEventListener('click', run);

    // Initial render
    renderIframe();

    return {
      run: run,
      getCode: getCombinedCode,
      getCodeState: () => codeState,
      setCode: (newHtml, newCss, newJs) => {
        codeState.html = newHtml || '';
        codeState.css = newCss || '';
        codeState.js = newJs || '';
        textarea.value = codeState[currentTab];
        renderIframe();
      },
      setSingleCode: (code) => {
        codeState.html = code;
        textarea.value = code;
        renderIframe();
      }
    };
  }

  return {
    create: createPlayground
  };
})();
