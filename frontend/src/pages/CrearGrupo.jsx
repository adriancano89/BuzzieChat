import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Trash2 } from "lucide-react";
import SearchUsers from "../components/SearchUsers";
import { useAuth } from "../context/AuthContext";
import { useChats } from "../context/ChatContext";
import { useNavigate } from "react-router-dom";
import PopupExitoso from "../components/popups/PopupExitoso";
import PopupError from "../components/popups/PopupError";

export default function CrearGrupo() {
    const [nombre, setNombre] = useState("");
    const [usuariosAnadidos, setUsuariosAnadidos] = useState([]);
    const [errorUsuariosAnadidos, setErrorUsuariosAnadidos] = useState("");
    const { user } = useAuth();
    const {createChat, error, setError } = useChats();
    const [popupExitoso, setPopupExitoso] = useState(false);
    const [popupError, setPopupError] = useState(false);
    const navigate = useNavigate();

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

    const crearGrupo = async (arrayUsuarios) => {
        const newChat = {
            name : nombre,
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
        let errores = [];
        if (nombre.trim() === "") {
            errores.push("El nombre del grupo no puede estar vacío.");
        }
        if (usuariosAnadidos.length < 2) {
            errores.push("El grupo debe tener al menos 3 usuarios."); //El tercer usuario es el usuario que crea el grupo
        }
        if (errores.length === 0) {
            const usuariosChat = [];
            let usuarioAdmin = {
                user : user._id,
                admin : true,
            };
            usuariosChat.push(usuarioAdmin);
            usuariosAnadidos.forEach(usuario => {
                let usuarioObj = {
                    user : usuario._id,
                    admin : false,
                };
                usuariosChat.push(usuarioObj);
            });

            console.log(usuariosChat);

            crearGrupo(usuariosChat);
        }
        else {
            setError(errores.join(" "));
            setPopupError(true);
        }
    };

    return (
        <main className="flex flex-row h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <div className="bg-white shadow-sm p-4">
                    <h1 className="text-xl font-semibold text-gray-800">Crear grupo</h1>
                </div>

                <section className="p-4">
                    <form action="" onSubmit={handleSubmit} className="space-y-2">
                        <div className="flex flex-row gap-2">
                            <label htmlFor="nombre" className="text-md font-medium text-gray-700">Nombre del grupo:</label>
                            <input 
                            type="text" 
                            name="nombre" 
                            id="nombre" 
                            value={nombre} 
                            onChange={(e) => setNombre(e.target.value)} 
                            className="w-full md:w-1/3 lg:w-1/3 px-2 py-0.5 border-2 border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500 text-gray-800" 
                            placeholder="Escribe el nombre del grupo"/>
                        </div>
                        <div className="mb-3">
                            <h3 className="text-lg font-semibold text-gray-800">Usuarios añadidos</h3>
                            <div>
                                {errorUsuariosAnadidos && <p className="text-red-500">{errorUsuariosAnadidos}</p>}
                                <ul className="my-2">
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
                                        <p className="text-gray-500">No se han añadido usuarios</p>
                                    )
                                }
                                </ul>
                            </div>
                        </div>
                        <SearchUsers onSelectUser={anadirUsuario}/>
                        <div className="bg-white p-4">
                            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center">
                                Crear grupo
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