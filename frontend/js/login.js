const loginForm = document.querySelector('#login-form');

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  try {
    const dados = window.AppUtils.getFormData(loginForm);
    const response = await window.ApiService.login(dados);

    localStorage.setItem('planeja_token', response.token);
    window.location.href = './dashboard.html';
  } catch (error) {
    window.AppUtils.showMessage(window.AppUtils.getApiError(error), 'error');
  }
});
