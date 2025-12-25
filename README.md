## Commands

```bash
# root folder
npm run dev -w backend
npm run dev -w frontend

```

## Backend

- Built with **Node.js, Typescript**.
- Fully **separated from the frontend**, allowing it to be reused with any framework.
- Provides **authentication** with JWT (minimal).
- Handles API routes for:
  - **Jobs** – CRUD operations for job postings.
  - **Applicants** – Manage applicants for jobs.
  - **Auth** – Sign-up, login, user management.
- Owns and manages the **database** with Drizzle ORM.
- **Database commands** (run inside `backend` folder):
  ```bash
  cd ./backend
  npm run db:generate   # Generate SQL migrations
  npm run db:migrate    # Run database migrations
  npm run db:seed       # Seed database with sample datas
  ```

## Frontend

Can run independently from the backend(not completed, missing admin pages and auth)
