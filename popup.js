const toggleBtn = document.getElementById("toggleBtn");

/**
 * Popup açıldığında mevcut durumu yükle
 */
document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get(["darkMode"], result => {
    updateButton(result.darkMode === true);
  });
});

/**
 * Butona tıklanınca tema değiştir
 */
toggleBtn.addEventListener("click", () => {
  chrome.storage.sync.get(["darkMode"], result => {
    const newState = !result.darkMode;

    chrome.storage.sync.set({ darkMode: newState });

    // aktif sekmeye mesaj gönder
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      if (tabs[0]?.id) {
        chrome.tabs.sendMessage(tabs[0].id, { toggle: newState });
      }
    });

    updateButton(newState);
  });
});

/**
 * Buton yazısını güncelle
 */
function updateButton(state) {
  toggleBtn.textContent = state ? "Turn off" : "Turn on";
}
