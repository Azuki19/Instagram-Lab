const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const db = {
  players: [],
  posts: [],
};

// Ruta para obtener todos los usuarios
app.get("/users", (request, response) => {
  response.send(db.players);
});

// Ruta para registrar un usuario
app.post("/user", (request, response) => {
  const { body } = request;
  const { username } = body;

  // Verificar si el nombre de usuario ya existe en la base de datos
  const existingUser = db.players.find(player => player.username === username);
  if (existingUser) {
      // Si el nombre de usuario ya está en uso, enviar un error
      return response.status(409).send({ message: "Username already exists" });
  }

  // Si no existe, agregar el usuario a la base de datos
  db.players.push(body);
  response.status(201).send(body);
});


// Ruta para crear un post
app.post("/post", (request, response) => {
  const { body } = request;
  db.posts.push(body);
  response.status(201).send(body);
});

// Ruta para obtener todos los posts
app.get("/posts", (request, response) => {
  response.send(db.posts);
});

app.listen(5050, () => {

  console.log(`Server is running on http://localhost:${5050}`);
});


// Ruta para manejar el login
app.post("/login", (request, response) => {
  const { username, password } = request.body;

  // Buscar el usuario en la base de datos
  const user = db.players.find(u => u.username === username && u.password === password);

  if (user) {
      // Si se encuentra el usuario, responder con éxito
      response.status(200).send({ user: { username: user.username, name: user.name } });
  } else {
      // Si no se encuentra el usuario o la contraseña no coincide, responder con error
      response.status(401).send({ message: "Invalid username or password" });
  }
});
