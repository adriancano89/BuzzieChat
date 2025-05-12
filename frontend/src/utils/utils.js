import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export const formatearFecha = (fecha) => {
    const fechaObj = new Date(fecha);
    const fechaFormateada = format(fechaObj, 'dd-MM-yyyy HH:mm', { locale: es });

    return fechaFormateada;
}