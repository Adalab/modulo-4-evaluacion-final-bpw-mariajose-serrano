# API Recetas

API backend desarrollada con **Node.js, Express y MySQL** para la gestión de recetas y sus ingredientes.  
El proyecto permite crear, consultar, actualizar y eliminar recetas, así como gestionar la relación con ingredientes.

---

## Tecnologías utilizadas

- Node.js
- Express
- MySQL
- mysql2
- dotenv
- cors
- nodemon

---

## Estructura del proyecto

.
├── README.md
├── package.json
├── index.js
├── .gitignore
├── src
│ ├── db.js
│ └── routes
│ └── recetas.js
└── db
├── schema.sql
└── dump
└── recetas_db_dump.sql

## Base de datos

La base de datos se llama **`recetas_db`** y contiene las siguientes tablas:

- `recetas`
- `ingredientes`
- `receta_ingrediente` (tabla intermedia para relación muchos a muchos)

### Crear la base de datos desde el schema

1. Abrir **MySQL Workbench**
2. Conectarse a la base de datos local
3. Abrir una **Query nueva**
4. Ejecutar el contenido del archivo:


Esto creará la base de datos y todas las tablas necesarias.

### Dump de la base de datos

El proyecto incluye un export/dump de la base de datos en:


Este archivo puede utilizarse para restaurar la base de datos completa.

---

## Variables de entorno

Crear un archivo **`.env`** en la raíz del proyecto (no se sube al repositorio) con el siguiente contenido:

DB_HOST=localhost
DB_USER=tu_usuario_mysql
DB_PASSWORD=tu_password_mysql
DB_NAME=recetas_db
DB_PORT=3306
PORT=3000


---

## Instalación del proyecto

1. Clonar el repositorio
2. Instalar dependencias:

```bash
npm install


Arrancar el servidor:

npm run dev


El servidor se ejecutará en:

http://localhost:3000

Endpoints de la API
GET /recetas

Devuelve la lista de todas las recetas.

GET /recetas/:id

Devuelve una receta concreta junto con sus ingredientes.

POST /recetas

Crea una nueva receta (con ingredientes opcionales).

Ejemplo de body:

{
  "title": "Tortilla de patatas",
  "instructions": "Batir huevos, freír patatas y mezclar.",
  "time_minutes": 20,
  "ingredients": [
    { "name": "huevo", "quantity": "3" },
    { "name": "patata", "quantity": "2" }
  ]
}

PUT /recetas/:id

Actualiza una receta existente.

DELETE /recetas/:id

Elimina una receta por su id.

Notas

El archivo .env está incluido en .gitignore y no forma parte del repositorio.

La relación entre recetas e ingredientes se gestiona mediante claves foráneas y ON DELETE CASCADE.

Autor

Proyecto realizado como evaluación del módulo de Express y Bases de Datos.
