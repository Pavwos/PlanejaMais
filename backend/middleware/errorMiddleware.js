export function errorMiddleware(err, req, res, next) {
  if (err.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({ message: 'Registro ja existente.' });
  }

  console.error(err);

  return res.status(500).json({ message: 'Erro interno no servidor.' });
}
