import React from 'react'
import Navbar from '../components/Navbar';
import DetalleProducto from '../components/DetalleProducto';
import Footer from '../components/Footer';
import '../../css/style_producto.css';

export default function Detalle() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1 d-flex justify-content-center align-items-center">
        <DetalleProducto />
      </main>
      <Footer />
    </div>

  )
}
