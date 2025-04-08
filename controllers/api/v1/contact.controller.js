import User from '../../../models/user.model.js';
import Contact_us from '../../../models/contact_us.model.js';
import Contact_details from '../../../models/contact_details.model.js';
import { BASE_URL } from '../../../configs/dotenv.config.js';

export const create_contact_details = async (req, res) => {
  try {
    const { email, mobile } = req.body;
    if (!email || !mobile) {
      return res.status(200).json({
        status_code: 400,
        message: 'Email and Mobile are required fields.',
      });
    }
    const email_image_url = req.files['email_image']
      ? `${BASE_URL}/uploads/images/${req.files['email_image'][0].filename}`
      : '';

    const mobile_image_url = req.files['mobile_image']
      ? `${BASE_URL}/uploads/images/${req.files['mobile_image'][0].filename}`
      : '';
    const contact_details = await Contact_details.findOne();
    if (contact_details) {
      return res.status(200).json({
        status_code: 409,
        message: 'Contact details already exist.',
      });
    }
    await Contact_details.create({
      email,
      email_image_url,
      mobile,
      mobile_image_url,
    });
    const new_contact_details = await Contact_details.findOne();
    return res.status(200).json({
      status_code: 200,
      message: 'Contact details created successfully.',
      data: new_contact_details,
    });
  } catch (error) {
    return res.status(200).json({
      status_code: 500,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

export const update_contact_details = async (req, res) => {
  try {
    const { id, email, mobile } = req.body;
    const contact = await Contact_details.findByPk(id);
    if (!contact) {
      return res.status(200).json({
        status_code: 404,
        message: 'Contact details not found.',
      });
    }
    contact.email = email || contact.email;
    contact.mobile = mobile || contact.mobile;
    if (req.files['email_image']) {
      contact.email_image_url = `${BASE_URL}/uploads/images/${req.files['email_image'][0].filename}`;
    }
    if (req.files['mobile_image']) {
      contact.mobile_image_url = `${BASE_URL}/uploads/images/${req.files['mobile_image'][0].filename}`;
    }
    await contact.save();
    return res.status(200).json({
      status_code: 200,
      message: 'Contact details updated successfully.',
      data: contact,
    });
  } catch (error) {
    return res.status(200).json({
      status_code: 500,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

export const delete_contact_details = async (req, res) => {
  try {
    const { id } = req.body;
    const contact = await Contact_details.findByPk(id);
    if (!contact) {
      return res.status(200).json({
        status_code: 404,
        message: 'Contact details not found.',
      });
    }
    await contact.destroy();
    return res.status(200).json({
      status_code: 200,
      message: 'Contact details deleted successfully.',
    });
  } catch (error) {
    return res.status(200).json({
      status_code: 500,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

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
      data: {
        id: contact_details.id,
        email: contact_details.email,
        email_image_url: contact_details.email_image_url,
        mobile: contact_details.mobile,
        mobile_image_url: contact_details.mobile_image_url,
      },
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

export const get_all_contact_us = async (req, res) => {
  try {
    const contacts = await Contact_us.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'username', 'email'], // assuming User has a "username" field
        },
      ],
      order: [['createdAt', 'DESC']],
    });
    if (!contacts || contacts.length === 0) {
      return res.status(200).json({
        status_code: 404,
        message: 'No contacts found',
      });
    }
    return res.status(200).json({
      status_code: 200,
      message: 'Contacts retrieved successfully',
      data: contacts,
    });
  } catch (error) {
    return res.status(200).json({
      status_code: 500,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

// Update a contact by its id provided in req.body
export const update_contact_us = async (req, res) => {
  try {
    const { id, full_name, email, mobile, message } = req.body;

    if (!id) {
      return res.status(400).json({
        status_code: 400,
        message: 'Contact id is required for update',
      });
    }

    const contact = await Contact_us.findByPk(id);
    if (!contact) {
      return res.status(200).json({
        status_code: 404,
        message: 'Contact not found',
      });
    }

    await contact.update({
      full_name: full_name || contact.full_name,
      email: email || contact.email,
      mobile: mobile || contact.mobile,
      message: typeof message === 'string' ? message.trim() : contact.message,
    });

    return res.status(200).json({
      status_code: 200,
      message: 'Contact updated successfully',
      data: contact,
    });
  } catch (error) {
    return res.status(200).json({
      status_code: 500,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

// Delete a contact by its id provided in req.body
export const delete_contact_us = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(200).json({
        status_code: 400,
        message: 'Contact id is required for deletion',
      });
    }

    const contact = await Contact_us.findByPk(id);
    if (!contact) {
      return res.status(200).json({
        status_code: 404,
        message: 'Contact not found',
      });
    }

    await contact.destroy();
    return res.status(200).json({
      status_code: 200,
      message: 'Contact deleted successfully',
    });
  } catch (error) {
    return res.status(200).json({
      status_code: 500,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};
