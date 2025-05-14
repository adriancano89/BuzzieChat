import { Routes, Route } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { AuthProvider } from './context/AuthContext';
import { ChatProvider } from './context/ChatContext';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Perfil from './pages/Perfil';
import Chat from './pages/Chat';
import Chats from './pages/Chats';
import CrearChat from './pages/CrearChat';
import CrearGrupo from './pages/CrearGrupo';

function App() {
  return (
    <>
      <AuthProvider>
        <ChatProvider>
          <Header/>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/register' element={<Register/>}></Route>
            <Route element={<ProtectedRoute/>}>
              <Route path='/perfil' element={<Perfil/>}></Route>
              <Route path='/chat/:id' element={<Chat/>}></Route>
              <Route path='/chats' element={<Chats/>}></Route>
              <Route path='/chat/create' element={<CrearChat/>}></Route>
              <Route path='/chat/group/create' element={<CrearGrupo/>}></Route>
            </Route>
          </Routes>
        </ChatProvider>
      </AuthProvider>
    </>
  )
}

export default App
