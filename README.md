# Blog

## Integrantes

* Camilo Suárez Sandí (C17811)
* Ángel Chaves Chinchilla (c12113)

## Manual de usuario

Instalar Node.js.

Clonar el repositorio.

Abrir el directorio del repositorio.

Editar el archivo `config/config.json` y asignar los valores de la base de datos.

En una terminal ejecutar el comando `node src/main.js`.

Abrir la página `http://127.0.0.1:3000` en un navegador.

## Servicio REST

| Endpoint                  | Method | Request URL                             | Request Body                           | Response Body                    |
| ------------------------- | ------ | --------------------------------------- | -------------------------------------- | -------------------------------- |
| Crear usuario               | POST   | /users                                  | username, email, hashed_password       | result: boolean                  |
| Obtener usuario por identificador            | GET    | /users/{userId}                         |                                        | result: User?, error: string     |
| Obtener usuario por nombre de usuario      | GET    | /users/by-username/{username}           |                                        | result: User?, error: string     |
| Asignar si un usuario es autor        | PATCH  | /users/{userId}/author/{value}          |                                        | result: boolean, error: string   |
| Asignar si un usuario es administrador | PATCH  | /users/{userId}/admin/{value}           |                                        | result: boolean, error: string   |
| Obtener todos los usuarios             | GET    | /admin/users                            |                                        | users: Array<User>               |
| Obtener todos los autores           | GET    | /admin/users/authors                    |                                        | users: Array<User>               |
| Crear publicación               | POST   | /posts                                  | title, summary, text, image, author_id | result: boolean                  |
| Obtener publicación por identificador            | GET    | /posts/{postId}                         |                                        | result: Post?, error: string     |
| Obtener todas las publicaciones             | GET    | /posts                                  |                                        | posts: Array<Post>               |
| Obtener publicaciones por categoría      | GET    | /posts/by-category/{categoryId}         |                                        | posts: Array<Post>               |
| Crear comentario            | POST   | /posts/{postId}/comments                | user_id, text                          | result: boolean                  |
| Obtener comentario por identificador         | GET    | /posts/{postId}/comments/{commentId}    |                                        | result: Comment?, error: string  |
| Obtener todos los comentarios de una publicación  | GET    | /posts/{postId}/comments                |                                        | comments: Array<Comment>         |
| Crear categoría           | POST   | /categories                             | name                                   | result: boolean                  |
| Obtener categoría por identificador        | GET    | /categories/{categoryId}                |                                        | result: Category?, error: string |
| Obtener todas las categorías        | GET    | /categories                             |                                        | categories: Array<Category>      |
| Agregar una categoría a una publicación      | POST   | /posts/{postId}/categories/{categoryId} |                                        | result: boolean, error: string   |
| Borrar una categoría de una publicación   | DELETE | /posts/{postId}/categories/{categoryId} |                                        | result: boolean, error: string   |
| Autenticar usuario         | POST   | /auth/users/{userId}                    | hashed_password                        | result: boolean, error: string   |
| Iniciar sesión             | POST   | /sessions/{userId}                      | hashed_password                        | result: boolean, error: string   |
| Obtener las publicaciones de un usuario            | GET    | /users/{userId}/posts                   |                                        | posts: Array<Post>               |
| Obtener una cantidad de publicaciones            | GET    | /posts/{count}/offset/{offset}          |                                        | posts: Array<Post>               |
