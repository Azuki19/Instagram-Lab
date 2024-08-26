document.getElementById('back-main').addEventListener('click', goToMain);

async function goToMain() {
    window.location.href = 'http://127.0.0.1:3000/index.html';
}

document.getElementById('login-form').addEventListener('submit', loginUser);

async function loginUser(event) {
    event.preventDefault();

    try {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const user = {
            username: username,
            password: password,
        };

        const response = await fetch('http://localhost:5050/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Login successful:', data.user);

            // Guardar datos del usuario en localStorage
            localStorage.setItem('username', data.user.username);
            localStorage.setItem('name', data.user.name);

            renderSuccessMessage();
            goToCreatePost();  // Redirige a la página de creación de post
        } else {
            renderErrorMessage();
        }
    } catch (error) {
        renderErrorMessage();
    }
}


async function goToCreatePost() {
    window.location.href = 'http://127.0.0.1:3000/createpost/createpost.html';
}

function renderErrorMessage() {
    const container = document.getElementById('data-container');
    container.innerHTML = '<p style="color: red;">Invalid username or password</p>';
    console.log('Invalid username or password');
}

function renderSuccessMessage() {
    const container = document.getElementById('data-container');
    container.innerHTML = '<p style="color: green;">Login successful!</p>';
    console.log('Login successful!');
}
