import { useEffect, useState } from "react";
import { useChats } from "../../context/ChatContext";

export default function PopupEditarChat({chat, resultado, cancelar}) {
    const [nombre, setNombre] = useState(chat.name);
    const [errorNombreVacio, setErrorNombreVacio] = useState("");
    const { updateChat, error } = useChats();

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Editamos el chat");
        if (nombre.trim() === "") {
            setErrorNombreVacio("El nombre del chat no puede estar vacío");
        }
        else {
            let edicionExitosa = updateChat(chat._id, { name : nombre });
            if(edicionExitosa) {
                resultado({ exitosa : true, mensaje : "Nombre del chat editado con éxito" });
            }
            else {
                resultado({ exitosa : false, mensaje : error });
            }
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-30 z-50">
            <div className="flex flex-col justify-between items-center gap-4 bg-white shadow-lg shadow-gray-400 border-2 border-gray-400 rounded-lg px-12 py-8 space-y-2">
                <h1 className="text-xl font-semibold">Editar nombre del chat</h1>
                <form action="" className="space-y-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col items-center w-full space-y-2">
                        <label htmlFor="nombre">Nombre</label>
                        <input type="text" name="nombre" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} className="w-full border border-gray-600 rounded-md px-2 py-1 text-center"/>
                        {errorNombreVacio && <span className="text-red-500 font-medium">{errorNombreVacio}</span>}
                    </div>
                    <div className="flex flex-row justify-center space-x-4">
                        <button type="submit" className="bg-green-400 hover:bg-green-600 text-white px-6 py-3 rounded-md">
                            Confirmar
                        </button>
                        <button type="button" onClick={cancelar} className="bg-gray-300 hover:bg-gray-400 px-6 py-3 rounded-md">
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}