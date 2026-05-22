# 📝 To-Do List Application

A full-stack task management application built with React.js, Node.js, Express.js, and PostgreSQL.

---

## 🚀 Features

- ✅ Add, edit, delete, and mark tasks as complete or pending
- 🔴 Priority levels (High, Medium, Low)
- 📅 Due date assignment for tasks
- 🔍 Filter tasks by status (All / Active / Completed)
- 🔀 Sort tasks by priority or due date
- 💾 Persistent data storage with PostgreSQL
- 🎨 Responsive UI built with React.js and Tailwind CSS
- 🔄 Real-time UI updates

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React.js | UI components and state management |
| Tailwind CSS | Styling and responsive design |
| Vite | Frontend build tool and dev server |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime for the server |
| Express.js | Web framework and API routing |
| PostgreSQL | Relational database for persistent storage |
| pg | PostgreSQL client for Node.js |
| dotenv | Environment variable management |
| cors | Cross-origin resource sharing |
| nodemon | Auto-restart server during development |

---

## 📁 Project Structure

```
todo-project/
│
├── todoapp/                  # Frontend (React)
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskInput.jsx    # Input form for adding tasks
│   │   │   └── TaskList.jsx     # Task list with animations
│   │   ├── App.jsx              # Main component, state management
│   │   ├── index.css            # Tailwind CSS config
│   │   └── main.jsx             # React entry point
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
└── todo-backend/             # Backend (Node/Express)
    ├── server.js                # Express server entry point
    ├── db.js                    # PostgreSQL connection
    ├── routes.js                # API route handlers
    ├── .env                     # Environment variables (not in repo)
    └── package.json
```

---

## ⚙️ Getting Started

### Prerequisites
Make sure you have these installed:
- [Node.js](https://nodejs.org) (v18 or higher)
- [PostgreSQL](https://www.postgresql.org/download) (v14 or higher)

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/todo-app.git
cd todo-app
```

---

### 2️⃣ Set Up the Database

Open PostgreSQL and run:

```sql
CREATE DATABASE todoapp;

\c todoapp

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  text VARCHAR(255) NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  priority VARCHAR(10) DEFAULT 'medium',
  due_date DATE
);
```

---

### 3️⃣ Set Up the Backend

```bash
cd todo-backend
npm install
```

Create a `.env` file in the `todo-backend` folder:

```env
DB_USER=postgres
DB_PASSWORD="your_password"
DB_HOST=localhost
DB_PORT=5432
DB_NAME=todoapp
PORT=5000
```

Start the backend server:

```bash
npm run dev
```

You should see:
```
Server running on port 5000
Connected to PostgreSQL ✅
```

---

### 4️⃣ Set Up the Frontend

```bash
cd todoapp
npm install
npm run dev
```

Open your browser at **http://localhost:5173**

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/tasks` | Get all tasks |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/:id` | Toggle task complete/incomplete |
| DELETE | `/api/tasks/:id` | Delete a task |

### Request & Response Examples

**POST /api/tasks**
```json
// Request body
{
  "text": "Buy groceries",
  "priority": "high",
  "dueDate": "2026-06-01"
}

// Response
{
  "id": 1,
  "text": "Buy groceries",
  "completed": false,
  "priority": "high",
  "due_date": "2026-06-01"
}
```

**PUT /api/tasks/:id**
```json
// Request body
{
  "completed": true
}

// Response
{
  "id": 1,
  "text": "Buy groceries",
  "completed": true,
  "priority": "high",
  "due_date": "2026-06-01"
}
```

---

## 🗄️ Database Schema

```sql
TABLE tasks (
  id        SERIAL PRIMARY KEY,      -- Auto-incremented unique ID
  text      VARCHAR(255) NOT NULL,   -- Task description
  completed BOOLEAN DEFAULT FALSE,   -- Completion status
  priority  VARCHAR(10) DEFAULT 'medium', -- high / medium / low
  due_date  DATE                     -- Optional due date
)
```

---

## 🔄 How It Works

```
User Action (React Frontend)
        ↓
fetch() API call to Express backend
        ↓
Express route handles the request
        ↓
PostgreSQL query runs (SELECT/INSERT/UPDATE/DELETE)
        ↓
Database returns result
        ↓
Express sends JSON response
        ↓
React updates state and re-renders UI
```

---

## 🚀 Future Improvements

- [ ] User authentication (JWT)
- [ ] Edit task functionality
- [ ] Dark/Light mode toggle
- [ ] Task categories and tags
- [ ] Email reminders for due dates
- [ ] Deploy to cloud (Railway/Vercel)

---

## 👨‍💻 Author

Built by **Your Name**  
GitHub: [@your-username](https://github.com/your-username)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
