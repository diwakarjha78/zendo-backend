document.addEventListener('DOMContentLoaded', function () {
  // Sidebar toggle functionality
  const sidebar = document.getElementById('sidebar');
  const hide_menu = document.getElementById('hide-menu');
  const show_menu = document.getElementById('show-menu');

  hide_menu.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();

    // Animate sidebar out
    sidebar.classList.add('-translate-x-full');
    sidebar.classList.remove('md:block');

    // Toggle buttons with opacity transitions
    hide_menu.classList.add('opacity-0');

    setTimeout(() => {
      hide_menu.classList.add('hidden');
      hide_menu.classList.remove('opacity-0');

      show_menu.classList.remove('hidden');
      show_menu.classList.add('opacity-0');

      // Force a reflow to ensure the opacity transition works
      void show_menu.offsetWidth;

      show_menu.classList.remove('opacity-0');
      show_menu.classList.add('opacity-100');
    }, 200);
  });

  show_menu.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();

    // Animate sidebar in
    sidebar.classList.remove('-translate-x-full');
    sidebar.classList.add('md:block');

    // Toggle buttons with opacity transitions
    show_menu.classList.add('opacity-0');

    setTimeout(() => {
      show_menu.classList.add('hidden');
      show_menu.classList.remove('opacity-0');

      hide_menu.classList.remove('hidden');
      hide_menu.classList.add('opacity-0');

      // Force a reflow to ensure the opacity transition works
      void hide_menu.offsetWidth;

      hide_menu.classList.remove('opacity-0');
      hide_menu.classList.add('opacity-100');
    }, 200);
  });

  // Profile menu dropdown functionality
  const profileIcon = document.getElementById('profile-icon');
  const profileMenu = document.getElementById('profile-menu');

  // Toggle profile menu on click
  profileIcon.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();

    // Add a simple toggle with animation classes
    if (profileMenu.classList.contains('hidden')) {
      // Show menu with fade-in effect
      profileMenu.classList.remove('hidden');
      profileMenu.classList.add('opacity-0');

      // Force reflow
      void profileMenu.offsetWidth;

      profileMenu.classList.add('opacity-100');
      profileMenu.classList.add('translate-y-0');
      profileMenu.classList.remove('opacity-0');
      profileMenu.classList.remove('-translate-y-1');
    } else {
      // Hide menu with fade-out effect
      profileMenu.classList.add('opacity-0');
      profileMenu.classList.add('-translate-y-1');
      profileMenu.classList.remove('opacity-100');
      profileMenu.classList.remove('translate-y-0');

      // Hide after animation completes
      setTimeout(() => {
        profileMenu.classList.add('hidden');
      }, 200);
    }
  });

  // Close profile menu when clicking outside
  document.addEventListener('click', function (e) {
    if (profileMenu && !profileIcon.contains(e.target) && !profileMenu.contains(e.target)) {
      profileMenu.classList.add('opacity-0');
      profileMenu.classList.add('-translate-y-1');
      profileMenu.classList.remove('opacity-100');
      profileMenu.classList.remove('translate-y-0');

      setTimeout(() => {
        profileMenu.classList.add('hidden');
      }, 200);
    }
  });

  // Logout modal functionality
  const logoutBtn = document.getElementById('logout-btn');
  const profileLogoutBtn = document.getElementById('profile-logout-btn');
  const logoutDialog = document.getElementById('logout-dialog');

  if (logoutBtn && logoutDialog) {
    const closeDialog = document.getElementById('close-dialog');
    const cancelLogout = document.getElementById('cancel-logout');
    const confirmLogout = document.getElementById('confirm-logout');

    // Show dialog when sidebar logout button is clicked
    logoutBtn.addEventListener('click', function (e) {
      console.log('Sidebar logout button clicked');
      logoutDialog.classList.remove('hidden');
      logoutDialog.classList.add('flex');
      e.preventDefault();
      e.stopPropagation();
    });

    // Show dialog when profile menu logout button is clicked
    if (profileLogoutBtn) {
      profileLogoutBtn.addEventListener('click', function (e) {
        console.log('Profile logout button clicked');
        // Close the profile menu first
        profileMenu.classList.add('hidden');
        // Then show the logout dialog
        logoutDialog.classList.remove('hidden');
        logoutDialog.classList.add('flex');
        e.preventDefault();
        e.stopPropagation();
      });
    }

    // Hide dialog when close button is clicked
    if (closeDialog) {
      closeDialog.addEventListener('click', function () {
        logoutDialog.classList.remove('flex');
        logoutDialog.classList.add('hidden');
      });
    }

    // Hide dialog when cancel button is clicked
    if (cancelLogout) {
      cancelLogout.addEventListener('click', function () {
        logoutDialog.classList.remove('flex');
        logoutDialog.classList.add('hidden');
      });
    }

    // Perform logout when confirm button is clicked
    if (confirmLogout) {
      confirmLogout.addEventListener('click', function () {
        console.log('Confirming logout');
        // Remove the zendo_user cookie
        document.cookie = 'zendo_user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        window.location.href = '/auth/login';
      });
    }

    // Close dialog when clicking outside of it
    logoutDialog.addEventListener('click', function (e) {
      if (e.target === logoutDialog) {
        logoutDialog.classList.remove('flex');
        logoutDialog.classList.add('hidden');
      }
    });
  } else {
    console.warn('Logout elements not found in the DOM');
  }

  // Search bar functionality
  const searchToggleBtn = document.getElementById('search-toggle');
  const closeSearchBtn = document.getElementById('close-search');
  const searchContainer = document.getElementById('search-container');
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  const headerContent = document.getElementById('header-content');

  const sidebarData = [
    {
      title: 'Dashboard',
      url: '/',
      icon: '<i class="fas fa-th-large mr-2 mt-0.5"></i>',
    },
    {
      title: 'User Management',
      url: '/',
      icon: '<i class="fas fa-user mr-2 mt-0.5"></i>',
      isOption: true,
      subOptions: [
        {
          title: 'User Profiles',
          url: '/user-profiles',
        },
        {
          title: 'User Activity',
          url: '/user-activity',
        },
      ],
    },
    {
      title: 'Content Management',
      url: '/content-management',
      icon: '<i class="fas fa-file-alt mr-2 mt-0.5"></i>',
    },
    {
      title: 'AI Rendering Oversight',
      url: '/settings',
      icon: '<i class="fas fa-cog mr-2 mt-0.5"></i>',
      isOption: true,
      subOptions: [
        {
          title: 'AI Rendering Image',
          url: '/ai-rendering-image',
        },
        {
          title: 'Furniture Finder Data',
          url: '/furniture-finder-data',
        },
      ],
    },
    {
      title: 'Customer Support',
      url: '/customer-support',
      icon: '<i class="fas fa-headset mr-2 mt-0.5"></i>',
    },
    {
      title: 'Security and Payments',
      url: '/settings',
      icon: '<i class="fas fa-credit-card mr-2 mt-0.5"></i>',
      isOption: true,
      subOptions: [
        {
          title: 'Transaction Management',
          url: '/transaction-management',
        },
      ],
    },
  ];

  function renderSearchResults(query) {
    const lowerQuery = query.toLowerCase();
    const matchedItems = [];

    sidebarData.forEach((item) => {
      const mainMatch = item.title.toLowerCase().includes(lowerQuery);
      const subMatches = item.subOptions?.filter((sub) => sub.title.toLowerCase().includes(lowerQuery)) || [];

      if (mainMatch || subMatches.length > 0) {
        matchedItems.push({ ...item, subOptions: subMatches });
      }
    });

    searchResults.innerHTML = '';
    if (matchedItems.length === 0) {
      searchResults.innerHTML = '<div class="px-2 py-1 text-gray-500">No results found.</div>';
      return;
    }

    matchedItems.forEach((item) => {
      const itemHTML = `
        <a href="${item.url}" class="flex items-center px-2 py-1 hover:bg-gray-100 rounded" onclick="closeSearchBox()">
          ${item.icon || ''}<span>${item.title}</span>
        </a>
      `;
      searchResults.innerHTML += itemHTML;

      if (item.subOptions) {
        item.subOptions.forEach((sub) => {
          const subHTML = `
            <a href="${sub.url}" class="flex items-center pl-6 pr-2 py-1 hover:bg-gray-100 rounded" onclick="closeSearchBox()">
              ${sub.icon || ''}<span>${sub.title}</span>
            </a>
          `;
          searchResults.innerHTML += subHTML;
        });
      }
    });
  }

  function closeSearchBox() {
    searchContainer.classList.add('hidden');
    searchResults.classList.add('hidden');
    headerContent.classList.remove('!hidden');
    searchInput.value = '';
  }

  searchToggleBtn.addEventListener('click', () => {
    searchContainer.classList.remove('hidden');
    searchResults.classList.remove('hidden');
    headerContent.classList.add('!hidden');
    searchInput.focus();
  });

  closeSearchBtn.addEventListener('click', closeSearchBox);

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim();
    if (query.length > 0) {
      searchResults.classList.remove('hidden');
      renderSearchResults(query);
    } else {
      searchResults.classList.add('hidden');
    }
  });

  // Notification bell javascript
  // URL endpoints for API requests
  const API_GET_NOTIFICATIONS = 'api/v1/getAllAdminNotifications';
  const API_MARK_AS_READ = 'api/v1/markAdminNotificationAsRead';
  const API_DELETE_NOTIFICATION = 'api/v1/deleteAdminNotification'; // Append /:id

  // Get element references
  const notificationBell = document.getElementById('notification-bell');
  const notificationDropdown = document.getElementById('notification-dropdown');
  const notificationCountElem = document.getElementById('notification-count');
  const notificationList = document.getElementById('notification-list');
  const markAllReadBtn = document.getElementById('mark-all-read');
  const deleteAllBtn = document.getElementById('delete-all');

  let notifications = [];

  // Fetch notifications from the backend
  async function fetchNotifications() {
    try {
      const response = await fetch(API_GET_NOTIFICATIONS);
      const data = await response.json();
      if (data.status_code === 200) {
        notifications = data.data; // Assuming an array of notifications
        updateNotificationCount();
        renderNotifications();
      } else {
        console.error('Error fetching notifications:', data);
        notificationList.innerHTML = '<div class="px-4 py-3 text-sm text-gray-500">Unable to load notifications</div>';
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
      notificationList.innerHTML = '<div class="px-4 py-3 text-sm text-gray-500">Error loading notifications</div>';
    }
  }

  // Update the unread count badge
  function updateNotificationCount() {
    const unreadCount = notifications.filter((n) => !n.is_read).length;
    if (unreadCount > 0) {
      notificationCountElem.textContent = unreadCount;
      notificationCountElem.classList.remove('hidden');
    } else {
      notificationCountElem.classList.add('hidden');
    }
  }

  // Render the notification list in the dropdown
  function renderNotifications() {
    if (notifications.length === 0) {
      notificationList.innerHTML = '<div class="px-4 py-3 text-sm text-gray-500">No notifications</div>';
      return;
    }
    notificationList.innerHTML = '';

    notifications.forEach((notif) => {
      const notifElem = document.createElement('div');
      notifElem.className = `px-4 py-2 flex justify-between items-start transition-all duration-300 hover:bg-gray-50 ${!notif.is_read ? 'bg-gray-50 border-y' : 'bg-white'}`;

      // Content container – clicking marks as read.
      const contentDiv = document.createElement('div');
      contentDiv.className = 'flex-1 cursor-pointer';
      contentDiv.onclick = () => markAsRead(notif.id);

      const title = document.createElement('p');
      title.className = `text-sm ${!notif.is_read ? 'font-bold' : 'font-medium'}`;
      title.textContent = notif.title;

      const message = document.createElement('p');
      message.className = 'text-xs text-gray-500';
      message.textContent = notif.message;

      const dateElem = document.createElement('p');
      dateElem.className = 'text-[10px] text-gray-400';
      dateElem.textContent = new Date(notif.createdAt).toLocaleString();

      contentDiv.appendChild(title);
      contentDiv.appendChild(message);
      contentDiv.appendChild(dateElem);

      // Delete icon
      const deleteIcon = document.createElement('i');
      deleteIcon.className =
        'fas fa-trash-alt text-gray-400 hover:text-red-500 mt-1 ml-2 cursor-pointer transition-colors duration-200';
      deleteIcon.style.fontSize = '14px';
      deleteIcon.onclick = (e) => {
        e.stopPropagation(); // prevent triggering markAsRead
        deleteNotification(notif.id);
      };

      notifElem.appendChild(contentDiv);
      notifElem.appendChild(deleteIcon);
      notificationList.appendChild(notifElem);
    });
  }

  // Mark a notification as read
  async function markAsRead(id) {
    try {
      await fetch(API_MARK_AS_READ, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      await fetchNotifications();
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  }

  // Mark all notifications as read
  async function markAllRead() {
    try {
      // Filter for unread notifications and mark each as read
      const unreadNotifications = notifications.filter((n) => !n.is_read);
      await Promise.all(
        unreadNotifications.map((notif) =>
          fetch(API_MARK_AS_READ, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: notif.id }),
          })
        )
      );
      await fetchNotifications();
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  }

  // Delete a single notification
  async function deleteNotification(id) {
    try {
      await fetch(`${API_DELETE_NOTIFICATION}/${id}`, { method: 'DELETE' });
      await fetchNotifications();
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  }

  // Delete all notifications
  async function deleteAllNotifications() {
    try {
      await Promise.all(
        notifications.map((notif) => fetch(`${API_DELETE_NOTIFICATION}/${notif.id}`, { method: 'DELETE' }))
      );
      await fetchNotifications();
    } catch (error) {
      console.error('Error deleting all notifications:', error);
    }
  }

  // Toggle the notification dropdown visibility
  function toggleDropdown() {
    notificationDropdown.classList.toggle('hidden');
  }

  // Close the dropdown (for example, when clicking outside)
  function closeDropdown() {
    notificationDropdown.classList.add('hidden');
  }

  // Event listeners
  notificationBell.addEventListener('click', toggleDropdown);
  markAllReadBtn.addEventListener('click', markAllRead);
  deleteAllBtn.addEventListener('click', deleteAllNotifications);

  // Optionally, close the dropdown when clicking outside
  document.addEventListener('click', function (e) {
    if (!document.getElementById('notification-container').contains(e.target)) {
      closeDropdown();
    }
  });

  // Fetch notifications when the page loads
  fetchNotifications();
});
