import axios from 'axios';
import { API_BASE_URL } from '../configs/dotenv.config.js';

export const user_profiles = async (req, res) => {
  try {
    const page = Number.parseInt(req.query.page) || 1;
    const search = req.query.search || '';
    const isAjaxRequest = req.query.ajax === 'true';
    const ITEMS_PER_PAGE = 10;

    // Get token from cookies
    const token = req.cookies.zendo_user ? JSON.parse(req.cookies.zendo_user).zendo_at : null;

    // Fetch users from API
    const response = await axios.get(`${API_BASE_URL}/getAllUsers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    let users = [];
    if (response.data.status_code === 200) {
      users = response.data.data;
    } else {
      console.error('API Error:', response.data);
      if (isAjaxRequest) {
        return res.status(response.data.status_code || 500).json({
          success: false,
          message: response.data.message || 'Error fetching users',
        });
      }
      return res.status(response.data.status_code || 500).render('error', {
        message: response.data.message || 'Error fetching users',
      });
    }

    // Filter users based on search query
    if (search) {
      const searchLower = search.toLowerCase();
      users = users.filter((user) => {
        return (
          user.username.toLowerCase().includes(searchLower) ||
          user.email.toLowerCase().includes(searchLower) ||
          (user.mobile && user.mobile.toLowerCase().includes(searchLower))
        );
      });
    }

    // Calculate pagination
    const totalUsers = users.length;
    const totalPages = Math.ceil(totalUsers / ITEMS_PER_PAGE);
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const paginatedUsers = users.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    // Handle AJAX requests
    if (isAjaxRequest) {
      return res.json({
        users: paginatedUsers,
        currentPage: page,
        totalPages,
        totalUsers,
        startIndex,
        search,
        itemsPerPage: ITEMS_PER_PAGE,
      });
    }

    // Regular page render
    res.render('user_management/user_profile', {
      layout: 'layouts/admin',
      title: 'User profiles - Zendo Admin',
      users: paginatedUsers,
      currentPage: page,
      totalPages,
      totalUsers,
      startIndex,
      search,
      itemsPerPage: ITEMS_PER_PAGE,
    });
  } catch (error) {
    console.error('Error in user_profiles controller:', error);
    if (req.query.ajax === 'true') {
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
    return res.status(500).render('error', { message: 'Internal Server Error' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.query.userId;
    const isAjaxRequest = req.headers['content-type'] === 'application/json' || req.query.ajax === 'true';

    if (!userId) {
      if (isAjaxRequest) {
        return res.status(400).json({ success: false, message: 'User ID is required' });
      }
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Get token from cookies
    const token = req.cookies.zendo_user ? JSON.parse(req.cookies.zendo_user).zendo_at : null;
    if (!token) {
      if (isAjaxRequest) {
        return res.status(401).json({ success: false, message: 'Authentication required' });
      }
      return res.status(401).json({ message: 'Authentication required' });
    }

    // Call the API to delete the user
    const response = await axios.get(`${API_BASE_URL}/deleteUser?userId=${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.status_code === 200) {
      // Set flash message for success (if you have flash middleware)
      if (req.session) {
        req.session.flashMessage = {
          type: 'success',
          text: response.data.message || 'User has been successfully deactivated.',
        };
      }

      if (isAjaxRequest) {
        return res.json({
          success: true,
          message: response.data.message || 'User has been successfully deactivated.',
        });
      }

      // Redirect back to the user profiles page
      return res.redirect('/user-profiles');
    } else {
      // Handle API error
      if (req.session) {
        req.session.flashMessage = {
          type: 'error',
          text: response.data.message || 'Failed to delete user',
        };
      }

      if (isAjaxRequest) {
        return res.json({
          success: false,
          message: response.data.message || 'Failed to delete user',
        });
      }

      return res.redirect('/user-profiles');
    }
  } catch (error) {
    console.error('Error in deleteUser controller:', error);

    // Set flash message for error
    if (req.session) {
      req.session.flashMessage = {
        type: 'error',
        text: 'Error deleting user',
      };
    }

    if (req.headers['content-type'] === 'application/json' || req.query.ajax === 'true') {
      return res.status(500).json({ success: false, message: 'Error deleting user' });
    }

    return res.redirect('/user-profiles');
  }
};

export const restoreUser = async (req, res) => {
  try {
    const userId = req.query.userId;
    const isAjaxRequest = req.headers['content-type'] === 'application/json' || req.query.ajax === 'true';

    if (!userId) {
      if (isAjaxRequest) {
        return res.status(400).json({ success: false, message: 'User ID is required' });
      }
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Get token from cookies
    const token = req.cookies.zendo_user ? JSON.parse(req.cookies.zendo_user).zendo_at : null;
    if (!token) {
      if (isAjaxRequest) {
        return res.status(401).json({ success: false, message: 'Authentication required' });
      }
      return res.status(401).json({ message: 'Authentication required' });
    }

    // Call the API to restore the user
    const response = await axios.get(`${API_BASE_URL}/restoreDeletedUser?userId=${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.status_code === 200) {
      // Set flash message for success (if you have flash middleware)
      if (req.session) {
        req.session.flashMessage = {
          type: 'success',
          text: response.data.message || 'User has been successfully restored.',
        };
      }

      if (isAjaxRequest) {
        return res.json({
          success: true,
          message: response.data.message || 'User has been successfully restored.',
        });
      }

      // Redirect back to the user profiles page
      return res.redirect('/user-profiles');
    } else {
      // Handle API error
      if (req.session) {
        req.session.flashMessage = {
          type: 'error',
          text: response.data.message || 'Failed to restore user',
        };
      }

      if (isAjaxRequest) {
        return res.json({
          success: false,
          message: response.data.message || 'Failed to restore user',
        });
      }

      return res.redirect('/user-profiles');
    }
  } catch (error) {
    console.error('Error in restoreUser controller:', error);

    // Set flash message for error
    if (req.session) {
      req.session.flashMessage = {
        type: 'error',
        text: 'Error restoring user',
      };
    }

    if (req.headers['content-type'] === 'application/json' || req.query.ajax === 'true') {
      return res.status(500).json({ success: false, message: 'Error restoring user' });
    }

    return res.redirect('/user-profiles');
  }
};
