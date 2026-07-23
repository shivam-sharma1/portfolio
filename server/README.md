# Portfolio Backend API

Express + MongoDB (Mongoose) backend that powers the blogs, comments and contact
query form for the portfolio site.

## Security

- **No secrets in code.** All credentials and the connection string are built at
  runtime from environment variables (see `.env.example`). The real `.env` file is
  git-ignored and must never be committed.
- CORS is restricted to the configured frontend origin(s).
- Helmet sets secure HTTP headers and write endpoints are rate-limited.

## Setup

```bash
cd server
cp .env.example .env      # then fill in real values
npm install
npm run seed              # optional: migrate sample blogs into MongoDB
npm run dev               # or: npm start
```

### Environment variables

| Variable      | Description                                    |
| ------------- | ---------------------------------------------- |
| `DB_USERNAME` | MongoDB user (from GitHub repo secret)         |
| `DB_PASSWORD` | MongoDB password (from GitHub repo secret)     |
| `DB_HOST`     | Cluster host, e.g. `portfolio.gbiris4.mongodb.net` |
| `DB_NAME`     | Database name (e.g. `portfolio`)               |
| `DB_APP_NAME` | Mongo `appName` (e.g. `Portfolio`)             |
| `PORT`        | Server port (default 5000)                     |
| `CORS_ORIGIN` | Allowed frontend origin(s), comma-separated    |

> The password shared in chat has been exposed. **Rotate it in MongoDB Atlas** and
> store the new value only in your secret store (GitHub secrets / host env vars).

## API

| Method | Endpoint                  | Description                        |
| ------ | ------------------------- | ---------------------------------- |
| GET    | `/api/health`             | Health check                       |
| GET    | `/api/blogs`              | List published blogs               |
| GET    | `/api/blogs/categories`   | Blogs grouped by category (sidebar)|
| GET    | `/api/blogs/:slug`        | Single blog by slug                |
| GET    | `/api/comments/:blogId`   | Comments for a blog                |
| POST   | `/api/comments/:blogId`   | Add a comment                      |
| POST   | `/api/queries`            | Submit contact form                |

## Collections (MongoDB)

- **blogs** — blog posts
- **comments** — comments linked to a blog
- **queries** — contact form submissions
