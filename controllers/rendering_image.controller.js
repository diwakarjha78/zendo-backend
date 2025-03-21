import Rendering_image from '../models/rendering_image.model.js';

export const upload_rendering_image = async (req, res) => {
  try {
    const { data } = req.body;
    if (!Array.isArray(data)) {
      return res.status(200).json({
        status_code: 400,
        message: 'Data must be an array of objects',
      });
    }
    // Bulk create records from the array of objects
    const created_records = await Rendering_image.bulkCreate(data);
    return res.status(200).json({
      status_code: 200,
      message: 'Data saved successfully',
      data: created_records,
    });
  } catch (error) {
    console.error('Error creating device data:', error);
    return res.status(200).json({
      status_code: 500,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

export const get_rendering_image = async (req, res) => {
  try {
    // Retrieve all rendering images, sorted by creation date (latest first)
    const images = await Rendering_image.findAll({
      order: [['createdAt', 'DESC']],
    });

    if (!images || images.length === 0) {
      return res.status(200).json({
        status_code: 404,
        message: 'No rendering images found',
        data: [],
      });
    }

    return res.status(200).json({
      status_code: 200,
      message: 'Rendering images retrieved successfully',
      data: images,
    });
  } catch (error) {
    console.error('Error fetching rendering images:', error);
    return res.status(200).json({
      status_code: 500,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

export const delete_rendering_image = async (req, res) => {
  try {
    const rendering_image_ids = req.body;

    if (!Array.isArray(rendering_image_ids) || rendering_image_ids.length === 0) {
      return res.status(200).json({
        status_code: 400,
        message: 'Invalid request. Please provide at least one rendering image ID.',
      });
    }

    // Delete records matching the provided IDs
    const deleted_count = await Rendering_image.destroy({
      where: { id: rendering_image_ids },
    });

    if (!deleted_count) {
      return res.status(200).json({
        status_code: 404,
        message: 'No rendering images were found for the provided IDs.',
      });
    }

    // Retrieve remaining rendering images, sorted by creation date (latest first)
    const images = await Rendering_image.findAll({
      order: [['createdAt', 'DESC']],
    });

    return res.status(200).json({
      status_code: 200,
      message: 'Rendering images deleted successfully',
      data: images,
    });
  } catch (error) {
    console.error('Error while deleting rendering images:', error);
    return res.status(200).json({
      status_code: 500,
      message: 'Error while deleting rendering images',
      error: error.message,
    });
  }
};
