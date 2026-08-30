# 🌙 Dim Theme for X

A custom **dim theme for X (Twitter)** that makes the interface darker, softer, and easier on the eyes.

Unlike the standard dark theme, this extension uses a more balanced **dark blue-gray color palette** to reduce the harsh contrast of a fully black interface.

## ✨ Features

- 🌙 **Advanced dim theme** for X (Twitter)
- 🎛️ **Enable / disable** the theme instantly from the extension popup
- 💾 **Remembers your theme preference**
- 🌍 **Turkish and English** interface
- ⚡ Applies the theme automatically when the page loads
- 🛠️ Automatically handles dynamically loaded content

## 🚀 Installation

This extension is currently installed manually as an **unpacked Chrome extension**.

### 1. Download the Extension

**The easiest way is to download the project as a ZIP file.**

👉 **[Download ZIP from GitHub](https://github.com/AlperSrgn/TwitterDimTheme/archive/refs/heads/master.zip)**

After downloading:

1. Extract the downloaded `.zip` file.
2. Open the extracted `TwitterDimTheme` folder.
3. Keep this folder somewhere on your computer — **do not delete it**, as Chrome will load the extension directly from this folder.

> 💡 **You don't need Git or any programming knowledge to install the extension.** Just download the ZIP file and extract it.

Alternatively, if you use Git, you can clone the repository:

```bash
git clone https://github.com/AlperSrgn/TwitterDimTheme.git
```

### 2. Open Chrome Extensions

Open:

```text
chrome://extensions/
```

### 3. Enable Developer Mode

Turn on **Developer mode** in the top-right corner.

### 4. Load the Extension

Click:

**Load unpacked**

Then select the **extracted `TwitterDimTheme` folder**.

### 5. Open X

Go to:

```text
https://x.com
```

or:

```text
https://twitter.com
```

The extension will automatically apply the dim theme.

## 🎛️ Usage

Click the extension icon in your browser toolbar to open the control panel.

From the popup you can:

- Turn the dim theme **on or off**
- Check whether you are currently on X
- Switch between **Turkish 🇹🇷 and English 🇬🇧**

Your theme setting is saved automatically, so you don't need to enable it again every time you open the browser.

## 🧩 Project Structure

```text
TwitterDimTheme/
│
├── icons/
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   └── icon128.png
│
├── content.js
├── generate_icons.py
├── manifest.json
├── popup.html
├── popup.js
└── style.css
```

### Main Files

| File                | Description                                            |
| ------------------- | ------------------------------------------------------ |
| `manifest.json`     | Chrome extension configuration                         |
| `content.js`        | Controls theme behavior and dynamically loaded content |
| `style.css`         | Contains the main theme styles                         |
| `popup.html`        | Extension popup interface                              |
| `popup.js`          | Popup controls, language switching, and theme state    |
| `generate_icons.py` | Utility for generating extension icons                 |
| `icons/`            | Extension icons                                        |

## 🛠️ Development

To modify the theme:

1. Clone the repository.
2. Make your changes to `style.css`, `content.js`, or the popup files.
3. Open `chrome://extensions/`.
4. Enable **Developer mode**.
5. Click **Reload** on the extension.
6. Refresh X/Twitter and test your changes.

No build system or external package installation is required.

---

⭐ If you find this extension useful, consider giving the project a **star** on GitHub!
