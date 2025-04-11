const userDeleteBtn = document.getElementById('userDeleteBtn');
const deleteModal = document.getElementById('deleteModal');
const closeDeleteModal = document.getElementById('closeDeleteModal');
const openRestoreModal = document.getElementById('openRestoreModal');

userDeleteBtn.addEventListener('click', function (e) {
  e.preventDefault();
  e.stopPropagation();
  deleteModal.classList.remove('hidden');
  deleteModal.classList.add('flex');
});

closeDeleteModal.addEventListener('click', function (e) {
  e.preventDefault();
  e.stopPropagation();
  deleteModal.classList.remove('flex');
  deleteModal.classList.add('hidden');
});



// Display flash messages if they exist
document.addEventListener('DOMContentLoaded', () => {
  // Check if there's a flash message in the page (this would be rendered by the server)
  const flashMessage = document.getElementById('flashMessage');

  if (flashMessage) {
    // Auto-hide the flash message after 5 seconds
    setTimeout(() => {
      flashMessage.style.opacity = '0';
      setTimeout(() => {
        flashMessage.style.display = 'none';
      }, 500); // Wait for fade out animation
    }, 5000);

    // Allow user to close the message
    const closeButton = flashMessage.querySelector('.close-button');
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        flashMessage.style.display = 'none';
      });
    }
  }
});
