import Terms_policies from '../../../models/terms_policies.model.js';

export const get_terms_policies = async (req, res) => {
  try {
    const terms_policies_data = await Terms_policies.findAll({});

    if (!terms_policies_data || terms_policies_data.length === 0) {
      return res.status(200).json({
        status_code: 404,
        message: 'No terms and policies found',
      });
    }

    return res.status(200).json({
      status_code: 200,
      message: 'Data fetched successfully',
      data: terms_policies_data,
    });
  } catch (error) {
    return res.status(200).json({
      status_code: 500,
      message: 'Internal Server Error',
      error: error.messaage,
    });
  }
};
