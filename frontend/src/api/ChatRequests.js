import axios from 'axios';

const URL = 'http://localhost:3000/chats';

export const requestGetChats = async () => {
    const response = await axios.get(URL + '/getChats', {withCredentials : true});
    return response;
};

export const requestGetChat = async (id) => {
    const response = await axios.put(URL + '/getChatWithMessages/' + id, {withCredentials : true});
    return response;
}

export const requestGetChatInfo = async (id) => {
    const response = await axios.put(URL + '/getChat/' + id, {withCredentials : true});
    return response;
}

export const requestCreateChat = async (chat) => {
    const response = await axios.post(URL + '/create', chat, {withCredentials : true });
    return response;
};

export const requestUpdateChat = async (id, data) => {
    const response = await axios.put(URL + '/update/' + id, data, {withCredentials : true });
    return response;
}

export const requestDeleteChat = async (id) => {
    const response = await axios.delete(URL + '/delete/' + id, {withCredentials : true});
    return response;
}

export const requestAddUserToChat = async (id, userId) => {
    const response = await axios.put(URL + `/addUserToChat/${id}/user/${userId}`, {withCredentials : true});
    return response;
}

export const requestDeleteUserFromChat = async (id, userId) => {
    const response = await axios.put(URL + `/removeUserFromChat/${id}/user/${userId}`, {withCredentials : true});
    return response;
}

export const requestMakeUserAdmin = async (id, userId) => {
    const response = await axios.put(URL + `/makeUserAdmin/${id}/user/${userId}`, {withCredentials : true});
    return response;
}

export const requestRemoveUserAdmin = async (id, userId) => {
    const response = await axios.put(URL + `/removeUserAdmin/${id}/user/${userId}`, {withCredentials : true});
    return response;
}