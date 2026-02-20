const toggleSwitch = document.getElementById("toggleSwitch");
const statusText = document.getElementById("statusText");
const titleText = document.getElementById("titleText");
const langBtn = document.getElementById("langBtn");

let currentLang = "tr";

const translations = {
  tr: {
    title: "Loş Tema",
    on: "Etkin",
    off: "Devre dışı",
  },
  en: {
    title: "Dim Theme",
    on: "Enabled",
    off: "Disabled",
  },
};

document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get(["dimMode", "lang"], result => {
    const state = result.dimMode === true;
    currentLang = result.lang || "tr";

    toggleSwitch.checked = state;
    applyLanguage();
    updateStatus(state);
  });
});

toggleSwitch.addEventListener("change", () => {
  const newState = toggleSwitch.checked;

  chrome.storage.sync.set({ dimMode: newState });

  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    if (tabs[0]?.id) {
      chrome.tabs.sendMessage(tabs[0].id, { toggle: newState });
    }
  });

  updateStatus(newState);
});

langBtn.addEventListener("click", () => {
  currentLang = currentLang === "tr" ? "en" : "tr";
  chrome.storage.sync.set({ lang: currentLang });
  applyLanguage();
  updateStatus(toggleSwitch.checked);
});

function applyLanguage() {
  titleText.textContent = translations[currentLang].title;
}

function updateStatus(state) {
  statusText.textContent = state
    ? translations[currentLang].on
    : translations[currentLang].off;
}
