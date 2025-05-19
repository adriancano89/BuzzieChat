import { formatearFecha } from "../utils/utils"

export default function Mensaje({ sender, type, content, time }) {
    const ContentElement = () => {
        let messageContent;
        switch (type) {
            case 'text':
                messageContent = <p className="text-sm text-gray-800 whitespace-pre-wrap">{content}</p>
                break;
            case 'image':
                messageContent = <img src={`http://localhost:3000${content}`} alt={`Imagen enviada por ${sender} el ${formatearFecha(time)}`} className="max-w-xs my-2" />
                break;
            case 'video':
                messageContent = <video src={`http://localhost:3000${content}`} controls></video>
        }
        return messageContent;
    }
    return (
        <div className={`flex flex-col my-2 ${sender === 'Tú' ? 'items-end' : 'items-start'}`}>
            <div className={`${sender === 'Tú' ? 'bg-green-200 text-right' : 'bg-gray-200 text-left'} max-w-[75%] break-words p-3 rounded-lg`}>
                <span className="font-semibold text-gray-600">{sender}</span>
                <ContentElement />
                <p className="text-xs text-gray-500 mt-1">{formatearFecha(time)}</p>
            </div>
        </div>
    )
}