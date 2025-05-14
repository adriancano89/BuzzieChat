import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { requestGetChats, requestGetChat, requestCreateChat, requestDeleteChat } from "../api/ChatRequests";
import { requestCreateMessage } from "../api/MessageRequests";
const ChatContext = createContext();

export const useChats = () => {
    const context = useContext(ChatContext);
    return context;
};

export const ChatProvider = ({children}) => {
    const [chats, setChats] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const getChats = async () => {
        try {
            const response = await requestGetChats();
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

    const clearError = () => {
        setError("");
    };

    return (
        <ChatContext.Provider value={{ chats, getChats, getChat, insertMessage, createChat, deleteChat, error, setError, clearError }}>
            {children}
        </ChatContext.Provider>
    )
};

export default ChatContext;