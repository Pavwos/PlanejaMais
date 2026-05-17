import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'troque_este_segredo_em_producao',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    name: process.env.DB_NAME || 'planeja_plus',
  },
};
