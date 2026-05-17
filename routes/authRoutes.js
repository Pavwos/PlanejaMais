import { Router } from 'express';
import { cadastro, login } from '../controllers/authController.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const router = Router();

router.post('/cadastro', asyncHandler(cadastro));
router.post('/login', asyncHandler(login));

export default router;
