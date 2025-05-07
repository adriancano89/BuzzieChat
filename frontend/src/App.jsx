import { Routes, Route } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Perfil from './pages/Perfil';

function App() {
  return (
    <>
      <AuthProvider>
        <Header/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route element={<ProtectedRoute/>}>
            <Route path='/perfil' element={<Perfil/>}></Route>
          </Route>
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
