import Help_support from '../models/help_support.model.js';

export const get_help_support_data = async (req, res) => {
  try {
    const help_support = await Help_support.findAll();

    if (help_support.length === 0) {
      return res.status(200).json({
        status_code: 404,
        message: 'No help support data found',
      });
    }

    return res.status(200).json({
      status_code: 200,
      message: 'Help Support retrieved successfully',
      data: help_support,
    });
  } catch (error) {
    return res.status(200).json({
      status_code: 500,
      message: 'An error occurred while fetching data.',
      error: error.message,
    });
  }
};
