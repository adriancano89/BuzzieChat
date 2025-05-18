import { useNavigate } from 'react-router-dom';
import { MessageSquare, MessageSquarePlus, User } from 'lucide-react';

export default function Sidebar() {
    const navigate = useNavigate();

    return (
        <div className="hidden md:flex flex-col w-16 bg-indigo-800 text-white items-center py-6">
            <div className="h-11 w-11 flex items-center justify-center bg-white rounded-full mb-8">
                <MessageSquare size={26} className="text-indigo-800 cursor-pointer" onClick={() => navigate('/chats')}/>
            </div>
            <div className="flex flex-col items-center space-y-8">
                <MessageSquarePlus size={28} className="text-white opacity-70 cursor-pointer" onClick={() => navigate('/chat/create')}/>
                <User size={28} className="text-white opacity-70 cursor-pointer" onClick={() => navigate('/perfil')}/>
            </div>
        </div>
    )
};