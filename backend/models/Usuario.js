import { pool } from '../database/connection.js';

class Usuario {
  static async create({ nome, email, senha }) {
    const [result] = await pool.execute(
      'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
      [nome, email, senha],
    );

    return {
      id: result.insertId,
      nome,
      email,
    };
  }

  static async findByEmail(email) {
    const [rows] = await pool.execute(
      'SELECT id, nome, email, senha FROM usuarios WHERE email = ? LIMIT 1',
      [email],
    );

    return rows[0] || null;
  }
}

export default Usuario;
