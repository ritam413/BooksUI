# BooksUI

## Introduction

BooksUI is a full-stack web application for managing a personal book collection.  
It includes:

- A frontend client for browsing, filtering, searching, and creating books.
- A backend API for persisting book records in MongoDB.
- Cloudinary-based image handling for uploaded files and image URLs.

The project is split into two modules:

- `frontend`: Vite-based UI application.
- `backend`: Express API with MongoDB, Multer, and Cloudinary integration.

## Installation Instructions

### Prerequisites

- Node.js 18+ (recommended: latest LTS)
- npm 9+
- MongoDB database (local or Atlas)
- Cloudinary account credentials

### 1) Clone and install dependencies

```bash
git clone <your-repository-url>
cd BooksUI
npm install
npm --prefix frontend install
npm --prefix backend install
```

### 2) Configure environment variables

Create `backend/.env` and define the required keys:

```env
CLOUDINARY_API_KEY=<your_cloudinary_api_key>
CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
CORS_ORIGIN=<frontend_origin>
MONGODB_URI=<mongodb_connection_string_without_db_name_suffix>
PORT=8000
```

Notes:

- The backend app appends a database name internally when connecting to MongoDB.
- Keep all secret values out of version control.

### 3) Run the application

Frontend:

```bash
npm run dev
```

Backend (separate terminal):

```bash
npm run backend
```

Alternative backend command:

```bash
npm --prefix backend run server
```

Default local URLs:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:8000`

## Usage Guidelines

### Core workflow

1. Start frontend and backend servers.
2. Open the frontend UI.
3. Browse all books loaded from the API.
4. Use state filters (`ALL`, `ONGOING`, `COMPLETED`, `N/A`) and search by title.
5. Add a book via modal form using:
   - File upload (`multipart/form-data`), or
   - Image URL (`application/json`).
6. Update a book state directly from a card (PATCH request to backend).

### Data model overview

Each book record contains:

- `title` (string, required)
- `tags` (string array)
- `image` (string URL, required)
- `description` (string)
- `state` (`ONGOING` | `COMPLETED` | `N/A`)
- `createdAt` (date)

### Operational recommendations

- Keep frontend and backend base URLs consistent across environments.
- Use a dedicated `.env` per environment (local, staging, production).
- Validate image URLs before submitting when using URL-based uploads.

## API Reference

Base URL (local): `http://localhost:8000/books`

### `POST /books/upload`

Create a new book with either an uploaded file or an image URL.

Supported request formats:

- `multipart/form-data` with `image` file
- `application/json` with `image` URL string

Body fields:

- `title` (required)
- `tags` (comma-separated string, optional)
- `description` (required)
- `image` (required for JSON mode)
- `image` file (required for multipart mode)

Success response:

- `200 OK`
- `{ success: true, message: "Book Uploaded Succesfully", data: <book> }`

Error response:

- `400 Bad Request` for missing required fields
- `500 Internal Server Error` for upload/storage failures

### `GET /books/files`

Fetch all books.

Success response:

- `200 OK`
- `{ success: true, data: <book[]> }`

### `PATCH /books/:id`

Update a book state.

Request body:

```json
{
  "newState": "ONGOING"
}
```

Allowed `newState` values:

- `ONGOING`
- `COMPLETED`
- `N/A`

Success response:

- `200 OK`
- `{ success: true, data: <updatedBook> }`

Error response:

- `404 Not Found` if the book does not exist

## Contribution Guidelines

### Branching and commits

- Create feature branches from `main`.
- Use clear commit messages with scope and intent.
- Keep commits atomic and reviewable.

### Coding standards

- Follow existing module structure (`frontend` and `backend` separation).
- Prefer descriptive identifiers and small focused functions.
- Preserve API contract compatibility for existing frontend integrations.

### Pull request checklist

- [ ] Feature or fix is scoped and documented.
- [ ] Local build/start commands run successfully.
- [ ] API changes are reflected in this README.
- [ ] Environment variable changes are documented.
- [ ] No secrets or credentials are committed.

### Suggested validation before PR

```bash
npm run dev
npm run backend
```

Then verify:

- Book creation via file upload
- Book creation via URL upload
- State updates through card dropdown
- Search and filter behavior
