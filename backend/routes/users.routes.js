import express from 'express'
import { crearUsuario } from '../controllers/users.controller.js';
const router = express.Router();
router.post('/create', crearUsuario);

export default router;