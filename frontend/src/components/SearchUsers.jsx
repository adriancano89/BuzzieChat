import { useState } from "react";
import { Search } from "lucide-react"
import { requestGetUsers } from "../api/UserRequests";

export default function SearchUsers({onSelectUser}) {
    const [usuario, setUsuario] = useState("");
    const [usuarios, setUsuarios] = useState([]);

    const handleInputChange = async (event) => {
        const valor = event.target.value;
        setUsuario(valor);

        const busqueda = valor.trim();

        if (busqueda === "") {
            setUsuarios([]);
        }
        else {
            try {
                const data = {
                    busqueda : busqueda
                };
                const response = await requestGetUsers(data);
                //console.log(response);
                setUsuarios(response.data);
            } catch (error) {
                console.log(error.response.data.message);
            }
        }
    };

    return (
        <>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <Search size={18} className="text-gray-400" />
                </div>
                <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-400 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Buscar usuario..."
                    value={usuario}
                    onChange={handleInputChange}
                />
            </div>
            <ul>
                {
                    usuarios && usuarios.length > 0 ? (
                        usuarios.map((usuario, index) => {
                            return <li key={index} onClick={() => onSelectUser(usuario)} className="border-2 border-gray-300 p-2 rounded-lg hover:bg-gray-300 cursor-pointer">{usuario.username}</li>
                        })
                    ) : (
                        <li className="text-gray-500">No se han encontrado resultados.</li>
                    )
                }
            </ul>
        </>
    );
}