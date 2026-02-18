const toggleBtn = document.getElementById("toggleBtn");

/**
 * Popup açıldığında mevcut durumu yükle
 */
document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get(["dimMode"], result => {
    updateButton(result.dimMode === true);
  });
});

/**
 * Butona tıklanınca tema değiştir
 */
toggleBtn.addEventListener("click", () => {
  chrome.storage.sync.get(["dimMode"], result => {
    const newState = !result.dimMode;

    chrome.storage.sync.set({ dimMode: newState });

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
