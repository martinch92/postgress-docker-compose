-- Crear tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de posts
CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar datos de ejemplo
INSERT INTO users (name, email) VALUES 
    ('Juan Pérez', 'juan@example.com'),
    ('María García', 'maria@example.com'),
    ('Carlos López', 'carlos@example.com'),
    ('Ana Martínez', 'ana@example.com')
ON CONFLICT (email) DO NOTHING;

INSERT INTO posts (title, content, user_id) VALUES 
    ('Bienvenidos a nuestra plataforma', 'Este es el primer post de bienvenida a nuestra aplicación full stack.', 1),
    ('Guía de uso', 'Aquí encontrarás todo lo que necesitas saber para usar la aplicación.', 1),
    ('Mi experiencia', 'Quiero compartir mi experiencia usando esta increíble plataforma.', 2),
    ('Consejos útiles', 'Algunos consejos que pueden ser útiles para nuevos usuarios.', 3),
    ('Actualizaciones recientes', 'Las últimas actualizaciones incluyen mejoras en la interfaz.', 4)
ON CONFLICT DO NOTHING;

-- 🗄️ Script de Inicialización de la Base de Datos