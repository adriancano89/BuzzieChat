import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext";
import { validarEmail } from "../utils/utils";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { login, error, clearError } = useAuth();

    useEffect(() => {
        clearError();
    }, []);

    const handleEmailChange = (event) => {
        const emailActual = event.target.value;
        setEmail(emailActual);
        const emailValido = validarEmail(emailActual);
        
        if (emailActual != '' && !emailValido) {
            setErrors({ email: 'El correo electrónico no es válido' });
        }
        else {
            setErrors({});
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (Object.keys(errors).length === 0) {
            const usuario = {
                email : email,
                password : password
            }
            login(usuario);
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-indigo-600 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-blue-300 p-8">
                <h1 className="text-3xl font-extrabold text-center text-blue-600 mb-6">Iniciar sesión</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email</label>
                        <input
                        type="email"
                        name="email"
                        id="email"
                        className="mt-1 w-full border-2 border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        onChange={handleEmailChange}
                        required
                        />
                        {errors.email && <span className="text-red-500 text-sm font-semibold">{errors.email}</span>}
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Contraseña</label>
                        <input
                        type="password"
                        name="password"
                        id="password"
                        className="mt-1 w-full border-2 border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        />
                    </div>
                    {error && <div className="text-center text-red-600 text-sm font-semibold">{error}</div>}
                    <input
                        type="submit"
                        value="Iniciar sesión"
                        className="w-full bg-blue-500 hover:bg-blue-600 transition-colors duration-300 text-white text-lg font-medium py-2 rounded-lg shadow-md cursor-pointer"
                    />
                    <div className="text-center text-sm text-gray-600 mt-4">
                        ¿No tienes una cuenta?
                        <Link to='/register' className="text-blue-500 font-semibold hover:underline ml-1">Regístrate</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}