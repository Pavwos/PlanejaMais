# Planeja+

Projeto full stack com frontend em HTML, CSS e JavaScript, backend em Node.js + Express e MySQL como banco.

## Comandos de instalacao

### Frontend

Abra o arquivo `frontend/index.html` no navegador.

Se preferir servir a pasta por HTTP:

```bash
cd frontend
python -m http.server 5500
```

Depois acesse:

```text
http://localhost:5500
```

### Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

## Estrutura

```text
frontend/
  index.html
  dashboard.html
  login.html
  cadastro.html
  categorias.html
  movimentacoes.html
  relatorios.html
  css/
    styles.css
  js/
    apiService.js
    appUtils.js
    login.js
    cadastro.js
    categorias.js
    movimentacoes.js
    dashboard.js
    relatorios.js

backend/
  controllers/
  models/
  routes/
  middleware/
  database/
```

## Observacoes

- A API possui apenas validacoes iniciais e CRUD basico.
- Configure as credenciais do MySQL no arquivo `backend/.env`.
- O frontend consome a API Express usando Axios via CDN.
- Para usar as telas dinamicas, mantenha o backend rodando em `http://localhost:3000/api`.

## Service Axios

O arquivo `frontend/js/apiService.js` centraliza a comunicacao com a API Express.

Para usar em uma pagina HTML, inclua o Axios antes do service:

```html
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="./js/apiService.js"></script>
```

Metodos disponiveis:

```text
ApiService.cadastro(dados)
ApiService.login(dados)
ApiService.listarCategorias()
ApiService.criarCategoria(dados)
ApiService.listarMovimentacoes()
ApiService.criarMovimentacao(dados)
ApiService.editarMovimentacao(id, dados)
ApiService.excluirMovimentacao(id)
```

## Endpoints iniciais da API

Base URL:

```text
http://localhost:3000/api
```

Rotas publicas:

```text
GET  /health
POST /auth/cadastro
POST /auth/login
```

Rotas protegidas por JWT:

```text
POST   /categorias
GET    /categorias
POST   /movimentacoes
GET    /movimentacoes
PUT    /movimentacoes/:id
DELETE /movimentacoes/:id
```

Nas rotas protegidas, envie o token no header:

```text
Authorization: Bearer seu_token_jwt
```

## Testando o CRUD no Postman

### 1. Cadastro

```text
POST http://localhost:3000/api/auth/cadastro
```

Body `raw` JSON:

```json
{
  "nome": "Teste Usuario",
  "email": "teste@planejamais.com",
  "senha": "123456"
}
```

Copie o `token` retornado.

### 2. Login

```text
POST http://localhost:3000/api/auth/login
```

Body `raw` JSON:

```json
{
  "email": "teste@planejamais.com",
  "senha": "123456"
}
```

Copie o `token` retornado e use nas proximas rotas.

### 3. Criar categoria

```text
POST http://localhost:3000/api/categorias
```

Header:

```text
Authorization: Bearer seu_token_jwt
```

Body `raw` JSON:

```json
{
  "nome": "Alimentacao",
  "tipo": "despesa"
}
```

Guarde o `id` retornado. Ele sera usado como `categoria_id` nas movimentacoes.

### 4. Listar categorias

```text
GET http://localhost:3000/api/categorias
```

Header:

```text
Authorization: Bearer seu_token_jwt
```

Use um `id` dessa listagem ao criar uma movimentacao.

### 5. Criar movimentacao

```text
POST http://localhost:3000/api/movimentacoes
```

Header:

```text
Authorization: Bearer seu_token_jwt
```

Body `raw` JSON:

```json
{
  "categoria_id": 1,
  "descricao": "Compra no mercado",
  "valor": 150.75,
  "tipo": "despesa",
  "data_movimentacao": "2026-05-17"
}
```

O `categoria_id` precisa pertencer ao usuario autenticado pelo token.

### 6. Listar movimentacoes

```text
GET http://localhost:3000/api/movimentacoes
```

Header:

```text
Authorization: Bearer seu_token_jwt
```

### 7. Editar movimentacao

```text
PUT http://localhost:3000/api/movimentacoes/1
```

Header:

```text
Authorization: Bearer seu_token_jwt
```

Body `raw` JSON:

```json
{
  "categoria_id": 1,
  "descricao": "Compra no mercado atualizada",
  "valor": 175.9,
  "tipo": "despesa",
  "data_movimentacao": "2026-05-17"
}
```

Troque o `1` da URL pelo `id` real da movimentacao.

### 8. Excluir movimentacao

```text
DELETE http://localhost:3000/api/movimentacoes/1
```

Header:

```text
Authorization: Bearer seu_token_jwt
```

Se a exclusao funcionar, a API retorna status `204 No Content`.
