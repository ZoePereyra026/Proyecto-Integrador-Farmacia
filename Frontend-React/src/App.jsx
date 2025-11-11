import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Productos from './pages/Productos'
import Detalle from './pages/Detalle'
import Carrito from './pages/Carrito'
import Login from './pages/Login'
import Registro from './pages/Registro'
import '../css/style_index.css';

export default function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/producto/:id" element={<Detalle />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
        </Routes>
    </BrowserRouter>
  )
}