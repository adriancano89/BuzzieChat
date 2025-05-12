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