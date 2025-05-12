import axios from 'axios';

const URL = 'http://localhost:3000/messages';

export const requestCreateMessage = async (message) => {
    const response = await axios.post(URL + '/create', message, {withCredentials : true});
    return response;
};