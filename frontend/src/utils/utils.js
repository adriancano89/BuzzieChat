import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export const formatearFecha = (fecha) => {
    const fechaObj = new Date(fecha);
    const fechaFormateada = format(fechaObj, 'dd-MM-yyyy HH:mm', { locale: es });

    return fechaFormateada;
}

export const validarUsername = (username) => {
    const regex = /^(?!\d+$)[a-zA-Z0-9]+$/;
    return regex.test(username);
}

export const validarEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
}