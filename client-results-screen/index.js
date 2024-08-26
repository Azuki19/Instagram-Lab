// Función para obtener y mostrar todos los usuarios registrados
async function fetchUsers() {
	try {
			const response = await fetch('http://localhost:5050/users');
			if (!response.ok) {
					throw new Error('Failed to fetch users');
			}
			const users = await response.json();
			renderUsers(users);
	} catch (error) {
			console.error('Error fetching users:', error);
	}
}

// Función para obtener y mostrar todos los posts creados
async function fetchPosts() {
	try {
			const response = await fetch('http://localhost:5050/posts');
			if (!response.ok) {
					throw new Error('Failed to fetch posts');
			}
			const posts = await response.json();
			renderPosts(posts);
	} catch (error) {
			console.error('Error fetching posts:', error);
	}
}

// Función para renderizar usuarios en la pantalla de administración
function renderUsers(users) {
	const userContainer = document.getElementById('usuarios');
	userContainer.innerHTML = ''; // Limpiar contenido anterior

	if (users.length === 0) {
			userContainer.innerHTML = '<p>No users registered.</p>';
			return;
	}

	users.forEach(user => {
			const userElement = document.createElement('div');
			userElement.innerHTML = `
					<p><b>Username:</b> ${user.username}</p>
					<p><b>Name:</b> ${user.name}</p>
			`;
			userContainer.appendChild(userElement);
	});
}

// Función para renderizar posts en la pantalla de administración
function renderPosts(posts) {
	const postContainer = document.getElementById('posts');
	postContainer.innerHTML = ''; // Limpiar contenido anterior

	if (posts.length === 0) {
			postContainer.innerHTML = '<p>No posts available.</p>';
			return;
	}

	posts.forEach(post => {
			const postElement = document.createElement('div');
			postElement.className = 'post-item';

			// Incluir la imagen si la URL está presente
			let imageContent = '';
			if (post.imageURL) {
					imageContent = `<img src="${post.imageURL}" alt="Post image" style="max-width: 200px; max-height: 200px;" />`;
			}

			postElement.innerHTML = `
					<p>${post.name} | @${post.username}</p>
					<h2>${post.title}</h2>
					<p>${post.description}</p>
					${imageContent}
			`;
			postContainer.appendChild(postElement);
	});
}

// Función para actualizar la pantalla de administración cada 5 segundos
function startAutoRefresh() {
	fetchUsers();
	fetchPosts();
	setInterval(() => {
			fetchUsers();
			fetchPosts();
	}, 5000); // Actualizar cada 5000 milisegundos (5 segundos)
}

// Llamada a la función para iniciar la actualización automática al cargar la página
document.addEventListener('DOMContentLoaded', startAutoRefresh);
