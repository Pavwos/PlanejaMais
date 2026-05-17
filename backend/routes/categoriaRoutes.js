import { Router } from 'express';
import { criarCategoria, listarCategorias } from '../controllers/categoriaController.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.use(authMiddleware);

router.post('/', asyncHandler(criarCategoria));
router.get('/', asyncHandler(listarCategorias));

export default router;
