import Latest_rendering from '../../../models/latest_rendering.model.js';
import Select_your_room from '../../../models/select_your_room.model.js';
import Select_your_style from '../../../models/select_your_style.model.js';
import Select_your_budget from '../../../models/select_your_budget.model.js';
import Select_your_furniture from '../../../models/select_your_furniture.model.js';
import { BASE_URL } from '../../../configs/dotenv.config.js';

export const get_home = async (req, res) => {
  try {
    const user = req.user;
    const latest_rendering = await Latest_rendering.findAll();
    const select_your_room = await Select_your_room.findAll();
    const select_your_style = await Select_your_style.findAll();
    const select_your_budget = await Select_your_budget.findAll();
    const select_your_furniture = await Select_your_furniture.findAll();
    const is_subscribed = user ? (user.subscription ? 'true' : 'false') : 'false';
    return res.status(200).json({
      status_code: 200,
      message: 'Home data retrieved successfully',
      data: {
        is_paid: is_subscribed,
        sections: [
          {
            heading: 'Latest Rendering',
            latest_rendering_list: latest_rendering,
          },
          {
            heading: 'Select your room',
            select_your_room: select_your_room,
          },
          {
            heading: 'Select your style',
            select_style_list: select_your_style,
          },
          {
            heading: 'Select your furniture',
            select_furniture_list: select_your_budget,
          },
          {
            heading: 'Select your budget',
            select_budget_list: select_your_furniture,
          },
        ],
      },
    });
  } catch (error) {
    return res.status(200).json({
      status_code: 500,
      message: 'An error occurred while fetching data.',
      error: error.message,
    });
  }
};

// Latest Rendering: Create or update if exists (only one record exists)
export const create_latest_rendering = async (req, res) => {
  try {
    const user = req.user;
    const { modern, product_alpha } = req.body;
    const is_subscribed = user ? (user.subscription ? 'true' : 'false') : 'false';
    const file = req.file;
    if (!file) {
      return res.status(200).json({ status_code: 400, message: 'No file uploaded' });
    }
    const image_url = `${BASE_URL}/api/images/${file.filename}`;

    let record = await Latest_rendering.findOne();
    if (record) {
      // Update the existing record
      await record.update({
        is_paid: is_subscribed,
        modern,
        product_alpha,
        render_image: image_url,
      });
      return res.status(200).json({
        status_code: 200,
        message: 'Latest rendering updated successfully',
        data: record,
      });
    }
    // Create a new record
    const new_record = await Latest_rendering.create({
      is_paid: is_subscribed,
      modern,
      product_alpha,
      render_image: image_url,
    });
    return res.status(200).json({
      status_code: 200,
      message: 'Latest rendering created successfully',
      data: new_record,
    });
  } catch (error) {
    console.error('Error processing latest rendering:', error);
    return res.status(200).json({
      status_code: 500,
      message: 'An error occurred while processing data.',
      error: error.message,
    });
  }
};

export const delete_latest_rendering = async (req, res) => {
  try {
    const { id } = req.body;
    const record = await Latest_rendering.findOne({ where: { id } });
    if (!record) {
      return res.status(200).json({
        status_code: 404,
        message: 'Latest rendering not found',
      });
    }
    await record.destroy();
    return res.status(200).json({
      status_code: 200,
      message: 'Latest rendering deleted successfully',
      data: record,
    });
  } catch (error) {
    return res.status(200).json({
      status_code: 500,
      message: 'An error occurred while deleting data.',
      error: error.message,
    });
  }
};

// Select Your Budget: Create or update if exists (only one record exists)
export const create_select_your_budget = async (req, res) => {
  try {
    const user = req.user;
    const { budget_low, product_alpha } = req.body;
    const is_subscribed = user ? (user.subscription ? 'true' : 'false') : 'false';
    const file = req.file;
    if (!file) {
      return res.status(200).json({ status_code: 400, message: 'No file uploaded' });
    }
    const image_url = `${BASE_URL}/api/images/${file.filename}`;

    let record = await Select_your_budget.findOne();
    if (record) {
      await record.update({
        is_paid: is_subscribed,
        budget_low,
        product_alpha,
        budget_image: image_url,
      });
      return res.status(200).json({
        status_code: 200,
        message: 'Select your budget updated successfully',
        data: record,
      });
    }
    const new_record = await Select_your_budget.create({
      is_paid: is_subscribed,
      budget_low,
      product_alpha,
      budget_image: image_url,
    });
    return res.status(200).json({
      status_code: 200,
      message: 'Select your budget created successfully',
      data: new_record,
    });
  } catch (error) {
    console.error('Error processing select your budget:', error);
    return res.status(200).json({
      status_code: 500,
      message: 'An error occurred while processing data.',
      error: error.message,
    });
  }
};

export const delete_select_your_budget = async (req, res) => {
  try {
    const { id } = req.body;
    const record = await Select_your_budget.findOne({ where: { id } });
    if (!record) {
      return res.status(200).json({
        status_code: 404,
        message: 'Select your budget not found',
      });
    }
    await record.destroy();
    return res.status(200).json({
      status_code: 200,
      message: 'Select your budget deleted successfully',
      data: record,
    });
  } catch (error) {
    return res.status(200).json({
      status_code: 500,
      message: 'An error occurred while deleting data.',
      error: error.message,
    });
  }
};

