import { Router } from 'express';
import {
  criarMovimentacao,
  editarMovimentacao,
  excluirMovimentacao,
  listarMovimentacoes,
} from '../controllers/movimentacaoController.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.use(authMiddleware);

router.post('/', asyncHandler(criarMovimentacao));
router.get('/', asyncHandler(listarMovimentacoes));
router.put('/:id', asyncHandler(editarMovimentacao));
router.delete('/:id', asyncHandler(excluirMovimentacao));

export default router;
