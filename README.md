# WEBCRAFT 🚀
> **"Small Steps. Big Websites."** — A colorful, interactive, gamified educational web development learning platform designed for school children and beginners.

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 🎯 About The Project
**WebCraft** is built as part of a **College Community Engagement Project (CEP)** under the theme:  
> **"Coding through Games and Activities"**

Instead of traditional boring tutorials, WebCraft empowers beginners and young students through a complete interactive learning journey:
```
LEARN ➔ PRACTICE ➔ TEST ➔ DEBUG ➔ BUILD ➔ ACHIEVE
```

---

## ✨ Features

- 🎮 **Interactive Game-Based Learning**:
  - **HTML5 Island** (10 interactive bite-sized lessons)
  - **CSS3 Styling Playground** (10 interactive lessons)
  - **JavaScript Dynamic Magic** (12 interactive logic modules)
- 🧪 **Hands-On Practice Sandbox**: Real-time code execution with instant feedback and 3-tier progressive hints.
- 🎯 **8 Coding Missions**: Guided real-world challenges with automatic condition checkers.
- 🐛 **Bug Hunter Arena**: Find and fix bugs before the countdown timer expires! Includes a Boss Battle.
- 🧠 **Interactive Quizzes**: 40 curated questions with immediate explanations and score tracking.
- 🏗️ **Final Boss Website Builder**: Capstone project where learners build a complete responsive webpage from scratch and download their `.html` code.
- 🏆 **Gamified Progression**:
  - XP points system & dynamic level tiers (Levels 1–10)
  - Streak tracker
  - 8 unlockable milestone achievement badges
- 📜 **Official Graduation Certificate & Profile**:
  - Direct local photo upload (supports PC/Laptop file explorer & Mobile Gallery/Camera)
  - Golden WebCraft Verified seal
  - Unique certificate serial ID and verification date
  - 1-click A4 PDF export

---

## 🚀 Getting Started

### Option 1: Live in Browser (No installation needed)
Simply open `index.html` in any modern web browser (Chrome, Firefox, Safari, Edge).

### Option 2: Run with VS Code Live Server / Local Server
1. Clone the repository:
   ```bash
   git clone https://github.com/STAROY07/webcraft.git
   ```
2. Navigate to the project directory:
   ```bash
   cd webcraft
   ```
3. Start a local server:
   ```bash
   # Using Python
   python -m http.server 5500
   
   # Or using Node.js / npx
   npx serve .
   ```
4. Open `http://localhost:5500` in your browser.

---

## 📁 Project Structure

```
webcraft/
├── assets/                  # Brand logos, icons, and SVG assets
├── css/
│   ├── style.css           # Core design system tokens, typography, components
│   └── responsive.css      # Responsive media queries & mobile bottom navigation
├── js/
│   ├── icons.js            # SVG vector icon library (WebCraftIcons)
│   ├── audio.js            # Web Audio API sound synthesizer
│   ├── storage.js          # LocalStorage persistence, XP, levels, and user photos
│   ├── data.js             # Curriculum, lessons, practice tasks, bugs, & quizzes
│   ├── playground.js       # Sandboxed iframe multi-tab editor runner
│   ├── app.js              # Universal header/footer controller, onboarding modal
│   ├── learning.js         # Interactive lessons engine
│   ├── practice.js         # Automated practice code validator
│   ├── challenges.js       # Missions challenge controller
│   ├── bug-hunter.js       # Bug Hunter game arena
│   ├── quiz.js             # Quiz engine with explanations
│   ├── build.js            # Final website builder & code downloader
│   ├── achievements.js     # Badges trophy room
│   └── profile.js          # Profile customizer & PDF certificate generator
├── pages/
│   ├── learn.html          # Learning curriculum page
│   ├── practice.html       # Practice lab page
│   ├── challenges.html     # Missions page
│   ├── bug-hunter.html     # Bug Hunter arena page
│   ├── quiz.html           # Quiz arena page
│   ├── build.html          # Final Boss builder page
│   ├── achievements.html   # Badges hall page
│   └── profile.html        # Profile & Graduation Certificate page
├── index.html              # Home page & playground
├── netlify.toml            # Netlify hosting configuration
└── README.md               # Project documentation
```

---

## 🎓 Technology Stack
- **Structure**: HTML5 Semantic Markup
- **Design & Layout**: Pure CSS3 (Flexbox, CSS Grid, Custom Properties, Glassmorphism)
- **Logic & Interactivity**: Vanilla JavaScript (ES6+)
- **Storage**: Browser `localStorage` (Offline-first architecture)
- **Audio**: HTML5 Web Audio API Synthesizer

---

## 📄 License
This project is open source and available under the [MIT License](LICENSE).
