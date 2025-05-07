import express from 'express'
import { registro, login, logout, perfil, verificarToken } from '../controllers/users.controller.js';
import { validacion } from '../middlewares/validarToken.js';
const router = express.Router();

router.post('/register', registro);
router.post('/login', login);
router.post('/logout', logout);
router.get('/verify', verificarToken);
router.get('/profile', validacion, perfil);
export default router;