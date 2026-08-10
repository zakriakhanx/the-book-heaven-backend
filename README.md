# The Book Heaven — Backend

Express + MongoDB REST API for **The Book Heaven**, a community-driven book recommendation platform. See the [root README](../README.md) for the full project overview, then start here for backend specifics.

## Stack

- **Node.js** + **Express 4**
- **MongoDB** via **Mongoose 8** (schemas, schema validation, `populate`)
- **Clerk** (`@clerk/express`) — session/JWT verification, admin role checks
- **cors** (open CORS), **dotenv** (configuration)

## Getting Started

```bash
cd the-book-heaven-backend
npm install
npm start          # runs node server.js → http://localhost:5000
# dev with hot reload: npx nodemon server.js
```

### Environment Variables (`.env`)

```
PORT=5000
DB_URI=<mongodb connection string>
CLERK_PUBLISHABLE_KEY=<your clerk publishable key>
CLERK_SECRET_KEY=<your clerk secret key>
```

`config/env.js` loads the file and exports `PORT` and `DB_URI`; `config/db.js` connects via Mongoose and exits if `DB_URI` is missing.

## Entry Point — `server.js`

- Global middleware: `cors()`, `express.json()`, `clerkMiddleware()`
- Mounts all routers under `/api` (profiles under `/api/users`)
- Applies the error middleware last

## Routes

### Books (`routes/bookRoutes.js`)
- `GET  /api/books` — paginated list of `allowed` books
- `GET  /api/books/:id` — single book (validates ObjectId)
- `POST /api/books` — `requireAuth`; create recommendation (admins → `allowed`, others → `pending`); also links the book to the author's profile
- `PUT  /api/books/:id` — `requireAuth` — update a book
- `DELETE /api/books/:id` — `requireAuth` — delete (owner or admin), cascades reviews and updates the profile's books lists

### Search (`routes/search.router.js`)
- `GET /api/books/search?q=` — case-insensitive regex search on title/author/genre/description (allowed books only)

### Reviews (`routes/reviewRoutes.js`)
- `GET    /api/books/:id/reviews` — paginated reviews for a book
- `POST   /api/books/:id/reviews` — `requireAuth` — add a review (book must be `allowed`)
- `PUT    /api/reviews/:id` — `requireAuth` — update a review
- `DELETE /api/reviews/:id` — `requireAuth` — delete a review (owner or admin)

### Favorites (`routes/favorites.router.js`)
- `GET    /api/favorite` — `requireAuth` — list favorites (populated)
- `POST   /api/favorite` — `requireAuth` — add a favorite (`$addToSet` on the user's profile)
- `DELETE /api/favorite/:bookId` — `requireAuth` — remove a favorite

### Profiles (`routes/profile.router.js`)
- `GET /api/users/:username` — public profile; the owner sees pending recommendations and favorites, everyone else sees only `allowed` books

### Admin (`routes/admin.router.js`)
All three require `requireAuth` + `requireAdmin`:
- `GET  /api/admin/books?status=` — list books by moderation status (default `pending`; `allowed`/`denied` supported)
- `POST /api/admin/books/:bookId/approve` — mark book `allowed`
- `POST /api/admin/books/:bookId/deny` — mark book `denied`

## Models (`models/`)

| Model | Key fields |
| --- | --- |
| `Book` | `userId`, `userName`, `title`, `author`, `genre`, `description`, `status` (`allowed`/`pending`/`denied`, default `pending`) |
| `Review` | `bookId` → Book, `userId`, `reviewerName`, `rating` (1–5), `comment` |
| `Profile` | `userId` (unique), `username` (unique), `recommendedBooks` [], `favoriteBooks` [] |

## Middleware

- **`middleware/auth.middleware.js`**
  - `getClerkIdentity(req)` — returns `{ userId, userName, role }` from the Clerk session/claims.
  - `requireAuth` — 401 unless authenticated.
  - `requireAdmin` — 403 unless the user's role resolves to `admin` (session claims first, then user public metadata).
- **`middleware/error.middleware.js`** — normalizes Mongoose errors (`CastError` → 404, duplicate key → 400, `ValidationError` → 400) into a uniform `{ success: false, error }` response. Mounted after all routes.

## Models Summary & Moderation

Books created by non-admin users are stored with `status: "pending"`. The catalog (`GET /api/books`), search, reviews, and public profiles only surface `allowed` books, so content stays hidden until an admin approves it via the admin endpoints.