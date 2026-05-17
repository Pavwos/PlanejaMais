const movimentacaoForm = document.querySelector('#movimentacao-form');
const movimentacoesLista = document.querySelector('#movimentacoes-lista');
const categoriaSelect = movimentacaoForm.elements.categoria_id;
const cancelarEdicaoButton = document.querySelector('#cancelar-edicao');
let movimentacoesCache = [];

function resetForm() {
  movimentacaoForm.reset();
  movimentacaoForm.elements.id.value = '';
  movimentacaoForm.elements.data_movimentacao.value = new Date().toISOString().slice(0, 10);
}

function renderCategorias(categorias) {
  if (!categorias.length) {
    categoriaSelect.innerHTML = '<option value="">Crie uma categoria primeiro</option>';
    return;
  }

  categoriaSelect.innerHTML = categorias
    .map((categoria) => `<option value="${categoria.id}">${categoria.nome}</option>`)
    .join('');
}

function renderMovimentacoes(movimentacoes) {
  movimentacoesCache = movimentacoes;

  if (!movimentacoes.length) {
    movimentacoesLista.innerHTML = '<p class="empty">Nenhuma movimentacao cadastrada.</p>';
    return;
  }

  movimentacoesLista.innerHTML = movimentacoes
    .map(
      (movimentacao) => `
        <article class="item">
          <div class="item-header">
            <div>
              <p class="item-title">${movimentacao.descricao}</p>
              <p class="item-meta">
                ${movimentacao.categoria_nome} - ${window.AppUtils.formatDate(
                  movimentacao.data_movimentacao,
                )}
              </p>
            </div>
            <span class="tag ${movimentacao.tipo === 'receita' ? 'success-soft' : 'danger-soft'}">
              ${movimentacao.tipo}
            </span>
          </div>
          <p class="item-value ${movimentacao.tipo === 'receita' ? 'positive' : 'negative'}">
            ${window.AppUtils.formatCurrency(movimentacao.valor)}
          </p>
          <div class="actions compact">
            <button class="button secondary" type="button" data-editar="${movimentacao.id}">
              Editar
            </button>
            <button class="button danger" type="button" data-excluir="${movimentacao.id}">
              Excluir
            </button>
          </div>
        </article>
      `,
    )
    .join('');
}

async function carregarDados() {
  try {
    const [categorias, movimentacoes] = await Promise.all([
      window.ApiService.listarCategorias(),
      window.ApiService.listarMovimentacoes(),
    ]);

    renderCategorias(categorias);
    renderMovimentacoes(movimentacoes);
  } catch (error) {
    window.AppUtils.showMessage(window.AppUtils.getApiError(error), 'error');
  }
}

movimentacaoForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  try {
    const dados = window.AppUtils.getFormData(movimentacaoForm);
    const id = dados.id;
    delete dados.id;

    if (id) {
      await window.ApiService.editarMovimentacao(id, dados);
    } else {
      await window.ApiService.criarMovimentacao(dados);
    }

    resetForm();
    window.AppUtils.showMessage('Movimentacao salva com sucesso.');
    carregarDados();
  } catch (error) {
    window.AppUtils.showMessage(window.AppUtils.getApiError(error), 'error');
  }
});

movimentacoesLista.addEventListener('click', async (event) => {
  const editarButton = event.target.closest('[data-editar]');
  const excluirButton = event.target.closest('[data-excluir]');

  if (editarButton) {
    const movimentacao = movimentacoesCache.find(
      (item) => String(item.id) === editarButton.dataset.editar,
    );

    if (!movimentacao) {
      return;
    }

    movimentacaoForm.elements.id.value = movimentacao.id;
    movimentacaoForm.elements.categoria_id.value = movimentacao.categoria_id;
    movimentacaoForm.elements.descricao.value = movimentacao.descricao;
    movimentacaoForm.elements.valor.value = movimentacao.valor;
    movimentacaoForm.elements.tipo.value = movimentacao.tipo;
    movimentacaoForm.elements.data_movimentacao.value = window.AppUtils.toInputDate(
      movimentacao.data_movimentacao,
    );
  }

  if (excluirButton) {
    try {
      await window.ApiService.excluirMovimentacao(excluirButton.dataset.excluir);
      window.AppUtils.showMessage('Movimentacao excluida com sucesso.');
      carregarDados();
    } catch (error) {
      window.AppUtils.showMessage(window.AppUtils.getApiError(error), 'error');
    }
  }
});

cancelarEdicaoButton.addEventListener('click', resetForm);

window.AppUtils.requireAuth();
window.AppUtils.setupLogout();
resetForm();
carregarDados();
