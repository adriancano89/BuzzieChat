import axios from 'axios';

const URL = import.meta.env.VITE_API_URL + '/messages';

export const requestCreateMessage = async (message) => {
    const response = await axios.post(URL + '/create', message, {withCredentials : true});
    return response;
};

export const requestCreateFileMessage = async (formData) => {
    const response = await axios.post(URL + `/uploadFile/${formData.get('chat')}`, formData, {
        headers : {
            'Content-Type' : 'multipart/form-data',
        },
        withCredentials : true
    });
    return response;
}