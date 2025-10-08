# Medical Backend

Express + Sequelize + PostgreSQL backend with JWT signup/login, validation, logging and Swagger docs.

## Setup

1. Copy environment variables:
   - Create a `.env` file with values based on `.env.example` (if blocked, create manually). Required keys:
     - `PORT`, `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASS`, `DB_DIALECT`, `JWT_SECRET`, `JWT_ACCESS_EXPIRATION_MINUTES`, `BCRYPT_SALT_ROUNDS`.
2. Install dependencies:
   - `npm install`
3. Start server:
   - Dev: `npm run dev`
   - Prod: `npm start`

## Endpoints

- POST `/v1/auth/signup` { username, email, password, role? }
- POST `/v1/auth/login` { emailOrUsername, password }
- GET `/v1/auth/me` (Authorization: Bearer <token>)

Docs: `/docs`


