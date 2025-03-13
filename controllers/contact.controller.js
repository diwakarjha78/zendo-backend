import User from '../models/user.model.js';
import Contact_us from '../models/contact_us.model.js';
import Contact_details from '../models/contact_details.model.js';

export const get_contact_details = async (req, res) => {
  try {
    const contact_details = await Contact_details.findOne();

    if (!contact_details) {
      return res.status(200).json({
        status_code: 404,
        message: 'No contact details found.',
      });
    }

    return res.status(200).json({
      status_code: 200,
      message: 'Contact details retrieved successfully.',
      data: [
        {
          email: contact_details.email,
          image_url: contact_details.email_image_url,
        },
        {
          mobile: contact_details.mobile,
          image_url: contact_details.mobile_image_url,
        },
      ],
    });
  } catch (error) {
    return res.status(200).json({
      status_code: 500,
      message: 'An error occurred while fetching contact details.',
      error: error.message,
    });
  }
};

export const contact_us_details = async (req, res) => {
  try {
    const { full_name, email, mobile, message } = req.body;

    if (!full_name || !email || !message) {
      return res.status(200).json({
        status_code: 400,
        message: 'Full Name, Email and Message are required fields.',
      });
    }
    const user = req.user;
    const user_details = await User.findOne({ where: { email: user.email } });

    // Prepare the new contact_us object
    const new_contact = await Contact_us.create({
      userId: user_details.id,
      full_name,
      email,
      mobile,
      message: message?.trim() || '',
    });

    return res.status(200).json({
      status_code: 200,
      message: 'Thanks for contacting us',
      data: new_contact,
    });
  } catch (error) {
    return res.status(200).json({
      status_code: 500,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};
