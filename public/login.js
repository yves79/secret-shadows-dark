document.addEventListener('DOMContentLoaded', () => {
    const usernameInput = document.getElementById('username-input');
    const loginButton = document.getElementById('login-button');

    loginButton.addEventListener('click', () => {
        const username = usernameInput.value.trim();
        if (username) {
            fetch('/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    window.location.href = 'index.html';
                } else {
                    alert(data.message);
                }
            });
        }
    });
});