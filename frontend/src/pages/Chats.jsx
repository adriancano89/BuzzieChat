import { useState, useEffect } from 'react';
import { Search, MessageSquare } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import ChatCard from '../components/ChatCard';
import { useChats } from '../context/ChatContext';

export default function Chats() {
    const [usuario, setUsuario] = useState("");
    const {chats, getChats} = useChats();

    useEffect(() => {
        getChats();
    }, []);

    return (
        <main className="flex h-screen bg-gray-100">
            <Sidebar />

            <div className="flex-1 flex flex-col">
                <section className="bg-white shadow-sm p-4">
                    <h1 className="text-xl font-semibold text-gray-800">Chats</h1>
                </section>

                <section className="p-4 border-b">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                            <Search size={18} className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            placeholder="Buscar chat..."
                            onChange={(e) => setUsuario(e.target.value)}
                        />
                    </div>
                </section>

                <section className="flex-1 overflow-y-auto">
                    <div className="divide-y divide-gray-200">
                    {
                        chats.map((chat, index) => (
                            <ChatCard key={index} chat={chat} />
                        ))
                    }
                    </div>
                </section>

                <div className="bg-white border-t p-4">
                    <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center">
                        <MessageSquare size={18} className="mr-2" /> Nuevo Chat
                    </button>
                </div>
            </div>
        </main>
    );
}