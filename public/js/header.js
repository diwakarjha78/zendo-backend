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
});
