import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Mensaje from '../components/Mensaje';
import { useAuth } from '../context/AuthContext';

const socket = io("http://localhost:3000");

export default function Chat() {
    const [mensaje, setMensaje] = useState("");
    const [mensajes, setMensajes] = useState([]);
    const {user} = useAuth();

    const anadirMensaje = (mensaje) => {
        console.log(mensaje);
        setMensajes(prevMensajes => [...prevMensajes, mensaje]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        socket.emit('message', mensaje);
        anadirMensaje(mensaje);
    };

    useEffect(() => {
        socket.on("message", anadirMensaje);

        return () => {
            socket.off('message', anadirMensaje);
        };
    }, [mensajes]);

    return (
        <main className="flex flex-col justify-between">
            <section> 
                {
                    mensajes.map((mensaje, index) => (
                        <Mensaje key={index} remitente={user.username} cuerpo={mensaje} />
                    ))
                }
            </section>
            <form action="" onSubmit={handleSubmit} className="flex flex-row">
                <div className="flex flex-row gap-2">
                    <label htmlFor="mensaje" className="text-lg">Mensaje:</label>
                    <input type="text" name="mensaje" id="mensaje" className="border-2 border-black px-3 py-1" onChange={(event) => setMensaje(event.target.value.trim())}/>
                </div>
                <input type="submit" value="Enviar" className="border-2 border-black px-2 py-1"/>
            </form>
        </main>        
    )
};