# SGL Catering Services

Local-first full-stack website for SGL Catering Services built with React, Node.js, and MySQL.

## Stack

- React + Vite
- Node.js + Express
- Prisma ORM
- MySQL via cPanel or a local database

## Local setup

1. Copy environment files:
   - `cp server/.env.example server/.env`
   - `cp client/.env.example client/.env`
2. Configure MySQL:
   - Namecheap/cPanel: update `server/.env` with the cPanel MySQL connection string.
   - Local MySQL: update `server/.env` with your local connection string.
3. Sync the schema and seed the database:
   - `npm run prisma:push`
   - `npm run prisma:seed`
4. Start the frontend and backend together:
   - `npm run dev`

## Production database

Namecheap cPanel database URLs should use this shape:

- `DATABASE_URL=mysql://cpaneluser_sgl_user:password@localhost:3306/cpaneluser_sgl_catering`

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
