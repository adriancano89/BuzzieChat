import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { requestGetChats, requestGetChat, requestCreateChat, requestDeleteChat, requestGetChatInfo, requestUpdateChat, requestAddUserToChat, requestDeleteUserFromChat, requestMakeUserAdmin, requestRemoveUserAdmin } from "../api/ChatRequests";
import { requestCreateMessage, requestCreateFileMessage } from "../api/MessageRequests";
const ChatContext = createContext();

export const useChats = () => {
    const context = useContext(ChatContext);
    return context;
};

export const ChatProvider = ({children}) => {
    const [chats, setChats] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const getChats = async (data) => {
        try {
            const response = await requestGetChats(data);
            console.log(response);
            setChats(response.data);
        } catch (error) {
            console.log(error.response.data.message);
        }
    };

    const getChat = async (chatId) => {
        let response;
        try {
            response = await requestGetChat(chatId);
            console.log(response);
        } catch (error) {
            console.log(error.response.data.message);
        }

        return response.data;
    }

    const getChatInfo = async (chatId) => {
        let response;
        try {
            response = await requestGetChatInfo(chatId);
            console.log(response);
        } catch (error) {
            console.log(error.response.data.message);
        }

        return response.data;
    }

    const insertMessage = async (message) => {
        let response;
        try {
            response = await requestCreateMessage(message);
            console.log(response);
        } catch (error) {
            console.log(error.response.data.message);
        }
        return response.data;
    }

    const insertFileMessage = async (formData) => {
        let response;
        try {
            response = await requestCreateFileMessage(formData);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
        return response.data;
    }

    const createChat = async (newChat) => {
        let exitoso = false;
        try {
            const response = await requestCreateChat(newChat);
            console.log(response);
            exitoso = true;
        } catch (error) {
            setError(error.response.data.message);
        }
        return exitoso;
    }

    const updateChat = async (chatId, data) => {
        let exitoso = false;
        try {
            const response = await requestUpdateChat(chatId, data);
            console.log(response);
            exitoso = true;
        } catch (error) {
            setError(error.response.data.message);
        }
        return exitoso;
    }

    const deleteChat = async (chatId) => {
        let exitoso = false;
        try {
            const response = await requestDeleteChat(chatId);
            console.log(response);
            exitoso = true;
        } catch (error) {
            console.log(error.response.data.message);
            setError(error.response.data.message);
        }
        return exitoso;
    };

    const addUserToChat = async (chatId, userId) => {
        let resultadoPeticion = {};
        try {
            const response = await requestAddUserToChat(chatId, userId);
            console.log(response);
            resultadoPeticion.exitosa = true;
            resultadoPeticion.mensaje = response.data.message;
        } catch (error) {
            resultadoPeticion.exitosa = false;
            resultadoPeticion.mensaje = error.response.data.message;
        }
        return resultadoPeticion;
    }

    const deleteUserFromChat = async (chatId, userId) => {
        let exitoso = false;
        try {
            const response = await requestDeleteUserFromChat(chatId, userId);
            console.log(response);
            exitoso = true;
        } catch (error) {
            console.log(error.response.data.message);
            setError(error.response.data.message);
        }
        return exitoso;
    }

    const makeUserAdminFromChat = async (chatId, userId) => {
        let resultadoPeticion = {};
        try {
            const response = await requestMakeUserAdmin(chatId, userId);
            console.log(response);
            resultadoPeticion.exitosa = true;
            resultadoPeticion.mensaje = response.data.message;
        } catch (error) {
            console.log(error.response.data.message);
            resultadoPeticion.exitosa = false;
            resultadoPeticion.mensaje = error.response.data.message;
        }
        return resultadoPeticion;
    }

    const removeUserAdmin = async (chatId, userId) => {
        let resultadoPeticion = {};
        try {
            const response = await requestRemoveUserAdmin(chatId, userId);
            console.log(response);
            resultadoPeticion.exitosa = true;
            resultadoPeticion.mensaje = response.data.message;
        } catch (error) {
            resultadoPeticion.exitosa = false;
            resultadoPeticion.mensaje = error.response.data.message;
        }
        return resultadoPeticion;
    }

    const clearError = () => {
        setError("");
    };

    return (
        <ChatContext.Provider value={{ chats, getChats, getChat, getChatInfo, insertMessage, insertFileMessage, createChat, updateChat, deleteChat, addUserToChat, deleteUserFromChat, makeUserAdminFromChat, removeUserAdmin, error, setError, clearError }}>
            {children}
        </ChatContext.Provider>
    )
};

export default ChatContext;