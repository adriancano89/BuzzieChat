import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { validarUsername, validarEmail } from "../utils/utils";

export default function Register() {
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { register, error, clearError } = useAuth();

    useEffect(() => {
        clearError();
    }, []);

    const handleUserNameChange = (event) => {
        const userNameActual = event.target.value;
        setUserName(userNameActual);
        const userNameValido = validarUsername(userNameActual);
        if (userNameActual != "" && !userNameValido) {
            setErrors(erroresAnteriores => ({
                ...erroresAnteriores,
                username: "El nombre de usuario no puede contener solo numeros",
            }));
        }
        else {
            setErrors(erroresAnteriores => {
                const { username, ...restoErrores } = erroresAnteriores;
                return restoErrores;
            });
        }
    };

    const handleEmailChange = (event) => {
        const emailActual = event.target.value;
        setEmail(emailActual);
        const emailValido = validarEmail(emailActual);
        if (emailActual != '' && !emailValido) {
            setErrors(erroresAnteriores => ({
                ...erroresAnteriores,
                email: "El correo electrónico introducido no es válido",
            }));
        }
        else {
            setErrors(erroresAnteriores => {
                const { email, ...restoErrores } = erroresAnteriores;
                return restoErrores;
            });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (Object.keys(errors).length === 0) {
            const usuario = {
                username,
                email,
                password
            }
            register(usuario);
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-indigo-600 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-blue-300 p-8">
                <h1 className="text-3xl font-extrabold text-center text-blue-600 mb-6">Registrarse</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-sm font-semibold text-gray-700">Nombre de usuario</label>
                        <input
                        type="text"
                        name="username"
                        id="username"
                        className="mt-1 w-full border-2 border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        onChange={handleUserNameChange}
                        required
                        />
                        {errors.username && <span className="text-red-500 text-sm font-semibold">{errors.username}</span>}
                    </div>
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
                        minLength={6}
                        className="mt-1 w-full border-2 border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        onChange={(event) => setPassword(event.target.value)}
                        required
                        />
                    </div>
                    {error && <div className="text-center text-red-600 text-sm font-semibold">{error}</div>}
                    <input
                        type="submit"
                        value="Registrarse"
                        className="w-full bg-blue-500 hover:bg-blue-600 transition-colors duration-300 text-white text-lg font-medium py-2 rounded-lg shadow-md cursor-pointer"
                    />
                    <div className="text-center text-sm text-gray-600 mt-4">
                        ¿Ya tienes una cuenta?
                        <Link to='/login' className="text-blue-500 font-semibold hover:underline ml-1">Iniciar sesión</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}