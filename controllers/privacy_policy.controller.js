import Privacy_policy from '../models/privacy_policy.model.js';

export const get_privacy_policy = async (req, res) => {
  try {
    const privacy_policy_data = await Privacy_policy.findAll({});
    if (privacy_policy_data.length === 0) {
      return res.status(200).json({
        status_code: 404,
        error: 'No data found for the privacy policy',
      });
    }

    return res.status(200).json({
      status_code: 200,
      message: 'data found',
      data: privacy_policy_data,
    });
  } catch (error) {
    console.error('Error in getting the privacy policy data', error);
    return res.status(200).json({
      status_code: 404,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};
