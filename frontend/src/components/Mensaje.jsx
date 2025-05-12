import { formatearFecha } from "../utils/utils"

export default function Mensaje({ sender, content, time }) {
    return (
        <div className={`flex flex-col my-2 justify-start ${sender === 'Tú' ? 'items-end' : 'items-start'}`}>
            <div className={`${sender === 'Tú' ? 'bg-green-200' : 'bg-gray-200'} p-3 rounded-lg min-w-xs`}>
                <span>{sender}</span>
                <p className="text-sm">{content}</p>
                <p className="text-xs">{formatearFecha(time)}</p>
            </div>
        </div>
    )
}