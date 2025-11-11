import React from 'react';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import InicioSesion from '../components/InicioSesion';

export default function Login() {
  return (
    <div className="form-wrapper">
      <Navbar />
      <InicioSesion />
      <Footer />
    </div>
  );
}
