# Full-Stack Developer Intern Assignment

A scalable web application featuring authentication and a task management dashboard, built with Next.js (frontend) and Express.js (backend).

## 🚀 Features

### Frontend
- ✅ Modern UI built with Next.js 14 and TailwindCSS
- ✅ Responsive design for all screen sizes
- ✅ User authentication (Register/Login/Logout)
- ✅ Protected routes with JWT authentication
- ✅ Client-side form validation
- ✅ Task management dashboard with CRUD operations
- ✅ Search and filter functionality for tasks
- ✅ User profile display

### Backend
- ✅ RESTful API built with Express.js
- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt
- ✅ MongoDB database integration
- ✅ Server-side validation
- ✅ Error handling middleware
- ✅ Protected routes with authentication middleware

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas account)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd fullstack-intern-assignment
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the `backend` directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/fullstack_assignment
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   NODE_ENV=development
   ```

   For MongoDB Atlas, use:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fullstack_assignment
   ```

4. **Start MongoDB**
   
   If using local MongoDB:
   ```bash
   # On macOS/Linux
   mongod
   
   # On Windows
   # Start MongoDB service from Services
   ```

## 🚀 Running the Application

### Development Mode

1. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```
   The backend will run on `http://localhost:5000`

2. **Start the frontend development server** (in a new terminal)
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:3000`

### Production Mode

1. **Build the frontend**
   ```bash
   cd frontend
   npm run build
   npm start
   ```

2. **Start the backend**
   ```bash
   cd backend
   npm start
   ```

## 📁 Project Structure

```
fullstack-intern-assignment/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── profile.js
│   │   └── tasks.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── app/
│   │   ├── login/
│   │   ├── register/
│   │   ├── dashboard/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ProtectedRoute.tsx
│   │   ├── TaskCard.tsx
│   │   └── TaskModal.tsx
│   ├── lib/
│   │   ├── api.ts
│   │   └── auth.ts
│   └── package.json
├── API_DOCUMENTATION.md
├── postman_collection.json
├── architecture.md
└── README.md
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Profile
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update user profile

### Tasks
- `GET /api/tasks` - Get all tasks (with optional filters)
- `GET /api/tasks/:id` - Get a single task
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

For detailed API documentation, see [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

## 🧪 Testing the API

You can use the provided Postman collection to test the API:

1. Import `postman_collection.json` into Postman
2. Set the `baseUrl` variable to `http://localhost:5000/api`
3. Start with the Register or Login request to get a token
4. The token will be automatically saved to the collection variable
5. Use the token for authenticated requests

## 🔒 Security Features

- Password hashing using bcrypt (10 salt rounds)
- JWT tokens with 7-day expiration
- Protected routes with authentication middleware
- Input validation on both client and server
- CORS configuration
- Error handling without exposing sensitive information

## 📱 Usage

1. **Register/Login**: Navigate to `/register` or `/login` to create an account or sign in
2. **Dashboard**: After authentication, you'll be redirected to `/dashboard`
3. **Manage Tasks**: 
   - Click "New Task" to create a task
   - Click "Edit" on any task card to update it
   - Click "Delete" to remove a task
   - Use the search bar and filters to find specific tasks
4. **Profile**: View your profile information on the dashboard
5. **Logout**: Click the logout button to sign out

## 🏗️ Architecture

For detailed architecture documentation, see [architecture.md](./architecture.md)

## 🚀 Scaling Considerations

The application is structured for easy scaling:

- **Modular code structure**: Separated concerns with routes, models, and middleware
- **Database indexing**: Indexes on frequently queried fields
- **Environment-based configuration**: Easy deployment across environments
- **Error handling**: Centralized error handling middleware
- **API structure**: RESTful design for easy integration

## 📝 Technologies Used

### Frontend
- Next.js 14 (React framework)
- TypeScript
- TailwindCSS
- React Hook Form
- Axios
- js-cookie

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- express-validator

## 🤝 Contributing

This is an assignment project. For any questions or issues, please contact the assignment evaluator.

## 📄 License

This project is created for assignment purposes.

