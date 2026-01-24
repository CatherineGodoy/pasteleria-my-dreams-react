import React, { useState } from "react";
import '../App.css'; 

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    asunto: "",
    mensaje: "",
  });

  const [errores, setErrores] = useState({});
  const [mostrarExito, setMostrarExito] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    
    // BLOQUEO DE LETRAS: Si es el teléfono, eliminamos todo lo que no sea número
    if (id === "telefono") {
      const soloNumeros = value.replace(/\D/g, ""); 
      setFormData({ ...formData, [id]: soloNumeros });
    } else {
      setFormData({ ...formData, [id]: value });
    }

    if (errores[id]) {
      setErrores({ ...errores, [id]: "" });
    }
  };

  const validarFormulario = () => {
    let nuevosErrores = {};
    let esValido = true;

    const patronNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    const patronEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validación Nombre
    if (!formData.nombre.trim()) {
      nuevosErrores.nombre = "Por favor, ingresa tu nombre.";
      esValido = false;
    } else if (!patronNombre.test(formData.nombre)) {
      nuevosErrores.nombre = "El nombre no debe contener números ni símbolos.";
      esValido = false;
    }

    // Validación Email
    if (!formData.email.trim()) {
      nuevosErrores.email = "El correo electrónico es obligatorio.";
      esValido = false;
    } else if (!patronEmail.test(formData.email)) {
      nuevosErrores.email = "Ingresa un formato de correo válido.";
      esValido = false;
    }

    // LÓGICA MEJORADA DE TELÉFONO
    const telLimpio = formData.telefono.trim();
    if (!telLimpio) {
      nuevosErrores.telefono = "El teléfono es obligatorio.";
      esValido = false;
    } else if (!/^\d+$/.test(telLimpio)) {
      nuevosErrores.telefono = "No se permiten letras, ingresa solo números.";
      esValido = false;
    } else if (telLimpio.length !== 8) {
      nuevosErrores.telefono = "El teléfono debe tener exactamente 8 dígitos.";
      esValido = false;
    }

    // Validación Asunto
    if (!formData.asunto) {
      nuevosErrores.asunto = "Selecciona un motivo.";
      esValido = false;
    }

    // Validación Mensaje
    if (!formData.mensaje.trim() || formData.mensaje.length < 20) {
      nuevosErrores.mensaje = "Tu mensaje debe tener al menos 20 caracteres.";
      esValido = false;
    }

    setErrores(nuevosErrores);
    return esValido;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validarFormulario()) {
      setMostrarExito(true);
      // Aquí es donde conectarás la fetch(API) pronto
      setFormData({ nombre: "", email: "", telefono: "", asunto: "", mensaje: "" });
      setTimeout(() => setMostrarExito(false), 5000);
    }
  };

  return (
    <main className="main-content">
      <h1 className="titulo-principal">¡Contáctanos!</h1>
      <p className="subtitulo-home">
        Tu opinión es nuestro ingrediente secreto. Cuéntanos qué necesitas.
      </p>

      <div className="formulario-container">
        <form onSubmit={handleSubmit} noValidate>
          
          <div className="form-group">
            <label htmlFor="nombre">Nombre Completo:</label>
            <input
              type="text"
              id="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ej: María Pérez"
              className={errores.nombre ? "input-error" : ""}
            />
            {errores.nombre && <span className="error-text">{errores.nombre}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo Electrónico:</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Ej: maria@correo.com"
              className={errores.email ? "input-error" : ""}
            />
            {errores.email && <span className="error-text">{errores.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="telefono">Teléfono (+56 9):</label>
            <input
              type="tel"
              id="telefono"
              value={formData.telefono}
              onChange={handleChange}
              placeholder="1234 5678"
              maxLength="8" // Evita que escriban más de 8
              className={errores.telefono ? "input-error" : ""}
            />
            {errores.telefono && <span className="error-text">{errores.telefono}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="asunto">Motivo del mensaje:</label>
            <select
              id="asunto"
              value={formData.asunto}
              onChange={handleChange}
              className={errores.asunto ? "input-error" : ""}
            >
              <option value="">Selecciona una opción...</option>
              <option value="pedido">Hacer un pedido</option>
              <option value="consulta">Consulta general</option>
              <option value="felicitacion">Felicitaciones</option>
              <option value="reclamo">Reclamo</option>
            </select>
            {errores.asunto && <span className="error-text">{errores.asunto}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="mensaje">Tu Mensaje:</label>
            <textarea
              id="mensaje"
              rows="5"
              value={formData.mensaje}
              onChange={handleChange}
              placeholder="Cuéntanos cómo podemos ayudarte..."
              className={errores.mensaje ? "input-error" : ""}
            ></textarea>
            <small className="char-count">
              {500 - formData.mensaje.length} caracteres restantes
            </small>
            {errores.mensaje && <span className="error-text">{errores.mensaje}</span>}
          </div>

          <button type="submit" className="boton">
            Enviar mensaje 
          </button>

          {mostrarExito && (
            <div className="mensaje-exito-alerta">
              ¡Gracias! Mensaje recibido con éxito. 🧁
            </div>
          )}
        </form>
      </div>
    </main>
  );
};

export default Contacto;