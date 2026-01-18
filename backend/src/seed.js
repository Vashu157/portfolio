import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Profile from './models/Profile.js';

dotenv.config();

const portfolioData = {
  name: 'Vashu Kumar',
  email: 'vashu.kumar@nitdelhi.ac.in',
  title: 'Full Stack Developer & ML Enthusiast',
  bio: 'B.Tech CSE student at NIT Delhi with expertise in full-stack web development and machine learning. Solved 450+ problems on LeetCode. Active in Tech Club and hackathons including Smart India Hackathon.',
  education: {
    degree: 'Bachelor of Technology in Computer Science Engineering',
    institution: 'National Institute of Technology Delhi',
    year: 'Graduating 2027',
    field: 'Computer Science Engineering',
    gpa: '7.13 CGPA'
  },
  skills: [
    'C',
    'C++',
    'Python',
    'JavaScript',
    'HTML',
    'CSS',
    'ReactJS',
    'Next.js',
    'Node.js',
    'React Native',
    'REST APIs',
    'PostgreSQL',
    'MySQL',
    'Supabase',
    'Git',
    'Streamlit',
    'Pandas',
    'Matplotlib',
    'NLTK',
    'Machine Learning',
    'Data Structures',
    'Algorithms'
  ],
  projects: [
    {
      title: 'Legacy Locker',
      description: 'ML-Powered Password Manager with encryption, automation, and innovative nominee-based credentials transfer after user death. Built with Next.js and Python ML models.',
      links: {
        github: 'https://github.com/vashu/legacy-locker',
        live: 'https://legacy-locker.vercel.app'
      },
      technologies: ['Next.js', 'Python', 'Machine Learning', 'Encryption'],
      featured: true
    },
    {
      title: 'Coding Social Platform',
      description: 'A platform for developers to share and showcase their GitHub, LeetCode, and Codeforces profiles. Features real-time profile fetching via GitHub API and Supabase backend.',
      links: {
        github: 'https://github.com/vashu/coding-social',
        live: 'https://coding-social.vercel.app'
      },
      technologies: ['React.js', 'Supabase', 'GitHub API', 'REST APIs'],
      featured: true
    },
    {
      title: 'Blinkit-Style Food Delivery App',
      description: 'Campus-focused food delivery platform with product listings, shopping cart, order management, and PostgreSQL backend. College project inspired by Blinkit.',
      links: {
        github: 'https://github.com/vashu/campus-delivery'
      },
      technologies: ['Next.js', 'Node.js', 'React Native', 'PostgreSQL'],
      featured: true
    },
    {
      title: 'Spam SMS Detector',
      description: 'Machine learning model to classify SMS messages as spam or ham using NLP techniques. Built with Streamlit for interactive UI.',
      links: {
        github: 'https://github.com/vashu/spam-detector',
        demo: 'https://spam-detector-vashu.streamlit.app'
      },
      technologies: ['Python', 'Streamlit', 'NLTK', 'Machine Learning', 'NLP'],
      featured: false
    },
    {
      title: 'Tech Club NIT Delhi Website',
      description: 'Official website for Tech Club featuring event updates, interactive features, and responsive design. Built and maintained as Website Developer.',
      links: {
        github: 'https://github.com/vashu/techclub-website',
        live: 'https://techclub.nitdelhi.ac.in'
      },
      technologies: ['ReactJS', 'HTML', 'CSS', 'JavaScript'],
      featured: false
    }
  ],
  work: [
    {
      company: 'Tech Club - NIT Delhi',
      position: 'Website Developer & Deputy General Secretary',
      duration: 'Jan 2024 - Present',
      description: 'Built and maintained the official website using ReactJS, HTML, CSS, and JavaScript. Integrated event updates and interactive features in collaboration with team members. Currently serving as Deputy General Secretary.',
      technologies: ['ReactJS', 'HTML', 'CSS', 'JavaScript']
    },
    {
      company: 'Training & Placement Cell - NIT Delhi',
      position: 'Team Member',
      duration: '2024 - Present',
      description: 'Active member contributing to placement activities, event management, and sponsorship coordination for college fests.',
      technologies: []
    },
    {
      company: 'LeetCode',
      position: 'Competitive Programmer',
      duration: '2023 - Present',
      description: 'Solved 450+ problems in C++, strengthening expertise in data structures and algorithms. Active in competitive programming community.',
      technologies: ['C++', 'Data Structures', 'Algorithms']
    }
  ],
  links: {
    github: 'https://github.com/Vashu157/',
    linkedin: 'https://www.linkedin.com/in/vashu-kumar-63a9aa397/',
    portfolio: 'https://vashu.dev',
    email: 'kumarvashu157@gmail.com',
    leetcode: 'https://leetcode.com/u/Vashu157/',
    codeforces: 'https://codeforces.com/profile/rizzler_napolean'
  },
  rating: {
    'C++': 9,
    'Python': 7,
    'JavaScript': 8,
    'ReactJS': 9,
    'NextJS': 7,
    'NodeJS': 8,
    'Machine Learning': 7,
    'Data Structures': 9,
    'Algorithms': 9,
    'PostgreSQL': 7,
    'REST APIs': 8,
    'Git': 8,
    'React Native': 6,
    'Supabase': 8,
    'NLTK': 6,
    'HTML': 9,
    'CSS': 8,
    'MySQL': 7,
    'Streamlit': 7,
    'C': 8
  },
  achievements: [
    'Solved 450+ problems on LeetCode using C++',
    'Deputy General Secretary of Tech Club, NIT Delhi',
    'Sector head of Training & Placement Cell (2024-Present)',
    'Participant in Smart India Hackathon (SIH)',
    'Active in event management and sponsorship for college fests',
    'Senior Secondary: 86% (Dhruva Public School, Delhi)',
    'Secondary: 93.4% (Mount Litera Zee School, Bihar)'
  ],
  interests: ['Cricket', 'Team Activities', 'Competitive Programming', 'Hackathons']
};

const seedDatabase = async () => {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000
    });
    console.log('✅ Connected to MongoDB');
    console.log('🗑️  Clearing existing profiles...');
    await Profile.deleteMany({});
    console.log('✅ Existing data cleared');

    // Insert new profile
    console.log('📝 Inserting portfolio data...');
    const profile = await Profile.create(portfolioData);
    console.log('✅ Profile created successfully!');
    console.log('\n📊 Profile Summary:');
    console.log(`   Name: ${profile.name}`);
    console.log(`   Email: ${profile.email}`);
    console.log(`   Skills: ${profile.skills.length}`);
    console.log(`   Projects: ${profile.projects.length}`);
    console.log(`   Work Experience: ${profile.work.length}`);
    console.log(`   ID: ${profile._id}`);

    console.log('\n✨ Database seeded successfully!');
    console.log('🚀 You can now start the server with: npm start');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    console.error(error);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed');
    process.exit();
  }
};

// Run the seed function
seedDatabase();