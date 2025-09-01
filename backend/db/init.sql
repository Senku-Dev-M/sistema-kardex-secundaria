-- ========================================
-- 📌 Tablas base: Estudiantes, Profesores
-- ========================================

CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    ci VARCHAR(20) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    birth_date DATE NOT NULL,
    gender CHAR(1),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE teachers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE
);

-- ========================================
-- 📌 Años escolares y cursos
-- ========================================

CREATE TABLE school_years (
    id SERIAL PRIMARY KEY,
    year INT NOT NULL,           -- Ej: 2025
    start_date DATE NOT NULL,
    end_date DATE NOT NULL
);

CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    grade INT NOT NULL,          -- 1 = 1ro, 2 = 2do ... hasta 6
    section VARCHAR(5),          -- Ej: "A", "B"
    year_id INT REFERENCES school_years(id) ON DELETE CASCADE
);

-- Relación estudiante ↔ curso (inscripción)
CREATE TABLE enrollments (
    id SERIAL PRIMARY KEY,
    student_id INT REFERENCES students(id) ON DELETE CASCADE,
    course_id INT REFERENCES courses(id) ON DELETE CASCADE,
    enrolled_at TIMESTAMP DEFAULT NOW(),
    UNIQUE (student_id, course_id)
);

-- ========================================
-- 📌 Materias y catálogo de incidentes
-- ========================================

CREATE TABLE subjects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- Materias estándar del currículo boliviano
INSERT INTO subjects (name) VALUES
('Ciencias Naturales: Biología – Geografía'),
('Ciencias Naturales: Física'),
('Ciencias Naturales: Química'),
('Matemática'),
('Técnica Tecnológica General'),
('Comunicación y Lenguajes: Lengua Castellana'),
('Comunicación y Lenguajes: Lengua Originaria'),
('Lengua Extranjera'),
('Ciencias Sociales'),
('Artes Plásticas y Visuales'),
('Educación Musical'),
('Educación Física y Deportes'),
('Cosmovisiones, Filosofía y Psicología'),
('Valores, Espiritualidad y Religiones');

-- Tipos de incidente (faltas, reconocimientos, etc.)
CREATE TABLE incident_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

INSERT INTO incident_types (name) VALUES
('Falta'),
('Retraso'),
('Tarea no entregada'),
('Incidente disciplinario'),
('Felicitación');

-- ========================================
-- 📌 Asignaciones profesor ↔ materia ↔ curso
-- ========================================

CREATE TABLE assignments (
    id SERIAL PRIMARY KEY,
    teacher_id INT REFERENCES teachers(id) ON DELETE CASCADE,
    subject_id INT REFERENCES subjects(id) ON DELETE CASCADE,
    course_id INT REFERENCES courses(id) ON DELETE CASCADE,
    UNIQUE (teacher_id, subject_id, course_id)
);

-- ========================================
-- 📌 Incidentes (Kardex disciplinario)
-- ========================================

CREATE TABLE incidents (
    id SERIAL PRIMARY KEY,
    student_id INT REFERENCES students(id) ON DELETE CASCADE,
    teacher_id INT REFERENCES teachers(id) ON DELETE SET NULL,
    subject_id INT REFERENCES subjects(id) ON DELETE SET NULL,
    type_id INT REFERENCES incident_types(id) ON DELETE CASCADE,
    description TEXT,
    date TIMESTAMP DEFAULT NOW()
);

-- ========================================
-- 📌 Usuarios (login solo profesores y admins)
--    Padres acceden con CI + fecha de nacimiento
-- ========================================

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'teacher'))
);
