const GEMINI_API_KEY = "";
const MODEL_NAME = 'gemini-3-flash-preview';

let pageContent = '';

// On load, grab the page text
async function getActiveTabContent() {
  try {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab) {
      chrome.tabs.sendMessage(tab.id, { action: 'getPageContent' }, (response) => {
        if (chrome.runtime.lastError) {
          console.warn("Could not get page content. Please refresh the page.", chrome.runtime.lastError.message);
          pageContent = "No page context found. The user might be on a restricted page (like chrome://) or the page needs to be refreshed.";
        } else {
          pageContent = response?.content || "No text could be extracted.";
        }
      });
    }
  } catch (err) {
    console.error(err);
  }
}

getActiveTabContent();

const chatContainer = document.getElementById('chat-container');
const questionInput = document.getElementById('question-input');
const sendBtn = document.getElementById('send-btn');

function appendMessage(text, sender) {
  const div = document.createElement('div');
  div.className = `message ${sender}`;
  if (sender === 'system loading') {
    div.className = 'message system loading';
  }
  div.textContent = text;
  chatContainer.appendChild(div);
  chatContainer.scrollTop = chatContainer.scrollHeight;
  return div;
}

sendBtn.addEventListener('click', askQuestion);
questionInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    askQuestion();
  }
});

async function askQuestion() {
  const question = questionInput.value.trim();
  if (!question) return;

  appendMessage(question, 'user');
  questionInput.value = '';
  const loadingMsg = appendMessage('Thinking...', 'system loading');

  sendBtn.disabled = true;

  try {
    const prompt = `Use the following webpage content as context to answer the user's question.\n\nContext:\n${pageContent}\n\nQuestion: ${question}`;

    // Using generative AI rest endpoint
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      })
    });

    const data = await response.json();
    loadingMsg.remove();

    if (!response.ok || !data.candidates || data.candidates.length === 0) {
      console.error(data);
      appendMessage("Sorry, I encountered an error. Please check the console.", 'system');
    } else {
      const answer = data.candidates[0].content.parts[0].text;
      appendMessage(answer, 'system');
    }
  } catch (error) {
    loadingMsg.remove();
    appendMessage(error.message, 'system');
  } finally {
    sendBtn.disabled = false;
  }
}
