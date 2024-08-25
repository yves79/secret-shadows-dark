document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.getElementById('chat-box');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');

    // Check for authentication
    fetch('/check-auth')
    .then(response => response.json())
    .then(data => {
        if (!data.authenticated) {
            window.location.href = 'login.html';
        }
    });

    sendButton.addEventListener('click', () => {
        const message = messageInput.value;
        if (message.trim() !== '') {
            fetch('/send-message', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message })
            })
            .then(response => response.json())
            .then(data => {
                displayMessage(data.message, data.user);
                messageInput.value = '';
            });
        }
    });

    function displayMessage(message, user) {
        const msgDiv = document.createElement('div');
        msgDiv.textContent = `${user}: ${message}`;
        chatBox.appendChild(msgDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    fetch('/get-messages')
    .then(response => response.json())
    .then(data => {
        data.messages.forEach(msg => displayMessage(msg.message, msg.user));
    });
});