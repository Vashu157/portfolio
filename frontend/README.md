# Portfolio Frontend

Modern, responsive portfolio website built with React, Vite, and Tailwind CSS. Features a clean dark theme with smooth animations and full integration with the portfolio backend API.

## 🚀 Features

- **Single Page Application** built with React 19
- **Modern UI** with Tailwind CSS dark theme
- **Responsive Design** - mobile-first approach
- **Real-time Filtering** - filter projects by skill/technology
- **API Integration** - fetches data from Node.js backend
- **Admin Panel** - edit profile with Basic Auth
- **Smooth Animations** - fade-in, slide-up transitions
- **Component Architecture** - reusable, maintainable components

## 📦 Tech Stack

- **Framework**: React 19 with Vite
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Build Tool**: Vite
- **Language**: JavaScript (ES6+)

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── ProfileHeader.jsx      # Hero section with profile info
│   │   ├── SkillBadge.jsx         # Clickable skill pills
│   │   ├── ProjectCard.jsx        # Project display cards
│   │   ├── SearchFilter.jsx       # Search and filter UI
│   │   ├── Modal.jsx              # Modal and edit modal
│   │   └── LoadingSpinner.jsx     # Loading & error states
│   ├── services/
│   │   └── api.js                 # Centralized API calls
│   ├── App.jsx                    # Main application
│   ├── App.css                    # App-specific styles
│   ├── index.css                  # Global styles & Tailwind
│   └── main.jsx                   # Entry point
├── tailwind.config.js             # Tailwind configuration
├── postcss.config.js              # PostCSS configuration
└── package.json
```

## 🛠️ Installation

### Prerequisites

- Node.js v18 or higher
- Backend API running (see backend README)

### Setup

1. **Install dependencies**

```bash
cd frontend
npm install
```

2. **Configure environment**

Create a `.env` file:

```bash
cp .env.example .env
```

Edit `.env`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

3. **Start development server**

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 🎨 Component Overview

### ProfileHeader Component

Displays user profile with avatar, name, title, bio, education, and social links.

**Props:** `profile` (object)

### SkillBadge Component

Interactive skill badges with color coding, click to filter, and hover animations.

**Props:** `skill`, `rating`, `onClick`, `isActive`

### ProjectCard Component

Beautiful project cards with featured badge, title, description, technology tags, and links.

**Props:** `project` (object)

### SearchFilter Component

Filter interface with text search and quick filter buttons.

**Props:** `onSearch`, `onClear`, `skills`

### EditProfileModal Component

Admin modal for editing profile with Basic Auth.

**Props:** `isOpen`, `onClose`, `profile`, `onSave`

## 🔌 API Integration

All API calls centralized in `src/services/api.js`:

```javascript
import api from './services/api';

// Get profile
const profile = await api.getProfile();

// Filter projects by skill
const projects = await api.getProjects('React');

// Update profile (protected)
await api.updateProfile(data, { username, password });
```

## 🎨 Tailwind Customization

Custom theme in `tailwind.config.js`:

- **Primary Color**: Custom blue palette
- **Animations**: fade-in, slide-up, hover effects
- **Dark Theme**: Slate color palette

## 📱 Responsive Design

- **Mobile** (< 768px): Single column
- **Tablet** (768px - 1024px): 2-column grid
- **Desktop** (> 1024px): 3-column grid

## 🚀 Build for Production

```bash
npm run build
npm run preview
```

## 🔐 Authentication

Edit functionality uses Basic Authentication. Click "Edit Profile", make changes, enter admin credentials.

## 🤝 Integration with Backend

1. Start backend: `cd backend && npm start` (port 5000)
2. Start frontend: `cd frontend && npm run dev` (port 5173)
3. Frontend makes API calls to backend

## 📄 License

ISC

---

**Built with React, Vite & Tailwind CSS 🎨**

