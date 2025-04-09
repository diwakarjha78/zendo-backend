import Data from '../lib/data.js';

export const dashboard_page = async (req, res) => {
  try {
    res.render('dashboard', {Data});
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
