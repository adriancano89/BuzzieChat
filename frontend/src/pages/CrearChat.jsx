import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Trash2 } from "lucide-react";
import SearchUsers from "../components/SearchUsers";
import { useAuth } from "../context/AuthContext";
import { useChats } from "../context/ChatContext";
import PopupExitoso from "../components/popups/PopupExitoso";
import PopupError from "../components/popups/PopupError";
import { useNavigate } from "react-router-dom";

export default function CrearChat() {
    const [usuarioAnadido, setUsuarioAnadido] = useState({});
    const [errorUsuarioAnadido, setErrorUsuarioAnadido] = useState("");
    const { user } = useAuth();
    const {createChat, error, setError} = useChats();
    const [popupExitoso, setPopupExitoso] = useState(false);
    const [popupError, setPopupError] = useState(false);
    const navigate = useNavigate();

    const anadirUsuario = (usuario) => {
        setErrorUsuarioAnadido("");
        if (Object.keys(usuarioAnadido).length === 0) {
            setUsuarioAnadido(usuario);
        }
        else {
            setErrorUsuarioAnadido("Ya has agregado un usuario al chat. Elimina el agregado para agregar otro.");
        }
    };

    const eliminarUsuario = () => {
        setUsuarioAnadido({});
    };

    const crearChat = async (arrayUsuarios) => {
        const newChat = {
            name : '',
            users : arrayUsuarios
        };
        
        let creacionExitosa = await createChat(newChat);
        
        if (creacionExitosa) {
            setPopupExitoso(true);
        }
        else {
            setPopupError(true);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        if (Object.keys(usuarioAnadido).length === 0) {
            setError("Debes agregar un usuario al chat.");
            setPopupError(true);
        }
        else {
            console.log("Usuario a añadir:");
            console.log(usuarioAnadido);
            const usuariosChat = [];
            let usuarioAdmin = {
                user : user._id,
                admin : true,
            };
            let usuario2 = {
                user : usuarioAnadido._id,
                admin : false,
            };
            usuariosChat.push(usuarioAdmin);
            usuariosChat.push(usuario2);
            console.log(usuariosChat);

            console.log("Error: " + error);
            
            crearChat(usuariosChat);
        }
    };

    return (
        <main className="flex flex-row h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <div className="bg-white shadow-sm p-4">
                    <h1 className="text-xl font-semibold text-gray-800">Crear chat</h1>
                </div>

                <section className="p-4">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-1">Usuario añadido</h3>
                        <div>
                            {errorUsuarioAnadido && <p className="text-red-500">{errorUsuarioAnadido}</p>}
                            <ul className="mt-2">
                            {
                                usuarioAnadido && Object.keys(usuarioAnadido).length !== 0 ? (
                                    <li className="flex flex-row items-center justify-between bg-white border-2 border-gray-400 rounded-lg p-2">
                                        <span className="text-gray-700">{usuarioAnadido.username}</span>
                                        <Trash2 size={24} className="text-red-500 cursor-pointer hover:text-red-600" onClick={() => eliminarUsuario()}/>
                                    </li>
                                ) : (
                                    <p className="text-gray-500">No se ha añadido ningún usuario.</p>
                                )
                            }
                            </ul>
                        </div>
                    </div>
                    <form action="" onSubmit={handleSubmit} className="mt-4">
                        <SearchUsers onSelectUser={anadirUsuario}/>
                        <div className="bg-white p-4">
                            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center">
                                Iniciar chat
                            </button>
                        </div>
                    </form>
                </section>
            </div>
            {popupExitoso && <PopupExitoso mensaje={"Chat creado con éxito."} confirmar={() => {setPopupExitoso(false); navigate('/chats'); }}/>}
            {popupError && <PopupError mensaje={error} confirmar={() => setPopupError(false)}/>}
        </main>
    )
}