// =======================================
//   X ADVANCED DARK THEME CONTENT SCRIPT
// =======================================

const THEME_CLASS = "dark-x-theme";
let currentState = false;

/**
 * Temayı uygular veya kaldırır
 */
function applyTheme(isEnabled) {
  currentState = isEnabled;
  document.documentElement.classList.toggle(THEME_CLASS, isEnabled);
}

/**
 * Storage’dan ilk yükleme
 */
function initializeTheme() {
  chrome.storage.sync.get(["darkMode"], result => {
    applyTheme(result.darkMode === true);
  });
}

/**
 * Popup’tan gelen toggle mesajı
 */
chrome.runtime.onMessage.addListener(request => {
  if (request.toggle !== undefined) {
    applyTheme(request.toggle);
  }
});

/**
 * X SPA olduğu için DOM değişimlerini izliyoruz
 */
const observer = new MutationObserver(() => {
  if (
    currentState &&
    !document.documentElement.classList.contains(THEME_CLASS)
  ) {
    document.documentElement.classList.add(THEME_CLASS);
  }
});

function startObserver() {
  if (document.body) {
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  } else {
    setTimeout(startObserver, 50);
  }
}

/**
 * Açık renk butonları düzelt
 */
function fixLightButtons() {
  const buttons = document.querySelectorAll("button");

  buttons.forEach(btn => {
    const bg = window.getComputedStyle(btn).backgroundColor;

    if (bg === "rgb(239, 243, 244)") {
      btn.style.backgroundColor = "#2d333b";
      btn.style.color = "#e6edf3";
    }
  });
}

/**
 * Periyodik düzeltme (hafif ve güvenli)
 */
setInterval(() => {
  if (currentState) fixLightButtons();
}, 1500);

/**
 * Başlat
 */
initializeTheme();
startObserver();
