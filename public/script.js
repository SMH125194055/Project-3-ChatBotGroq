document.getElementById('send-button').addEventListener('click', sendMessage);

document.getElementById('user-input').addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    sendMessage();
  }
});

async function sendMessage() {
  const userInputElement = document.getElementById('user-input');
  const userInput = userInputElement.value.trim();

  if (!userInput) return;

  // Display user message
  displayMessage(userInput, 'user-message');

  // Clear the input field
  userInputElement.value = '';

  // Show loading indicator
  displayMessage('...', 'loading-message');

  try {
    // Generate bot response
    const botResponse = await getBotResponse(userInput);

    // Remove loading indicator
    removeLoadingIndicator();

    displayMessage(botResponse, 'bot-message');
  } catch (error) {
    removeLoadingIndicator();
    displayMessage('Sorry, something went wrong. Please try again later.', 'error-message');
  }
}

function displayMessage(message, className) {
  const chatBox = document.getElementById('chat-box');
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${className}`;
  messageDiv.textContent = message;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function removeLoadingIndicator() {
  const chatBox = document.getElementById('chat-box');
  const loadingMessages = chatBox.getElementsByClassName('loading-message');
  Array.from(loadingMessages).forEach((message) => message.remove());
}

async function getBotResponse(userInput) {
  try {
    const response = await fetch('/api.openai.com/v1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'user',
            content: userInput,
          },
        ],
        model: 'mixtral-8x7b-32768',
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Network response was not ok: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    console.log('API Response:', data);

    if (data.choices && data.choices.length > 0) {
      return data.choices[0]?.message?.content || 'Sorry, I do not understand that. Can you please rephrase?';
    } else {
      return 'Sorry, no choices found in the response.';
    }
  } catch (error) {
    console.error('Error fetching bot response:', error);
    throw error;
  }
}
