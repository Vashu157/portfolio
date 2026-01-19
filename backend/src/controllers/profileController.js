import Profile from '../models/Profile.js';


export const getHealth = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      message: 'API is running',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    });
  } catch (error) {
    next(error);
  }
};

// Get all profiles (for directory page)
export const getAllProfiles = async (req, res, next) => {
  try {
    const profiles = await Profile.find()
      .select('username name email title bio skills links')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: profiles.length,
      data: profiles
    });
  } catch (error) {
    next(error);
  }
};

// Get single profile by username
export const getProfileByUsername = async (req, res, next) => {
  try {
    const { username } = req.params;
    const profile = await Profile.findOne({ username: username.toLowerCase() });
    
    if (!profile) {
      const error = new Error(`Profile with username "${username}" not found`);
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      success: true,
      data: profile
    });
  } catch (error) {
    next(error);
  }
};

// Create new profile (public endpoint)
export const createProfile = async (req, res, next) => {
  try {
    const profile = await Profile.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Profile created successfully',
      data: profile
    });
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      const customError = new Error(`A profile with this ${field} already exists`);
      customError.statusCode = 400;
      return next(customError);
    }
    next(error);
  }
};

// Legacy endpoint - get first profile (for backward compatibility)
export const getProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findOne();
    
    if (!profile) {
      const error = new Error('Profile not found. Run the seed script.');
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      success: true,
      data: profile
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { username } = req.params;
    const profile = await Profile.findOne({ username: username.toLowerCase() });
    
    if (!profile) {
      const error = new Error('Profile not found');
      error.statusCode = 404;
      return next(error);
    }

    // Prevent username changes
    if (req.body.username && req.body.username !== username) {
      const error = new Error('Username cannot be changed');
      error.statusCode = 400;
      return next(error);
    }

    const updatedProfile = await Profile.findByIdAndUpdate(
      profile._id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: updatedProfile
    });
  } catch (error) {
    next(error);
  }
};

export const searchProfile = async (req, res, next) => {
  try {
    const { q } = req.query;

    if (!q || q.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Bad Request',
        message: 'Search query parameter "q" is required'
      });
    }
    const profiles = await Profile.find(
      { $text: { $search: q } },
      { score: { $meta: 'textScore' } }
    ).sort({ score: { $meta: 'textScore' } });

    res.status(200).json({
      success: true,
      count: profiles.length,
      data: profiles
    });
  } catch (error) {
    next(error);
  }
};
