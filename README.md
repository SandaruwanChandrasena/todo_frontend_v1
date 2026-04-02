# TodoApp — Frontend

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

A modern, responsive frontend for the TodoApp — Daily Planner web application. Built with React.js and Vite, featuring a centralized theme system, smooth animations, and drag-and-drop task reordering.

---

## 🌐 Live App

```
https://todo-app-sandaruwan.netlify.app
```

---

## 📁 Project Structure

```
frontend/
│
├── public/
│   ├── favicon.svg             # App icon
│   └── _redirects              # Netlify routing config
│
├── src/
│   ├── api/
│   │   └── axios.js            # Axios base config + interceptors
│   ├── components/
│   │   ├── Navbar.jsx          # Navigation bar
│   │   ├── TaskItem.jsx        # Individual task component
│   │   ├── EditModal.jsx       # Edit task popup modal
│   │   └── Spinner.jsx         # Loading spinner
│   ├── context/
│   │   └── AuthContext.jsx     # Global auth state
│   ├── pages/
│   │   ├── Login.jsx           # Login page
│   │   ├── Register.jsx        # Register page
│   │   ├── Home.jsx            # Main task management page
│   │   └── Profile.jsx         # User profile page
│   ├── theme/
│   │   └── theme.jsx           # Centralized theme system
│   ├── App.jsx                 # Routes & protected routes
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles
│
├── .env                        # Environment variables
├── .gitignore
├── index.html                  # HTML entry point
├── package.json
└── vite.config.js              # Vite configuration
```

---

## ⚙️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| React.js | v19 | Frontend framework |
| Vite | v6 | Build tool |
| Tailwind CSS | v4 | Styling |
| React Router DOM | v7 | Client side routing |
| Axios | v1 | API calls |
| @dnd-kit/core | v6 | Drag and drop |
| @dnd-kit/sortable | v8 | Sortable drag and drop |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18 or higher
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/SandaruwanChandrasena/todo_frontend_v1.git

# Navigate to project
cd todo_frontend_v1

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root directory —

```env
VITE_API_URL=http://localhost:5000/api
```

### Run the App

```bash
# Development mode
npm run dev

# Build for production
npm run build
```

App will run on `http://localhost:5173`

---

## 📱 Features

### 🔐 Authentication
- User registration with validation
- User login with JWT session
- Auto login after registration
- Session persists for 7 days
- Protected routes

### ✅ Task Management
- Create tasks with text input or Enter key
- View all tasks separated by status
- Mark tasks complete / incomplete with toggle
- Edit tasks via popup modal with blurred background
- Delete tasks with confirmation dialog
- Drag and drop reorder — pending & completed separately

### 👤 User Profile
- View current profile details
- Update name, email, age
- Change password securely

### 🎨 UI / UX
- Centralized theme system
- Smooth transitions and animations
- Fullscreen loading spinner
- Toast-style error messages
- Responsive design for all screen sizes
- Dark indigo navbar
- Task stats dashboard

---

## 🎨 Theme System

All colors, fonts, spacing and styles are managed in `src/theme/theme.jsx` —

```javascript
import theme from '../theme/theme.jsx';

// Usage example
<div style={{
  backgroundColor: theme.colors.primary,
  borderRadius: theme.borderRadius.md,
  padding: theme.spacing.lg,
}} />
```

### Color Palette

| Token | Value | Usage |
|---|---|---|
| primary | #6366F1 | Main accent — Indigo |
| secondary | #06B6D4 | Secondary accent — Cyan |
| success | #10B981 | Completed tasks — Green |
| danger | #EF4444 | Delete actions — Red |
| warning | #F59E0B | Pending indicator — Amber |
| background | #F9FAFB | Page background |
| surface | #FFFFFF | Cards and forms |

---

## 🚀 Deployment

This frontend is deployed on **Netlify**

- Auto deploys on every push to `main` branch
- `_redirects` file handles React Router client side routing

```
/* /index.html 200
```

---

## 🔗 Related Repository

- **Backend API** — [todo_backend_v1](https://github.com/SandaruwanChandrasena/todo_backend_v1)

---

## 👨‍💻 Author

**Chandrasena Y.P.S.**
- Student ID — IT22028600
- Institute — Sri Lanka Institute of Information Technology (SLIIT)
- GitHub — [@SandaruwanChandrasena](https://github.com/SandaruwanChandrasena)
- LinkedIn — [sandaruwanchandrasena](https://linkedin.com/in/sandaruwanchandrasena)
