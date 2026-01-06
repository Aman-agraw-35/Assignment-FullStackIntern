# Architecture Documentation

## Overview

This document describes the architecture of the Full-Stack Developer Intern Assignment application. The application follows a modern, scalable architecture pattern with clear separation of concerns between frontend and backend.

## System Architecture

```
┌─────────────────┐
│   Client (Web)  │
│   Next.js App   │
└────────┬────────┘
         │ HTTP/REST
         │
┌────────▼────────┐
│  Express API    │
│   (Backend)     │
└────────┬────────┘
         │
┌────────▼────────┐
│    MongoDB      │
│   (Database)    │
└─────────────────┘
```

## Frontend Architecture

### Technology Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **State Management**: React Hooks + Context (implicit)
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form
- **Authentication**: JWT stored in cookies

### Directory Structure

```
frontend/
├── app/                    # Next.js App Router pages
│   ├── login/             # Login page
│   ├── register/          # Registration page
│   ├── dashboard/         # Protected dashboard
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home/redirect page
│   └── globals.css        # Global styles
├── components/            # Reusable React components
│   ├── ProtectedRoute.tsx # Route protection wrapper
│   ├── TaskCard.tsx       # Task display component
│   └── TaskModal.tsx      # Task create/edit modal
└── lib/                   # Utility functions
    ├── api.ts             # API client configuration
    └── auth.ts            # Authentication helpers
```

### Key Design Decisions

1. **App Router**: Using Next.js 14 App Router for modern routing and server components support
2. **Client Components**: All interactive components are marked with `'use client'` directive
3. **Protected Routes**: Custom `ProtectedRoute` component wraps protected pages
4. **API Client**: Centralized Axios instance with interceptors for token management
5. **Form Validation**: Client-side validation using React Hook Form with server-side validation backup

### Authentication Flow

```
User Login
    │
    ├─► POST /api/auth/login
    │
    ├─► Receive JWT token
    │
    ├─► Store token in cookie
    │
    └─► Redirect to /dashboard
```

### State Management

- **Local State**: React `useState` for component-level state
- **Server State**: Direct API calls with loading states
- **Authentication State**: Cookie-based, checked on each protected route access

## Backend Architecture

### Technology Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator

### Directory Structure

```
backend/
├── models/                # Mongoose data models
│   ├── User.js           # User schema and methods
│   └── Task.js           # Task schema
├── routes/               # Express route handlers
│   ├── auth.js          # Authentication routes
│   ├── profile.js       # User profile routes
│   └── tasks.js         # Task CRUD routes
├── middleware/           # Custom middleware
│   └── auth.js          # JWT authentication middleware
└── server.js            # Application entry point
```

### API Design

#### RESTful Principles
- **Resources**: `/auth`, `/profile`, `/tasks`
- **HTTP Methods**: GET, POST, PUT, DELETE
- **Status Codes**: 200, 201, 400, 401, 404, 500
- **Response Format**: JSON

#### Route Organization
```
/api
├── /auth
│   ├── POST /register
│   ├── POST /login
│   └── GET  /me
├── /profile
│   ├── GET /
│   └── PUT /
└── /tasks
    ├── GET    /
    ├── GET    /:id
    ├── POST   /
    ├── PUT    /:id
    └── DELETE /:id
```

### Authentication & Authorization

1. **Registration/Login**: 
   - Password hashed with bcrypt (10 salt rounds)
   - JWT token generated with user ID
   - Token expires in 7 days

2. **Protected Routes**:
   - `authMiddleware` checks for Bearer token
   - Validates token signature and expiration
   - Attaches user object to `req.user`

3. **Resource Ownership**:
   - Tasks are scoped to the authenticated user
   - Users can only access their own tasks

### Database Schema

#### User Model
```javascript
{
  name: String (required, 2-50 chars),
  email: String (required, unique, validated),
  password: String (required, min 6 chars, hashed),
  createdAt: Date,
  updatedAt: Date
}
```

