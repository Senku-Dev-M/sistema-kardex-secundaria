# Kardex Frontend (React + Vite + Tailwind) — Base

Proyecto base listo para conectar con el backend NestJS.

## Pasos
1. Instala dependencias:
   ```bash
   npm install
   ```
2. Arranca en desarrollo:
   ```bash
   npm run dev
   ```
3. Abre `http://localhost:5173`

## Estructura sugerida
- `src/api` → llamadas HTTP (axios)
- `src/core` → modelos y casos de uso (clean-ish)
- `src/features` → pantallas por módulo (auth, parents, incidents, etc.)
