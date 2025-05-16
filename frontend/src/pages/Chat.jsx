import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import Mensaje from '../components/Mensaje';
import Sidebar from '../components/Sidebar';
import PopupConfirmar from '../components/popups/PopupConfirmar';
import PopupExitoso from '../components/popups/PopupExitoso';
import PopupError from '../components/popups/PopupError';
import { useAuth } from '../context/AuthContext';
import { useChats } from '../context/ChatContext';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { User, Users, Trash2 } from 'lucide-react';

const socket = io("http://localhost:3000");

export default function Chat() {
    const [chat, setChat] = useState({});
    const [mensaje, setMensaje] = useState("");
    const [mensajes, setMensajes] = useState([]);
    const {user} = useAuth();
    const { getChat, insertMessage, error } = useChats();
    const refFinalMensajes = useRef(null);
    const navigate = useNavigate();
    const params = useParams();

    const anadirMensaje = (mensaje) => {
        setMensajes(prevMensajes => [...prevMensajes, mensaje]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newMessage = {
            chat : params.id,
            sender : user._id,
            type : 'text',
            content : mensaje.trim()
        };
        const insertedMessage = await insertMessage(newMessage);
        socket.emit('message', insertedMessage);
        anadirMensaje(insertedMessage);
        setMensaje("");
    };

    useEffect(() => {
        const getChatWithMessages = async () => {
            const chatWithMessages = await getChat(params.id);
            setMensajes(chatWithMessages.messages);
            setChat(chatWithMessages);
        };

        getChatWithMessages();
    }, []);

    useEffect(() => {
        const handleMessage = (mensaje) => {
            anadirMensaje(mensaje);
        };
        socket.on("message", handleMessage);

        return () => {
            socket.off('message', handleMessage);
        };
    }, []);

    useEffect(() => {
        if (refFinalMensajes.current) {
            refFinalMensajes.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [mensajes]);

    return (
        <main className="flex h-screen">
            <Sidebar />
            <div className="flex flex-col flex-1 justify-between h-screen overflow-hidden bg-gray-100 p-6">
                <section className="flex flex-col bg-white rounded-lg shadow-md p-6 mb-4 overflow-hidden">
                    <Link to={`/chat/info/` + params.id}>
                        <div className="flex flex-row gap-2">
                            {
                                chat && chat.users ? (
                                    chat.users.length > 2 ? (
                                        <Users size={26} className="text-black mt-1"/>
                                    ) : (
                                        <User size={26} className="text-black mt-1" />
                                    )
                                ) : (
                                    ""
                                )
                            }
                            <h1 className="text-2xl font-bold text-gray-800 mb-4">
                                {
                                    chat && chat.users ? (
                                        chat.users.length > 2 ? (
                                            chat.name
                                        ) : (
                                            chat.users.find(userInChat => userInChat.user._id !== user._id).user.username
                                        )
                                    ) : (
                                        ""
                                    )
                                }
                            </h1>
                        </div>

                        <div className="mb-4">
                            <div className="flex flex-wrap gap-2">
                                {
                                    chat && chat.users ? (
                                        chat.users.length > 2 ? (
                                            chat.users.map((userInChat, index) => (
                                                <span 
                                                    key={index} 
                                                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                                                >
                                                    {userInChat.user.username}
                                                </span>
                                            ))
                                        ) : (
                                            ""
                                        )
                                    ) : (
                                        <p className="text-gray-500">Cargando usuarios...</p>
                                    )
                                }
                            </div>
                        </div>
                    </Link>

                    <div className="space-y-4 flex-1 overflow-y-auto pr-2">
                        {
                            mensajes && mensajes.length > 0 ? (
                                mensajes.map((mensaje, index) => (
                                    <Mensaje 
                                        key={index} 
                                        sender={mensaje.sender.username === user.username ? 'Tú' : mensaje.sender.username}
                                        content={mensaje.content}
                                        time={mensaje.createdAt}
                                    />
                                ))
                            ) : (
                                <p className="text-gray-500">No hay mensajes</p>
                            )
                        }
                        <div ref={refFinalMensajes} />
                    </div>
                </section>
                <form 
                    onSubmit={handleSubmit} 
                    className="flex items-center gap-4 bg-white rounded-lg shadow-md p-4"
                >
                    <div className="flex flex-1 gap-2 items-center">
                        <label htmlFor="mensaje" className="text-gray-700 text-base font-medium">Mensaje:</label>
                        <input 
                            type="text" 
                            name="mensaje" 
                            id="mensaje" 
                            value={mensaje} 
                            placeholder="Escribe un mensaje..." 
                            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(event) => setMensaje(event.target.value)}
                        />
                    </div>
                    <input 
                        type="submit" 
                        value="Enviar" 
                        className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 cursor-pointer transition"
                    />
                </form>
            </div>
        </main>
    )
};