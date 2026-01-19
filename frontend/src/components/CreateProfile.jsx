import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const CreateProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    title: '',
    bio: '',
    education: {
      degree: '',
      institution: '',
      year: '',
      field: '',
      gpa: ''
    },
    skills: [],
    projects: [],
    work: [],
    links: {
      github: '',
      linkedin: '',
      portfolio: '',
      twitter: '',
      email: ''
    },
    interests: []
  });

  // Temporary input states
  const [skillInput, setSkillInput] = useState('');
  const [interestInput, setInterestInput] = useState('');
  const [projectInput, setProjectInput] = useState({
    title: '',
    description: '',
    links: { github: '', live: '', demo: '' },
    technologies: [],
    featured: false
  });
  const [techInput, setTechInput] = useState('');
  const [workInput, setWorkInput] = useState({
    company: '',
    position: '',
    duration: '',
    description: '',
    technologies: []
  });
  const [workTechInput, setWorkTechInput] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('education.')) {
      const field = name.split('.')[1];
      setFormData({
        ...formData,
        education: { ...formData.education, [field]: value }
      });
    } else if (name.startsWith('links.')) {
      const field = name.split('.')[1];
      setFormData({
        ...formData,
        links: { ...formData.links, [field]: value }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Skills management
  const addSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData({ ...formData, skills: [...formData.skills, skillInput.trim()] });
      setSkillInput('');
    }
  };

  const removeSkill = (index) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((_, i) => i !== index)
    });
  };

  // Interests management
  const addInterest = () => {
    if (interestInput.trim() && !formData.interests.includes(interestInput.trim())) {
      setFormData({
        ...formData,
        interests: [...formData.interests, interestInput.trim()]
      });
      setInterestInput('');
    }
  };

  const removeInterest = (index) => {
    setFormData({
      ...formData,
      interests: formData.interests.filter((_, i) => i !== index)
    });
  };

  // Projects management
  const handleProjectChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('links.')) {
      const field = name.split('.')[1];
      setProjectInput({
        ...projectInput,
        links: { ...projectInput.links, [field]: value }
      });
    } else {
      setProjectInput({ ...projectInput, [name]: value });
    }
  };

  const addTechnology = () => {
    if (techInput.trim() && !projectInput.technologies.includes(techInput.trim())) {
      setProjectInput({
        ...projectInput,
        technologies: [...projectInput.technologies, techInput.trim()]
      });
      setTechInput('');
    }
  };

  const removeTechnology = (index) => {
    setProjectInput({
      ...projectInput,
      technologies: projectInput.technologies.filter((_, i) => i !== index)
    });
  };

  const addProject = () => {
    if (projectInput.title.trim() && projectInput.description.trim()) {
      setFormData({ ...formData, projects: [...formData.projects, projectInput] });
      setProjectInput({
        title: '',
        description: '',
        links: { github: '', live: '', demo: '' },
        technologies: [],
        featured: false
      });
    }
  };

  const removeProject = (index) => {
    setFormData({
      ...formData,
      projects: formData.projects.filter((_, i) => i !== index)
    });
  };

  // Work experience management
  const handleWorkChange = (e) => {
    const { name, value } = e.target;
    setWorkInput({ ...workInput, [name]: value });
  };

  const addWorkTech = () => {
    if (workTechInput.trim() && !workInput.technologies.includes(workTechInput.trim())) {
      setWorkInput({
        ...workInput,
        technologies: [...workInput.technologies, workTechInput.trim()]
      });
      setWorkTechInput('');
    }
  };

  const removeWorkTech = (index) => {
    setWorkInput({
      ...workInput,
      technologies: workInput.technologies.filter((_, i) => i !== index)
    });
  };

  const addWork = () => {
    if (
      workInput.company.trim() &&
      workInput.position.trim() &&
      workInput.duration.trim()
    ) {
      setFormData({ ...formData, work: [...formData.work, workInput] });
      setWorkInput({
        company: '',
        position: '',
        duration: '',
        description: '',
        technologies: []
      });
    }
  };

  const removeWork = (index) => {
    setFormData({
      ...formData,
      work: formData.work.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await api.createProfile(formData);
      setSuccess(true);
      
      // Redirect to the new profile after 2 seconds
      setTimeout(() => {
        navigate(`/user/${formData.username}`);
      }, 2000);
    } catch (err) {
      console.error('Error creating profile:', err);
      setError(
        err.response?.data?.message ||
          err.message ||
          'Failed to create profile. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
          <div className="text-green-600 mb-4">
            <svg
              className="w-16 h-16 mx-auto"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Profile Created!</h2>
          <p className="text-gray-600">Redirecting to your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Profile</h1>
          <p className="text-gray-600 mb-8">
            Share your skills and projects with the community
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Basic Information</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username * <span className="text-gray-500">(lowercase, no spaces)</span>
                </label>
                <input
                  type="text"
                  name="username"
                  required
                  pattern="[a-z0-9_-]+"
                  minLength="3"
                  maxLength="30"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="johndoe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Full Stack Developer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  name="bio"
                  rows="4"
                  maxLength="1000"
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Tell us about yourself..."
                />
              </div>
            </div>

            {/* Education */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Education</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Degree
                  </label>
                  <input
                    type="text"
                    name="education.degree"
                    value={formData.education.degree}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Bachelor of Technology"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Field of Study
                  </label>
                  <input
                    type="text"
                    name="education.field"
                    value={formData.education.field}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Computer Science"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Institution
                  </label>
                  <input
                    type="text"
                    name="education.institution"
                    value={formData.education.institution}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="University Name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Year
                  </label>
                  <input
                    type="text"
                    name="education.year"
                    value={formData.education.year}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="2024"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    GPA
                  </label>
                  <input
                    type="text"
                    name="education.gpa"
                    value={formData.education.gpa}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="3.8/4.0"
                  />
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Skills</h2>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Add a skill (e.g., JavaScript)"
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Add
                </button>
              </div>

              {formData.skills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(index)}
                        className="text-indigo-700 hover:text-indigo-900"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Projects */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Projects</h2>
              
              <div className="border border-gray-300 rounded-lg p-4 space-y-3">
                <input
                  type="text"
                  name="title"
                  value={projectInput.title}
                  onChange={handleProjectChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Project Title"
                />
                
                <textarea
                  name="description"
                  rows="3"
                  value={projectInput.description}
                  onChange={handleProjectChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Project Description"
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input
                    type="url"
                    name="links.github"
                    value={projectInput.links.github}
                    onChange={handleProjectChange}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="GitHub URL"
                  />
                  <input
                    type="url"
                    name="links.live"
                    value={projectInput.links.live}
                    onChange={handleProjectChange}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Live URL"
                  />
                  <input
                    type="url"
                    name="links.demo"
                    value={projectInput.links.demo}
                    onChange={handleProjectChange}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Demo URL"
                  />
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === 'Enter' && (e.preventDefault(), addTechnology())
                    }
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Add technology"
                  />
                  <button
                    type="button"
                    onClick={addTechnology}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                  >
                    Add Tech
                  </button>
                </div>

                {projectInput.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {projectInput.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm flex items-center gap-2"
                      >
                        {tech}
                        <button
                          type="button"
                          onClick={() => removeTechnology(index)}
                          className="text-gray-700 hover:text-gray-900"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={projectInput.featured}
                    onChange={(e) =>
                      setProjectInput({ ...projectInput, featured: e.target.checked })
                    }
                    className="rounded"
                  />
                  <span className="text-sm text-gray-700">Featured Project</span>
                </label>

                <button
                  type="button"
                  onClick={addProject}
                  disabled={!projectInput.title || !projectInput.description}
                  className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400"
                >
                  Add Project
                </button>
              </div>

              {formData.projects.length > 0 && (
                <div className="space-y-3">
                  {formData.projects.map((project, index) => (
                    <div
                      key={index}
                      className="border border-gray-300 rounded-lg p-4 flex justify-between items-start"
                    >
                      <div>
                        <h3 className="font-semibold text-gray-800">{project.title}</h3>
                        <p className="text-sm text-gray-600">{project.description}</p>
                        {project.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {project.technologies.map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeProject(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Work Experience */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Work Experience</h2>
              
              <div className="border border-gray-300 rounded-lg p-4 space-y-3">
                <input
                  type="text"
                  name="company"
                  value={workInput.company}
                  onChange={handleWorkChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Company Name"
                />
                
                <input
                  type="text"
                  name="position"
                  value={workInput.position}
                  onChange={handleWorkChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Position"
                />

                <input
                  type="text"
                  name="duration"
                  value={workInput.duration}
                  onChange={handleWorkChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Duration (e.g., Jan 2023 - Present)"
                />

                <textarea
                  name="description"
                  rows="3"
                  value={workInput.description}
                  onChange={handleWorkChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Description"
                />

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={workTechInput}
                    onChange={(e) => setWorkTechInput(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === 'Enter' && (e.preventDefault(), addWorkTech())
                    }
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Add technology"
                  />
                  <button
                    type="button"
                    onClick={addWorkTech}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                  >
                    Add Tech
                  </button>
                </div>

                {workInput.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {workInput.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm flex items-center gap-2"
                      >
                        {tech}
                        <button
                          type="button"
                          onClick={() => removeWorkTech(index)}
                          className="text-gray-700 hover:text-gray-900"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                <button
                  type="button"
                  onClick={addWork}
                  disabled={!workInput.company || !workInput.position || !workInput.duration}
                  className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400"
                >
                  Add Work Experience
                </button>
              </div>

              {formData.work.length > 0 && (
                <div className="space-y-3">
                  {formData.work.map((work, index) => (
                    <div
                      key={index}
                      className="border border-gray-300 rounded-lg p-4 flex justify-between items-start"
                    >
                      <div>
                        <h3 className="font-semibold text-gray-800">{work.position}</h3>
                        <p className="text-sm text-indigo-600">{work.company}</p>
                        <p className="text-sm text-gray-500">{work.duration}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeWork(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Social Links</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="url"
                  name="links.github"
                  value={formData.links.github}
                  onChange={handleChange}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="GitHub URL"
                />
                <input
                  type="url"
                  name="links.linkedin"
                  value={formData.links.linkedin}
                  onChange={handleChange}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="LinkedIn URL"
                />
                <input
                  type="url"
                  name="links.portfolio"
                  value={formData.links.portfolio}
                  onChange={handleChange}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Portfolio URL"
                />
                <input
                  type="url"
                  name="links.twitter"
                  value={formData.links.twitter}
                  onChange={handleChange}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Twitter URL"
                />
                <input
                  type="email"
                  name="links.email"
                  value={formData.links.email}
                  onChange={handleChange}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Contact Email"
                />
              </div>
            </div>

            {/* Interests */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Interests</h2>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  value={interestInput}
                  onChange={(e) => setInterestInput(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === 'Enter' && (e.preventDefault(), addInterest())
                  }
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Add an interest"
                />
                <button
                  type="button"
                  onClick={addInterest}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Add
                </button>
              </div>

              {formData.interests.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.interests.map((interest, index) => (
                    <span
                      key={index}
                      className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                    >
                      {interest}
                      <button
                        type="button"
                        onClick={() => removeInterest(index)}
                        className="text-indigo-700 hover:text-indigo-900"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-gray-300">
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 font-semibold text-lg"
              >
                {loading ? 'Creating Profile...' : 'Create Profile'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProfile;
