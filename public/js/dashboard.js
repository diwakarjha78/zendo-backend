document.addEventListener('DOMContentLoaded', function () {
  // Sidebar toggle functionality
  document.getElementById('menu-toggle').addEventListener('click', function () {
    document.getElementById('sidebar').classList.toggle('-translate-x-full');
  });

  // Profile dropdown toggle functionality
  const profileIcon = document.querySelector('.w-8.h-8.flex.items-center.justify-center.rounded-full');
  const profileMenu = document.getElementById('profile-menu');

  // Initially hide the profile menu
  profileMenu.classList.add('hidden');

  // Toggle profile menu when clicking on profile icon
  profileIcon.addEventListener('click', function (e) {
    profileMenu.classList.toggle('hidden');
    e.stopPropagation();
  });

  // Close profile menu when clicking outside
  document.addEventListener('click', function (e) {
    if (!profileMenu.contains(e.target) && !profileIcon.contains(e.target)) {
      profileMenu.classList.add('hidden');
    }
  });

  // Logout functionality
  const logoutBtn = document.getElementById('logout-btn');
  const logoutDialog = document.getElementById('logout-dialog');
  const closeDialog = document.getElementById('close-dialog');
  const cancelLogout = document.getElementById('cancel-logout');
  const confirmLogout = document.getElementById('confirm-logout');

  // Show dialog when logout button is clicked
  logoutBtn.addEventListener('click', function (e) {
    console.log('Logout button clicked');
    logoutDialog.classList.remove('hidden');
    logoutDialog.classList.add('flex');
    e.preventDefault(); // Prevent any default action
    e.stopPropagation(); // Stop event bubbling
  });

  // Hide dialog when close button is clicked
  closeDialog.addEventListener('click', function () {
    logoutDialog.classList.remove('flex');
    logoutDialog.classList.add('hidden');
  });

  // Hide dialog when cancel button is clicked
  cancelLogout.addEventListener('click', function () {
    logoutDialog.classList.remove('flex');
    logoutDialog.classList.add('hidden');
  });

  // Perform logout when confirm button is clicked
  confirmLogout.addEventListener('click', function () {
    console.log('Confirming logout');
    // Remove the zendo_user cookie
    document.cookie = 'zendo_user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.href = '/auth/login';
  });

  // Close dialog when clicking outside of it
  logoutDialog.addEventListener('click', function (e) {
    if (e.target === logoutDialog) {
      logoutDialog.classList.remove('flex');
      logoutDialog.classList.add('hidden');
    }
  });
});
