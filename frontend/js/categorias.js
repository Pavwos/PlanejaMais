const categoriaForm = document.querySelector('#categoria-form');
const categoriasLista = document.querySelector('#categorias-lista');

function renderCategorias(categorias) {
  if (!categorias.length) {
    categoriasLista.innerHTML = '<p class="empty">Nenhuma categoria cadastrada.</p>';
    return;
  }

  categoriasLista.innerHTML = categorias
    .map(
      (categoria) => `
        <article class="item">
          <div class="item-header">
            <p class="item-title">${categoria.nome}</p>
            <span class="tag ${categoria.tipo === 'receita' ? 'success-soft' : 'danger-soft'}">
              ${categoria.tipo}
            </span>
          </div>
          <p class="item-meta">ID: ${categoria.id}</p>
        </article>
      `,
    )
    .join('');
}

async function carregarCategorias() {
  try {
    const categorias = await window.ApiService.listarCategorias();
    renderCategorias(categorias);
  } catch (error) {
    window.AppUtils.showMessage(window.AppUtils.getApiError(error), 'error');
  }
}

categoriaForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  try {
    const dados = window.AppUtils.getFormData(categoriaForm);
    await window.ApiService.criarCategoria(dados);

    categoriaForm.reset();
    window.AppUtils.showMessage('Categoria criada com sucesso.');
    carregarCategorias();
  } catch (error) {
    window.AppUtils.showMessage(window.AppUtils.getApiError(error), 'error');
  }
});

window.AppUtils.requireAuth();
window.AppUtils.setupLogout();
carregarCategorias();
