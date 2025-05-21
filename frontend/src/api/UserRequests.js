import axios from 'axios';

const URL = import.meta.env.VITE_API_URL + '/users';

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

export const requestActualizarPerfil = async (usuario) => {
    const response = await axios.post(URL + '/updateProfile', usuario, {withCredentials : true});
    return response;
}

export const requestGetUsers = async (busqueda) => {
    const response = await axios.post(URL + '/getUsers', busqueda, {withCredentials : true});
    return response;
}