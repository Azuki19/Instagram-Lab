document.getElementById('back-main').addEventListener('click', goToMain);

async function goToMain() {
	window.location.href = 'http://127.0.0.1:3000/index.html';
}

document.querySelector('form').addEventListener('submit', createPost);

// Evento para el botón "Clean Fields"
document.getElementById('clean-fields').addEventListener('click', cleanFields);

async function createPost(event) {
	event.preventDefault(); // Evita el comportamiento por defecto del formulario

	const title = document.getElementById('titlePost').value;
	const description = document.getElementById('description').value;
	const imageURL = document.getElementById('imageURL').value; // Nueva línea para obtener la URL de la imagen

	// Obtener username y name desde localStorage
	const username = localStorage.getItem('username');
	const name = localStorage.getItem('name');

	if (!username || !name) {
		alert('User not logged in. Please log in first.');
		return;
	}

	const post = {
		title: title,
		description: description,
		imageURL: imageURL, // Incluir la URL de la imagen en el objeto post
		username: username,
		name: name,
	};

	try {
		const response = await fetch('http://localhost:5050/post', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(post),
		});

		if (!response.ok) {
			throw new Error('Error creating post');
		}

		// Renderiza el nuevo post junto con los anteriores
		await fetchPosts();
	} catch (error) {
		console.error('Failed to create post:', error);
	}
}

// Función para limpiar los campos del formulario
function cleanFields() {
	document.getElementById('titlePost').value = '';
	document.getElementById('description').value = '';
	document.getElementById('imageURL').value = '';
}

async function fetchPosts() {
	try {
		const response = await fetch('http://localhost:5050/posts');
		const posts = await response.json();

		const container = document.getElementById('data-container');
		container.innerHTML = ''; // Limpiar el contenido anterior

		posts.forEach((post) => {
			const section = document.createElement('section');
			section.className = 'post-item';

			// Incluir la imagen si la URL está presente
			let imageContent = '';
			if (post.imageURL) {
				imageContent = `<img src="${post.imageURL}" alt="Post image" style="max-width: 200px; max-height: 200px;" />`;
			}

			section.innerHTML = `
				<p>${post.name} | @${post.username}</p>
				<h2>${post.title}</h2>
				<p>${post.description}</p>
				${imageContent}
			`;
			container.appendChild(section);
		});
	} catch (error) {
		console.error('Failed to fetch posts:', error);
	}
}

// Carga todos los posts al cargar la página
fetchPosts();