// Select Your Room: Create or update if exists (only one record exists)
export const create_select_your_room = async (req, res) => {
  try {
    const user = req.user;
    const { selectroom, product_alpha } = req.body;
    const is_subscribed = user ? (user.subscription ? 'true' : 'false') : 'false';
    const file = req.file;
    if (!file) {
      return res.status(200).json({ status_code: 400, message: 'No file uploaded' });
    }
    const image_url = `${BASE_URL}/api/images/${file.filename}`;

    let record = await Select_your_room.findOne();
    if (record) {
      await record.update({
        is_paid: is_subscribed,
        selectroom,
        product_alpha,
        room_image: image_url,
      });
      return res.status(200).json({
        status_code: 200,
        message: 'Select your room updated successfully',
        data: record,
      });
    }
    const new_record = await Select_your_room.create({
      is_paid: is_subscribed,
      selectroom,
      product_alpha,
      room_image: image_url,
    });
    return res.status(200).json({
      status_code: 200,
      message: 'Select your room created successfully',
      data: new_record,
    });
  } catch (error) {
    console.error('Error processing select your room:', error);
    return res.status(200).json({
      status_code: 500,
      message: 'An error occurred while processing data.',
      error: error.message,
    });
  }
};

export const delete_select_your_room = async (req, res) => {
  try {
    const { id } = req.body;
    const record = await Select_your_room.findOne({ where: { id } });
    if (!record) {
      return res.status(200).json({
        status_code: 404,
        message: 'Select your room not found',
      });
    }
    await record.destroy();
    return res.status(200).json({
      status_code: 200,
      message: 'Select your room deleted successfully',
      data: record,
    });
  } catch (error) {
    return res.status(200).json({
      status_code: 500,
      message: 'An error occurred while deleting data.',
      error: error.message,
    });
  }
};

// Select Your Style: Create or update if exists (only one record exists)
export const create_select_your_style = async (req, res) => {
  try {
    const user = req.user;
    const { model, product_alpha } = req.body;
    const is_subscribed = user ? (user.subscription ? 'true' : 'false') : 'false';
    const file = req.file;
    if (!file) {
      return res.status(200).json({ status_code: 400, message: 'No file uploaded' });
    }
    const image_url = `${BASE_URL}/api/images/${file.filename}`;

    let record = await Select_your_style.findOne();
    if (record) {
      await record.update({
        is_paid: is_subscribed,
        model,
        product_alpha,
        product_image: image_url,
      });
      return res.status(200).json({
        status_code: 200,
        message: 'Select your style updated successfully',
        data: record,
      });
    }
    const new_record = await Select_your_style.create({
      is_paid: is_subscribed,
      model,
      product_alpha,
      product_image: image_url,
    });
    return res.status(200).json({
      status_code: 200,
      message: 'Select your style created successfully',
      data: new_record,
    });
  } catch (error) {
    console.error('Error processing select your style:', error);
    return res.status(200).json({
      status_code: 500,
      message: 'An error occurred while processing data.',
      error: error.message,
    });
  }
};

export const delete_select_your_style = async (req, res) => {
  try {
    const { id } = req.body;
    const record = await Select_your_style.findOne({ where: { id } });
    if (!record) {
      return res.status(200).json({
        status_code: 404,
        message: 'Select your style not found',
      });
    }
    await record.destroy();
    return res.status(200).json({
      status_code: 200,
      message: 'Select your style deleted successfully',
      data: record,
    });
  } catch (error) {
    return res.status(200).json({
      status_code: 500,
      message: 'An error occurred while deleting data.',
      error: error.message,
    });
  }
};

// Select Your Furniture: Create or update if exists (only one record exists)
export const create_select_your_furniture = async (req, res) => {
  try {
    const user = req.user;
    const { package_name, product_alpha } = req.body;
    const is_subscribed = user ? (user.subscription ? 'true' : 'false') : 'false';
    const file = req.file;
    if (!file) {
      return res.status(200).json({ status_code: 400, message: 'No file uploaded' });
    }
    const image_url = `${BASE_URL}/api/images/${file.filename}`;

    let record = await Select_your_furniture.findOne();
    if (record) {
      await record.update({
        is_paid: is_subscribed,
        package_name,
        product_alpha,
        package_url: image_url,
      });
      return res.status(200).json({
        status_code: 200,
        message: 'Select your furniture updated successfully',
        data: record,
      });
    }
    const new_record = await Select_your_furniture.create({
      is_paid: is_subscribed,
      package_name,
      product_alpha,
      package_url: image_url,
    });
    return res.status(200).json({
      status_code: 200,
      message: 'Select your furniture created successfully',
      data: new_record,
    });
  } catch (error) {
    console.error('Error processing select your furniture:', error);
    return res.status(200).json({
      status_code: 500,
      message: 'An error occurred while processing data.',
      error: error.message,
    });
  }
};

export const delete_select_your_furniture = async (req, res) => {
  try {
    const { id } = req.body;
    const record = await Select_your_furniture.findOne({ where: { id } });
    if (!record) {
      return res.status(200).json({
        status_code: 404,
        message: 'Select your furniture not found',
      });
    }
    await record.destroy();
    return res.status(200).json({
      status_code: 200,
      message: 'Select your furniture deleted successfully',
      data: record,
    });
  } catch (error) {
    return res.status(200).json({
      status_code: 500,
      message: 'An error occurred while deleting data.',
      error: error.message,
    });
  }
};
