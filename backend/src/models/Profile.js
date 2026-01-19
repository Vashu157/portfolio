import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  links: {
    github: String,
    live: String,
    demo: String
  },
  technologies: [String],
  featured: {
    type: Boolean,
    default: false
  }
}, { _id: true });

const workSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  description: String,
  technologies: [String]
}, { _id: true });

const profileSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    minlength: 3,
    maxlength: 30,
    match: [/^[a-z0-9_-]+$/, 'Username can only contain lowercase letters, numbers, hyphens, and underscores']
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
  },
  education: {
    degree: String,
    institution: String,
    year: String,
    field: String
  },
  bio: {
    type: String,
    maxlength: 1000
  },
  title: {
    type: String,
    default: 'Full Stack Developer'
  },
  skills: [{
    type: String,
    trim: true
  }],
  projects: [projectSchema],
  work: [workSchema],
  links: {
    github: String,
    linkedin: String,
    portfolio: String,
    twitter: String,
    email: String
  },
  rating: {
    type: Map,
    of: Number,
    default: new Map()
  }
}, {
  timestamps: true,
  collection: 'profiles'
});

// Text index for full-text search across multiple fields
profileSchema.index({
  name: 'text',
  bio: 'text',
  'education.degree': 'text',
  'education.institution': 'text',
  'projects.title': 'text',
  'projects.description': 'text',
  'work.company': 'text',
  'work.position': 'text'
});

// Index on skills for faster filtering
profileSchema.index({ skills: 1 });

// Compound index for project queries
profileSchema.index({ 'projects.technologies': 1 });

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;
