import { createContext, useContext, useState, useEffect } from "react";
import { requestLogin, requestRegistro, requestLogout, requestVerificarToken } from '../api/requests';
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
            navigate('/perfil');
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

    useEffect(() => {
        const validarToken = async () => {
            try {
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
        <AuthContext.Provider value={{ login, register, logout, isAuthenticated, user, loading, error }}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthContext;