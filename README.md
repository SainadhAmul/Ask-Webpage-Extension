# Ask Page Chrome Extension

A minimalistic, zero-dependency Chrome extension that allows you to summarize, chat, and ask questions about the currently active web page using the power of Google's **Gemini 3.0 Flash Preview** model.

## Features

- **Context-Aware Interactions**: Extracts the readable text from the browser tab you are viewing to provide directly relevant answers.
- **Smart UI (Side Panel)**: Uses Chrome's native Side Panel API so your chat UI persists seamlessly while you read and navigate web pages.
- **Minimalist Aesthetic**: Features a beautiful glassmorphism dark theme, utilizing Inter fonts and clean micro-animations.
- **Zero-Dependency Setup**: Built entirely with Vanilla JavaScript, HTML, and CSS. No `npm`, Webpack, or Vite is required.

## Installation

Because this is a local extension, you can install it seamlessly without downloading anything from the Web Store:

1. Open Google Chrome and type `chrome://extensions/` into your address bar.
2. In the top-right corner of the Extensions page, toggle **Developer mode** to **ON**.
3. Click the **Load unpacked** button that appears in the top-left area.
4. Select the directory containing these extension files.
5. *(Optional)* Click the puzzle piece icon (Extensions menu) next to your profile avatar and **Pin** the "Ask Page" extension to your toolbar for easy access.

## Usage

1. Navigate to any standard web page containing text (e.g., Wikipedia, an article, or documentation).  
   *(Note: Extension content scripts cannot inherently run on `chrome://` internal pages or Web Store pages).*
2. Click the **Ask Page** extension icon.
3. The Chat Side Panel will slide open. Type your question and let Gemini generate an answer using the page's context!

---

> **Security Warning**  
> Since there is no build step included out-of-the-box, the `GEMINI_API_KEY` is embedded explicitly within `main.js`. Ensure you **do not push** this repository to public version control or publish it to the Chrome Web store without implementing an options/settings page to keep the key private.
