import express from 'express';
import { createMessage, updateMessage } from '../controllers/messages.controller.js';
const router = express.Router();

router.post('/create', createMessage);
router.put('/update/:id', updateMessage);

export default router;