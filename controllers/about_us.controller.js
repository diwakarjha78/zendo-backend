import About_us from '../models/about_us.model.js';

export const get_about_us = async (req, res) => {
  try {
    const about_us_data = await About_us.findAll();
    if (!about_us_data || about_us_data.length === 0) {
      return res.status(200).json({ status_code: 404, message: 'No about us data found' });
    }

    return res
      .status(200)
      .json({ status_code: 200, message: 'About us data fetched succesfully', data: about_us_data });
  } catch (error) {
    return res.status(200).json({
      status_code: 500,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};
