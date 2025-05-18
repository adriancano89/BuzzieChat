import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext";

export default function Header() {

    const { isAuthenticated, logout, user } = useAuth();
    
    return (
        <header className="fondo-home w-full py-6 px-8 md:px-16 flex justify-between items-center bg-transparent z-50">
            <div>
                <Link to="/" className="text-white text-3xl md:text-4xl font-extrabold tracking-wider flex items-center gap-1">
                    <span className="text-white">Buzzie</span>
                    <span className="text-green-400">Chat</span>
                    <span className="relative inline-flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                </Link>
            </div>
        
            <nav className="flex items-center space-x-6 md:space-x-8">
            { isAuthenticated ? (
                    <>
                        <Link to="/chats" className="text-white hover:text-green-400 transition duration-300 text-base md:text-lg font-medium">
                            Mis chats
                        </Link>
                        <Link to="/perfil" className="text-white hover:text-green-400 transition duration-300 text-base md:text-lg font-medium">
                            {user.username}
                        </Link>
                        <button onClick={logout} className="bg-white text-blue-600 hover:bg-green-400 hover:text-white px-5 py-2 rounded-full shadow-lg transition duration-300 transform hover:scale-105 text-base md:text-lg font-semibold hover:cursor-pointer">
                            Cerrar sesión
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="text-white hover:text-green-400 transition duration-300 text-base md:text-lg font-medium">
                            Iniciar sesión
                        </Link>
                        <Link to="/register" className="bg-white text-blue-600 hover:bg-green-400 hover:text-white px-5 py-2 rounded-full shadow-lg transition duration-300 transform hover:scale-105 text-base md:text-lg font-semibold hover:cursor-pointer">
                            ¡Regístrate!
                        </Link>
                    </>
                )}
            </nav>
        </header>      
    )
}