import { pool } from '../database/connection.js';

class Categoria {
  static async create({ usuarioId, nome, tipo }) {
    const [result] = await pool.execute(
      'INSERT INTO categorias (usuario_id, nome, tipo) VALUES (?, ?, ?)',
      [usuarioId, nome, tipo],
    );

    return {
      id: result.insertId,
      usuario_id: usuarioId,
      nome,
      tipo,
    };
  }

  static async findByUsuario(usuarioId) {
    const [rows] = await pool.execute(
      `SELECT id, usuario_id, nome, tipo, criado_em, atualizado_em
       FROM categorias
       WHERE usuario_id = ?
       ORDER BY nome ASC`,
      [usuarioId],
    );

    return rows;
  }
}

export default Categoria;
