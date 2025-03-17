import Latest_rendering from '../models/latest_rendering.model.js';
import Select_your_room from '../models/select_your_room.model.js';
import Select_your_style from '../models/select_your_style.model.js';
import Select_your_budget from '../models/select_your_budget.model.js';
import Select_your_furniture from '../models/select_your_furniture.model.js';

export const get_home = async (req, res) => {
  try {
    const latest_rendering = await Latest_rendering.findAll();
    const select_your_room = await Select_your_room.findAll();
    const select_your_style = await Select_your_style.findAll();
    const select_your_budget = await Select_your_budget.findAll();
    const select_your_furniture = await Select_your_furniture.findAll();
    return res.status(200).json({
      status_code: 200,
      message: 'Help Support retrieved successfully',
      data: {
        is_paid: 'true', // Adjust if needed or derive from logic
        sections: [
          {
            heading: 'Lastest Rendering',
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
