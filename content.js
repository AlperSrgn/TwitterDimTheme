// =======================================
//   X ADVANCED DIM THEME — CONTENT SCRIPT
// =======================================

const THEME_CLASS = "dim-x-theme";
let currentState = false;
let observerActive = false;

// -----------------------------------------------------------------------
// Tema uygula / kaldır
// -----------------------------------------------------------------------
function applyTheme(isEnabled) {
  currentState = isEnabled;
  document.documentElement.classList.toggle(THEME_CLASS, isEnabled);
}

// -----------------------------------------------------------------------
// Storage'dan ilk yükleme — document_start'ta çalışır, body henüz yok
// -----------------------------------------------------------------------
function initializeTheme() {
  chrome.storage.sync.get(["dimMode"], result => {
    applyTheme(result.dimMode === true);
    startObserver();
  });
}

// -----------------------------------------------------------------------
// Popup'tan gelen toggle mesajları
// -----------------------------------------------------------------------
chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request.action === "toggle") {
    applyTheme(request.value);
    sendResponse({ ok: true });
  }
  if (request.action === "getState") {
    sendResponse({ state: currentState });
  }
  return true;
});

// -----------------------------------------------------------------------
// Açık renkli butonları düzelt (X'in bazı butonları inline style kullanır)
// -----------------------------------------------------------------------
const LIGHT_BG = "rgb(239, 243, 244)";
const LIGHT_BG2 = "rgb(255, 255, 255)";

function fixLightButtons() {
  if (!currentState) return;
  document.querySelectorAll("button").forEach(btn => {
    const bg = window.getComputedStyle(btn).backgroundColor;
    if (bg === LIGHT_BG || bg === LIGHT_BG2) {
      btn.style.setProperty("background-color", "#2d333b", "important");
      btn.style.setProperty("color", "#e6edf3", "important");
    }
  });
}

// -----------------------------------------------------------------------
// MutationObserver — X SPA navigasyonlarında temayı canlı tutar
// Aynı zamanda fixLightButtons'u burada tetikleriz (setInterval yok)
// -----------------------------------------------------------------------
let fixTimer = null;

const observer = new MutationObserver(() => {
  // Tema class'ının kaybolmamasını garantile
  if (
    currentState &&
    !document.documentElement.classList.contains(THEME_CLASS)
  ) {
    document.documentElement.classList.add(THEME_CLASS);
  }

  // Buton düzeltmeyi debounce ile çalıştır
  if (fixTimer) clearTimeout(fixTimer);
  fixTimer = setTimeout(fixLightButtons, 300);
});

function startObserver() {
  if (observerActive) return;

  const target = document.body || document.documentElement;
  observer.observe(target, {
    childList: true,
    subtree: true,
    attributes: false,
    characterData: false,
  });
  observerActive = true;
}

// -----------------------------------------------------------------------
// Başlat
// -----------------------------------------------------------------------
initializeTheme();
