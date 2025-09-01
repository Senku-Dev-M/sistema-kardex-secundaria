# Kardex Backend (NestJS) — Base

Estructura base lista para conectar con Postgres y empezar a crear casos de uso.

## Requisitos
- Node.js 18+ (recomendado 20)
- Docker (opcional para DB)

## Pasos
1. Copia `.env.example` a `.env` y ajusta variables si es necesario.
2. (Opcional) Levanta Postgres con Docker:
   ```bash
   docker compose up -d
   ```
3. Instala dependencias y arranca en dev:
   ```bash
   npm install
   npm run start:dev
   ```

Endpoints de prueba:
- `GET http://localhost:3000/api/auth/health`
- `GET http://localhost:3000/api/students/health`
- `GET http://localhost:3000/api/incidents/health`
- `GET http://localhost:3000/api/courses/health`
