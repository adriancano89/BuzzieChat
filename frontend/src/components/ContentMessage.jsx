export default function ContentMessage({sender, type, content, time}) {
    let messageContent;
    switch (type) {
        case 'text':
            messageContent = <p className="text-sm text-gray-800 whitespace-pre-wrap">{content}</p>
            break;
        case 'image':
            messageContent = <img src={`http://localhost:3000${content}`} alt={`Imagen enviada por ${sender} el ${time}`} className="max-w-xs my-2" />
            break;
        case 'video':
            messageContent = <video src={`http://localhost:3000${content}`} controls></video>
    }
    return messageContent;
}