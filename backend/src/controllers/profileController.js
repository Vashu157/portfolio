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

export const getProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findOne();
    
    if (!profile) {
      const error = new Error('Profile not found.run the seed script.');
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
    const profile = await Profile.findOne();
    
    if (!profile) {
      const error = new Error('Profile not found');
      error.statusCode = 404;
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
    const profile = await Profile.findOne(
      { $text: { $search: q } },
      { score: { $meta: 'textScore' } }
    ).sort({ score: { $meta: 'textScore' } });

    if (!profile) {
      return res.status(200).json({
        success: true,
        message: 'No results found',
        data: null
      });
    }

    res.status(200).json({
      success: true,
      data: profile
    });
  } catch (error) {
    next(error);
  }
};
