import express from 'express';
import { createChat, updateChat, deleteChat, getChats, getChatWithMessages, getChat, addUserToChat, removeUserFromChat, makeUserAdmin, removeUserAdmin } from '../controllers/chats.controller.js';
import { validacion } from '../middlewares/validarToken.js';
import { validarAdminChat } from '../middlewares/validarAdminChat.js';
const router = express.Router();

router.post('/create', createChat);
router.put('/update/:id', updateChat);
router.delete('/delete/:id', validacion, validarAdminChat, deleteChat);
router.post('/getChats', validacion, getChats);
router.put('/getChatWithMessages/:id', getChatWithMessages);
router.put('/getChat/:id', getChat);
router.put('/addUserToChat/:idChat/user/:idUser', addUserToChat);
router.put('/removeUserFromChat/:idChat/user/:idUser', removeUserFromChat);
router.put('/makeUserAdmin/:idChat/user/:idUser', makeUserAdmin);
router.put('/removeUserAdmin/:idChat/user/:idUser', removeUserAdmin);

export default router;