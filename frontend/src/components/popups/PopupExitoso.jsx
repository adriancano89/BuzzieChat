import { CircleCheck } from "lucide-react";

export default function PopupExitoso({ mensaje, confirmar }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-30 z-50">
            <div className="flex flex-col justify-between items-center gap-2 bg-white shadow-lg shadow-gray-400 border-2 border-gray-400 rounded-lg px-12 py-8">
                <CircleCheck size={50} className="text-green-400"/>
                <h3 className="text-lg font-semibold mb-4">{mensaje}</h3>
                <div className="flex flex-row justify-center space-x-4">
                    <button onClick={confirmar} className="bg-green-400 hover:bg-green-600 text-white px-4 py-2 rounded">
                        Aceptar
                    </button>
                </div>
            </div>
        </div>
    );
}