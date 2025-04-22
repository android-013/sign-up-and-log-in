// signup.js
document.getElementById('signup-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const phone_number = document.getElementById('phone_number').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone_number, username, password })
    });

    const data = await response.json();

    if (response.ok) {
        alert('Account created successfully!');
        window.location.href = 'login.html';
    } else {
        alert(data.error || 'Error signing up');
    }
});
