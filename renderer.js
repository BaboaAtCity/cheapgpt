document.getElementById('send-button').addEventListener('click', async () => {
    const apiKey = document.getElementById('api-key').value;
    const userInput = document.getElementById('user-input').value;
    const chatBox = document.getElementById('chat-box');
  
    if (!apiKey || !userInput) {
      alert('Please enter both API key and message.');
      return;
    }
  
    const messageDiv = document.createElement('div');
    messageDiv.textContent = `You: ${userInput}`;
    chatBox.appendChild(messageDiv);
  
    try {
      const response = await window.api.sendMessage(apiKey, userInput);
      const botResponseDiv = document.createElement('div');
      botResponseDiv.textContent = `Bot: ${response}`;
      botResponseDiv.style.color = "green";
      chatBox.appendChild(botResponseDiv);
    } catch (error) {
      const errorDiv = document.createElement('div');
      errorDiv.textContent = `Error: ${error.message}`;
      chatBox.appendChild(errorDiv);
    }
  });
  