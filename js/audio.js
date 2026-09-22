// WebCraft Web Audio API Synthesizer (No external audio file dependencies)
const WebCraftAudio = (function () {
  let ctx = null;
  let isMuted = false;

  function initCtx() {
    if (!ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        ctx = new AudioCtx();
      }
    }
    if (ctx && ctx.state === 'suspended') {
      ctx.resume();
    }
  }

  function playTone(freq, type = 'sine', duration = 0.15, gainVal = 0.1, delay = 0) {
    if (isMuted) return;
    try {
      initCtx();
      if (!ctx) return;
      setTimeout(() => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(gainVal, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + duration);
      }, delay * 1000);
    } catch (e) {
      console.warn("Audio error:", e);
    }
  }

  return {
    toggleSound: function () {
      isMuted = !isMuted;
      localStorage.setItem('webcraft_sound_muted', isMuted ? 'true' : 'false');
      return !isMuted;
    },
    isSoundEnabled: function () {
      return !isMuted;
    },
    init: function () {
      isMuted = localStorage.getItem('webcraft_sound_muted') === 'true';
    },
    click: function () {
      playTone(600, 'triangle', 0.05, 0.05);
    },
    success: function () {
      playTone(523.25, 'sine', 0.1, 0.1, 0);       // C5
      playTone(659.25, 'sine', 0.1, 0.1, 0.08);    // E5
      playTone(783.99, 'sine', 0.2, 0.15, 0.16);   // G5
      playTone(1046.50, 'triangle', 0.3, 0.15, 0.24); // C6
    },
    error: function () {
      playTone(280, 'sawtooth', 0.12, 0.08, 0);
      playTone(220, 'sawtooth', 0.25, 0.08, 0.1);
    },
    hint: function () {
      playTone(440, 'sine', 0.1, 0.08, 0);
      playTone(880, 'sine', 0.18, 0.08, 0.09);
    },
    levelUp: function () {
      const notes = [440, 554.37, 659.25, 880, 1108.73];
      notes.forEach((freq, idx) => {
        playTone(freq, 'triangle', 0.25, 0.15, idx * 0.09);
      });
    },
    badge: function () {
      const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5];
      notes.forEach((freq, idx) => {
        playTone(freq, 'sine', 0.3, 0.15, idx * 0.08);
      });
    }
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  WebCraftAudio.init();
  // Initialize audio context on first user click
  document.body.addEventListener('click', function unlock() {
    WebCraftAudio.click();
    document.body.removeEventListener('click', unlock);
  }, { once: true });
});
