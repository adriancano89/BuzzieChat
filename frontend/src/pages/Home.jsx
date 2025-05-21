import React from "react";
import { Lock } from "lucide-react";
export default function Home() {
    return (
        <main className="fondo-home w-full h-screen flex flex-col justify-start items-center px-6 py-16">
            <div className="text-center max-w-4xl mx-auto">
                <div>
                    <h2 className="text-6xl md:text-8xl font-bold mb-6 text-white drop-shadow-lg">
                        <span className="text-white">Buzzie</span>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-200">Chat</span>
                    </h2>
                    <div className="caja-descripcion p-6 md:p-8">
                        <p className="text-white text-xl md:text-2xl leading-relaxed font-light">
                            ¡Chatea con <span className="font-semibold text-green-300">quien</span> quieras, <span className="font-semibold text-green-300">cuando</span> quieras y <span className="font-semibold text-green-300">donde</span> quieras!
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap justify-center gap-6 md:gap-8 px-4 py-12">
                <div className="tarjeta caja-descripcion p-5 flex flex-col items-center">
                    <div className="bg-green-500 rounded-full p-3 mb-3">
                        <img src="/public/icons/mensaje.svg" className="h-8 w-8" alt="Chat instantáneo" />
                    </div>
                    <p className="text-white text-lg font-medium">Chat instantáneo</p>
                    <p className="text-gray-200 text-sm mt-1">Sin retrasos ni esperas</p>
                </div>

                <div className="tarjeta caja-descripcion p-5 flex flex-col items-center">
                    <div className="bg-green-500 rounded-full p-3 mb-3">
                        <img src="/public/icons/grupo.svg" alt="Comunidades" className="h-8 w-8" />
                    </div>
                    <p className="text-white text-lg font-medium">Grupos</p>
                    <p className="text-gray-200 text-sm mt-1">Crea grupos y añade a miembros</p>
                </div>

                <div className="tarjeta caja-descripcion p-5 flex flex-col items-center">
                    <div className="bg-blue-500 rounded-full p-3 mb-3 mt-2">
                        <Lock />
                    </div>
                    <p className="text-white text-lg font-medium">100% Seguro</p>
                </div>
            </div>
        </main>
    );
      
}