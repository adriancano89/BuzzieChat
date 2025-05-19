import { formatearFecha } from "../utils/utils"

export default function Mensaje({ sender, content, time }) {
    return (
        <div className={`flex flex-col my-2 ${sender === 'Tú' ? 'items-end' : 'items-start'}`}>
            <div className={`${sender === 'Tú' ? 'bg-green-200 text-right' : 'bg-gray-200 text-left'} max-w-[75%] break-words p-3 rounded-lg`}>
                <span className="font-semibold text-gray-600">{sender}</span>
                <p className="text-sm text-gray-800 whitespace-pre-wrap">{content}</p>
                <p className="text-xs text-gray-500 mt-1">{formatearFecha(time)}</p>
            </div>
        </div>
    )
}