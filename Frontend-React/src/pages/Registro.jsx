import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DetalleRegistro from "../components/DetalleRegistro";

export default function Registro() {
  return (
    <div className="form-wrapper bg-custom">
      <Navbar />
      <DetalleRegistro />
      <Footer />
    </div>
  );
}
