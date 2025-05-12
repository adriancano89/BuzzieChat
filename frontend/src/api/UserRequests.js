import axios from 'axios';

const URL = 'http://localhost:3000/users';

export const requestRegistro = async (usuario) => {
    const response = await axios.post(URL + '/register', usuario);
    return response;
};

export const requestLogin = async (usuario) => {
    const response = await axios.post(URL + '/login', usuario, {withCredentials : true});
    return response;
};

export const requestVerificarToken = async () => {
    const response = await axios.get(URL + '/verify', {withCredentials : true});
    return response;
};

export const requestLogout = async () => {
    const response = await axios.post(URL + '/logout', {}, {withCredentials : true});
    return response;
}