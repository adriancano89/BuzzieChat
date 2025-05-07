import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext";

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
        const regex = /\S+@\S+\.\S+/;
        
        if (emailActual != '' && !regex.test(emailActual)) {
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
        <div className="flex flex-col items-center">
            <div className="max-w-md flex flex-col items-center shadow-lg border-2 border-blue-200 rounded-lg p-2">
                <h1 className="text-2xl font-bold ">Iniciar sesión</h1>
                <form action="" method="POST" className="flex flex-col p-8 space-y-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" className="border-2 border-black rounded-md px-4 py-2" onChange={handleEmailChange} required/>
                        {errors.email && <span className="text-red-500 font-bold">{errors.email}</span>}
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" name="password" id="password" className="border-2 border-black rounded-md px-4 py-2" onChange={(event) => setPassword(event.target.value)} required/>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="flex flex-row gap-2">
                            <span>¿No tienes una cuenta?</span><Link to='/register' className="text-blue-500 font-bold">Regístrate</Link>
                        </div>
                        {error && <span className="text-red-500 font-bold">{error}</span>}
                    </div>
                    <input type="submit" value="Iniciar sesión" className="w-full bg-blue-500 text-white text-lg p-2 rounded-md "/>
                </form>
            </div>
        </div>
    )
}