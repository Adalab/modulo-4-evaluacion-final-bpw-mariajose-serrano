CREATE DATABASE IF NOT EXISTS recetas_db;
USE recetas_db;

CREATE TABLE recetas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  ingredients TEXT,
  instructions TEXT,
  time_minutes INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
