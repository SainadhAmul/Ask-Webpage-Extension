chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getPageContent') {
    const bodyText = document.body.innerText || document.body.textContent;
    sendResponse({ content: bodyText.substring(0, 150000) });
  }
  return true; // Keep message channel open if needed
});
