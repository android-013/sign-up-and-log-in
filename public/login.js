// login.js
document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const phone_number = document.getElementById('phone_number').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone_number, password })
    });

    const data = await response.json();

    if (response.ok) {
        alert('Login successful!');
        window.location.href = 'home.html'; // Redirect to the home page after login
    } else {
        alert(data.error || 'Invalid credentials');
    }
});
