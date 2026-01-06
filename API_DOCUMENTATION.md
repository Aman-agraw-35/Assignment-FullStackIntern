# API Documentation

Base URL: `http://localhost:5000/api`

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your_token>
```

---

## Authentication Endpoints

### Register User
**POST** `/auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error Response (400):**
```json
{
  "message": "Validation failed",
  "errors": [
    {
      "msg": "Email is required",
      "param": "email"
    }
  ]
}
```

---

### Login User
**POST** `/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error Response (401):**
```json
{
  "message": "Invalid credentials"
}
```

---

### Get Current User
**GET** `/auth/me`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

## Profile Endpoints

### Get Profile
**GET** `/profile`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### Update Profile
**PUT** `/profile`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com"
}
```

**Response (200):**
```json
{
  "message": "Profile updated successfully",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T01:00:00.000Z"
  }
}
```

---

## Tasks Endpoints

### Get All Tasks
**GET** `/tasks`

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `status` (optional): Filter by status (`pending`, `in-progress`, `completed`)
- `priority` (optional): Filter by priority (`low`, `medium`, `high`)
- `search` (optional): Search in title and description

**Example:**
```
GET /tasks?status=completed&priority=high&search=meeting
```

**Response (200):**
```json
{
  "tasks": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Complete project",
      "description": "Finish the assignment",
      "status": "completed",
      "priority": "high",
      "user": "507f1f77bcf86cd799439011",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T01:00:00.000Z"
    }
  ],
  "count": 1
}
```

---

### Get Single Task
**GET** `/tasks/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "task": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Complete project",
    "description": "Finish the assignment",
    "status": "completed",
    "priority": "high",
    "user": "507f1f77bcf86cd799439011",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T01:00:00.000Z"
  }
}
```

**Error Response (404):**
```json
{
  "message": "Task not found"
}
```

---

### Create Task
**POST** `/tasks`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "New Task",
  "description": "Task description",
  "status": "pending",
  "priority": "medium"
}
```

**Response (201):**
```json
{
  "message": "Task created successfully",
  "task": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "New Task",
    "description": "Task description",
    "status": "pending",
    "priority": "medium",
    "user": "507f1f77bcf86cd799439011",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### Update Task
**PUT** `/tasks/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Updated Task",
  "status": "in-progress",
  "priority": "high"
}
```

**Response (200):**
```json
{
  "message": "Task updated successfully",
  "task": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Updated Task",
    "description": "Task description",
    "status": "in-progress",
    "priority": "high",
    "user": "507f1f77bcf86cd799439011",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T02:00:00.000Z"
  }
}
```

---

### Delete Task
**DELETE** `/tasks/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "message": "Task deleted successfully"
}
```

---

## Error Responses

All endpoints may return the following error responses:

**400 Bad Request:**
```json
{
  "message": "Validation failed",
  "errors": [...]
}
```

**401 Unauthorized:**
```json
{
  "message": "No token provided, authorization denied"
}
```

**404 Not Found:**
```json
{
  "message": "Task not found"
}
```

**500 Internal Server Error:**
```json
{
  "message": "Server error"
}
```

