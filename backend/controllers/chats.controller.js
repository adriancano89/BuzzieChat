import mongoose, {Types} from "mongoose";
import Chat from "../models/Chat.model.js";
import Message from "../models/Message.model.js";

export const createChat = async (req, res) => {
    try {
        const chat = await Chat.create(req.body);
        res.status(201).json(chat);
    }
    catch (error) {
        res.status(500).json({ message: "Error al crear el chat. Error: " + error.message });
    }
};

export const updateChat = async (req, res) => {
    try {
        const { name } = req.body;
        const idChat = req.params.id;
        const chat = await Chat.findByIdAndUpdate(idChat, { $set: { name: name } }, { new: true });
        if (chat) {
            res.status(200).json(chat);
        }
        else {
            res.status(404).json({ message: "Chat no encontrado" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error al actualizar el chat. Error: " + error.message });
    }
};

export const deleteChat = async (req, res) => {
    try {
        const idChat = req.params.id;
        await Message.deleteMany({ chat : idChat });
        const chat = await Chat.findByIdAndDelete(idChat);
        if (chat) {
            res.status(200).json({ message: "Chat eliminado con éxito" });
        }
        else {
            res.status(404).json({ message: "Chat no encontrado" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error al eliminar el chat y sus mensajes. Error: " + error.message });
    }
};

export const getChats = async (req, res) => {
    try {
        const userId = new Types.ObjectId(req.user.id);
        const { busqueda } = req.body;
        const chats = await Chat.find({ "users.user" : userId }).populate("users.user");
        
        let busquedaMinusculas = busqueda.toLowerCase();
        
        const filteredChats = chats.filter(chat => {
            let foundedChat = false;
            if (chat.users.length === 2) {
                const otherUser = chat.users.find(userInChat => userInChat.user._id.toString() !== userId.toString());
                if (otherUser.user.username.toLowerCase().includes(busquedaMinusculas)) {
                    foundedChat = true;
                }
            }
            else {
                if (chat.name.toLowerCase().includes(busquedaMinusculas)) {
                    foundedChat = true;
                }
            }
            return foundedChat;
        });

        const chatsWithLastMessage = await Promise.all(
            filteredChats.map(async (chat) => {
                const chatObject = chat.toObject();
                const lastMessage = await Message.findOne({ chat: chat._id }).sort({ createdAt: -1 }).populate("sender");
                chatObject.lastMessage = lastMessage;
                return chatObject;
            })
        );

        res.status(200).json(chatsWithLastMessage);
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener los chats. Error: " + error.message });
    }
};

export const getChatWithMessages = async (req, res) => {
    try {
        const idChat = req.params.id;
        const chat = await Chat.findById(idChat).populate("users.user");
        if (chat) {
            const messages = await Message.find({ chat: idChat }).populate("sender");
            const chatData = chat.toObject();
            chatData.messages = messages;
            res.status(200).json(chatData);
        }
        else {
            res.status(404).json({ message: "Chat no encontrado" });
        }        
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener el chat y sus mensajes. Error: " + error.message });
    }
};

export const getChat = async (req, res) => {
    try {
        const idChat = req.params.id;
        const chat = await Chat.findById(idChat).populate("users.user");
        if (chat) {
            res.status(200).json(chat);
        }
        else {
            res.status(404).json({ message: "Chat no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el chat. Error: " + error.message });
    }
};

export const addUserToChat = async (req, res) => {
    try {
        const idChat = req.params.idChat;
        const idUser = req.params.idUser;
        const chat = await Chat.findById(idChat);
        if (chat) {
            const userExists = chat.users.some(user => user.user.toString() === idUser);
            if (!userExists) {
                chat.users.push({ user: idUser, admin: false });
                await chat.save();
                res.status(200).json({ message: "Usuario agregado al chat con éxito" });
            }
            else {
                res.status(400).json({ message: "El usuario ya está en el chat" });
            }
        }
        else {
            res.status(404).json({ message: "Chat no encontrado" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error al insertar al usuario en el chat. Error: " + error.message });
    }
};

export const removeUserFromChat = async (req, res) => {
    try {
        const idChat = req.params.idChat;
        const idUser = req.params.idUser;
        const chat = await Chat.findById(idChat);
        if (chat) {
            const userIndex = chat.users.findIndex(user => user.user.toString() === idUser);
            if (userIndex !== -1) {
                chat.users.splice(userIndex, 1);
                await chat.save();
                res.status(200).json({ message: "Usuario eliminado del chat con éxito" });
            }
            else {
                res.status(400).json({ message: "El usuario no está en el chat" });
            }
        }
        else {
            res.status(404).json({ message: "Chat no encontrado" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error al eliminar el usuario del chat. Error: " + error.message });
    }
};

export const makeUserAdmin = async (req, res) => {
    try {
        const idChat = req.params.idChat;
        const idUser = req.params.idUser;

        const chat = await Chat.findById(idChat);
        if (chat) {
            const userIndex = chat.users.findIndex(user => user.user.toString() === idUser);
            if (userIndex !== -1) {
                chat.users[userIndex].admin = true;
                await chat.save();
                res.status(200).json({ message: "Rol admin asignado con éxito." });
            }
            else {
                res.status(400).json({ message: "El usuario no está en el chat." });
            }
        }
        else {
            res.status(404).json({ message: "Chat no encontrado." });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error al convertir en admin al usuario. Error: " + error.message });
    }
};

export const removeUserAdmin = async (req, res) => {
    try {
        const idChat = req.params.idChat;
        const idUser = req.params.idUser;

        const chat = await Chat.findById(idChat);
        if (chat) {
            const userIndex = chat.users.findIndex(user => user.user.toString() === idUser);
            if (userIndex !== -1) {
                chat.users[userIndex].admin = false;
                await chat.save();
                res.status(200).json({ message: "Rol de invitado asignado con éxito." });
            }
            else {
                res.status(400).json({ message: "El usuario no está en el chat." });
            }
        }
        else {
            res.status(404).json({ message: "Chat no encontrado." });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error al eliminar el rol de admin al usuario. Error: " + error.message });
    }
};