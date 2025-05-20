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
import { User, Users, Trash2, Upload, ArrowLeft } from 'lucide-react';

const socket = io("http://localhost:3000");

export default function Chat() {
    const [chat, setChat] = useState({});
    const [mensaje, setMensaje] = useState("");
    const [mensajes, setMensajes] = useState([]);
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");
    const {user} = useAuth();
    const { getChat, insertMessage, insertFileMessage, error } = useChats();
    const refFinalMensajes = useRef(null);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    const params = useParams();

    const anadirMensaje = (mensaje) => {
        setMensajes(prevMensajes => [...prevMensajes, mensaje]);
    };

    const handleIconClick = () => {
        fileInputRef.current.click();
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFile(file);
        setFileName(file.name);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        let insertedMessage;
        if (!file) {
            const newMessage = {
                chat : params.id,
                sender : user._id,
                type : 'text',
                content : mensaje.trim()
            };
            insertedMessage = await insertMessage(newMessage);
        }
        else {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('chat', params.id);
            formData.append('sender', user._id);
            insertedMessage = await insertFileMessage(formData);
        }
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
                    <div className="flex flex-row items-start gap-4">
                        <Link to="/chats" className="mt-1">
                            <ArrowLeft size={28} />
                        </Link>

                        <Link to={`/chat/info/${params.id}`} className="flex flex-col gap-2">
                            <div className="flex flex-row gap-2">
                                {
                                    chat && chat.users ? (
                                        chat.users.length > 2 ? (
                                            <Users size={26} className="text-black mt-1" />
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
                    </div>
                    <div className="space-y-4 flex-1 overflow-y-auto pr-2">
                        {
                            mensajes && mensajes.length > 0 ? (
                                mensajes.map((mensaje, index) => (
                                    <Mensaje 
                                        key={index} 
                                        sender={mensaje.sender.username === user.username ? 'Tú' : mensaje.sender.username}
                                        type={mensaje.type}
                                        content={mensaje.content}
                                        time={mensaje.createdAt}
                                    />
                                ))
                            ) : (
                                <p className="text-gray-500">No hay mensajes.</p>
                            )
                        }
                        <div ref={refFinalMensajes} />
                    </div>
                </section>
                <form 
                    onSubmit={handleSubmit} 
                    className="flex flex-row items-center gap-4 bg-white rounded-lg shadow-md p-4"
                >
                    <div className="flex flex-1 gap-2 items-center">
                        <label htmlFor="mensaje" className="text-gray-700 text-base font-medium">Mensaje:</label>
                        <textarea 
                            name="mensaje" 
                            id="mensaje" 
                            value={mensaje} 
                            placeholder="Escribe un mensaje..." 
                            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(event) => setMensaje(event.target.value)}
                        ></textarea>
                    </div>
                    <div>
                        <button type="button" onClick={handleIconClick} className="flex flex-col items-center">
                            <Upload className="w-7 h-7 cursor-pointer"/>
                            {fileName && <span className="text-sm text-gray-700 mt-1">{fileName}</span>}
                        </button>
                        <input type="file" name="file" id="file" ref={fileInputRef} onChange={handleFileChange} className="hidden"/>
                    </div>
                    <input 
                        type="submit" 
                        value="Enviar" 
                        className="w-38 h-11  bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 cursor-pointer transition"
                    />
                </form>
            </div>
        </main>
    )
};