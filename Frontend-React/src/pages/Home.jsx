import React from 'react';
import Navbar from '../components/navbar';
import Descripcion from '../components/Descripcion';
import CarrucelProductos from '../components/CarruselProductos';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div>
      <Navbar />
      <Descripcion />
      <CarrucelProductos />
      <Footer />
    </div>
  );
}
