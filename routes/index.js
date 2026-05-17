import { Router } from 'express';
import authRoutes from './authRoutes.js';
import categoriaRoutes from './categoriaRoutes.js';
import healthRoutes from './healthRoutes.js';
import movimentacaoRoutes from './movimentacaoRoutes.js';

const router = Router();

router.use('/health', healthRoutes);
router.use('/auth', authRoutes);
router.use('/categorias', categoriaRoutes);
router.use('/movimentacoes', movimentacaoRoutes);

export default router;
