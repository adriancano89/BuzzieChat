import { formatearFecha } from "../utils/utils"
import ContentMessage from "./ContentMessage"
export default function Mensaje({ sender, type, content, time }) {
    return (
        <div className={`flex flex-col my-2 ${sender === 'Tú' ? 'items-end' : 'items-start'}`}>
            <div className={`${sender === 'Tú' ? 'bg-green-200 text-right' : 'bg-gray-200 text-left'} max-w-[75%] break-words p-3 rounded-lg`}>
                <span className="font-semibold text-gray-600">{sender}</span>
                <ContentMessage sender={sender} type={type} content={content} time={formatearFecha(time)} />
                <p className="text-xs text-gray-500 mt-1"></p>
            </div>
        </div>
    )
}