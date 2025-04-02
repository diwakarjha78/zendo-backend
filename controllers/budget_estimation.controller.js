import Budget_estimation from '../models/budget_estimation.model.js';
import { BASE_URL } from '../configs/dotenv.config.js';

export const main_budget_estimation = async (req, res) => {
  try {
    const { title, pricelist } = req.body;
    const file = req.file;

    // Validate file existence
    if (!file) {
      return res.status(400).json({
        status_code: 400,
        message: 'Image is required',
      });
    }

    // Validate title
    if (!title?.trim()) {
      return res.status(400).json({
        status_code: 400,
        message: 'Title is required',
      });
    }

    // Validate and parse pricelist
    let pricelistArray = pricelist;
    if (typeof pricelist === 'string') {
      try {
        pricelistArray = JSON.parse(pricelist);
      } catch (e) {
        return res.status(400).json({
          status_code: 400,
          message: 'Pricelist is not a valid JSON array',
        });
      }
    }
    if (!Array.isArray(pricelistArray) || pricelistArray.length === 0) {
      return res.status(400).json({
        status_code: 400,
        message: 'Pricelist must be a non-empty array',
      });
    }
    if (!pricelistArray.every((item) => typeof item === 'string')) {
      return res.status(400).json({
        status_code: 400,
        message: 'Pricelist must contain only strings',
      });
    }

    // Construct image URL
    const image_url = `${BASE_URL}/api/images/${file.filename}`;

    // Check if we already have a record
    const existing_record = await Budget_estimation.findOne();
    let budget_estimation;

    if (existing_record) {
      // Update existing record
      await existing_record.update({
        title: title.trim(),
        pricelist: pricelistArray,
        image_url,
      });
      // Get the updated record
      budget_estimation = await Budget_estimation.findOne();
    } else {
      // Create first record
      budget_estimation = await Budget_estimation.create({
        title: title.trim(),
        pricelist: pricelistArray,
        image_url,
      });
    }

    // If pricelist is stored as JSON string, parse it; otherwise use it as is.
    const parsed_price_list =
      typeof budget_estimation.pricelist === 'string'
        ? JSON.parse(budget_estimation.pricelist)
        : budget_estimation.pricelist;

    return res.status(200).json({
      status_code: 200,
      message: existing_record ? 'Budget estimation updated successfully' : 'Budget estimation created successfully',
      data: {
        title: budget_estimation.title,
        pricelist: parsed_price_list,
        image_url: budget_estimation.image_url,
      },
    });
  } catch (error) {
    console.error('Error in budget estimation:', error);
    return res.status(500).json({
      status_code: 500,
      message: 'Internal server error',
      error: error.message,
    });
  }
};

export const get_budget_estimation = async (req, res) => {
  try {
    const budget_estimation = await Budget_estimation.findOne();

    if (!budget_estimation) {
      return res.status(200).json({
        status_code: 404,
        message: 'No budget estimation found',
      });
    }

    const parsed_price_list =
      typeof budget_estimation.pricelist === 'string'
        ? JSON.parse(budget_estimation.pricelist)
        : budget_estimation.pricelist;
    return res.status(200).json({
      status_code: 200,
      message: 'Budget estimation fetched successfully',
      data: {
        title: budget_estimation.title,
        image_url: budget_estimation.image_url,
        pricelist: parsed_price_list,
      },
    });
  } catch (error) {
    console.error('Error in getting budget estimation:', error);
    return res.status(200).json({
      status_code: 500,
      message: 'Internal server error',
      error: error.message,
    });
  }
};
