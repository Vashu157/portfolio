# Portfolio Backend API

Production-grade REST API for a portfolio website built with Node.js, Express, and MongoDB.

## 🚀 Features

- **RESTful API** with clean architecture
- **MongoDB** with Mongoose ODM
- **Security** with Helmet, CORS, and Rate Limiting
- **Basic Authentication** for protected routes
- **Full-text search** with MongoDB text indexes
- **Input validation** with Joi
- **Centralized error handling**
- **ES Modules** (import/export syntax)

## 📋 Tech Stack

- **Runtime**: Node.js v22+
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Validation**: Joi
- **Security**: Helmet, CORS, Express Rate Limit
- **Environment**: dotenv

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/
│   │   ├── profileController.js # Profile endpoints logic
│   │   ├── projectController.js # Project endpoints logic
│   │   └── skillController.js   # Skills endpoints logic
│   ├── middleware/
│   │   ├── authMiddleware.js    # Basic Auth protection
│   │   ├── errorHandler.js      # Centralized error handling
│   │   └── notFound.js          # 404 handler
│   ├── models/
│   │   └── Profile.js           # Mongoose schema with indexes
│   ├── routes/
│   │   ├── index.js             # Route configuration
│   │   ├── profileRoutes.js     # Profile routes
│   │   ├── projectRoutes.js     # Project routes
│   │   └── skillRoutes.js       # Skills routes
│   ├── seed.js                  # Database seeding script
│   └── server.js                # Main application entry
├── .env.example                 # Environment variables template
├── .gitignore
└── package.json
```

## 🛠️ Installation

### 1. Clone and Install

```bash
cd backend
npm install
```

### 2. Environment Setup

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
FRONTEND_URL=http://localhost:5173
BASIC_AUTH_USERNAME=admin
BASIC_AUTH_PASSWORD=your_secure_password
NODE_ENV=development
```

### 3. Start MongoDB

Make sure MongoDB is running:

```bash
# Using MongoDB service
mongod

# Or using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### 4. Seed the Database

Populate the database with sample data:

```bash
npm run seed
```

### 5. Start the Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The API will be available at `http://localhost:5000/api`

## 📚 API Endpoints

### Public Endpoints

| Method | Endpoint              | Description                          | Query Parameters    |
|--------|-----------------------|--------------------------------------|---------------------|
| GET    | `/api/health`         | Health check status                  | -                   |
| GET    | `/api/profile`        | Get complete profile data            | -                   |
| GET    | `/api/projects`       | Get all projects                     | `?skill=python`     |
| GET    | `/api/projects/:id`   | Get single project by ID             | -                   |
| GET    | `/api/search`         | Search across profile                | `?q=searchterm`     |
| GET    | `/api/skills`         | Get all skills                       | -                   |
| GET    | `/api/skills/top`     | Get skills sorted by frequency/rating| -                   |

### Protected Endpoints (Require Basic Auth)

| Method | Endpoint              | Description              | Auth Required |
|--------|-----------------------|--------------------------|---------------|
| PATCH  | `/api/profile`        | Update profile           | ✅ Yes        |
| POST   | `/api/projects`       | Add new project          | ✅ Yes        |
| PATCH  | `/api/projects/:id`   | Update project           | ✅ Yes        |
| DELETE | `/api/projects/:id`   | Delete project           | ✅ Yes        |

## 📖 API Usage Examples

### 1. Get Profile

```bash
curl http://localhost:5000/api/profile
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "Vashu",
    "email": "vashu@example.com",
    "bio": "Passionate full-stack developer...",
    "skills": ["JavaScript", "React", "Node.js"],
    "projects": [...],
    "work": [...],
    "links": {...}
  }
}
```

### 2. Get Projects Filtered by Skill

```bash
curl "http://localhost:5000/api/projects?skill=python"
```

**Response:**
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "title": "Python Data Analysis Tool",
      "description": "Data analysis and visualization tool...",
      "technologies": ["Python", "Pandas", "NumPy"],
      "links": {
        "github": "https://github.com/vashu/data-tool"
      }
    }
  ],
  "query": {
    "skill": "python"
  }
}
```

### 3. Search Profile

```bash
curl "http://localhost:5000/api/search?q=react"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "name": "Vashu",
    "projects": [
      {
        "title": "E-Commerce Platform",
        "technologies": ["React", "Node.js"]
      }
    ]
  }
}
```

### 4. Get Top Skills

```bash
curl http://localhost:5000/api/skills/top
```

**Response:**
```json
{
  "success": true,
  "count": 12,
  "data": [
    { "name": "JavaScript", "rating": 9 },
    { "name": "React", "rating": 9 },
    { "name": "REST APIs", "rating": 9 },
    { "name": "Node.js", "rating": 8 }
  ]
}
```

### 5. Add New Project (Protected)

```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Basic YWRtaW46cGFzc3dvcmQ=" \
  -d '{
    "title": "New Project",
    "description": "A new exciting project",
    "technologies": ["React", "Node.js"],
    "links": {
      "github": "https://github.com/user/project"
    }
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Project added successfully",
  "data": {
    "_id": "...",
    "title": "New Project",
    "description": "A new exciting project",
    "technologies": ["React", "Node.js"]
  }
}
```

### 6. Update Profile (Protected)

```bash
curl -X PATCH http://localhost:5000/api/profile \
  -H "Content-Type: application/json" \
  -H "Authorization: Basic YWRtaW46cGFzc3dvcmQ=" \
  -d '{
    "bio": "Updated bio text"
  }'
```

## 🔐 Authentication

Protected endpoints use **Basic Authentication**. To generate the Authorization header:

```javascript
const credentials = 'admin:password';
const base64 = Buffer.from(credentials).toString('base64');
// Authorization: Basic YWRtaW46cGFzc3dvcmQ=
```

Or in your HTTP client:
- Username: `admin` (from .env)
- Password: `your_secure_password` (from .env)

## 🗃️ Database Schema

### Profile Model

```javascript
{
  name: String (required),
  email: String (required, unique),
  title: String,
  bio: String,
  education: {
    degree: String,
    institution: String,
    year: String,
    field: String
  },
  skills: [String],
  projects: [{
    title: String (required),
    description: String (required),
    links: {
      github: String,
      live: String,
      demo: String
    },
    technologies: [String],
    featured: Boolean
  }],
  work: [{
    company: String (required),
    position: String (required),
    duration: String (required),
    description: String,
    technologies: [String]
  }],
  links: {
    github: String,
    linkedin: String,
    portfolio: String,
    twitter: String,
    email: String
  },
  rating: Map<String, Number>,
  timestamps: true
}
```

### Indexes

- **Text Index**: For full-text search across name, bio, education, projects, and work
- **Skills Index**: For faster skill-based filtering
- **Email Index**: Unique index for email field
- **Technologies Index**: For project filtering by technology

## 🔍 Project Controller Logic

The `projectController.js` handles the `?skill=` query parameter:

```javascript
export const getProjects = async (req, res, next) => {
  try {
    const { skill } = req.query;
    const profile = await Profile.findOne();
    
    let projects = profile.projects;

    if (skill) {
      const skillLower = skill.toLowerCase().trim();
      
      // Filter projects where technologies array includes the skill
      projects = projects.filter(project => {
        if (project.technologies && Array.isArray(project.technologies)) {
          return project.technologies.some(tech => 
            tech.toLowerCase().includes(skillLower)
          );
        }
        return false;
      });
    }

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
      ...(skill && { query: { skill } })
    });
  } catch (error) {
    next(error);
  }
};
```

**How it works:**
1. Extracts the `skill` query parameter
2. Fetches the profile from the database
3. If `skill` is provided, filters projects where `technologies` array includes the skill (case-insensitive)
4. Returns filtered projects with count and original query

## 🛡️ Security Features

1. **Helmet**: Sets security-related HTTP headers
2. **CORS**: Restricts API access to specified frontend origin
3. **Rate Limiting**: Limits requests to 100 per 15 minutes per IP
4. **Basic Auth**: Protects write operations (POST, PATCH, DELETE)
5. **Input Validation**: Coming soon with Joi schemas

## 🚨 Error Handling

All errors are caught and formatted consistently:

```json
{
  "success": false,
  "error": "Error Type",
  "message": "Human-readable error message",
  "details": {} // Optional validation details
}
```

Common status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request / Validation Error
- `401` - Unauthorized
- `404` - Not Found
- `409` - Conflict (Duplicate)
- `429` - Too Many Requests
- `500` - Internal Server Error

## 📝 Customizing Seed Data

Edit `src/seed.js` to customize the portfolio data with your information:

```javascript
const portfolioData = {
  name: 'Your Name',
  email: 'your.email@example.com',
  // ... add your data
};
```

Then run: `npm run seed`

## 🧪 Testing the API

### Using cURL

```bash
# Health check
curl http://localhost:5000/api/health

# Get profile
curl http://localhost:5000/api/profile

# Search
curl "http://localhost:5000/api/search?q=react"

# Filter projects
curl "http://localhost:5000/api/projects?skill=python"
```

### Using Postman or Thunder Client

Import the endpoints from the table above and test with your preferred API client.

## 🤝 Contributing

Feel free to fork and customize this backend for your portfolio needs!

## 📄 License

ISC

## 👤 Author

Created by Vashu

---

**Happy Coding! 🚀**
