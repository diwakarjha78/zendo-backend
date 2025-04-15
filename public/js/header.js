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
});
