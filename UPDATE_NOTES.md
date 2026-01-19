# Portfolio Platform - Multi-User Update

This project has been successfully updated to support multiple user profiles without authentication.

## 🚀 What Changed

### Backend Changes

1. **Profile Model** (`backend/src/models/Profile.js`)
   - Added `username` field (unique, required, lowercase)
   - Username validation: 3-30 characters, lowercase letters, numbers, hyphens, and underscores only
   - Added unique index on username

2. **Profile Controller** (`backend/src/controllers/profileController.js`)
   - `GET /api/profiles` - Returns all profiles for the directory page
   - `GET /api/profiles/:username` - Returns a single profile by username
   - `POST /api/profiles` - Public endpoint to create new profiles
   - `PATCH /api/profiles/:username` - Update profile by username (protected)
   - `GET /api/health` - Health check endpoint
   - Updated search to return multiple profiles

3. **Routes** (`backend/src/routes/profileRoutes.js`)
   - Added new routes for multi-user support
   - Kept legacy `/api/profile` endpoint for backward compatibility

4. **Seed Script** (`backend/src/seed.js`)
   - Added `username: 'vashukumar'` to Vashu Kumar's profile

### Frontend Changes

1. **API Service** (`frontend/src/services/api.js`)
   - `getAllProfiles()` - Fetch all profiles
   - `getProfileByUsername(username)` - Fetch specific profile
   - `createProfile(profileData)` - Create new profile

2. **New Components**
   - **Navbar** (`frontend/src/components/Navbar.jsx`) - Navigation with links to Home, Directory, and Create Profile
   - **ProfileView** (`frontend/src/components/ProfileView.jsx`) - Display individual profiles with "Share Profile" button
   - **AllProfiles** (`frontend/src/components/AllProfiles.jsx`) - Grid view of all profiles with search functionality
   - **CreateProfile** (`frontend/src/components/CreateProfile.jsx`) - Comprehensive form to create new profiles

3. **App.jsx** - Complete rewrite with React Router
   - `/` - Home page showing Vashu Kumar's profile (featured)
   - `/all` - Directory of all candidates
   - `/user/:username` - Dynamic route for individual profiles
   - `/join` - Create profile form

## 📦 Installation & Setup

### Backend Setup

```bash
cd backend
npm install
```

**Important**: Re-run the seed script to add username field to existing profile:
```bash
npm run seed
```

### Frontend Setup

```bash
cd frontend
npm install  # React Router DOM has been added
```

## 🏃 Running the Application

### Start Backend
```bash
cd backend
npm start
```
Backend will run on http://localhost:5000

### Start Frontend
```bash
cd frontend
npm run dev
```
Frontend will run on http://localhost:5173

## 🔗 API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/health` | Health check | No |
| GET | `/api/profiles` | Get all profiles | No |
| GET | `/api/profiles/:username` | Get profile by username | No |
| POST | `/api/profiles` | Create new profile | No |
| PATCH | `/api/profiles/:username` | Update profile | Yes (Basic Auth) |
| GET | `/api/profile` | Get first profile (legacy) | No |
| GET | `/api/search?q=query` | Search profiles | No |

## 🎨 Frontend Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | ProfileView (featured) | Home - Shows Vashu Kumar's profile |
| `/all` | AllProfiles | Directory of all candidates |
| `/user/:username` | ProfileView | Individual profile page |
| `/join` | CreateProfile | Create new profile form |

## 🌟 Key Features

1. **Multi-User Support** - Anyone can create a profile without authentication
2. **Username-Based Routing** - Clean URLs like `/user/johndoe`
3. **Profile Discovery** - Browse all candidates in a grid layout
4. **Search & Filter** - Find candidates by name, username, title, or skills
5. **Share Profiles** - Copy profile URL to clipboard with one click
6. **Responsive Design** - Works seamlessly on desktop and mobile
7. **Featured Profile** - Home page showcases the main profile (Vashu Kumar)

## 📝 Creating a New Profile

1. Navigate to `/join` or click "Create Your Profile" in the navbar
2. Fill in the form with:
   - Username (unique, lowercase, no spaces)
   - Basic information (name, email, title, bio)
   - Education details
   - Skills
   - Projects (with links and technologies)
   - Work experience
   - Social links
   - Interests
3. Submit the form
4. You'll be redirected to your new profile at `/user/yourusername`

## 🎯 Profile URL Structure

Each profile is accessible via:
```
https://yourapp.com/user/username
```

Example:
- Vashu Kumar: `https://yourapp.com/user/vashukumar`
- John Doe: `https://yourapp.com/user/johndoe`

## 🔧 Environment Variables

Make sure your `.env` files are configured:

**Backend** (`backend/.env`):
```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

**Frontend** (`frontend/.env`):
```
VITE_API_BASE_URL=http://localhost:5000/api
```

## 🚨 Important Notes

1. **Re-run seed script**: After updating, run `npm run seed` in the backend to add the username field to the existing profile
2. **Unique usernames**: Each username must be unique across the platform
3. **Username format**: Only lowercase letters, numbers, hyphens, and underscores (3-30 characters)
4. **Share functionality**: The "Share Profile" button copies the current URL to clipboard
5. **Backward compatibility**: The legacy `/api/profile` endpoint still works for existing integrations

## 🎨 UI/UX Highlights

- Clean, modern Tailwind CSS design
- Professional navbar with mobile responsive menu
- Card-based layouts for profile previews
- Comprehensive profile pages with all sections
- Smooth transitions and hover effects
- Loading states and error handling
- Success feedback on profile creation

## 📱 Mobile Responsive

All pages are fully responsive and work great on:
- Desktop (1920px+)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🎉 Next Steps

1. Test the application by creating a few sample profiles
2. Share profile URLs with others
3. Consider adding:
   - Profile analytics
   - Social sharing buttons
   - Advanced search filters
   - Profile ratings/endorsements
   - Export to PDF functionality

---

**Built with ❤️ using Node.js, Express, MongoDB, React, and Tailwind CSS**
