import { createContext, useContext, useState, useEffect } from "react";
import { requestLogin, requestRegistro, requestLogout, requestVerificarToken, requestActualizarPerfil } from '../api/UserRequests';
import { useNavigate } from 'react-router-dom';
const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    return context;
};

export const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    
    const login = async (usuario) => {
        try {
            const response = await requestLogin(usuario);
            console.log(response);
            setIsAuthenticated(true);
            setUser(response.data);
            navigate('/chats');
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    const register = async (usuario) => {
        try {
            const response = await requestRegistro(usuario);
            console.log(response);
            setIsAuthenticated(false);
            setUser(null);
            navigate('/login');
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    const logout = async () => {
        try {
            const response = await requestLogout();
            console.log(response);
            setIsAuthenticated(false);
            setUser(null);
            navigate('/login');
        } catch (error) {
            console.log(error.response.data.message);
        }
    };

    const actualizarPerfil = async (usuario) => {
        let resultadoPeticion = {}
        try {
            const response = await requestActualizarPerfil(usuario);
            console.log(response);
            resultadoPeticion.exitosa = true;
            resultadoPeticion.mensaje = response.data.message;
        } catch (error) {
            resultadoPeticion.exitosa = false;
            resultadoPeticion.mensaje = error.response.data.message;
        }
        return resultadoPeticion;
    };

    const clearError = () => {
        setError("");
    };

    useEffect(() => {
        const validarToken = async () => {
            try {
                setLoading(true);
                const response = await requestVerificarToken();
                console.log(response);
                setIsAuthenticated(true);
                setUser(response.data);
            } catch (error) {
                console.log(error.response.data.message);
                setIsAuthenticated(false);
                setUser(null);
            }
            finally {
                setLoading(false);
            }
        }
        
        validarToken();
    }, []);

    return (
        <AuthContext.Provider value={{ login, register, logout, actualizarPerfil, isAuthenticated, user, loading, error, clearError }}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthContext;