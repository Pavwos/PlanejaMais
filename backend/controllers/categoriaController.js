import Categoria from '../models/Categoria.js';

export async function criarCategoria(req, res) {
  const { nome, tipo } = req.body || {};

  if (!nome || !tipo) {
    return res.status(400).json({ message: 'Nome e tipo sao obrigatorios.' });
  }

  const categoria = await Categoria.create({
    usuarioId: req.usuario.id,
    nome,
    tipo,
  });

  return res.status(201).json(categoria);
}

export async function listarCategorias(req, res) {
  const categorias = await Categoria.findByUsuario(req.usuario.id);

  return res.json(categorias);
}
