// WebCraft Educational Curriculum & Game Data (Clean & Professional)
const WebCraftData = {
  badges: [
    {
      id: 'first_code',
      name: 'First Code',
      icon: 'code',
      description: 'Wrote your very first line of code in WebCraft!',
      color: 'linear-gradient(135deg, #38BDF8, #2563EB)',
      unlockedMessage: 'Welcome to your coding journey!'
    },
    {
      id: 'html_hero',
      name: 'HTML Master',
      icon: 'layers',
      description: 'Mastered all 10 HTML modules and structural concepts!',
      color: 'linear-gradient(135deg, #F97316, #EF4444)',
      unlockedMessage: 'You are now an HTML Architect!'
    },
    {
      id: 'css_creator',
      name: 'CSS Designer',
      icon: 'palette',
      description: 'Mastered all 10 CSS modules, flexbox, grid, and colors!',
      color: 'linear-gradient(135deg, #38BDF8, #8B5CF6)',
      unlockedMessage: 'You can style anything with CSS!'
    },
    {
      id: 'js_explorer',
      name: 'JS Developer',
      icon: 'cpu',
      description: 'Mastered all 12 JavaScript modules and DOM interaction!',
      color: 'linear-gradient(135deg, #FACC15, #F59E0B)',
      unlockedMessage: 'You made the web come alive!'
    },
    {
      id: 'bug_hunter',
      name: 'Bug Hunter',
      icon: 'bug',
      description: 'Squashed 3 or more bugs in the Bug Hunter Arena!',
      color: 'linear-gradient(135deg, #EC4899, #8B5CF6)',
      unlockedMessage: 'No bug can escape your sharp eyes!'
    },
    {
      id: 'problem_solver',
      name: 'Problem Solver',
      icon: 'target',
      description: 'Solved 5 or more coding practice tasks!',
      color: 'linear-gradient(135deg, #22C55E, #10B981)',
      unlockedMessage: 'Your problem-solving skills are unstoppable!'
    },
    {
      id: 'quiz_master',
      name: 'Quiz Master',
      icon: 'trophy',
      description: 'Achieved a perfect score on any quiz!',
      color: 'linear-gradient(135deg, #F59E0B, #EC4899)',
      unlockedMessage: 'You know your web theory inside-out!'
    },
    {
      id: 'web_creator',
      name: 'Web Creator',
      icon: 'award',
      description: 'Completed the Final Project and built a full responsive website!',
      color: 'linear-gradient(135deg, #FACC15, #EC4899, #8B5CF6)',
      unlockedMessage: 'You are now a certified WebCraft Creator!'
    }
  ],

  // Structured Learning Tracks
  tracks: {
    html: {
      id: 'html',
      title: 'HTML Path',
      tagline: 'Build the Skeleton & Structure of the Web',
      color: '#F97316',
      icon: 'layers',
      lessons: [
        {
          id: 'html_1',
          number: 1,
          title: 'What is HTML?',
          xp: 50,
          childSummary: 'HTML gives your webpage its structure. Think of it like the skeleton of a human body or the bricks of a house!',
          devSummary: 'HTML stands for HyperText Markup Language. It uses tags to organize and structure content on the World Wide Web.',
          interactiveSnippet: `<h1>Welcome to WebCraft</h1>\n<p>HTML builds the skeleton of every website.</p>`,
          task: 'Change the text inside the <h1> tag to say "My Super Cool Website" and click Run!',
          targetValidation: code => code.toLowerCase().includes('my super cool website'),
          hint: 'Look for <h1>...</h1> and change the text inside.'
        },
        {
          id: 'html_2',
          number: 2,
          title: 'HTML Structure and Tags',
          xp: 50,
          childSummary: 'Every HTML document starts with a doctype and has a head (for metadata) and a body (where everything you see goes).',
          devSummary: '<!DOCTYPE html> declares HTML5, followed by <html>, <head> for metadata, and <body> for visible elements.',
          interactiveSnippet: `<!DOCTYPE html>\n<html>\n  <head><title>My Web</title></head>\n  <body>\n    <h2>Learning WebCraft</h2>\n    <p>Everything in the body shows up on screen.</p>\n  </body>\n</html>`,
          task: 'Add a new paragraph <p>I love building websites!</p> inside the <body> tag.',
          targetValidation: code => /<p[^>]*>.*love.*<\/p>/i.test(code),
          hint: 'Type <p>I love building websites!</p> right under the first paragraph.'
        },
        {
          id: 'html_3',
          number: 3,
          title: 'Headings and Paragraphs',
          xp: 50,
          childSummary: 'Headings go from <h1> (biggest headline) to <h6> (smallest sub-headline). <p> is for normal paragraph text.',
          devSummary: 'Heading elements <h1> through <h6> communicate document hierarchy to search engines and accessibility tools.',
          interactiveSnippet: `<h1>Main Title</h1>\n<h2>Section Heading</h2>\n<h3>Sub-heading</h3>\n<p>Paragraphs tell the full story with words!</p>`,
          task: 'Add an <h3> tag that says "Chapter One" and a paragraph below it.',
          targetValidation: code => /<h3[^>]*>.*chapter.*<\/h3>/i.test(code),
          hint: 'Use <h3>Chapter One</h3>'
        },
        {
          id: 'html_4',
          number: 4,
          title: 'Links and Navigation',
          xp: 50,
          childSummary: 'Links let you jump between pages or websites. The href attribute tells the browser where to take the user when they click.',
          devSummary: 'The anchor tag <a href="url"> creates hyperlinks. The href attribute specifies the destination URL.',
          interactiveSnippet: `<p>Check out our game portal:</p>\n<a href="https://example.com" style="color: #2563EB; font-weight: bold;">Click Here to Explore</a>`,
          task: 'Change the link text to "Play WebCraft Now" and make sure the <a> tag is closed properly.',
          targetValidation: code => /<a[^>]*>.*play webcraft.*<\/a>/i.test(code),
          hint: 'Edit the text between <a ...> and </a>.'
        },
        {
          id: 'html_5',
          number: 5,
          title: 'Images and Media',
          xp: 50,
          childSummary: 'Images bring websites to life! The src attribute tells where the image file is, and alt describes what is in the picture.',
          devSummary: '<img> is a self-closing void element. The src attribute is required, and alt is critical for accessibility and SEO.',
          interactiveSnippet: `<h2>My Tech Robot</h2>\n<img src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=300" alt="Friendly Robot" style="border-radius: 12px; width: 220px;" />\n<p>Images make webpages engaging!</p>`,
          task: 'Add alt="Modern Robot" to the <img> tag or change the width to "260px" style.',
          targetValidation: code => code.includes('alt=') || code.includes('260'),
          hint: 'Add alt="Modern Robot" inside the <img> tag.'
        },
        {
          id: 'html_6',
          number: 6,
          title: 'Lists and Bullet Points',
          xp: 50,
          childSummary: 'Lists help organize items! Use <ul> for bullet points and <ol> for numbered lists. Each item is wrapped in <li>.',
          devSummary: '<ul> represents unordered lists and <ol> represents ordered lists, each containing <li> items.',
          interactiveSnippet: `<h3>WebCraft Skills:</h3>\n<ul>\n  <li>Creating colorful buttons</li>\n  <li>Squashing tricky bugs</li>\n</ul>`,
          task: 'Add a 3rd bullet item: <li>Building games</li> to the list!',
          targetValidation: code => /<li[^>]*>.*building.*<\/li>/i.test(code),
          hint: 'Add <li>Building games</li> before </ul>.'
        },
        {
          id: 'html_7',
          number: 7,
          title: 'Tables and Data Grids',
          xp: 50,
          childSummary: 'Tables organize information into neat rows and columns like a spreadsheet or leaderboard.',
          devSummary: '<table> wraps table rows <tr>, table header cells <th>, and table data cells <td>.',
          interactiveSnippet: `<table style="width: 100%; border-collapse: collapse; font-family: sans-serif;">\n  <tr style="background: #38BDF8; color: white;">\n    <th style="padding: 8px;">Player</th>\n    <th style="padding: 8px;">Level</th>\n  </tr>\n  <tr style="background: #F1F5F9;">\n    <td style="padding: 8px; text-align: center;">Pixel Knight</td>\n    <td style="padding: 8px; text-align: center;">5</td>\n  </tr>\n</table>`,
          task: 'Add another row <tr> with your name and level 10!',
          targetValidation: code => (code.match(/<tr/gi) || []).length >= 3,
          hint: 'Add <tr><td>Your Name</td><td>10</td></tr> inside the table.'
        },
        {
          id: 'html_8',
          number: 8,
          title: 'Forms and Inputs',
          xp: 50,
          childSummary: 'Forms let users type their names, send messages, or click buttons. They make websites interactive.',
          devSummary: '<form> collects user input via <input>, <textarea>, <select>, and submits using <button type="submit">.',
          interactiveSnippet: `<div style="background: #F8FBFF; padding: 15px; border-radius: 12px; border: 2px dashed #38BDF8;">\n  <h3>Join the Code Club</h3>\n  <input type="text" placeholder="Enter your hero name..." style="padding: 8px; border-radius: 6px; border: 1px solid #CBD5E1;" />\n  <button style="background: #2563EB; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer;">Join Now</button>\n</div>`,
          task: 'Add placeholder="Your Gamer Tag" to the input element.',
          targetValidation: code => /placeholder=["'].*gamer.*["']/i.test(code),
          hint: 'Change placeholder="..." to placeholder="Your Gamer Tag".'
        },
        {
          id: 'html_9',
          number: 9,
          title: 'Semantic Webpage Tags',
          xp: 50,
          childSummary: 'Semantic tags have special meaningful names that tell the browser what each part of the webpage is: header, nav, main, footer.',
          devSummary: 'Semantic tags like <header>, <nav>, <section>, <article>, and <footer> enhance document accessibility and SEO.',
          interactiveSnippet: `<header style="background: #2563EB; color: white; padding: 10px; border-radius: 8px;">\n  <h2>WebCraft Academy</h2>\n</header>\n<main style="padding: 10px;">\n  <p>Learn semantic tags for clean code!</p>\n</main>\n<footer style="background: #1E293B; color: #94A3B8; padding: 8px; font-size: 12px; border-radius: 8px;">\n  © 2026 WebCraft\n</footer>`,
          task: 'Add a <nav> tag inside the <header> with the text "Home | Learn".',
          targetValidation: code => /<nav[^>]*>.*<\/nav>/i.test(code),
          hint: 'Put <nav>Home | Learn</nav> inside the <header> tag.'
        },
        {
          id: 'html_10',
          number: 10,
          title: 'HTML Mini Webpage Project',
          xp: 50,
          childSummary: 'Combine headings, paragraphs, images, links, and lists into your first mini webpage.',
          devSummary: 'Bringing structural elements together into a cohesive, accessible HTML document.',
          interactiveSnippet: `<h1>Space Explorer Log</h1>\n<p>Mission Day 42: We found a planet made of pure code!</p>\n<img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300" alt="Galaxy" style="width: 220px; border-radius: 12px;" />\n<h3>Crew Members:</h3>\n<ul>\n  <li>Captain Pixel</li>\n  <li>Navigator CSS</li>\n</ul>`,
          task: 'Add a link <a href="#">Launch Rocket</a> at the bottom of the page!',
          targetValidation: code => /<a[^>]*>.*launch.*<\/a>/i.test(code),
          hint: 'Add <a href="#">Launch Rocket</a> right after the list.'
        }
      ]
    },

    css: {
      id: 'css',
      title: 'CSS Path',
      tagline: 'Design, Style & Paint Beautiful Websites',
      color: '#38BDF8',
      icon: 'palette',
      lessons: [
        {
          id: 'css_1',
          number: 1,
          title: 'What is CSS and Selectors',
          xp: 50,
          childSummary: 'CSS is like the paint, clothes, and styling for your website skeleton! It makes things look awesome and colorful.',
          devSummary: 'CSS (Cascading Style Sheets) targets HTML elements using selectors (tag, .class, #id) and applies styling rules.',
          interactiveSnippet: `<style>\nh1 {\n  color: #2563EB;\n  text-align: center;\n}\np {\n  color: #64748B;\n  font-size: 16px;\n}\n</style>\n<h1>Styled With CSS</h1>\n<p>CSS gives every HTML tag its personality.</p>`,
          task: 'Change the h1 color to #EC4899 (Pink) or #8B5CF6 (Purple)!',
          targetValidation: code => code.includes('#EC4899') || code.includes('#8B5CF6') || code.toLowerCase().includes('pink') || code.toLowerCase().includes('purple'),
          hint: 'Change color: #2563EB; to color: #EC4899;'
        },
        {
          id: 'css_2',
          number: 2,
          title: 'Classes and IDs',
          xp: 50,
          childSummary: 'Classes (.card) let you style many elements the same way. IDs (#special) style one unique element.',
          devSummary: 'Class selectors (.name) can be reused. ID selectors (#name) must be unique per document.',
          interactiveSnippet: `<style>\n.btn {\n  background: #2563EB;\n  color: white;\n  padding: 10px 18px;\n  border-radius: 8px;\n  display: inline-block;\n  text-decoration: none;\n}\n.glow {\n  box-shadow: 0 4px 14px rgba(37, 99, 235, 0.4);\n}\n</style>\n<a href="#" class="btn glow">Awesome Button</a>`,
          task: 'Add a new class .magic { background: #22C55E; } and apply class="btn magic" to the button!',
          targetValidation: code => code.includes('.magic') || code.includes('22C55E') || code.includes('green'),
          hint: 'Add .magic { background: #22C55E; } in the <style> block.'
        },
        {
          id: 'css_3',
          number: 3,
          title: 'Colors and Gradients',
          xp: 50,
          childSummary: 'Use hex codes like #2563EB or make multi-color gradients with linear-gradient.',
          devSummary: 'Color properties accept HEX, RGB, HSL, and background: linear-gradient(angle, color1, color2).',
          interactiveSnippet: `<style>\n.rainbow-box {\n  background: linear-gradient(135deg, #38BDF8, #8B5CF6);\n  color: white;\n  padding: 24px;\n  border-radius: 16px;\n  text-align: center;\n  font-weight: bold;\n}\n</style>\n<div class="rainbow-box">\n  Gradient Magic in CSS\n</div>`,
          task: 'Change the gradient colors to #FACC15 (Yellow) and #F97316 (Orange)!',
          targetValidation: code => code.includes('#FACC15') || code.includes('#F97316') || code.toLowerCase().includes('orange'),
          hint: 'Replace #38BDF8 with #FACC15 and #8B5CF6 with #F97316.'
        },
        {
          id: 'css_4',
          number: 4,
          title: 'Typography and Fonts',
          xp: 50,
          childSummary: 'Typography controls fonts, font-size, font-weight (boldness), and spacing for clean readability.',
          devSummary: 'CSS font properties control font-family, font-size, font-weight, letter-spacing, and line-height.',
          interactiveSnippet: `<style>\n.hero-text {\n  font-family: sans-serif;\n  font-size: 24px;\n  font-weight: 800;\n  color: #172554;\n  letter-spacing: 1px;\n}\n</style>\n<p class="hero-text">Typography makes words powerful!</p>`,
          task: 'Change font-size to 32px and font-weight to 900!',
          targetValidation: code => code.includes('32px') || code.includes('900'),
          hint: 'Update font-size: 32px; in the CSS.'
        },
        {
          id: 'css_5',
          number: 5,
          title: 'The CSS Box Model',
          xp: 50,
          childSummary: 'Every element is a box. Content is inside, Padding is inner cushion, Border is the wall, and Margin is outer space.',
          devSummary: 'The Box Model comprises Content -> Padding -> Border -> Margin.',
          interactiveSnippet: `<style>\n.box-model-demo {\n  margin: 15px;\n  border: 3px dashed #8B5CF6;\n  padding: 20px;\n  background: #F3E8FF;\n  border-radius: 12px;\n  text-align: center;\n}\n</style>\n<div class="box-model-demo">\n  I am a comfortable box with padding and border!\n</div>`,
          task: 'Increase the padding to 30px and change border to 4px solid #22C55E.',
          targetValidation: code => code.includes('30px') || code.includes('#22C55E') || code.includes('green'),
          hint: 'Change padding: 20px; to padding: 30px; and update the border.'
        },
        {
          id: 'css_6',
          number: 6,
          title: 'Rounded Borders and Shadows',
          xp: 50,
          childSummary: 'Use border-radius to round corners and box-shadow to make cards float smoothly on screen.',
          devSummary: 'border-radius rounds corners. box-shadow adds elevation and depth.',
          interactiveSnippet: `<style>\n.floating-card {\n  background: #FFFFFF;\n  border-radius: 20px;\n  padding: 20px;\n  box-shadow: 0 12px 30px rgba(37, 99, 235, 0.15);\n  border: 1px solid #E2E8F0;\n  text-align: center;\n}\n</style>\n<div class="floating-card">\n  <h3>Modern Card Design</h3>\n  <p>Rounded edges feel clean and professional.</p>\n</div>`,
          task: 'Set border-radius to 28px for smoother corners!',
          targetValidation: code => code.includes('28px'),
          hint: 'Change border-radius: 20px; to border-radius: 28px;.'
        },
        {
          id: 'css_7',
          number: 7,
          title: 'Flexbox Fundamentals',
          xp: 50,
          childSummary: 'Flexbox helps you place items side-by-side in rows or stack them cleanly in columns.',
          devSummary: 'display: flex turns a container into a flexible box. flex-direction controls direction and gap controls spacing.',
          interactiveSnippet: `<style>\n.flex-row {\n  display: flex;\n  gap: 12px;\n}\n.badge {\n  flex: 1;\n  background: #38BDF8;\n  color: white;\n  padding: 14px;\n  text-align: center;\n  border-radius: 10px;\n  font-weight: bold;\n}\n</style>\n<div class="flex-row">\n  <div class="badge">Item 1</div>\n  <div class="badge">Item 2</div>\n  <div class="badge">Item 3</div>\n</div>`,
          task: 'Add a 4th badge <div class="badge">Item 4</div> inside the flex container!',
          targetValidation: code => (code.match(/<div class=["']badge["']/gi) || []).length >= 4,
          hint: 'Add <div class="badge">Item 4</div> before the closing </div>.'
        },
        {
          id: 'css_8',
          number: 8,
          title: 'Flexbox Alignment and Centering',
          xp: 50,
          childSummary: 'justify-content centers items horizontally. align-items centers items vertically.',
          devSummary: 'justify-content aligns along the main axis. align-items aligns along the cross axis.',
          interactiveSnippet: `<style>\n.center-stage {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  background: #F1F5F9;\n  padding: 16px;\n  border-radius: 12px;\n}\n.tag {\n  background: #8B5CF6;\n  color: white;\n  padding: 8px 14px;\n  border-radius: 6px;\n}\n</style>\n<div class="center-stage">\n  <span class="tag">Left Tag</span>\n  <span class="tag">Right Tag</span>\n</div>`,
          task: 'Change justify-content to center to group the tags in the middle!',
          targetValidation: code => code.includes('justify-content: center'),
          hint: 'Replace justify-content: space-between; with justify-content: center;.'
        },
        {
          id: 'css_9',
          number: 9,
          title: 'CSS Grid Layouts',
          xp: 50,
          childSummary: 'CSS Grid creates 2D layouts like photo galleries, dashboards, and card grids with rows and columns.',
          devSummary: 'display: grid creates grid containers with rows and columns.',
          interactiveSnippet: `<style>\n.card-grid {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 10px;\n}\n.card-item {\n  background: #EFF6FF;\n  border: 2px solid #2563EB;\n  padding: 14px;\n  border-radius: 10px;\n  text-align: center;\n  font-weight: bold;\n}\n</style>\n<div class="card-grid">\n  <div class="card-item">Card 1</div>\n  <div class="card-item">Card 2</div>\n  <div class="card-item">Card 3</div>\n  <div class="card-item">Card 4</div>\n</div>`,
          task: 'Change grid-template-columns to repeat(3, 1fr) for a 3-column layout!',
          targetValidation: code => code.includes('repeat(3, 1fr)') || code.includes('1fr 1fr 1fr'),
          hint: 'Change repeat(2, 1fr) to repeat(3, 1fr).'
        },
        {
          id: 'css_10',
          number: 10,
          title: 'Responsive Design and Media Queries',
          xp: 50,
          childSummary: 'Media queries check screen sizes so your website looks great on desktop, tablet, and mobile screens.',
          devSummary: '@media (max-width: 768px) modifies layout rules dynamically for smaller viewports.',
          interactiveSnippet: `<style>\n.responsive-banner {\n  background: #2563EB;\n  color: white;\n  padding: 20px;\n  border-radius: 12px;\n  font-size: 20px;\n  text-align: center;\n}\n@media (max-width: 600px) {\n  .responsive-banner {\n    background: #EC4899;\n    font-size: 16px;\n  }\n}\n</style>\n<div class="responsive-banner">\n  Responsive on any screen size\n</div>`,
          task: 'Change the mobile background in the media query to #22C55E (Green)!',
          targetValidation: code => code.includes('#22C55E') || code.includes('green'),
          hint: 'Change background: #EC4899; inside the @media rule to #22C55E.'
        }
      ]
    },

    js: {
      id: 'js',
      title: 'JavaScript Path',
      tagline: 'Make Websites Interactive, Alive & Smart',
      color: '#FACC15',
      icon: 'cpu',
      lessons: [
        {
          id: 'js_1',
          number: 1,
          title: 'What is JavaScript and The Console',
          xp: 50,
          childSummary: 'JavaScript is the brain of your website! It makes buttons click, games run, and pages calculate.',
          devSummary: 'JavaScript is an ECMAScript-compliant dynamic scripting language used for client-side web application behavior.',
          interactiveSnippet: `<button id="greetBtn" style="background: #2563EB; color: white; padding: 10px 18px; border: none; border-radius: 8px; cursor: pointer;">Click Me to Run JS</button>\n<p id="msg" style="margin-top: 10px; font-weight: bold;"></p>\n<script>\ndocument.getElementById('greetBtn').onclick = function() {\n  document.getElementById('msg').innerText = 'JavaScript is Active!';\n};\n</script>`,
          task: 'Change the message inside innerText to "Mission Launched!" and click the button!',
          targetValidation: code => code.toLowerCase().includes('mission launched'),
          hint: 'Change innerText = \'JavaScript is Active!\' to \'Mission Launched!\'.'
        },
        {
          id: 'js_2',
          number: 2,
          title: 'Variables (let and const)',
          xp: 50,
          childSummary: 'Variables are labeled storage boxes where you keep player names, scores, and numbers for later use.',
          devSummary: 'Use const for immutable references and let for reassignable variables.',
          interactiveSnippet: `<div id="stats" style="background: #EFF6FF; padding: 15px; border-radius: 10px; font-family: sans-serif;">\n  <h3>Player Stats</h3>\n  <p id="info">Loading stats...</p>\n</div>\n<script>\nconst heroName = "CodeWizard";\nlet currentScore = 500;\ndocument.getElementById('info').innerHTML = 'Hero: <b>' + heroName + '</b> | Score: <b>' + currentScore + ' XP</b>';\n</script>`,
          task: 'Change currentScore to 1200 or heroName to your name!',
          targetValidation: code => code.includes('1200') || !code.includes('CodeWizard'),
          hint: 'Change let currentScore = 500; to 1200.'
        },
        {
          id: 'js_3',
          number: 3,
          title: 'Data Types (Strings, Numbers, Booleans)',
          xp: 50,
          childSummary: 'Strings are words inside quotes, Numbers are mathematical digits, and Booleans are true/false switches.',
          devSummary: 'Primitive data types include string, number, boolean, null, undefined, and symbol.',
          interactiveSnippet: `<div id="output" style="padding: 15px; background: #F8FBFF; border: 2px solid #38BDF8; border-radius: 10px;"></div>\n<script>\nconst hero = "CyberNinja";\nconst speed = 88;\nconst isReady = true;\ndocument.getElementById('output').innerText = 'Hero: ' + hero + ' (' + typeof hero + '), Speed: ' + speed + ' (' + typeof speed + '), Ready: ' + isReady;\n</script>`,
          task: 'Add a new boolean const isMaster = true; and display it!',
          targetValidation: code => code.includes('isMaster'),
          hint: 'Add const isMaster = true; in the script.'
        },
        {
          id: 'js_4',
          number: 4,
          title: 'Operators and Math',
          xp: 50,
          childSummary: 'JavaScript can do lightning-fast math: add points (+), take away score (-), and multiply values (*).',
          devSummary: 'Arithmetic operators include +, -, *, /, and % (remainder).',
          interactiveSnippet: `<div style="padding: 15px; background: #FFFBEB; border-radius: 10px;">\n  <h3>Points Vault</h3>\n  <p id="goldDisplay">Calculating score...</p>\n</div>\n<script>\nlet points = 25;\nlet multiplier = 4;\nlet totalPoints = points * multiplier;\ndocument.getElementById('goldDisplay').innerText = 'Total Points: ' + totalPoints + ' XP';\n</script>`,
          task: 'Change multiplier to 10 so you get 250 Total Points!',
          targetValidation: code => code.includes('multiplier = 10') || code.includes('multiplier=10'),
          hint: 'Change let multiplier = 4; to 10.'
        },
        {
          id: 'js_5',
          number: 5,
          title: 'Conditionals (if and else)',
          xp: 50,
          childSummary: 'Conditionals let your code make smart decisions: "If score is high, pass! Otherwise, try again."',
          devSummary: 'Conditional branches evaluate boolean expressions with if, else if, and else blocks.',
          interactiveSnippet: `<div id="resultBox" style="padding: 15px; border-radius: 10px; color: white; background: #2563EB;">\n  <h3>Status Checker</h3>\n  <p id="gradeMsg">Checking...</p>\n</div>\n<script>\nlet score = 95;\nif (score >= 90) {\n  document.getElementById('gradeMsg').innerText = 'Top Rank Achieved!';\n} else {\n  document.getElementById('gradeMsg').innerText = 'Good effort!';\n}\n</script>`,
          task: 'Add an else if (score >= 80) condition with a Silver status message!',
          targetValidation: code => code.includes('else if') || code.includes('80'),
          hint: 'Add else if (score >= 80) { document.getElementById("gradeMsg").innerText = "Silver Rank"; }'
        },
        {
          id: 'js_6',
          number: 6,
          title: 'Functions (Reusable Code Blocks)',
          xp: 50,
          childSummary: 'A function is a reusable block of code you write once, and then you can call it whenever needed.',
          devSummary: 'Functions encapsulate reusable code blocks with parameters and return values.',
          interactiveSnippet: `<button id="calcBtn" style="background: #8B5CF6; color: white; padding: 10px 18px; border: none; border-radius: 8px; cursor: pointer;">Calculate Level</button>\n<p id="spellResult" style="margin-top: 10px; font-weight: bold;"></p>\n<script>\nfunction levelUpHero(name, level) {\n  return name + ' is now Level ' + (level + 1) + '!';\n}\ndocument.getElementById('calcBtn').onclick = function() {\n  document.getElementById('spellResult').innerText = levelUpHero('PixelKnight', 9);\n};\n</script>`,
          task: 'Change the hero name inside the function call to your own nickname!',
          targetValidation: code => !code.includes("'PixelKnight', 9") || code.includes('levelUpHero'),
          hint: 'Change "PixelKnight" to something else.'
        },
        {
          id: 'js_7',
          number: 7,
          title: 'Arrays (Ordered Lists)',
          xp: 50,
          childSummary: 'An array holds an ordered list of items: ["HTML", "CSS", "JavaScript"].',
          devSummary: 'Arrays store indexed collections of values accessed via bracket notation array[0].',
          interactiveSnippet: `<div id="inventoryDisplay" style="padding: 15px; background: #ECFDF5; border-radius: 10px; border: 2px solid #22C55E;">\n  <h3>Inventory</h3>\n  <ul id="itemList"></ul>\n</div>\n<script>\nconst bag = ["Laser Sword", "Energy Shield", "Cyber Compass"];\nconst list = document.getElementById('itemList');\nbag.forEach(item => {\n  const li = document.createElement('li');\n  li.innerText = item;\n  list.appendChild(li);\n});\n</script>`,
          task: 'Add "Quantum Jetpack" into the bag array!',
          targetValidation: code => code.includes('Quantum Jetpack') || code.includes('Jetpack') || code.includes('jetpack'),
          hint: 'Add "Quantum Jetpack" to the bag array.'
        },
        {
          id: 'js_8',
          number: 8,
          title: 'Loops (for and while)',
          xp: 50,
          childSummary: 'Loops repeat actions automatically without typing the same code repeatedly.',
          devSummary: 'Loops iterate over sequences or repeat until a condition evaluates to false.',
          interactiveSnippet: `<div id="starsBox" style="font-size: 20px; padding: 15px; background: #172554; border-radius: 10px; color: #FACC15;"></div>\n<script>\nlet stars = "";\nfor (let i = 1; i <= 8; i++) {\n  stars += " *";\n}\ndocument.getElementById('starsBox').innerText = stars;\n</script>`,
          task: 'Change the loop limit from 8 to 15 to spawn 15 stars!',
          targetValidation: code => code.includes('15') || code.includes('i <= 15'),
          hint: 'Change i <= 8 to i <= 15.'
        },
        {
          id: 'js_9',
          number: 9,
          title: 'DOM Manipulation',
          xp: 50,
          childSummary: 'The DOM is how JavaScript communicates with HTML to change text, colors, and layout dynamically.',
          devSummary: 'The Document Object Model (DOM) represents the page tree. document.querySelector allows selecting elements via CSS selectors.',
          interactiveSnippet: `<h2 id="targetText" style="color: #64748B;">Standard text.</h2>\n<button id="magicBtn" style="background: #EC4899; color: white; padding: 8px 16px; border: none; border-radius: 6px; cursor: pointer;">Change Style with DOM</button>\n<script>\ndocument.getElementById('magicBtn').onclick = function() {\n  const el = document.getElementById('targetText');\n  el.innerText = 'Updated by JavaScript DOM!';\n  el.style.color = '#8B5CF6';\n  el.style.fontSize = '26px';\n};\n</script>`,
          task: 'Add el.style.backgroundColor = "#EFF6FF" inside the click function!',
          targetValidation: code => code.includes('backgroundColor') || code.includes('background'),
          hint: 'Add el.style.backgroundColor = "#EFF6FF"; under fontSize.'
        },
        {
          id: 'js_10',
          number: 10,
          title: 'Events and Event Listeners',
          xp: 50,
          childSummary: 'Events are actions that happen on the webpage: a mouse click, typing in an input, or hovering.',
          devSummary: 'addEventListener attaches event handlers for events like "click", "input", "keydown" without overwriting existing handlers.',
          interactiveSnippet: `<div id="card" style="padding: 20px; background: #F8FBFF; border: 2px solid #CBD5E1; border-radius: 12px; text-align: center;">\n  <button id="counterBtn" style="background: #2563EB; color: white; padding: 10px 20px; border: none; border-radius: 8px; font-size: 16px; cursor: pointer;">Clicks: 0</button>\n</div>\n<script>\nlet count = 0;\nconst btn = document.getElementById('counterBtn');\nbtn.addEventListener('click', () => {\n  count++;\n  btn.innerText = 'Clicks: ' + count;\n});\n</script>`,
          task: 'Make the button turn green by adding btn.style.background = "#22C55E" after clicking!',
          targetValidation: code => code.includes('#22C55E') || code.includes('green'),
          hint: 'Add btn.style.background = "#22C55E"; inside the event listener.'
        },
        {
          id: 'js_11',
          number: 11,
          title: 'Form Validation with JavaScript',
          xp: 50,
          childSummary: 'Form validation ensures visitors enter valid input before submitting a form.',
          devSummary: 'Prevent form submission with event.preventDefault(), read input.value, and validate states.',
          interactiveSnippet: `<form id="heroForm" style="background: #F1F5F9; padding: 15px; border-radius: 10px;">\n  <label>Hero Secret Code (min 4 chars):</label><br>\n  <input id="secretInput" type="text" placeholder="e.g. 1234" style="padding: 8px; margin: 8px 0; border-radius: 6px; border: 1px solid #CBD5E1;" /><br>\n  <button type="submit" style="background: #2563EB; color: white; padding: 8px 16px; border: none; border-radius: 6px; cursor: pointer;">Submit Code</button>\n  <p id="formStatus" style="font-weight: bold; margin-top: 8px;"></p>\n</form>\n<script>\ndocument.getElementById('heroForm').addEventListener('submit', (e) => {\n  e.preventDefault();\n  const val = document.getElementById('secretInput').value;\n  const status = document.getElementById('formStatus');\n  if (val.length < 4) {\n    status.innerText = 'Code must be at least 4 characters!';\n    status.style.color = '#EF4444';\n  } else {\n    status.innerText = 'Code Accepted!';\n    status.style.color = '#22C55E';\n  }\n});\n</script>`,
          task: 'Change the min length check to 5 characters (val.length < 5)!',
          targetValidation: code => code.includes('val.length < 5') || code.includes('val.length<5'),
          hint: 'Change val.length < 4 to val.length < 5.'
        },
        {
          id: 'js_12',
          number: 12,
          title: 'Interactive Web App Capstone',
          xp: 50,
          childSummary: 'Bring together functions, event listeners, variables, and DOM manipulation to create an interactive web app.',
          devSummary: 'Encapsulating state variables, event handlers, and DOM mutations.',
          interactiveSnippet: `<div id="toyApp" style="background: #EFF6FF; padding: 20px; border-radius: 14px; text-align: center;">\n  <h3 id="appMood">Status: Idle</h3>\n  <button id="wakeBtn" style="background: #F59E0B; color: white; padding: 10px 18px; border: none; border-radius: 8px; font-weight: bold; cursor: pointer;">Activate</button>\n</div>\n<script>\nconst mood = document.getElementById('appMood');\nconst wakeBtn = document.getElementById('wakeBtn');\nwakeBtn.addEventListener('click', () => {\n  mood.innerText = 'Status: Active and Running!';\n  document.getElementById('toyApp').style.background = '#FEF08A';\n});\n</script>`,
          task: 'Add an alert("Mission Complete!") inside the wakeBtn click listener!',
          targetValidation: code => code.includes('alert('),
          hint: 'Add alert("Mission Complete!"); inside the click callback.'
        }
      ]
    }
  },

  // Practice Tasks (clean)
  practiceTasks: [
    {
      id: 1,
      title: 'Heading Master',
      track: 'HTML',
      xp: 100,
      instructions: 'Create an <h1> tag saying "My First Website".',
      starterCode: '<!-- Write your h1 tag below -->\n',
      hints: [
        'Which HTML tag is used for the largest headline?',
        'It starts with the letter H and has the number 1.',
        'Type: <h1>My First Website</h1>'
      ],
      validator: code => /<h1[^>]*>\s*My First Website\s*<\/h1>/i.test(code)
    },
    {
      id: 2,
      title: 'Paragraph Power',
      track: 'HTML',
      xp: 100,
      instructions: 'Create a paragraph <p> with the text: "I love coding games!"',
      starterCode: '<h1>WebCraft</h1>\n<!-- Add your paragraph here -->\n',
      hints: [
        'The paragraph tag is <p>.',
        'Remember to close your tag with </p>.',
        'Type: <p>I love coding games!</p>'
      ],
      validator: code => /<p[^>]*>\s*I love coding games!?\s*<\/p>/i.test(code)
    },
    {
      id: 3,
      title: 'Hyperlink Creation',
      track: 'HTML',
      xp: 100,
      instructions: 'Create an <a> tag linking to "https://webcraft.dev" with link text "Explore WebCraft".',
      starterCode: '<!-- Create your anchor link below -->\n',
      hints: [
        'Use the <a> tag with an href attribute.',
        'Syntax: <a href="URL">Link Text</a>',
        'Type: <a href="https://webcraft.dev">Explore WebCraft</a>'
      ],
      validator: code => /<a\s+[^>]*href=["']https:\/\/webcraft\.dev["'][^>]*>\s*Explore WebCraft\s*<\/a>/i.test(code)
    },
    {
      id: 4,
      title: 'Picture Integration',
      track: 'HTML',
      xp: 100,
      instructions: 'Add an <img> tag with src="robot.png" and alt="Friendly Robot".',
      starterCode: '<!-- Add your image tag below -->\n',
      hints: [
        'Images use the <img> tag.',
        'Include both src="..." and alt="..." attributes.',
        'Type: <img src="robot.png" alt="Friendly Robot" />'
      ],
      validator: code => /<img\s+[^>]*src=["']robot\.png["'][^>]*alt=["']Friendly Robot["'][^>]*\/?>|<img\s+[^>]*alt=["']Friendly Robot["'][^>]*src=["']robot\.png["'][^>]*\/?>/i.test(code)
    },
    {
      id: 5,
      title: 'Color Styling',
      track: 'CSS',
      xp: 100,
      instructions: 'In CSS, style all <h1> elements with color: blue; (or #2563EB) and text-align: center;',
      starterCode: '<style>\n/* Style the h1 below */\n\n</style>\n<h1>Colorful Title</h1>',
      hints: [
        'Target the h1 selector: h1 { ... }',
        'Inside the curly brackets, set color and text-align.',
        'Write: h1 { color: blue; text-align: center; }'
      ],
      validator: code => /h1\s*\{[^}]*color\s*:\s*(blue|#2563eb)[^}]*text-align\s*:\s*center[^}]*\}/i.test(code) ||
                         /h1\s*\{[^}]*text-align\s*:\s*center[^}]*color\s*:\s*(blue|#2563eb)[^}]*\}/i.test(code)
    },
    {
      id: 6,
      title: 'Rounded Card Badge',
      track: 'CSS',
      xp: 100,
      instructions: 'Create a CSS class .badge with background-color: purple; and border-radius: 12px;',
      starterCode: '<style>\n/* Write .badge CSS below */\n\n</style>\n<div class="badge">Badge</div>',
      hints: [
        'Class selectors begin with a dot: .badge { }',
        'Use background-color (or background) and border-radius.',
        'Write: .badge { background-color: purple; border-radius: 12px; }'
      ],
      validator: code => /\.badge\s*\{[^}]*background(-color)?\s*:\s*(purple|#8b5cf6)[^}]*border-radius\s*:\s*12px[^}]*\}/i.test(code) ||
                         /\.badge\s*\{[^}]*border-radius\s*:\s*12px[^}]*background(-color)?\s*:\s*(purple|#8b5cf6)[^}]*\}/i.test(code)
    },
    {
      id: 7,
      title: 'Flex Row Alignment',
      track: 'CSS',
      xp: 100,
      instructions: 'Make the .row container use display: flex; with justify-content: space-between;',
      starterCode: '<style>\n.row {\n  /* Add flexbox rules here */\n}\n</style>\n<div class="row"><span>Left</span><span>Right</span></div>',
      hints: [
        'Add display: flex; inside .row',
        'Add justify-content: space-between;',
        'Write both lines inside .row { }'
      ],
      validator: code => /\.row\s*\{[^}]*display\s*:\s*flex[^}]*justify-content\s*:\s*space-between[^}]*\}/i.test(code) ||
                         /\.row\s*\{[^}]*justify-content\s*:\s*space-between[^}]*display\s*:\s*flex[^}]*\}/i.test(code)
    },
    {
      id: 8,
      title: 'Variable Declaration',
      track: 'JS',
      xp: 100,
      instructions: 'Declare a variable const hero = "WebCraft"; and let level = 5;',
      starterCode: '<script>\n// Declare hero and level below\n\n</script>',
      hints: [
        'Use const for hero and let for level.',
        'hero should have the string "WebCraft".',
        'Write: const hero = "WebCraft"; let level = 5;'
      ],
      validator: code => /const\s+hero\s*=\s*["']WebCraft["'];?/i.test(code) && /let\s+level\s*=\s*5;?/i.test(code)
    },
    {
      id: 9,
      title: 'Click Alert Function',
      track: 'JS',
      xp: 100,
      instructions: 'Select the button with id="magicBtn" and add a click event listener that calls alert("Spell Cast!");',
      starterCode: '<button id="magicBtn">Cast Spell</button>\n<script>\n// Add event listener below\n\n</script>',
      hints: [
        'Use document.getElementById("magicBtn")',
        'Attach .addEventListener("click", () => { alert("Spell Cast!"); });',
        'Make sure the alert message is exactly "Spell Cast!"'
      ],
      validator: code => /getElementById\(["']magicBtn["']\)\.addEventListener\(["']click["'],\s*(function\s*\(\)|=>)\s*\{[^}]*alert\(["']Spell Cast!["']\)/i.test(code) ||
                         /magicBtn.*\.onclick\s*=\s*function|=>.*alert\(["']Spell Cast!["']\)/i.test(code)
    },
    {
      id: 10,
      title: 'DOM Text Changer',
      track: 'JS',
      xp: 100,
      instructions: 'Change the text of the element with id="title" to "Victory!" using .innerText or .textContent.',
      starterCode: '<h1 id="title">Loading...</h1>\n<script>\n// Change heading text below\n\n</script>',
      hints: [
        'Select document.getElementById("title")',
        'Set .innerText = "Victory!" or .textContent = "Victory!"',
        'Write: document.getElementById("title").innerText = "Victory!";'
      ],
      validator: code => /document\.getElementById\(["']title["']\)\.(innerText|textContent)\s*=\s*["']Victory!["']/i.test(code)
    }
  ],

  // Bug Hunter Challenges (clean)
  bugHunterLevels: [
    {
      id: 1,
      level: 1,
      title: 'Level 1: The Broken Tag',
      category: 'HTML Syntax',
      difficulty: 'Easy',
      xp: 200,
      story: 'A bug chewed the closing bracket of this heading tag. Fix it so the heading displays properly.',
      brokenCode: '<h1>Welcome to WebCraft</h1\n<p>Everything should be closed!</p>',
      expectedFix: '<h1>Welcome to WebCraft</h1>\n<p>Everything should be closed!</p>',
      validator: code => /<h1>Welcome to WebCraft<\/h1>/i.test(code) && !code.includes('</h1\n'),
      hint: 'The closing tag is missing the right bracket > at the end of </h1>'
    },
    {
      id: 2,
      level: 2,
      title: 'Level 2: Misspelled CSS Property',
      category: 'CSS Property',
      difficulty: 'Easy',
      xp: 200,
      story: 'CSS only understands standard US spelling for colors. Find the bug in the background property.',
      brokenCode: '<style>\n.box {\n  background-colour: #2563EB;\n  color: white;\n  padding: 15px;\n}\n</style>\n<div class="box">Blue Box</div>',
      expectedFix: '<style>\n.box {\n  background-color: #2563EB;\n  color: white;\n  padding: 15px;\n}\n</style>\n<div class="box">Blue Box</div>',
      validator: code => code.includes('background-color:') || (code.includes('background:') && !code.includes('background-colour:')),
      hint: 'Change "background-colour" to "background-color" (no "u") or simply "background".'
    },
    {
      id: 3,
      level: 3,
      title: 'Level 3: The Missing Attribute Quote',
      category: 'HTML Attributes',
      difficulty: 'Medium',
      xp: 200,
      story: 'The image source attribute was left unquoted and broken. Fix the quotes around the URL.',
      brokenCode: '<img src=https://images.unsplash.com/photo-1579546929518-9e396f3cc809 alt="Gradient" width="200" />',
      expectedFix: '<img src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809" alt="Gradient" width="200" />',
      validator: code => /src=["']https:\/\/images\.unsplash\.com\/photo-1579546929518-9e396f3cc809["']/i.test(code),
      hint: 'Surround the src link with double quotes: src="https://..."'
    },
    {
      id: 4,
      level: 4,
      title: 'Level 4: JavaScript Variable Typos',
      category: 'JavaScript Syntax',
      difficulty: 'Medium',
      xp: 200,
      story: 'JavaScript is case-sensitive. Look at the variable name declared vs the variable name being referenced.',
      brokenCode: '<p id="scoreText"></p>\n<script>\nlet totalScore = 100;\ndocument.getElementById("scoreText").innerText = TotalScore;\n</script>',
      expectedFix: '<p id="scoreText"></p>\n<script>\nlet totalScore = 100;\ndocument.getElementById("scoreText").innerText = totalScore;\n</script>',
      validator: code => code.includes('totalScore;') || code.includes('.innerText = totalScore'),
      hint: 'TotalScore has a capital T, but it was declared with a lowercase t (totalScore).'
    },
    {
      id: 5,
      level: 5,
      title: 'Level 5: Unclosed String Literal',
      category: 'JavaScript Syntax',
      difficulty: 'Medium',
      xp: 200,
      story: 'The string literal has an open quote that never closed. Fix the string.',
      brokenCode: '<script>\nconst greeting = "Hello WebCraft Adventurers!;\nconsole.log(greeting);\n</script>',
      expectedFix: '<script>\nconst greeting = "Hello WebCraft Adventurers!";\nconsole.log(greeting);\n</script>',
      validator: code => /const\s+greeting\s*=\s*["']Hello WebCraft Adventurers!["'];?/i.test(code),
      hint: 'Add the closing quote before the semicolon: "Hello WebCraft Adventurers!";'
    },
    {
      id: 6,
      level: 6,
      title: 'Level 6: Flexbox Property Bug',
      category: 'CSS Layout',
      difficulty: 'Medium',
      xp: 200,
      story: 'The developer typed "displey: flex" and "justify: center". Fix both properties.',
      brokenCode: '<style>\n.nav-bar {\n  displey: flex;\n  justify: center;\n  gap: 15px;\n}\n</style>\n<div class="nav-bar"><span>Home</span><span>About</span></div>',
      expectedFix: '<style>\n.nav-bar {\n  display: flex;\n  justify-content: center;\n  gap: 15px;\n}\n</style>\n<div class="nav-bar"><span>Home</span><span>About</span></div>',
      validator: code => code.includes('display: flex') && code.includes('justify-content: center'),
      hint: 'Change "displey" to "display" and "justify: center" to "justify-content: center".'
    },
    {
      id: 7,
      level: 7,
      title: 'Level 7: DOM ID Mismatch',
      category: 'JavaScript DOM',
      difficulty: 'Hard',
      xp: 200,
      story: 'JavaScript is looking for an element ID that does not match the HTML element id. Fix the selector.',
      brokenCode: '<button id="btn-submit">Click Me</button>\n<script>\ndocument.getElementById("submit-btn").onclick = function() {\n  alert("Success!");\n};\n</script>',
      expectedFix: '<button id="btn-submit">Click Me</button>\n<script>\ndocument.getElementById("btn-submit").onclick = function() {\n  alert("Success!");\n};\n</script>',
      validator: code => code.includes('getElementById("btn-submit")') || code.includes("getElementById('btn-submit')"),
      hint: 'The HTML button has id="btn-submit", but JS is asking for "submit-btn". Make them match.'
    },
    {
      id: 8,
      level: 8,
      title: 'Level 8: Unclosed CSS Curly Bracket',
      category: 'CSS Syntax',
      difficulty: 'Hard',
      xp: 200,
      story: 'A missing closing curly bracket } in the first rule is breaking all styles below it.',
      brokenCode: '<style>\nh1 {\n  color: #2563EB;\n  font-size: 24px;\n\np {\n  color: #16A34A;\n  font-weight: bold;\n}\n</style>\n<h1>Title</h1><p>Text</p>',
      expectedFix: '<style>\nh1 {\n  color: #2563EB;\n  font-size: 24px;\n}\np {\n  color: #16A34A;\n  font-weight: bold;\n}\n</style>\n<h1>Title</h1><p>Text</p>',
      validator: code => /h1\s*\{[^}]*\}\s*p\s*\{[^}]*\}/i.test(code),
      hint: 'Add the missing closing } after font-size: 24px; before p {.'
    },
    {
      id: 9,
      level: 9,
      title: 'Level 9: Array Zero Indexing',
      category: 'JavaScript Logic',
      difficulty: 'Hard',
      xp: 200,
      story: 'Arrays in JavaScript start at index 0. We want the first item ("Gold Trophy"), but someone wrote [1].',
      brokenCode: '<p id="firstPrize"></p>\n<script>\nconst prizes = ["Gold Trophy", "Silver Medal", "Bronze Shield"];\ndocument.getElementById("firstPrize").innerText = prizes[1];\n</script>',
      expectedFix: '<p id="firstPrize"></p>\n<script>\nconst prizes = ["Gold Trophy", "Silver Medal", "Bronze Shield"];\ndocument.getElementById("firstPrize").innerText = prizes[0];\n</script>',
      validator: code => code.includes('prizes[0]'),
      hint: 'Change prizes[1] to prizes[0] since arrays are zero-indexed.'
    },
    {
      id: 10,
      level: 10,
      title: 'BOSS LEVEL: Debug The Broken Website',
      category: 'Full Webpage Boss',
      difficulty: 'Boss Level',
      xp: 400,
      story: 'The Bug Monster broke 3 things on this landing page: (1) Unclosed <h1> tag, (2) Broken CSS property "colr", (3) Broken JS event name "onclik". Squash all 3 bugs to defeat the Boss!',
      brokenCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; text-align: center; }
    .hero {
      colr: #2563EB;
      font-size: 28px;
    }
    .btn {
      background: #22C55E;
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <h1 class="hero">WebCraft Boss Battle</h1
  <button id="bossBtn" class="btn">Defeat Bug Monster</button>
  <p id="victoryMsg"></p>

  <script>
    document.getElementById("bossBtn").onclik = function() {
      document.getElementById("victoryMsg").innerText = "BUG MONSTER DEFEATED!";
    };
  </script>
</body>
</html>`,
      expectedFix: 'Full webpage with fixed <h1></h1>, color:, and onclick',
      validator: code => /<h1 class=["']hero["']>.*<\/h1>/i.test(code) &&
                         code.includes('color:') && !code.includes('colr:') &&
                         (code.includes('onclick =') || code.includes('onclick=') || code.includes('addEventListener')),
      hint: 'Look for: (1) </h1 at top, (2) colr: in CSS, (3) .onclik in JavaScript.'
    }
  ],

  // Mission Challenges
  challenges: [
    {
      id: 'mission_1',
      number: 1,
      title: 'Mission 01: Build a Profile Card',
      icon: 'user',
      xp: 150,
      objective: 'Create a clean, colorful learner profile card with an avatar, name, subtitle, and badges.',
      requirements: [
        'Use a card container with class="card" and rounded borders',
        'Include an <h2> with your avatar name',
        'Include a paragraph <p> with your role (e.g. Frontend Adventurer)',
        'Add at least 1 badge or skill tag'
      ],
      starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      background: #F8FBFF;
      font-family: sans-serif;
      display: flex;
      justify-content: center;
      padding: 40px 20px;
    }
    .card {
      background: white;
      border-radius: 20px;
      padding: 24px;
      box-shadow: 0 10px 25px rgba(37, 99, 235, 0.1);
      text-align: center;
      max-width: 320px;
      width: 100%;
      border-top: 6px solid #2563EB;
    }
    .avatar-box {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: #EFF6FF;
      color: #2563EB;
      font-weight: 800;
      font-size: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 12px;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="avatar-box">WC</div>
    <h2>Cadet Alex</h2>
    <p style="color: #64748B;">Frontend Adventurer</p>
    <div style="background: #EFF6FF; color: #2563EB; padding: 6px 12px; border-radius: 20px; display: inline-block; font-weight: bold; font-size: 12px;">
      HTML & CSS Explorer
    </div>
  </div>
</body>
</html>`,
      validator: code => code.includes('class="card"') && /<h2/i.test(code) && /<p/i.test(code)
    },
    {
      id: 'mission_2',
      number: 2,
      title: 'Mission 02: Create a Navigation Bar',
      icon: 'layers',
      xp: 150,
      objective: 'Build a responsive horizontal navigation bar with a logo and navigation links using Flexbox.',
      requirements: [
        'Create a <nav> container with display: flex and justify-content: space-between',
        'Include a logo on the left with colorful styling',
        'Include at least 3 links: Home, Projects, Contact'
      ],
      starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { margin: 0; font-family: sans-serif; background: #F8FBFF; }
    nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: white;
      padding: 16px 24px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    }
    .logo { font-weight: 900; font-size: 20px; color: #2563EB; }
    .nav-links a {
      text-decoration: none;
      color: #64748B;
      margin-left: 20px;
      font-weight: 600;
    }
    .nav-links a:hover { color: #2563EB; }
  </style>
</head>
<body>
  <nav>
    <div class="logo">MyBrand</div>
    <div class="nav-links">
      <a href="#">Home</a>
      <a href="#">Projects</a>
      <a href="#">Contact</a>
    </div>
  </nav>
</body>
</html>`,
      validator: code => /<nav/i.test(code) && /display:\s*flex/i.test(code) && (code.match(/<a/gi) || []).length >= 3
    },
    {
      id: 'mission_3',
      number: 3,
      title: 'Mission 03: Design a Product Card',
      icon: 'target',
      xp: 150,
      objective: 'Design an attractive modern e-commerce product card with an image placeholder, price tag, and "Add to Cart" button.',
      requirements: [
        'Product container with rounded corners',
        'Product title and description',
        'Price tag highlighted in color',
        'Interactive "Buy Now" or "Add to Cart" button'
      ],
      starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { background: #F8FBFF; font-family: sans-serif; display: flex; justify-content: center; padding: 40px; }
    .product-card {
      background: white;
      border-radius: 18px;
      padding: 20px;
      width: 260px;
      box-shadow: 0 10px 20px rgba(0,0,0,0.06);
      text-align: center;
    }
    .img-box {
      background: linear-gradient(135deg, #38BDF8, #8B5CF6);
      border-radius: 14px;
      height: 120px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
    }
    .price { font-size: 22px; font-weight: bold; color: #2563EB; margin: 10px 0; }
    .btn {
      background: #2563EB;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 8px;
      font-weight: bold;
      cursor: pointer;
      width: 100%;
    }
  </style>
</head>
<body>
  <div class="product-card">
    <div class="img-box">Product View</div>
    <h3>Cyber Headphones</h3>
    <div class="price">$49.99</div>
    <button class="btn">Add to Cart</button>
  </div>
</body>
</html>`,
      validator: code => code.includes('class="product-card"') && /<button/i.test(code) && code.includes('$')
    },
    {
      id: 'mission_4',
      number: 4,
      title: 'Mission 04: Create a Clean Login Form',
      icon: 'shield',
      xp: 150,
      objective: 'Build a secure, modern login form with styled inputs, labels, and focus states.',
      requirements: [
        'Form with Username and Password fields',
        'Inputs with styled padding and border-radius',
        'Submit button with hover effect'
      ],
      starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { background: #EFF6FF; font-family: sans-serif; display: flex; justify-content: center; padding: 40px; }
    .login-box {
      background: white;
      padding: 30px;
      border-radius: 20px;
      width: 300px;
      box-shadow: 0 12px 30px rgba(37,99,235,0.1);
    }
    .input-group { margin-bottom: 16px; }
    label { display: block; font-size: 13px; font-weight: 600; color: #64748B; margin-bottom: 6px; }
    input[type="text"], input[type="password"] {
      width: 100%;
      padding: 10px;
      border: 1px solid #CBD5E1;
      border-radius: 8px;
      box-sizing: border-box;
      font-size: 14px;
    }
    .submit-btn {
      width: 100%;
      background: #2563EB;
      color: white;
      padding: 12px;
      border: none;
      border-radius: 8px;
      font-weight: bold;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <form class="login-box">
    <h2 style="margin-top:0; color:#172554;">Sign In</h2>
    <div class="input-group">
      <label>Email or Username</label>
      <input type="text" placeholder="coder@webcraft.dev" required />
    </div>
    <div class="input-group">
      <label>Password</label>
      <input type="password" placeholder="Password" required />
    </div>
    <button type="submit" class="submit-btn">Login to WebCraft</button>
  </form>
</body>
</html>`,
      validator: code => /<form/i.test(code) && /type=["']password["']/i.test(code) && /<button/i.test(code)
    },
    {
      id: 'mission_5',
      number: 5,
      title: 'Mission 05: Responsive Landing Hero',
      icon: 'rocket',
      xp: 150,
      objective: 'Create an energetic responsive hero section with headline, subtext, action buttons, and media query.',
      requirements: [
        'Hero section with big engaging title',
        'Two action buttons (Primary and Secondary)',
        'Media query adjusting styles for screens under 768px'
      ],
      starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { margin: 0; font-family: sans-serif; background: #F8FBFF; }
    .hero {
      text-align: center;
      padding: 60px 20px;
      max-width: 800px;
      margin: 0 auto;
    }
    h1 { font-size: 42px; color: #172554; margin-bottom: 12px; }
    p { font-size: 18px; color: #64748B; margin-bottom: 24px; }
    .btn-group { display: flex; justify-content: center; gap: 16px; }
    .btn-primary { background: #2563EB; color: white; padding: 12px 24px; border-radius: 8px; font-weight: bold; text-decoration: none; }
    .btn-secondary { background: #E2E8F0; color: #1E293B; padding: 12px 24px; border-radius: 8px; font-weight: bold; text-decoration: none; }
    @media (max-width: 600px) {
      h1 { font-size: 28px; }
      .btn-group { flex-direction: column; }
    }
  </style>
</head>
<body>
  <div class="hero">
    <h1>Build Websites With Confidence</h1>
    <p>Learn web development step-by-step with interactive activities.</p>
    <div class="btn-group">
      <a href="#" class="btn-primary">Start Coding</a>
      <a href="#" class="btn-secondary">View Demo</a>
    </div>
  </div>
</body>
</html>`,
      validator: code => /@media/i.test(code) && /class=["']hero["']/i.test(code) && (code.match(/class=["']btn/gi) || []).length >= 2
    },
    {
      id: 'mission_6',
      number: 6,
      title: 'Mission 06: Interactive Click Counter',
      icon: 'sparkle',
      xp: 150,
      objective: 'Create a clicker application where clicking a button increases the counter score in real time.',
      requirements: [
        'A score display showing current clicks',
        'A clicker button that triggers JS',
        'Text update when score reaches 10+'
      ],
      starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { background: #EFF6FF; font-family: sans-serif; text-align: center; padding: 40px; }
    .count-btn {
      font-size: 18px;
      font-weight: bold;
      background: #2563EB;
      color: white;
      border: none;
      padding: 14px 28px;
      border-radius: 12px;
      cursor: pointer;
      transition: transform 0.1s;
    }
    .count-btn:active { transform: scale(0.95); }
    .score-board { font-size: 28px; font-weight: bold; color: #1E3A8A; margin: 15px; }
  </style>
</head>
<body>
  <h2>Interactive Counter</h2>
  <div class="score-board">Clicks: <span id="score">0</span></div>
  <button id="cookieBtn" class="count-btn">Click Me!</button>
  <p id="msg" style="font-weight: bold; color: #16A34A;"></p>

  <script>
    let count = 0;
    const scoreSpan = document.getElementById("score");
    const cookieBtn = document.getElementById("cookieBtn");
    const msg = document.getElementById("msg");

    cookieBtn.addEventListener("click", () => {
      count++;
      scoreSpan.innerText = count;
      if (count >= 10) {
        msg.innerText = "Target Reached: 10 Clicks!";
      }
    });
  </script>
</body>
</html>`,
      validator: code => code.includes('addEventListener("click"') && code.includes('count++')
    },
    {
      id: 'mission_7',
      number: 7,
      title: 'Mission 07: Dynamic To-Do List',
      icon: 'code',
      xp: 150,
      objective: 'Build a working to-do list app where users can type a task, press "Add", and see it appended to the list.',
      requirements: [
        'Text input for typing tasks',
        'Add Task button',
        'Unordered list <ul> where tasks appear dynamically',
        'Clear input field after adding'
      ],
      starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { background: #F8FBFF; font-family: sans-serif; display: flex; justify-content: center; padding: 40px; }
    .todo-card { background: white; padding: 24px; border-radius: 18px; width: 320px; box-shadow: 0 10px 25px rgba(0,0,0,0.08); }
    .todo-input-row { display: flex; gap: 8px; margin-bottom: 16px; }
    input { flex: 1; padding: 10px; border-radius: 8px; border: 1px solid #CBD5E1; }
    button { background: #2563EB; color: white; border: none; padding: 10px 14px; border-radius: 8px; cursor: pointer; }
    ul { list-style: none; padding: 0; margin: 0; }
    li { background: #F1F5F9; padding: 10px; border-radius: 6px; margin-bottom: 6px; display: flex; justify-content: space-between; }
  </style>
</head>
<body>
  <div class="todo-card">
    <h3 style="margin-top:0;">My Learning Tasks</h3>
    <div class="todo-input-row">
      <input id="taskInput" placeholder="Enter task..." />
      <button id="addBtn">Add</button>
    </div>
    <ul id="taskList">
      <li><span>Learn HTML</span><span>Done</span></li>
    </ul>
  </div>

  <script>
    const input = document.getElementById("taskInput");
    const addBtn = document.getElementById("addBtn");
    const list = document.getElementById("taskList");

    addBtn.addEventListener("click", () => {
      if (input.value.trim() !== "") {
        const li = document.createElement("li");
        li.innerHTML = "<span>" + input.value + "</span><span>Done</span>";
        list.appendChild(li);
        input.value = "";
      }
    });
  </script>
</body>
</html>`,
      validator: code => code.includes('createElement') && code.includes('appendChild') && code.includes('addEventListener')
    },
    {
      id: 'mission_8',
      number: 8,
      title: 'Mission 08: Developer Portfolio Page',
      icon: 'award',
      xp: 150,
      objective: 'Create a personal developer portfolio featuring your name, role, project showcase cards, and contact links.',
      requirements: [
        'Header with developer name and title',
        'Projects grid with at least 2 project cards',
        'Skills list',
        'Contact link/button'
      ],
      starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { background: #F8FBFF; font-family: sans-serif; margin: 0; padding: 30px 20px; text-align: center; }
    .header { margin-bottom: 30px; }
    .avatar-badge { width: 50px; height: 50px; border-radius: 50%; background: #2563EB; color: white; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px; font-weight: bold; }
    .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; max-width: 600px; margin: 0 auto; }
    .proj-card { background: white; padding: 18px; border-radius: 14px; box-shadow: 0 8px 20px rgba(0,0,0,0.06); text-align: left; border-top: 4px solid #8B5CF6; }
    .btn { background: #8B5CF6; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; display: inline-block; margin-top: 20px; font-weight: bold; }
  </style>
</head>
<body>
  <div class="header">
    <div class="avatar-badge">DEV</div>
    <h2>Sam the WebCrafter</h2>
    <p style="color: #64748B;">Student & Junior Web Developer</p>
  </div>
  <div class="projects-grid">
    <div class="proj-card">
      <h4>Web Game Platform</h4>
      <p style="font-size: 13px; color: #64748B;">Built with HTML, CSS, and JS</p>
    </div>
    <div class="proj-card">
      <h4>Design Gallery</h4>
      <p style="font-size: 13px; color: #64748B;">CSS Grid and Flexbox showcase</p>
    </div>
  </div>
  <a href="#" class="btn">Get in Touch</a>
</body>
</html>`,
      validator: code => code.includes('class="proj-card"') && /class=["']projects-grid["']/i.test(code)
    }
  ],

  // Quiz Questions Data (4 Categories)
  quizzes: {
    html: [
      {
        question: 'Which HTML tag is used to define the largest heading on a webpage?',
        options: ['<h6>', '<head>', '<h1>', '<header>'],
        correct: 2,
        explanation: '<h1> represents the top-level, most important heading on a page.'
      },
      {
        question: 'What does HTML stand for?',
        options: [
          'HyperText Markup Language',
          'High Tech Modern Language',
          'Hyperlink and Text Management Language',
          'Home Tool Markup Language'
        ],
        correct: 0,
        explanation: 'HTML stands for HyperText Markup Language, the backbone of the web.'
      },
      {
        question: 'Which tag creates a hyperlink to another webpage?',
        options: ['<link>', '<a>', '<href>', '<url>'],
        correct: 1,
        explanation: 'The <a> (anchor) tag is used with the href attribute to create clickable links.'
      },
      {
        question: 'Which attribute tells an <img> tag where to find the image file?',
        options: ['link', 'source', 'src', 'href'],
        correct: 2,
        explanation: 'src stands for source and contains the path or URL of the image.'
      },
      {
        question: 'Which tag is used for bulleted (unordered) lists?',
        options: ['<ol>', '<ul>', '<li>', '<list>'],
        correct: 1,
        explanation: '<ul> creates an unordered (bulleted) list. <ol> is for ordered (numbered) lists.'
      },
      {
        question: 'Where should all visible content of a webpage be placed?',
        options: ['Inside <head>', 'Inside <title>', 'Inside <body>', 'Inside <meta>'],
        correct: 2,
        explanation: 'Everything the user sees and interacts with lives inside the <body> tag.'
      },
      {
        question: 'Which tag is an example of semantic HTML for the footer of a page?',
        options: ['<bottom>', '<foot>', '<footer>', '<end>'],
        correct: 2,
        explanation: '<footer> is the official semantic tag for closing notes, copyright, and bottom links.'
      },
      {
        question: 'What does the alt attribute on an <img> tag do?',
        options: [
          'Changes the image alignment',
          'Provides alternate text if the image cannot load and for screen readers',
          'Sets the altitude of the image',
          'Applies an alternative color filter'
        ],
        correct: 1,
        explanation: 'alt is crucial for web accessibility, screen readers, and search indexing.'
      },
      {
        question: 'Which tag creates an interactive text field for users to type in?',
        options: ['<input type="text">', '<textbox>', '<write>', '<type>'],
        correct: 0,
        explanation: '<input type="text"> creates a standard single-line text box.'
      },
      {
        question: 'How do you create an HTML comment that browsers will ignore?',
        options: [
          '// This is a comment',
          '/* This is a comment */',
          '<!-- This is a comment -->',
          '# This is a comment'
        ],
        correct: 2,
        explanation: 'HTML comments use the <!-- ... --> syntax.'
      }
    ],

    css: [
      {
        question: 'What does CSS stand for?',
        options: [
          'Creative Style Sheets',
          'Cascading Style Sheets',
          'Colorful Style Systems',
          'Computer Screen Styling'
        ],
        correct: 1,
        explanation: 'CSS stands for Cascading Style Sheets.'
      },
      {
        question: 'How do you select an element with class="card" in CSS?',
        options: ['#card', '.card', 'card', '*card'],
        correct: 1,
        explanation: 'Class selectors start with a period (.card). ID selectors start with a hash (#id).'
      },
      {
        question: 'Which CSS property changes the color of text?',
        options: ['text-color', 'font-color', 'color', 'background-color'],
        correct: 2,
        explanation: 'The color property sets the text color in CSS.'
      },
      {
        question: 'Which part of the CSS Box Model represents space OUTSIDE the element border?',
        options: ['Padding', 'Margin', 'Content', 'Outline'],
        correct: 1,
        explanation: 'Margin is the external buffer around an element; padding is the internal space.'
      },
      {
        question: 'Which CSS property rounds the corners of a card or button?',
        options: ['corner-curve', 'border-radius', 'border-round', 'curve-radius'],
        correct: 1,
        explanation: 'border-radius rounds corners smoothly.'
      },
      {
        question: 'Which property turns a container into a Flexbox layout?',
        options: ['display: flex;', 'layout: flexbox;', 'flex: active;', 'box-type: flex;'],
        correct: 0,
        explanation: 'display: flex activates the Flexbox formatting context.'
      },
      {
        question: 'How do you center items horizontally along the main axis in Flexbox?',
        options: ['align-items: center;', 'justify-content: center;', 'text-align: center;', 'float: center;'],
        correct: 1,
        explanation: 'justify-content: center centers flex children along the main axis.'
      },
      {
        question: 'Which rule is used to make a website responsive to different screen widths?',
        options: ['@responsive', '@media', '@screen', '@device'],
        correct: 1,
        explanation: '@media (max-width: 768px) queries the screen dimensions to adapt styling.'
      },
      {
        question: 'Which property creates a multi-color smooth transition between two colors?',
        options: ['background: linear-gradient(...)', 'color: rainbow(...)', 'box-gradient: true', 'filter: gradient(...)'],
        correct: 0,
        explanation: 'linear-gradient(135deg, #38BDF8, #8B5CF6) creates clean color blends.'
      },
      {
        question: 'Which unit is relative to the root font-size of the document?',
        options: ['px', 'rem', 'cm', 'pt'],
        correct: 1,
        explanation: 'rem stands for Root EM and scales proportionally with the base font size.'
      }
    ],

    js: [
      {
        question: 'Which keyword declares a variable that CANNOT be reassigned?',
        options: ['let', 'var', 'const', 'static'],
        correct: 2,
        explanation: 'const declares a constant whose value cannot be reassigned.'
      },
      {
        question: 'How do you write "Hello World" in the browser developer console?',
        options: ['print("Hello World")', 'console.log("Hello World")', 'document.write("Hello World")', 'alert.console("Hello World")'],
        correct: 1,
        explanation: 'console.log() outputs diagnostic messages to the developer console.'
      },
      {
        question: 'What is the correct way to select an element with id="main-title" in JS?',
        options: [
          'document.select("#main-title")',
          'document.getElementById("main-title")',
          'document.findId("main-title")',
          'browser.getElement("main-title")'
        ],
        correct: 1,
        explanation: 'document.getElementById("main-title") returns the matching DOM element.'
      },
      {
        question: 'Which event listener triggers when a user clicks a button?',
        options: ['btn.addEventListener("hover", ...)', 'btn.addEventListener("click", ...)', 'btn.addEventListener("press", ...)', 'btn.addEventListener("tap", ...)'],
        correct: 1,
        explanation: '"click" is the standard DOM event for mouse clicks and touch taps.'
      },
      {
        question: 'What data type is true or false in JavaScript?',
        options: ['String', 'Number', 'Boolean', 'Object'],
        correct: 2,
        explanation: 'Booleans represent logical truth values: either true or false.'
      },
      {
        question: 'What is the index of the FIRST item in a JavaScript array?',
        options: ['1', '0', '-1', 'first'],
        correct: 1,
        explanation: 'JavaScript arrays are zero-indexed: array[0] is the first element.'
      },
      {
        question: 'What will 5 + "5" evaluate to in JavaScript?',
        options: ['10', '"55"', 'NaN', 'Error'],
        correct: 1,
        explanation: 'Because one operand is a string, JavaScript performs string concatenation resulting in "55".'
      },
      {
        question: 'Which loop is guaranteed to execute at least once?',
        options: ['for loop', 'while loop', 'do...while loop', 'forEach loop'],
        correct: 2,
        explanation: 'do...while evaluates its condition after running the code block once.'
      },
      {
        question: 'How do you stop a form from refreshing the webpage when submitted?',
        options: ['event.preventDefault()', 'event.stopPage()', 'form.freeze()', 'return false.reload()'],
        correct: 0,
        explanation: 'event.preventDefault() stops default browser form submissions.'
      },
      {
        question: 'Which method adds a new item to the END of an array?',
        options: ['array.add()', 'array.push()', 'array.append()', 'array.insert()'],
        correct: 1,
        explanation: 'array.push("item") appends new elements to the array end.'
      }
    ],

    mixed: [
      {
        question: 'In web development: HTML is the ___, CSS is the ___, and JavaScript is the ___.',
        options: [
          'Design, Skeleton, Brain',
          'Structure (Skeleton), Design (Styling), Behaviour (Brain)',
          'Brain, Skeleton, Color',
          'Server, Database, Frontend'
        ],
        correct: 1,
        explanation: 'HTML structures, CSS styles, and JavaScript adds interactive behavior.'
      },
      {
        question: 'Which storage API allows WebCraft to remember your XP and badges across page refreshes?',
        options: ['sessionMemory', 'localStorage', 'serverCookie', 'webMemory'],
        correct: 1,
        explanation: 'localStorage keeps key-value pairs in the browser even after closing the tab.'
      },
      {
        question: 'Which tag is used to embed CSS directly into an HTML file?',
        options: ['<css>', '<script>', '<style>', '<design>'],
        correct: 2,
        explanation: '<style> wraps internal CSS stylesheet code.'
      },
      {
        question: 'Which tag is used to link an external JavaScript file?',
        options: ['<script src="app.js"></script>', '<js link="app.js">', '<link rel="js" href="app.js">', '<code src="app.js">'],
        correct: 0,
        explanation: '<script src="app.js"></script> loads and executes external JS.'
      },
      {
        question: 'What is responsive web design?',
        options: [
          'Designing websites that answer questions quickly',
          'Designing websites that automatically look good and work smoothly on all devices and screen sizes',
          'Making web pages speak with audio',
          'Designing exclusively for mobile phones'
        ],
        correct: 1,
        explanation: 'Responsive design ensures great user experience across phones, tablets, laptops, and desktops.'
      },
      {
        question: 'What happens when you click "Inspect" in Google Chrome or Firefox?',
        options: [
          'It deletes the page',
          'It opens DevTools to view and debug the live HTML, CSS, and JS',
          'It downloads the server database',
          'It starts an antivirus scan'
        ],
        correct: 1,
        explanation: 'Browser DevTools let developers inspect elements, test CSS, and debug scripts.'
      },
      {
        question: 'Which color format uses red, green, blue, and alpha transparency?',
        options: ['rgba(37, 99, 235, 0.5)', '#2563EB', 'hsl(217, 91%, 60%)', 'color(blue)'],
        correct: 0,
        explanation: 'rgba() defines Red, Green, Blue, and Alpha transparency.'
      },
      {
        question: 'How do you select ALL elements with the tag <p> in JavaScript?',
        options: ['document.querySelectorAll("p")', 'document.getP()', 'document.allParagraphs()', 'document.getTag("p")'],
        correct: 0,
        explanation: 'document.querySelectorAll("p") returns a NodeList of all matching paragraph elements.'
      },
      {
        question: 'Which CSS property creates space BETWEEN flex or grid children?',
        options: ['space', 'gap', 'margin-between', 'inner-distance'],
        correct: 1,
        explanation: 'gap: 16px; sets consistent gutters between row and column items.'
      },
      {
        question: 'What is a bug in computer programming?',
        options: [
          'An insect inside your keyboard',
          'An error, flaw, or mistake in code that causes unexpected behavior',
          'A feature that makes code run faster',
          'A type of computer screen'
        ],
        correct: 1,
        explanation: 'A bug is any defect or unexpected behavior in software that developers fix.'
      }
    ]
  },

  // Final Project Blueprint
  finalProject: {
    title: 'BUILD YOUR FIRST WEBSITE (Final Project)',
    subtitle: 'Construct your very own responsive website from scratch!',
    xpReward: 1000,
    badgeReward: 'web_creator',
    requirements: [
      { id: 'req_html_heading', category: 'HTML', text: 'Main heading (<h1>) and descriptive subtitle' },
      { id: 'req_html_nav', category: 'HTML', text: 'Navigation bar (<nav>) with links' },
      { id: 'req_html_img', category: 'HTML', text: 'At least one image (<img>) with alt text' },
      { id: 'req_html_sections', category: 'HTML', text: 'Organized sections or cards' },
      { id: 'req_html_form', category: 'HTML', text: 'Interactive form or contact input' },
      { id: 'req_css_colors', category: 'CSS', text: 'Custom color palette or gradient' },
      { id: 'req_css_layout', category: 'CSS', text: 'Flexbox or Grid layout system' },
      { id: 'req_css_card', category: 'CSS', text: 'Card styling with rounded corners and shadows' },
      { id: 'req_css_responsive', category: 'CSS', text: 'Responsive media query (@media)' },
      { id: 'req_js_event', category: 'JS', text: 'Interactive button event listener' },
      { id: 'req_js_dom', category: 'JS', text: 'DOM manipulation (updating text or styles on click)' }
    ],
    starterTemplate: {
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My WebCraft Universe</title>
</head>
<body>
  <!-- Navigation -->
  <nav class="navbar">
    <div class="logo">StarCraft Studio</div>
    <div class="nav-links">
      <a href="#about">About</a>
      <a href="#projects">Projects</a>
      <a href="#contact">Contact</a>
    </div>
  </nav>

  <!-- Hero Section -->
  <header class="hero">
    <h1>Welcome to My Digital Studio</h1>
    <p>Crafting awesome websites with HTML, CSS & JavaScript!</p>
    <button id="magicBtn" class="btn btn-primary">Say Hello</button>
    <p id="greetingMsg" class="magic-text"></p>
  </header>

  <!-- Showcase Cards Section -->
  <main class="container" id="projects">
    <h2 class="section-title">Featured Creations</h2>
    <div class="grid">
      <div class="card">
        <div class="card-icon">01</div>
        <h3>Retro Arcade</h3>
        <p>A fun mini game collection built entirely with JavaScript!</p>
      </div>
      <div class="card">
        <div class="card-icon">02</div>
        <h3>Design Palette</h3>
        <p>Exploring modern color gradients and CSS styling.</p>
      </div>
      <div class="card">
        <div class="card-icon">03</div>
        <h3>Speedy Web</h3>
        <p>Ultra-fast responsive layout designed for mobile and desktop.</p>
      </div>
    </div>

    <!-- Contact & Feedback Section -->
    <section class="card contact-card" id="contact">
      <h3>Stay in Touch</h3>
      <form id="contactForm">
        <input type="text" id="visitorName" placeholder="Your Name" required />
        <button type="submit" class="btn btn-secondary">Join Community</button>
      </form>
      <p id="feedbackText"></p>
    </section>
  </main>

  <!-- Footer -->
  <footer>
    <p>© 2026 Crafted by a Proud WebCraft Creator</p>
  </footer>
</body>
</html>`,
      css: `/* Universal Reset & Typography */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #F8FBFF;
  color: #172554;
  line-height: 1.6;
}

/* Navbar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 30px;
  background: #FFFFFF;
  box-shadow: 0 4px 15px rgba(0,0,0,0.04);
}
.logo {
  font-weight: 800;
  font-size: 20px;
  color: #2563EB;
}
.nav-links a {
  text-decoration: none;
  color: #64748B;
  margin-left: 20px;
  font-weight: 600;
  transition: color 0.2s;
}
.nav-links a:hover {
  color: #2563EB;
}

/* Hero Section */
.hero {
  text-align: center;
  padding: 60px 20px;
  background: linear-gradient(135deg, #EFF6FF, #F3E8FF);
}
.hero h1 {
  font-size: 38px;
  margin-bottom: 12px;
  color: #1E293B;
}
.hero p {
  font-size: 18px;
  color: #64748B;
  margin-bottom: 24px;
}
.magic-text {
  margin-top: 14px;
  font-weight: bold;
  color: #8B5CF6;
  font-size: 18px;
}

/* Buttons */
.btn {
  padding: 12px 24px;
  border-radius: 10px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  transition: transform 0.15s, box-shadow 0.15s;
}
.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(37,99,235,0.2);
}
.btn-primary {
  background: #2563EB;
  color: white;
}
.btn-secondary {
  background: #8B5CF6;
  color: white;
  margin-left: 8px;
}

/* Main Layout & Grid */
.container {
  max-width: 960px;
  margin: 40px auto;
  padding: 0 20px;
}
.section-title {
  text-align: center;
  margin-bottom: 30px;
  font-size: 28px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

/* Cards */
.card {
  background: #FFFFFF;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 8px 24px rgba(37,99,235,0.08);
  border: 1px solid #E2E8F0;
  transition: transform 0.2s;
}
.card:hover {
  transform: translateY(-4px);
}
.card-icon {
  font-size: 20px;
  font-weight: 800;
  color: #2563EB;
  margin-bottom: 12px;
}
.contact-card {
  text-align: center;
  max-width: 500px;
  margin: 0 auto;
}
.contact-card input {
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #CBD5E1;
  width: 60%;
  margin-top: 10px;
}

/* Footer */
footer {
  text-align: center;
  padding: 30px;
  color: #94A3B8;
  font-size: 14px;
}

/* Responsive Breakpoints */
@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    gap: 12px;
  }
  .hero h1 {
    font-size: 28px;
  }
  .contact-card input {
    width: 100%;
    margin-bottom: 10px;
  }
}`,
      js: `// WebCraft Final Project Interactive Logic
document.addEventListener('DOMContentLoaded', () => {
  const magicBtn = document.getElementById('magicBtn');
  const greetingMsg = document.getElementById('greetingMsg');

  if (magicBtn) {
    magicBtn.addEventListener('click', () => {
      greetingMsg.innerText = 'Welcome to my WebCraft creation! Keep exploring!';
      magicBtn.style.background = '#22C55E';
      magicBtn.innerText = 'Explored!';
    });
  }

  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('feedbackText');
  const input = document.getElementById('visitorName');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = input.value.trim();
      feedback.innerText = 'Thank you for connecting, ' + name + '!';
      feedback.style.color = '#22C55E';
      feedback.style.fontWeight = 'bold';
      feedback.style.marginTop = '10px';
      input.value = '';
    });
  }
});`
    }
  }
};
