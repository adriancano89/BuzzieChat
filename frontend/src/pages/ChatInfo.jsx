import { useState, useEffect } from "react";
import { useChats } from "../context/ChatContext";
import Sidebar from "../components/Sidebar"
import SearchUsers from "../components/SearchUsers";
import PopupConfirmar from "../components/popups/PopupConfirmar";
import PopupEditarChat from "../components/popups/PopupEditarChat";
import PopupExitoso from "../components/popups/PopupExitoso";
import PopupError from "../components/popups/PopupError";
import { useParams } from "react-router-dom";
import { User, Users, Trash2, X, Edit, Mail, Calendar } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { formatearFecha } from "../utils/utils";

export default function ChatInfo() {
    const [chat, setChat] = useState({});

    const [usuariosAnadidos, setUsuariosAnadidos] = useState([]);
    const [errorUsuariosAnadidos, setErrorUsuariosAnadidos] = useState("");
    const [resultadoEdicion, setResultadoEdicion] = useState({});

    const [popupEliminar, setPopupEliminar] = useState(false);
    const [popupEditar, setPopupEditar] = useState(false);
    const [popupExitoso, setPopupExitoso] = useState(false);
    const [popupError, setPopupError] = useState(false);

    const {user} = useAuth();
    const { getChatInfo, deleteChat, clearError } = useChats();
    const params = useParams();

    const getChat = async () => {
        const chatInfo = await getChatInfo(params.id);
        setChat(chatInfo);
    };

    useEffect(() => {
        getChat();
    }, []);

    const anadirUsuario = (usuario) => {
        setErrorUsuariosAnadidos("");
        if (!usuariosAnadidos.includes(usuario)) {
            setUsuariosAnadidos(anteriores => [...anteriores, usuario])
        }
        else {
            setErrorUsuariosAnadidos("El usuario " + usuario.username + " ya ha sido agregado");
        }
    };

    const eliminarUsuario = (usuario) => {
        setUsuariosAnadidos(anteriores => {
            return anteriores.filter((user) => user._id !== usuario._id);
        });
    };

    const handleEditar = (resultado) => {
        setResultadoEdicion(resultado);
        setPopupEditar(false);
        if (resultado.exitosa) {
            setPopupExitoso(true);
            getChat();
        }
        else {
            setPopupError(true);
        }
    }

    const eliminarChat = async () => {
        clearError();
        let exitoso = await deleteChat(params.id);
        setPopupEliminar(false);
        if (!exitoso) {
            setPopupError(true);
        }
        else {
            setPopupExitoso(true);
        }
    };

    const esAdmin = () => {
        return chat.users.find(userInChat => userInChat.user._id === user._id).admin;
    }

    const usuarioInvitado = () => {
        return chat.users.find(userInChat => userInChat.user._id !== user._id).user;
    }
    
    return (
        <main className="flex h-screen">
            <Sidebar />
            <div className="flex flex-col flex-1 justify-between overflow-hidden bg-gray-100 p-6">
                <section className="flex flex-col bg-white rounded-lg shadow-md p-6 mb-4">
                    <div className="flex flex-row justify-center gap-2">
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
                                        usuarioInvitado().username
                                    )
                                ) : (
                                    ""
                                )
                            }
                        </h1>
                        {
                            chat && chat.users ? (
                                chat.users.length > 2 && esAdmin() ? (
                                    <Edit size={24} className="text-black cursor-pointer mt-1" onClick={() => setPopupEditar(true)}/>
                                ) : (
                                    ""
                                )
                            ) : (
                                ""
                            )
                        }
                    </div>
                    <div className="flex flex-col space-y-4">
                        {
                            chat && chat.users ? (
                                chat.users.length > 2 ? (
                                    <>
                                        <h2 className="text-lg font-medium">Usuarios</h2>
                                        <ul className="space-y-2">
                                        {chat.users.map((userInChat, index) => (
                                            <li key={index} className="flex items-center justify-between bg-gradient-to-r from-indigo-100 to-indigo-200 border border-gray-200 rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-shadow">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-9 h-9 bg-blue-200 text-blue-900 rounded-full flex items-center justify-center font-bold uppercase">
                                                        {userInChat.user.username.charAt(0)}
                                                    </div>
                                                    <span className="text-gray-800 font-semibold truncate max-w-[150px]">
                                                        {userInChat.user.username}
                                                    </span>
                                                </div>
                                                {
                                                    esAdmin() ? (
                                                        <X size={24} className="text-black cursor-pointer hover:text-gray-600 transition-colors"/>
                                                    ) : (
                                                        ""
                                                    )
                                                }
                                            </li>
                                        ))}
                                        </ul>
                                        {
                                            esAdmin() ? (
                                            <>
                                                <div className="space-y-2">
                                                    <h2 className="text-lg font-medium">Añadir usuarios</h2>
                                                    <div>
                                                        {errorUsuariosAnadidos && <p className="text-red-500">{errorUsuariosAnadidos}</p>}
                                                        <ul className="">
                                                        {
                                                            usuariosAnadidos && usuariosAnadidos.length > 0 ? (
                                                                usuariosAnadidos.map((usuario, index) => {
                                                                    return (
                                                                        <li key={index} className="flex flex-row items-center justify-between bg-white border-2 border-gray-400 rounded-lg p-2 mb-2">
                                                                            <span key={index} className="text-gray-700">{usuario.username}</span>
                                                                            <Trash2 size={24} className="text-red-500 cursor-pointer hover:text-red-600" onClick={() => eliminarUsuario(usuario)}/>
                                                                        </li>
                                                                    )
                                                                })
                                                            ) : (
                                                                <li className="text-gray-500">No se han añadido usuarios</li>
                                                            )
                                                        }
                                                        </ul>
                                                    </div>
                                                    <SearchUsers onSelectUser={anadirUsuario}/>
                                                </div>
                                                <div className="px-4 flex flex-col items-center">
                                                    <button type="submit" className="w-1/2 lg:w-1/3 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center">
                                                        Agregar usuarios
                                                    </button>
                                                </div>
                                                <div className="px-4 flex flex-col items-center">
                                                    <button type="submit" onClick={() => setPopupEliminar(true)} className="w-1/2 lg:w-1/3 bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center">
                                                        Eliminar grupo
                                                    </button>
                                                </div>
                                            </>
                                            ) : (
                                                ""
                                            )
                                        }
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center w-full space-y-6">
                                        <div className="bg-white border-2 border-gray-200 rounded-lg shadow-md p-4 md:max-w-lg w-full space-y-4">
                                            <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Información del usuario</h2>

                                            <div className="flex items-center gap-3">
                                                <Mail className="text-blue-500" size={20} />
                                                <div>
                                                    <p className="text-sm text-gray-500">Correo electrónico</p>
                                                    <p className="text-base font-medium text-gray-800">
                                                        {usuarioInvitado().email}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <Calendar className="text-green-500" size={20} />
                                                <div>
                                                    <p className="text-sm text-gray-500">Usuario desde</p>
                                                    <p className="text-base font-medium text-gray-800">
                                                        {formatearFecha(usuarioInvitado().createdAt).split(" ")[0]}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="px-4 w-full flex justify-center">
                                            <button type="submit" onClick={() => setPopupEliminar(true)} className="w-1/2 lg:w-1/4 bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center">
                                                Eliminar chat
                                            </button>
                                        </div>
                                    </div>
                                )
                            ) : (
                                <p className="text-gray-500">Cargando usuarios...</p>
                            )
                        }
                    </div>
                </section>
            </div>
            {popupEliminar && <PopupConfirmar mensaje={"¿Deseas eliminar este chat?"} confirmar={eliminarChat} cancelar={() => setPopupEliminar(false)}/>}
            {Object.keys(chat).length !== 0 && popupEditar && <PopupEditarChat chat={chat} resultado={handleEditar} cancelar={() => setPopupEditar(false)}/>}
            {popupExitoso && <PopupExitoso mensaje={resultadoEdicion.mensaje} confirmar={() => {setPopupExitoso(false);}}/>}
            {popupError && <PopupError mensaje={resultadoEdicion.mensaje} confirmar={() => setPopupError(false)}/>}
        </main>
    )
}