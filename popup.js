// =======================================
//   X ADVANCED DIM THEME — POPUP SCRIPT
// =======================================

const toggleSwitch = document.getElementById("toggleSwitch");
const statusText = document.getElementById("statusText");
const titleText = document.getElementById("titleText");
const langBtn = document.getElementById("langBtn");
const siteBadge = document.getElementById("siteBadge");

let currentLang = "tr";

const i18n = {
  tr: {
    title: "Loş Tema",
    on: "✓ Etkin",
    off: "Devre dışı",
    onX: "X / Twitter'da aktif",
    notOnX: "X / Twitter değil",
    notOnXSub: "Bu eklenti yalnızca x.com / twitter.com adreslerinde çalışır.",
  },
  en: {
    title: "Dim Theme",
    on: "✓ Enabled",
    off: "Disabled",
    onX: "Active on X / Twitter",
    notOnX: "Not on X / Twitter",
    notOnXSub: "This extension only works on x.com / twitter.com.",
  },
};

// -----------------------------------------------------------------------
// Sekmenin X/Twitter olup olmadığını kontrol et
// -----------------------------------------------------------------------
function isXTab(url) {
  if (!url) return false;
  return /^https?:\/\/(www\.)?(x\.com|twitter\.com)/.test(url);
}

// -----------------------------------------------------------------------
// UI güncelle
// -----------------------------------------------------------------------
function applyLanguage() {
  titleText.textContent = i18n[currentLang].title;
}

function updateStatus(state) {
  statusText.textContent = state ? i18n[currentLang].on : i18n[currentLang].off;
  statusText.className = "status " + (state ? "active" : "inactive");
}

function showNotOnX() {
  siteBadge.textContent = i18n[currentLang].notOnX;
  siteBadge.className = "site-badge error";
  document.getElementById("notOnXNote").textContent =
    i18n[currentLang].notOnXSub;
  document.getElementById("notOnXNote").style.display = "block";
  toggleSwitch.disabled = true;
}

function showOnX() {
  siteBadge.textContent = i18n[currentLang].onX;
  siteBadge.className = "site-badge ok";
  document.getElementById("notOnXNote").style.display = "none";
  toggleSwitch.disabled = false;
}

// -----------------------------------------------------------------------
// Toggle mesajını content script'e gönder
// -----------------------------------------------------------------------
function sendToggle(tabId, value) {
  chrome.tabs.sendMessage(tabId, { action: "toggle", value }, () => {
    // Hata olursa (content script henüz yüklenmemişse) scripting API ile inject et
    if (chrome.runtime.lastError) {
      chrome.scripting.executeScript({
        target: { tabId },
        files: ["content.js"],
      });
    }
  });
}

// -----------------------------------------------------------------------
// DOMContentLoaded
// -----------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get(["dimMode", "lang"], result => {
    currentLang = result.lang || "tr";
    const state = result.dimMode === true;

    toggleSwitch.checked = state;
    applyLanguage();
    updateStatus(state);
  });

  // Aktif sekmeyi kontrol et
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    const tab = tabs[0];
    if (isXTab(tab?.url)) {
      showOnX();
    } else {
      showNotOnX();
    }
  });
});

// -----------------------------------------------------------------------
// Toggle değişimi
// -----------------------------------------------------------------------
toggleSwitch.addEventListener("change", () => {
  const newState = toggleSwitch.checked;

  chrome.storage.sync.set({ dimMode: newState });
  updateStatus(newState);

  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    if (tabs[0]?.id) {
      sendToggle(tabs[0].id, newState);
    }
  });
});

// -----------------------------------------------------------------------
// Dil değiştir
// -----------------------------------------------------------------------
langBtn.addEventListener("click", () => {
  currentLang = currentLang === "tr" ? "en" : "tr";
  chrome.storage.sync.set({ lang: currentLang });
  applyLanguage();
  updateStatus(toggleSwitch.checked);

  // site badge metnini de güncelle
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    if (isXTab(tabs[0]?.url)) {
      showOnX();
    } else {
      showNotOnX();
    }
  });
});
