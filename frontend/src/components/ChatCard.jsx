import { User, Users } from "lucide-react"
import { useNavigate } from "react-router-dom";
import { formatearFecha } from "../utils/utils";
import { useAuth } from "../context/AuthContext";

export default function ChatCard({ chat }) {
    const {user} = useAuth();
    const navigate = useNavigate();
    const mostrarChat = () => {
        navigate('/chat/' + chat._id);
    };

    const usuarioUltimoMensaje = (username) => {
        let usuario = username;
        if (username === user.username) {
            usuario = "Tú";
        }
        return usuario;
    };

    return (
        <div className="flex items-center p-4 hover:bg-gray-200 cursor-pointer transition-colors duration-200" onClick={mostrarChat}>
            <div className="relative">
                <div className="h-12 w-12 flex items-center justify-center bg-indigo-100 rounded-full text-indigo-800 font-medium">
                    {
                        chat.users.length > 2 ? (
                            <Users size={26}/>
                        ) : (
                            <User size={26} />
                        )
                    }
                </div>
            </div>

            <div className="ml-4 flex-1">
                <div className="flex flex-row justify-between items-center">
                    <h3 className="font-medium text-gray-900">
                        {
                            chat.users.length > 2 ? (
                                chat.name
                            ) : (
                                chat.users.find(userInChat => userInChat.user._id !== user._id).user.username
                            )
                        }
                    </h3>
                    <span className="text-sm text-gray-500">
                        {
                            chat.lastMessage ? formatearFecha(chat.lastMessage.createdAt) : ""
                        }
                    </span>
                </div>
                <div className="flex justify-between items-center mt-1">
                    <p className="text-sm text-gray-500 truncate">
                        {
                            chat.lastMessage ? `${usuarioUltimoMensaje(chat.lastMessage.sender.username)}: ${chat.lastMessage.content}` : ''
                        }
                    </p>
                </div>
            </div>
        </div>
    )
}