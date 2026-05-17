const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('planeja_token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

const ApiService = {
  async cadastro(dados) {
    const response = await api.post('/auth/cadastro', dados);
    return response.data;
  },

  async login(dados) {
    const response = await api.post('/auth/login', dados);
    return response.data;
  },

  async listarMovimentacoes() {
    const response = await api.get('/movimentacoes');
    return response.data;
  },

  async listarCategorias() {
    const response = await api.get('/categorias');
    return response.data;
  },

  async criarCategoria(dados) {
    const response = await api.post('/categorias', dados);
    return response.data;
  },

  async criarMovimentacao(dados) {
    const response = await api.post('/movimentacoes', dados);
    return response.data;
  },

  async editarMovimentacao(id, dados) {
    const response = await api.put(`/movimentacoes/${id}`, dados);
    return response.data;
  },

  async excluirMovimentacao(id) {
    await api.delete(`/movimentacoes/${id}`);
  },
};

window.ApiService = ApiService;
