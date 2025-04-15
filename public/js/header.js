document.addEventListener('DOMContentLoaded', function () {
  const sidebar = document.getElementById('sidebar');
  const hide_menu = document.getElementById('hide-menu');
  const show_menu = document.getElementById('show-menu');

  hide_menu.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    sidebar.classList.add('-translate-x-full');
    sidebar.classList.remove('md:block');
    hide_menu.classList.add('opacity-0');

    setTimeout(() => {
      hide_menu.classList.add('hidden');
      hide_menu.classList.remove('opacity-0');

      show_menu.classList.remove('hidden');
      show_menu.classList.add('opacity-0');
      void show_menu.offsetWidth;

      show_menu.classList.remove('opacity-0');
      show_menu.classList.add('opacity-100');
    }, 200);
  });

  show_menu.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    sidebar.classList.remove('-translate-x-full');
    sidebar.classList.add('md:block');
    show_menu.classList.add('opacity-0');

    setTimeout(() => {
      show_menu.classList.add('hidden');
      show_menu.classList.remove('opacity-0');

      hide_menu.classList.remove('hidden');
      hide_menu.classList.add('opacity-0');
      void hide_menu.offsetWidth;

      hide_menu.classList.remove('opacity-0');
      hide_menu.classList.add('opacity-100');
    }, 200);
  });
});
