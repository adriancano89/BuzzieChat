import { useAuth } from "../context/AuthContext";

export default function Perfil() {

    const { isAuthenticated, logout } = useAuth();

    return (
        <div>
            <h1>Perfil</h1>
            <button className="border-2 border-black p-2" onClick={logout}>Cerrar sesión</button>
        </div>
    )
}