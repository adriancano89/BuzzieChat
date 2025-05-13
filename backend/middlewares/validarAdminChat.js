import jwt from 'jsonwebtoken';
import mongoose from "mongoose";
import Chat from "../models/Chat.model.js";

export const validarAdminChat = async (req, res, next) => {
    try {
        const { id } = req.user;
        const chatId = req.params.id;
        const chat = await Chat.findById(chatId);
        if (chat) {
            const userInChat = chat.users.find(userInChat => userInChat.user.toString() === id);
            if (userInChat) {
                if (userInChat.admin) {
                    next();
                }
                else {
                    res.status(401).json({message: "No tienes permisos para realizar esta acción."});
                }
            }
            else {
                res.status(400).json({ message: "El usuario no está en el chat" });
            }
        }
        else {
            res.status(404).json({ message: "Chat no encontrado" });
        }
    } catch (error) {
        res.status(400).json({message : "Error al verificar si el usuario es administrador del chat. Error: " + error.message});
    }
}