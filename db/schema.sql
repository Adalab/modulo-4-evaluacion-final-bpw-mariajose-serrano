CREATE DATABASE IF NOT EXISTS recetas_db;
USE recetas_db;

DROP TABLE IF EXISTS receta_ingrediente;
DROP TABLE IF EXISTS ingredientes;
DROP TABLE IF EXISTS recetas;

CREATE TABLE recetas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  instructions TEXT,
  time_minutes INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ingredientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(80) NOT NULL UNIQUE
);

CREATE TABLE receta_ingrediente (
  id INT AUTO_INCREMENT PRIMARY KEY,
  receta_id INT NOT NULL,
  ingrediente_id INT NOT NULL,
  quantity VARCHAR(50),
  UNIQUE(receta_id, ingrediente_id),
  FOREIGN KEY (receta_id) REFERENCES recetas(id) ON DELETE CASCADE,
  FOREIGN KEY (ingrediente_id) REFERENCES ingredientes(id) ON DELETE CASCADE
);
