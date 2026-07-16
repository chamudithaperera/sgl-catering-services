# SGL Catering Services

Local-first full-stack website for SGL Catering Services built with React, Node.js, and PostgreSQL.

## Stack

- React + Vite
- Node.js + Express
- Prisma ORM
- PostgreSQL via Docker

## Local setup

1. Copy environment files:
   - `cp server/.env.example server/.env`
   - `cp client/.env.example client/.env`
2. Choose one PostgreSQL option:
   - Docker: `npm run db:up`
   - Existing local PostgreSQL: update `server/.env` with your local connection string.
3. Sync the schema and seed the database:
   - `npm run prisma:push`
   - `npm run prisma:seed`
4. Start the frontend and backend together:
   - `npm run dev`

## Current machine note

This local build was verified on July 16, 2026 against an existing Homebrew PostgreSQL instance running on port `5435`, using:

- `DATABASE_URL=postgresql://chamudithaperera@localhost:5435/sgl_catering?schema=public`

## URLs

- Website: `http://localhost:5173`
- Admin: `http://localhost:5173/admin`
- API: `http://localhost:4000/api`

## Seeded admin login

- Email: `admin@sglcateringservice.lk`
- Password: `Admin@123`

## Useful scripts

- `npm run dev` - run frontend and backend together
- `npm run build` - build the React app
- `npm run db:down` - stop PostgreSQL
- `npm run prisma:push` - sync Prisma schema to the database
- `npm run prisma:seed` - reseed sample content
