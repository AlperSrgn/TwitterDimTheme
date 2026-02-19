const toggleSwitch = document.getElementById("toggleSwitch");
const statusText = document.getElementById("statusText");

document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get(["dimMode"], result => {
    const state = result.dimMode === true;
    toggleSwitch.checked = state;
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

function updateStatus(state) {
  statusText.textContent = state ? "Dim mode aktif" : "Dim mode kapalı";
}
