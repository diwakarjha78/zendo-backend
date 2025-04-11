document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const searchInput = document.querySelector('input[name="search"]');
  const searchForm = searchInput ? searchInput.closest('form') : null;
  const deleteModal = document.getElementById('deleteModal');
  const restoreModal = document.getElementById('restoreModal');
  const deleteUserNameElement = document.getElementById('deleteUserName');
  const restoreUserNameElement = document.getElementById('restoreUserName');
  const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
  const confirmRestoreBtn = document.getElementById('confirmRestoreBtn');
  const flashMessage = document.getElementById('flashMessage');
  const userTable = document.querySelector('tbody');
  const paginationContainer = document.querySelector('.pagination-container');

  // Variables for search debouncing
  let searchTimeout = null;
  const SEARCH_DELAY = 500; // milliseconds
  let lastSearchValue = searchInput ? searchInput.value : '';

  // Handle flash messages
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

  // Show toast message function
  function showToast(message, type = 'success') {
    // Remove existing toast if any
    const existingToast = document.getElementById('toast-notification');
    if (existingToast) {
      existingToast.remove();
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.id = 'toast-notification';
    toast.className = `fixed top-4 right-4 p-4 rounded shadow-lg transition-opacity duration-500 z-50 ${
      type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
    }`;

    toast.innerHTML = `
        <div class="flex justify-between items-center">
          <div>${message}</div>
          <button class="close-button text-gray-500 hover:text-gray-700 ml-4">
            <i class="fa-solid fa-times"></i>
          </button>
        </div>
      `;

    document.body.appendChild(toast);

    // Add event listener to close button
    toast.querySelector('.close-button').addEventListener('click', () => {
      toast.style.opacity = '0';
      setTimeout(() => {
        toast.remove();
      }, 500);
    });

    // Auto-hide after 5 seconds
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => {
        toast.remove();
      }, 500);
    }, 5000);
  }

  // AJAX search function
  async function performSearch(query) {
    try {
      const response = await fetch(`/user-profiles?search=${encodeURIComponent(query)}&ajax=true`);

      if (!response.ok) {
        throw new Error('Search request failed');
      }

      const data = await response.json();

      // Update the table with new data
      if (userTable) {
        if (data.users.length === 0) {
          userTable.innerHTML = `
              <tr class="hover:bg-gray-50 border-b border-gray-200">
                <td colspan="8" class="py-4 px-4 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            `;
        } else {
          userTable.innerHTML = data.users
            .map(
              (user, idx) => `
              <tr class="hover:bg-gray-50 border-b border-gray-200">
                <td class="py-4 px-4 text-gray-700">
                  ${data.startIndex + idx + 1}
                </td>
                <td class="py-4 px-4 text-gray-700">
                  ${user.username}
                </td>
                <td class="py-4 px-4 text-gray-700">
                  ${user.email}
                </td>
                <td class="py-4 px-4 text-gray-700">
                  ${user.mobile || ''}
                </td>
                <td class="py-4 px-4">
                  ${
                    user.is_active
                      ? '<span class="text-green-600 font-medium">Yes</span>'
                      : '<span class="text-red-600 font-medium">No</span>'
                  }
                </td>
                <td class="py-4 px-4 text-gray-700">
                  ${new Date(user.createdAt).toLocaleString()}
                </td>
                <td class="py-4 px-4 text-gray-700">
                  ${new Date(user.updatedAt).toLocaleString()}
                </td>
                <td class="py-4 px-4 text-center">
                  ${
                    user.is_active
                      ? `<div class="delete-user-btn text-gray-500 hover:bg-gray-100 rounded p-1.5 hover:text-red-500 cursor-pointer inline-block"
                         data-user-id="${user._id}" data-username="${user.username}">
                         <i class="fa-solid fa-trash text-lg"></i>
                       </div>`
                      : `<div class="restore-user-btn text-gray-500 hover:bg-gray-100 rounded p-1.5 hover:text-green-500 cursor-pointer inline-block"
                         data-user-id="${user._id}" data-username="${user.username}">
                         <i class="fa-solid fa-rotate-left text-lg"></i>
                       </div>`
                  }
                </td>
              </tr>
            `
            )
            .join('');
        }
      }

      // Update pagination
      if (paginationContainer) {
        paginationContainer.innerHTML = generatePaginationHTML(data);
      }
    } catch (error) {
      console.error('Search error:', error);
      showToast('Error performing search', 'error');
    }
  }

  // Generate pagination HTML
  function generatePaginationHTML(data) {
    const { currentPage, totalPages, search } = data;

    return `
        <a href="/user-profiles?page=1${search ? '&search=' + search : ''}"
           class="${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''} cursor-pointer flex items-center justify-center rounded border border-gray-300 w-8 h-8 text-gray-600">
           <i class="fa-solid fa-angles-left text-xs"></i>
        </a>
        <a href="/user-profiles?page=${Math.max(1, currentPage - 1)}${search ? '&search=' + search : ''}"
           class="${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''} cursor-pointer flex items-center justify-center rounded border border-gray-300 w-8 h-8 text-gray-600">
           <i class="fa-solid fa-angle-left text-xs"></i>
        </a>
        <span class="mx-3 text-sm text-gray-600">
           Page ${currentPage} of ${totalPages || 1}
        </span>
        <a href="/user-profiles?page=${Math.min(totalPages, currentPage + 1)}${search ? '&search=' + search : ''}"
           class="${currentPage === totalPages || totalPages === 0 ? 'opacity-50 cursor-not-allowed' : ''} cursor-pointer flex items-center justify-center rounded border border-gray-300 w-8 h-8 text-gray-600">
           <i class="fa-solid fa-angle-right text-xs"></i>
        </a>
        <a href="/user-profiles?page=${totalPages}${search ? '&search=' + search : ''}"
           class="${currentPage === totalPages || totalPages === 0 ? 'opacity-50 cursor-not-allowed' : ''} cursor-pointer flex items-center justify-center rounded border border-gray-300 w-8 h-8 text-gray-600">
           <i class="fa-solid fa-angles-right text-xs"></i>
        </a>
      `;
  }

  // Real-time search functionality
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      // Clear previous timeout
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }

      // Set a new timeout to delay the search
      searchTimeout = setTimeout(() => {
        const query = searchInput.value;

        // Only perform search if value has changed
        if (query !== lastSearchValue) {
          lastSearchValue = query;
          performSearch(query);
        }
      }, SEARCH_DELAY);
    });

    // Prevent form submission which would cause page reload
    if (searchForm) {
      searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        performSearch(searchInput.value);
      });
    }
  }

  // Modal functions
  function openDeleteModal(userId, username) {
    if (deleteModal && deleteUserNameElement) {
      deleteUserNameElement.textContent = username;
      confirmDeleteBtn.setAttribute('data-user-id', userId);
      deleteModal.classList.remove('hidden');
      deleteModal.classList.add('flex');
    }
  }

  function closeDeleteModal() {
    if (deleteModal) {
      deleteModal.classList.remove('flex');
      deleteModal.classList.add('hidden');
    }
  }

  function openRestoreModal(userId, username) {
    if (restoreModal && restoreUserNameElement) {
      restoreUserNameElement.textContent = username;
      confirmRestoreBtn.setAttribute('data-user-id', userId);
      restoreModal.classList.remove('hidden');
      restoreModal.classList.add('flex');
    }
  }

  function closeRestoreModal() {
    if (restoreModal) {
      restoreModal.classList.remove('flex');
      restoreModal.classList.add('hidden');
    }
  }

  // Delete user function
  async function deleteUser(userId) {
    try {
      const response = await fetch(`/user-profiles/delete?userId=${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (result.success) {
        showToast(result.message || 'User successfully deactivated', 'success');

        // Refresh the user list
        setTimeout(() => {
          performSearch(searchInput ? searchInput.value : '');
        }, 500);
      } else {
        showToast(result.message || 'Failed to deactivate user', 'error');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      showToast('Error deleting user', 'error');
    } finally {
      closeDeleteModal();
    }
  }

  // Restore user function
  async function restoreUser(userId) {
    try {
      const response = await fetch(`/user-profiles/restore?userId=${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (result.success) {
        showToast(result.message || 'User successfully restored', 'success');

        // Refresh the user list
        setTimeout(() => {
          performSearch(searchInput ? searchInput.value : '');
        }, 500);
      } else {
        showToast(result.message || 'Failed to restore user', 'error');
      }
    } catch (error) {
      console.error('Error restoring user:', error);
      showToast('Error restoring user', 'error');
    } finally {
      closeRestoreModal();
    }
  }

  // Event delegation for table actions
  document.addEventListener('click', (e) => {
    // Delete button clicked
    if (e.target.closest('.delete-user-btn')) {
      e.preventDefault();
      const btn = e.target.closest('.delete-user-btn');
      const userId = btn.getAttribute('data-user-id');
      const username = btn.getAttribute('data-username');
      openDeleteModal(userId, username);
    }

    // Restore button clicked
    if (e.target.closest('.restore-user-btn')) {
      e.preventDefault();
      const btn = e.target.closest('.restore-user-btn');
      const userId = btn.getAttribute('data-user-id');
      const username = btn.getAttribute('data-username');
      openRestoreModal(userId, username);
    }

    // Close delete modal
    if (e.target.id === 'closeDeleteModal' || e.target.closest('#closeDeleteModal')) {
      e.preventDefault();
      closeDeleteModal();
    }

    // Close restore modal
    if (e.target.id === 'closeRestoreModal' || e.target.closest('#closeRestoreModal')) {
      e.preventDefault();
      closeRestoreModal();
    }

    // Confirm delete
    if (e.target.id === 'confirmDeleteBtn' || e.target.closest('#confirmDeleteBtn')) {
      e.preventDefault();
      const userId = confirmDeleteBtn.getAttribute('data-user-id');
      if (userId) {
        deleteUser(userId);
      }
    }

    // Confirm restore
    if (e.target.id === 'confirmRestoreBtn' || e.target.closest('#confirmRestoreBtn')) {
      e.preventDefault();
      const userId = confirmRestoreBtn.getAttribute('data-user-id');
      if (userId) {
        restoreUser(userId);
      }
    }

    // Handle pagination clicks
    if (e.target.closest('.pagination-link')) {
      e.preventDefault();
      const link = e.target.closest('.pagination-link');
      const url = new URL(link.href);
      const page = url.searchParams.get('page');
      const search = url.searchParams.get('search') || '';

      // Update search input if needed
      if (searchInput && search !== searchInput.value) {
        searchInput.value = search;
        lastSearchValue = search;
      }

      // Fetch the new page
      fetch(`/user-profiles?page=${page}&search=${search}&ajax=true`)
        .then((response) => response.json())
        .then((data) => {
          if (userTable) {
            // Update table content
            if (data.users.length === 0) {
              userTable.innerHTML = `
                  <tr class="hover:bg-gray-50 border-b border-gray-200">
                    <td colspan="8" class="py-4 px-4 text-center text-gray-500">
                      No users found.
                    </td>
                  </tr>
                `;
            } else {
              userTable.innerHTML = data.users
                .map(
                  (user, idx) => `
                  <tr class="hover:bg-gray-50 border-b border-gray-200">
                    <td class="py-4 px-4 text-gray-700">
                      ${data.startIndex + idx + 1}
                    </td>
                    <td class="py-4 px-4 text-gray-700">
                      ${user.username}
                    </td>
                    <td class="py-4 px-4 text-gray-700">
                      ${user.email}
                    </td>
                    <td class="py-4 px-4 text-gray-700">
                      ${user.mobile || ''}
                    </td>
                    <td class="py-4 px-4">
                      ${
                        user.is_active
                          ? '<span class="text-green-600 font-medium">Yes</span>'
                          : '<span class="text-red-600 font-medium">No</span>'
                      }
                    </td>
                    <td class="py-4 px-4 text-gray-700">
                      ${new Date(user.createdAt).toLocaleString()}
                    </td>
                    <td class="py-4 px-4 text-gray-700">
                      ${new Date(user.updatedAt).toLocaleString()}
                    </td>
                    <td class="py-4 px-4 text-center">
                      ${
                        user.is_active
                          ? `<div class="delete-user-btn text-gray-500 hover:bg-gray-100 rounded p-1.5 hover:text-red-500 cursor-pointer inline-block"
                             data-user-id="${user._id}" data-username="${user.username}">
                             <i class="fa-solid fa-trash text-lg"></i>
                           </div>`
                          : `<div class="restore-user-btn text-gray-500 hover:bg-gray-100 rounded p-1.5 hover:text-green-500 cursor-pointer inline-block"
                             data-user-id="${user._id}" data-username="${user.username}">
                             <i class="fa-solid fa-rotate-left text-lg"></i>
                           </div>`
                      }
                    </td>
                  </tr>
                `
                )
                .join('');
            }
          }

          // Update pagination
          if (paginationContainer) {
            paginationContainer.innerHTML = generatePaginationHTML(data);
          }
        })
        .catch((error) => {
          console.error('Pagination error:', error);
          showToast('Error loading page', 'error');
        });
    }
  });

  // Close modals when clicking outside
  window.addEventListener('click', (e) => {
    if (e.target === deleteModal) {
      closeDeleteModal();
    }
    if (e.target === restoreModal) {
      closeRestoreModal();
    }
  });

  // Make functions available globally
  window.closeDeleteModal = closeDeleteModal;
  window.closeRestoreModal = closeRestoreModal;
});
