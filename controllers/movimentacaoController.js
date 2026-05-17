import Movimentacao from '../models/Movimentacao.js';

export async function criarMovimentacao(req, res) {
  const { categoria_id, descricao, valor, tipo, data_movimentacao } = req.body || {};

  if (!categoria_id || !descricao || !valor || !tipo || !data_movimentacao) {
    return res.status(400).json({
      message: 'Categoria, descricao, valor, tipo e data_movimentacao sao obrigatorios.',
    });
  }

  const movimentacao = await Movimentacao.create({
    usuarioId: req.usuario.id,
    categoriaId: categoria_id,
    descricao,
    valor,
    tipo,
    dataMovimentacao: data_movimentacao,
  });

  if (!movimentacao) {
    return res.status(400).json({ message: 'Categoria invalida para este usuario.' });
  }

  return res.status(201).json(movimentacao);
}

export async function listarMovimentacoes(req, res) {
  const movimentacoes = await Movimentacao.findByUsuario(req.usuario.id);

  return res.json(movimentacoes);
}

export async function editarMovimentacao(req, res) {
  const { id } = req.params;
  const { categoria_id, descricao, valor, tipo, data_movimentacao } = req.body || {};

  if (!categoria_id || !descricao || !valor || !tipo || !data_movimentacao) {
    return res.status(400).json({
      message: 'Categoria, descricao, valor, tipo e data_movimentacao sao obrigatorios.',
    });
  }

  const movimentacao = await Movimentacao.update({
    id,
    usuarioId: req.usuario.id,
    categoriaId: categoria_id,
    descricao,
    valor,
    tipo,
    dataMovimentacao: data_movimentacao,
  });

  if (!movimentacao) {
    return res.status(404).json({ message: 'Movimentacao nao encontrada ou categoria invalida.' });
  }

  return res.json(movimentacao);
}

export async function excluirMovimentacao(req, res) {
  const { id } = req.params;
  const removida = await Movimentacao.delete({ id, usuarioId: req.usuario.id });

  if (!removida) {
    return res.status(404).json({ message: 'Movimentacao nao encontrada.' });
  }

  return res.status(204).send();
}
