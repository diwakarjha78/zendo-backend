document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('resetPasswordForm').addEventListener('submit', function (e) {
    const submitBtn = document.getElementById('submitBtn');
    const btnText = document.getElementById('btnText');
    const loadingText = document.getElementById('loadingText');

    btnText.classList.add('hidden');
    loadingText.classList.remove('hidden');
    submitBtn.disabled = true;
  });
});
