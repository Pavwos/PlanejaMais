import { pool } from '../database/connection.js';

class Movimentacao {
  static async create({ usuarioId, categoriaId, descricao, valor, tipo, dataMovimentacao }) {
    const [result] = await pool.execute(
      `INSERT INTO movimentacoes
        (usuario_id, categoria_id, descricao, valor, tipo, data_movimentacao)
       SELECT ?, categorias.id, ?, ?, ?, ?
       FROM categorias
       WHERE categorias.id = ? AND categorias.usuario_id = ?`,
      [usuarioId, descricao, valor, tipo, dataMovimentacao, categoriaId, usuarioId],
    );

    if (result.affectedRows === 0) {
      return null;
    }

    return this.findByIdAndUsuario({ id: result.insertId, usuarioId });
  }

  static async findByUsuario(usuarioId) {
    const [rows] = await pool.execute(
      `SELECT
        movimentacoes.id,
        movimentacoes.usuario_id,
        movimentacoes.categoria_id,
        categorias.nome AS categoria_nome,
        movimentacoes.descricao,
        movimentacoes.valor,
        movimentacoes.tipo,
        movimentacoes.data_movimentacao,
        movimentacoes.criado_em,
        movimentacoes.atualizado_em
       FROM movimentacoes
       INNER JOIN categorias ON categorias.id = movimentacoes.categoria_id
       WHERE movimentacoes.usuario_id = ?
       ORDER BY movimentacoes.data_movimentacao DESC, movimentacoes.id DESC`,
      [usuarioId],
    );

    return rows;
  }

  static async findByIdAndUsuario({ id, usuarioId }) {
    const [rows] = await pool.execute(
      `SELECT
        movimentacoes.id,
        movimentacoes.usuario_id,
        movimentacoes.categoria_id,
        categorias.nome AS categoria_nome,
        movimentacoes.descricao,
        movimentacoes.valor,
        movimentacoes.tipo,
        movimentacoes.data_movimentacao,
        movimentacoes.criado_em,
        movimentacoes.atualizado_em
       FROM movimentacoes
       INNER JOIN categorias ON categorias.id = movimentacoes.categoria_id
       WHERE movimentacoes.id = ? AND movimentacoes.usuario_id = ?
       LIMIT 1`,
      [id, usuarioId],
    );

    return rows[0] || null;
  }

  static async update({
    id,
    usuarioId,
    categoriaId,
    descricao,
    valor,
    tipo,
    dataMovimentacao,
  }) {
    const [result] = await pool.execute(
      `UPDATE movimentacoes
       INNER JOIN categorias
        ON categorias.id = ?
        AND categorias.usuario_id = movimentacoes.usuario_id
       SET
        movimentacoes.categoria_id = categorias.id,
        movimentacoes.descricao = ?,
        movimentacoes.valor = ?,
        movimentacoes.tipo = ?,
        movimentacoes.data_movimentacao = ?
       WHERE movimentacoes.id = ? AND movimentacoes.usuario_id = ?`,
      [categoriaId, descricao, valor, tipo, dataMovimentacao, id, usuarioId],
    );

    if (result.affectedRows === 0) {
      return null;
    }

    return this.findByIdAndUsuario({ id, usuarioId });
  }

  static async delete({ id, usuarioId }) {
    const [result] = await pool.execute(
      'DELETE FROM movimentacoes WHERE id = ? AND usuario_id = ?',
      [id, usuarioId],
    );

    return result.affectedRows > 0;
  }
}

export default Movimentacao;
