document.getElementById('register-main').addEventListener('click', goToRegister);

async function goToRegister() {
	window.location.href = 'http://127.0.0.1:3000/register/register.html';
}

document.getElementById('login-main').addEventListener('click', goToLogin);

async function goToLogin() {
	window.location.href = 'http://127.0.0.1:3000/login/login.html';
}