#### Task Model
```javascript
{
  title: String (required, max 200 chars),
  description: String (optional, max 1000 chars),
  status: Enum ['pending', 'in-progress', 'completed'],
  priority: Enum ['low', 'medium', 'high'],
  user: ObjectId (ref: User, required),
  createdAt: Date,
  updatedAt: Date
}
```

#### Indexes
- `Task.user + Task.createdAt`: For efficient user task queries
- `Task.user + Task.status`: For filtered queries
- `User.email`: Unique index for fast lookups

### Error Handling

1. **Validation Errors**: 
   - Client-side: React Hook Form
   - Server-side: express-validator
   - Returns 400 with error details

2. **Authentication Errors**:
   - Missing token: 401
   - Invalid token: 401
   - Expired token: 401

3. **Not Found Errors**: 404

4. **Server Errors**: 
   - 500 with generic message
   - Detailed error in development mode only

## Security Considerations

### Implemented
- ✅ Password hashing (bcrypt)
- ✅ JWT token-based authentication
- ✅ Protected API routes
- ✅ Input validation (client + server)
- ✅ CORS configuration
- ✅ Error message sanitization
- ✅ Password field excluded from responses

### Production Recommendations
- Use HTTPS
- Implement rate limiting
- Add request size limits
- Use environment variables for secrets
- Implement refresh tokens
- Add CSRF protection
- Use helmet.js for security headers
- Implement logging and monitoring

## Scalability Considerations

### Current Architecture Supports

1. **Horizontal Scaling**:
   - Stateless API (JWT tokens)
   - Database can be sharded/replicated
   - Frontend can be CDN-hosted

2. **Performance Optimizations**:
   - Database indexes on frequently queried fields
   - Efficient query patterns
   - Client-side caching potential

3. **Code Organization**:
   - Modular route handlers
   - Reusable middleware
   - Separation of concerns

### Future Scaling Strategies

1. **Database**:
   - Add read replicas
   - Implement caching layer (Redis)
   - Database connection pooling

2. **API**:
   - Load balancing
   - API gateway
   - Microservices split (if needed)

3. **Frontend**:
   - Server-side rendering optimization
   - Image optimization
   - Code splitting
   - CDN for static assets

4. **Monitoring**:
   - Application performance monitoring
   - Error tracking (Sentry)
   - Log aggregation
   - Health check endpoints

## Deployment Architecture

### Development
```
Local Machine
├── Frontend: localhost:3000
└── Backend:  localhost:5000
└── MongoDB:  localhost:27017
```

### Production (Recommended)
```
┌─────────────────┐
│   CDN/Cloud     │
│   (Frontend)    │
└─────────────────┘
         │
┌────────▼────────┐
│  Load Balancer  │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
┌───▼───┐ ┌──▼───┐
│ API 1 │ │ API 2│
└───┬───┘ └──┬───┘
    │        │
┌───▼────────▼───┐
│  MongoDB       │
│  (Replica Set) │
└────────────────┘
```

## Data Flow

### Task Creation Flow
```
User Input (Frontend)
    │
    ├─► Form Validation (React Hook Form)
    │
    ├─► POST /api/tasks (Axios)
    │
    ├─► Auth Middleware (Verify JWT)
    │
    ├─► Validation (express-validator)
    │
    ├─► Create Task (Mongoose)
    │
    ├─► Save to MongoDB
    │
    └─► Return Response → Update UI
```

### Authentication Flow
```
User Login
    │
    ├─► POST /api/auth/login
    │
    ├─► Validate Credentials
    │
    ├─► Compare Password (bcrypt)
    │
    ├─► Generate JWT
    │
    ├─► Store Token (Cookie)
    │
    └─► Redirect to Dashboard
```

## Testing Strategy

### Current Implementation
- Manual testing via Postman collection
- Frontend testing via browser

### Recommended Additions
- Unit tests for models and utilities
- Integration tests for API endpoints
- E2E tests for critical user flows
- Load testing for scalability validation

## Conclusion

This architecture provides a solid foundation for a scalable web application. The separation of concerns, modular design, and use of industry-standard technologies make it easy to maintain and extend. The application is ready for development and can be easily adapted for production deployment with the recommended security and scaling enhancements.

