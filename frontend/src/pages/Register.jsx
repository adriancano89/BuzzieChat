import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { register, error } = useAuth();

    const handleUserNameChange = (event) => {
        const userNameActual = event.target.value;
        setUserName(userNameActual);
        const regex = /^(?!\d+$)[a-zA-Z0-9]+$/;
        if (userNameActual != "" && !regex.test(userNameActual)) {
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
        const regex = /\S+@\S+\.\S+/;
        if (emailActual != '' && !regex.test(emailActual)) {
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
        <div className="flex flex-col items-center">
            <div className="max-w-md flex flex-col items-center shadow-lg border-2 border-blue-200 rounded-lg p-2">
                <h1 className="text-2xl font-bold ">Registrarse</h1>
                <form action="" method="POST" className="flex flex-col p-8 space-y-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="username">Nombre de usuario</label>
                        <input type="text" name="username" id="username" className="border-2 border-black rounded-md px-4 py-2" onChange={handleUserNameChange} required/>
                        {errors.username && <span className="text-red-500 font-bold">{errors.username}</span>}
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" className="border-2 border-black rounded-md px-4 py-2" onChange={handleEmailChange} required/>
                        {errors.email && <span className="text-red-500 font-bold">{errors.email}</span>}
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" name="password" id="password" className="border-2 border-black rounded-md px-4 py-2" onChange={(event) => setPassword(event.target.value)} minLength={6} required/>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="flex flex-row gap-2">
                            <span>¿Ya tienes una cuenta?</span><Link to='/login' className="text-blue-500 font-bold">Iniciar sesión</Link>
                        </div>
                        {error && <span className="text-red-500 font-bold">{error}</span>}
                    </div>
                    <input type="submit" value="Registrarse" className="w-full bg-blue-500 text-white text-lg p-2 rounded-md "/>
                </form>
            </div>
        </div>
    )
}