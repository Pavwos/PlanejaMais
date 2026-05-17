const cadastroForm = document.querySelector('#cadastro-form');

cadastroForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  try {
    const dados = window.AppUtils.getFormData(cadastroForm);
    const response = await window.ApiService.cadastro(dados);

    localStorage.setItem('planeja_token', response.token);
    window.location.href = './dashboard.html';
  } catch (error) {
    window.AppUtils.showMessage(window.AppUtils.getApiError(error), 'error');
  }
});
