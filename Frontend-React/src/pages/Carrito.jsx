import React from 'react'
import Navbar from '../components/Navbar';
import VistaCarrito from '../components/VistaCarrito';
import Footer from '../components/Footer';
import '../css/style_carrito.css'

export default function Carrito() {
  return (
    <div>
      <Navbar />
      <VistaCarrito />
      <Footer />
    </div>
  )
}
