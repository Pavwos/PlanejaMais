function getFormData(form) {
  return Object.fromEntries(new FormData(form).entries());
}

function getApiError(error) {
  return error.response?.data?.message || error.message || 'Erro inesperado.';
}

function showMessage(text, type = 'success') {
  const message = document.querySelector('#message');

  if (!message) {
    return;
  }

  message.textContent = text;
  message.className = `message ${type}`;
}

function requireAuth() {
  const token = localStorage.getItem('planeja_token');

  if (!token) {
    window.location.href = './login.html';
  }
}

function logout() {
  localStorage.removeItem('planeja_token');
  window.location.href = './login.html';
}

function setupLogout() {
  document.querySelectorAll('[data-logout]').forEach((element) => {
    element.addEventListener('click', (event) => {
      event.preventDefault();
      logout();
    });
  });
}

function formatCurrency(value) {
  return Number(value || 0).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

function formatDate(value) {
  if (!value) {
    return '';
  }

  return new Date(value).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
}

function toInputDate(value) {
  if (!value) {
    return new Date().toISOString().slice(0, 10);
  }

  return String(value).slice(0, 10);
}

window.AppUtils = {
  formatCurrency,
  formatDate,
  getApiError,
  getFormData,
  requireAuth,
  setupLogout,
  showMessage,
  toInputDate,
};
