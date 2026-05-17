import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';
import { env } from '../config/env.js';

function createToken(usuario) {
  return jwt.sign(
    {
      id: usuario.id,
      email: usuario.email,
    },
    env.jwtSecret,
    { expiresIn: env.jwtExpiresIn },
  );
}

export async function cadastro(req, res) {
  const { nome, email, senha } = req.body || {};

  if (!nome || !email || !senha) {
    return res.status(400).json({ message: 'Nome, email e senha sao obrigatorios.' });
  }

  const senhaHash = await bcrypt.hash(senha, 10);
  const usuario = await Usuario.create({ nome, email, senha: senhaHash });
  const token = createToken(usuario);

  return res.status(201).json({
    usuario,
    token,
  });
}

export async function login(req, res) {
  const { email, senha } = req.body || {};

  if (!email || !senha) {
    return res.status(400).json({ message: 'Email e senha sao obrigatorios.' });
  }

  const usuario = await Usuario.findByEmail(email);

  if (!usuario) {
    return res.status(401).json({ message: 'Credenciais invalidas.' });
  }

  const senhaValida = await bcrypt.compare(senha, usuario.senha);

  if (!senhaValida) {
    return res.status(401).json({ message: 'Credenciais invalidas.' });
  }

  const token = createToken(usuario);

  return res.json({
    usuario: {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
    },
    token,
  });
}
