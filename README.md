# Task Manager API

A RESTful API for managing personal tasks, built with Node.js, Express, and MongoDB. Users can register, log in, and manage their own tasks — with authentication and authorization enforced at the route level, so users can only ever access their own data.

**Live URL:** https://task-manager-api-w89l.onrender.com

> Note: this runs on a free-tier server, so the first request after a period of inactivity may take 10–20 seconds to respond while it wakes up.

## Features

- User registration and login with hashed passwords (bcrypt)
- JWT-based authentication
- Full CRUD for tasks (create, read, update, delete)
- Route-level authorization — a task can only be viewed, edited, or deleted by the user who created it
- MongoDB Atlas as the database, with Mongoose for schema modeling

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express
- **Database:** MongoDB (via Mongoose)
- **Auth:** JSON Web Tokens (jsonwebtoken), bcryptjs for password hashing
- **Hosting:** Render

## API Endpoints

### Auth

| Method | Endpoint | Description | Auth required |
|--------|----------|-------------|----------------|
| POST | `/api/auth/register` | Create a new user | No |
| POST | `/api/auth/login` | Log in and receive a JWT | No |

**Register — request body:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "yourpassword"
}
```

**Login — request body:**
```json
{
  "email": "jane@example.com",
  "password": "yourpassword"
}
```
Returns a JWT token to be sent as a header on all task requests below:
```
Authorization: Bearer <token>
```

### Tasks

All task routes require the `Authorization` header above.

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/tasks` | Create a new task |
| GET | `/api/tasks` | Get all tasks belonging to the logged-in user |
| GET | `/api/tasks/:id` | Get a single task by ID |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

**Create/update task — request body:**
```json
{
  "title": "Finish portfolio project",
  "description": "Build the task manager API",
  "status": "pending",
  "dueDate": "2026-10-15"
}
```
`status` accepts: `pending`, `in-progress`, `completed`.

## Running Locally

```bash
git clone https://github.com/Zytrix-Tech05/task-manager-api.git
cd task-manager-api
npm install
```

Create a `.env` file in the root with:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Then run:
```bash
node server.js
```

The API will be available at `http://localhost:5000`.

## What I'd Add Next

- Automated tests (Jest + Supertest)
- Pagination and filtering on `GET /api/tasks`
- Input validation with a library like Joi or express-validator
- Rate limiting on auth routes

## What I Learned

Building this project meant working through a full authentication flow from scratch (password hashing, JWT issuance and verification, route-level authorization), designing a relational structure in a NoSQL database (tasks referencing their owning user), and debugging real deployment issues — including a Windows/Linux file-casing bug and a DNS resolution failure between Node.js and MongoDB Atlas that only appeared in certain network environments.
