import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import { User, Mail, Calendar, LockKeyhole, LogOut } from "lucide-react";
import { formatearFecha, validarUsername, validarEmail } from "../utils/utils";
import PopupExitoso from "../components/popups/PopupExitoso";
import PopupError from "../components/popups/PopupError";

export default function Perfil() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorsForm, setErrorsForm] = useState({});
    const { user, actualizarPerfil, logout, clearError } = useAuth();

    const [resultadoPeticion, setResultadoPeticion] = useState({});
    const [popupExitoso, setPopupExitoso] = useState(false);
    const [popupError, setPopupError] = useState(false);

    useEffect(() => {
        clearError();
        setUsername(user.username);
        setEmail(user.email);
    }, []);

    const handleUsernameChange = (event) => {
        const usernameActual = event.target.value;
        setUsername(usernameActual);
        if (usernameActual === "") {
            setErrorsForm(errors => ({
                ...errors,
                username: "El nombre de usuario no puede estar vacío.",
            }));
        }
        else {
            const usernameValido = validarUsername(usernameActual);
            if (!usernameValido) {
                setErrorsForm(erroresAnteriores => ({
                    ...erroresAnteriores,
                    username: "El nombre de usuario no puede contener solo numeros.",
                }));
            }
            else {
                setErrorsForm(erroresAnteriores => {
                    const { username, ...restoErrores } = erroresAnteriores;
                    return restoErrores;
                });
            }
        }
    };

    const handleEmailChange = (event) => {
        const emailActual = event.target.value;
        setEmail(emailActual);
        if (emailActual === "") {
            setErrorsForm(errors => ({
                ...errors,
                email: "El correo electrónico no puede estar vacío.",
            }));
        }
        else {
            const emailValido = validarEmail(emailActual);
            if (!emailValido) {
                setErrorsForm(erroresAnteriores => ({
                    ...erroresAnteriores,
                    email: "El correo electrónico introducido no es válido.",
                }));
            }
            else {
                setErrorsForm(erroresAnteriores => {
                    const { email, ...restoErrores } = erroresAnteriores;
                    return restoErrores;
                });
            }
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (Object.keys(errorsForm).length === 0) {
            const usuario = {
                username,
                email,
                password
            }
            let peticion = await actualizarPerfil(usuario);
            setResultadoPeticion(peticion);
            if (peticion.exitosa) {
                setPopupExitoso(true);
            }
            else {
                setPopupError(true);
            }
        }
    }

    return (
        <main className="flex h-screen">
            <Sidebar />
            <div className="flex flex-col flex-1 h-screen overflow-hidden bg-gray-100 p-6">
                <div className="flex flex-row items-center gap-2 bg-white shadow-sm p-4">
                    <User />
                    <h1 className="text-xl font-semibold text-gray-800">Perfil</h1>
                </div>
                <div className="bg-white shadow-sm p-4">
                    <h2 className="text-lg font-semibold mb-4">Información del perfil</h2>
                    <form action="" className="grid grid-cols-2 gap-6" onSubmit={handleSubmit}>
                        <div className="flex items-center gap-3">
                            <User size={23} className="text-blue-500"/>
                            <div className="w-60">
                                <label htmlFor="username" className="block text-md text-gray-800 mb-1">Nombre de usuario</label>
                                <input type="text" name="username" id="username" value={username} onChange={handleUsernameChange} className="border border-gray-400 rounded px-3 py-2 w-full"/>
                                {errorsForm.username && <span className="text-red-500 font-bold">{errorsForm.username}</span>}
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Mail className="text-blue-500" size={23} />
                            <div className="w-70">
                                <label htmlFor="email" className="block text-md text-gray-800 mb-1">Correo electrónico</label>
                                <input type="text" name="email" id="email" value={email} onChange={handleEmailChange} className="border border-gray-400 rounded px-3 py-2 w-full"/>
                                {errorsForm.email && <span className="text-red-500 font-bold">{errorsForm.email}</span>}
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <LockKeyhole className="text-red-500" size={23} />
                            <div className="w-60">
                                <label htmlFor="password" className="block text-md text-gray-800 mb-1">Cambiar contaseña</label>
                                <input type="password" name="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} minLength={6} placeholder="Introduce tu nueva contraseña" className="border border-gray-400 rounded px-3 py-2 w-full"/>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Calendar className="text-green-500" size={23} />
                            <div>
                                <span htmlFor="" className="block text-md text-gray-800 mb-1">Usuario desde</span>
                                <p className="text-base font-medium text-gray-800">
                                    {formatearFecha(user.createdAt).split(" ")[0]}
                                </p>
                            </div>
                        </div>

                        <div className="col-span-2 flex flex-row justify-center">
                            <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center">
                                Guardar cambios
                            </button>
                        </div>
                    </form>
                </div>
                <div className="flex flex-row justify-center">
                    <button className="w-1/2 sm:w-1/3 lg:w-1/5 flex flex-row justify-center gap-2 mt-4 border-2 border-red-400 bg-white text-red-600 hover:bg-red-400 hover:text-white transition-colors duration-300 px-5 py-2.5 rounded-md shadow-md font-semibold" onClick={logout}>
                        <LogOut /> Cerrar sesión
                    </button>
                </div>
            </div>
            {popupExitoso && <PopupExitoso mensaje={resultadoPeticion.mensaje} confirmar={() => {setPopupExitoso(false);}}/>}
            {popupError && <PopupError mensaje={resultadoPeticion.mensaje} confirmar={() => setPopupError(false)}/>}
        </main>
    )
}