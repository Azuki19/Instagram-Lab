// Manejar el evento de clic para volver a la página principal
document.getElementById('back-main').addEventListener('click', goToMain);

async function goToMain() {
    window.location.href = 'http://127.0.0.1:3000/index.html';
}

// Manejar el envío del formulario de registro
document.getElementById('register-form').addEventListener('submit', createUser);

async function createUser(event) {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente

    const username = document.getElementById('username').value.trim();
    const name = document.getElementById('name').value.trim();
    const password = document.getElementById('password').value.trim();

    // Validación para asegurarse de que los campos no estén vacíos
    if (!username || !name || !password) {
        renderErrorMessage('All fields are required.');
        return;
    }

    try {
        const user = {
            username: username,
            name: name,
            password: password,
        };

        const response = await fetch('http://localhost:5050/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (response.status === 409) {
            // Si el usuario ya existe, mostrar un mensaje de error
            renderUserExistsMessage();
            return;
        }

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        console.log('User created:', user);
        renderSuccessMessage();
    } catch (error) {
        renderErrorState();
    }
}

// Función para limpiar los campos del formulario
function cleanFields() {
    document.getElementById('username').value = '';
    document.getElementById('name').value = '';
    document.getElementById('password').value = '';
}

// Asignar evento al botón de limpiar campos
document.getElementById('clean').addEventListener('click', cleanFields);

// Renderizar mensaje de error si falla el registro o si faltan campos
function renderErrorMessage(message) {
    const container = document.getElementById("data-container");
    container.innerHTML = ""; // Limpiar datos previos
    container.innerHTML = `<p style="color: red;">${message}</p>`;
    console.log(message);
}

// Renderizar mensaje de éxito al crear un usuario
function renderSuccessMessage() {
    const container = document.getElementById('data-container');
    container.innerHTML = '<p>User created successfully! Redirecting to login...</p>';
    console.log('User created successfully!');

    setTimeout(() => {
        window.location.href = 'http://127.0.0.1:3000/login/login.html';
    }, 500);
}

// Renderizar mensaje si el usuario ya existe
function renderUserExistsMessage() {
    const container = document.getElementById('data-container');
    container.innerHTML = '<p style="color: red;">Username already exists. Please choose a different one.</p>';
    console.log('Username already exists. Please choose a different one.');
}

// Cargar y mostrar usuarios registrados al cargar la página
document.addEventListener('DOMContentLoaded', fetchRegisteredUsers);

async function fetchRegisteredUsers() {
    try {
        const response = await fetch('http://localhost:5050/users');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const users = await response.json();
        renderUsers(users);
    } catch (error) {
        console.error('Failed to fetch users:', error);
        renderErrorState();
    }
}

