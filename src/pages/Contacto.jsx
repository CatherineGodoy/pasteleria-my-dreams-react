import React, { useState } from "react";
import "./Contacto.css";

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
    setFormData({ ...formData, [id]: value });
    if (errores[id]) {
      setErrores({ ...errores, [id]: "" });
    }
  };

  const validarFormulario = () => {
    let nuevosErrores = {};
    let esValido = true;

    const patronNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    const patronEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const patronTelefono = /^[0-9]+$/;

    if (!formData.nombre.trim()) {
      nuevosErrores.nombre = "Por favor, ingresa tu nombre.";
      esValido = false;
    } else if (!patronNombre.test(formData.nombre)) {
      nuevosErrores.nombre = "El nombre no debe contener números ni símbolos.";
      esValido = false;
    }

    if (!formData.email.trim()) {
      nuevosErrores.email = "El correo electrónico es obligatorio.";
      esValido = false;
    } else if (!patronEmail.test(formData.email)) {
      nuevosErrores.email = "Ingresa un formato de correo válido (ejemplo@correo.com).";
      esValido = false;
    }

    const telLimpio = formData.telefono.replace(/\s/g, "");
    if (!telLimpio) {
      nuevosErrores.telefono = "El teléfono es necesario para coordinar tu pedido.";
      esValido = false;
    } else if (telLimpio.length !== 8) {
      nuevosErrores.telefono = "El teléfono debe tener exactamente 8 dígitos.";
      esValido = false;
    } else if (!patronTelefono.test(telLimpio)) {
      nuevosErrores.telefono = "Ingresa solo números.";
      esValido = false;
    }

    if (!formData.asunto) {
      nuevosErrores.asunto = "Por favor, selecciona un motivo de contacto.";
      esValido = false;
    }

    if (!formData.mensaje.trim()) {
      nuevosErrores.mensaje = "Por favor, escribe tu mensaje.";
      esValido = false;
    } else if (formData.mensaje.length < 20) {
      nuevosErrores.mensaje = `¡Tu opinión nos importa! Tu mensaje tiene ${formData.mensaje.length} caracteres, por favor escribe al menos 20 para poder ayudarte mejor.`;
      esValido = false;
    } else if (formData.mensaje.length > 500) {
      nuevosErrores.mensaje = "El mensaje excede el límite de 500 caracteres.";
      esValido = false;
    }

    setErrores(nuevosErrores);
    return esValido;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validarFormulario()) {
      setMostrarExito(true);
      setFormData({ nombre: "", email: "", telefono: "", asunto: "", mensaje: "" });
      setTimeout(() => setMostrarExito(false), 5000);
    }
  };

  return (
    <main className="main-content">
      <div className="contenedor-contacto">
        <h1>¡Contáctanos!</h1>
        <p className="intro">Tu opinión es nuestro ingrediente secreto. Cuéntanos qué necesitas.</p>

        <form onSubmit={handleSubmit} className="formulario" noValidate>
          <div className="campo">
            <label htmlFor="nombre">Nombre Completo:</label>
            <input
              type="text"
              id="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ej: María Pérez"
              style={{ borderColor: errores.nombre ? "#D95386" : "#E6E6E6" }}
            />
            {errores.nombre && <span className="error">{errores.nombre}</span>}
          </div>

          <div className="campo">
            <label htmlFor="email">Correo Electrónico:</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Ej: maria@correo.com"
              style={{ borderColor: errores.email ? "#D95386" : "#E6E6E6" }}
            />
            {errores.email && <span className="error">{errores.email}</span>}
          </div>

          <div className="campo">
            <label htmlFor="telefono">Teléfono de contacto:</label>
            <div className="telefono-container">
              <span className="prefijo">+56 9</span>
              <input
                type="tel"
                id="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="1234 5678"
                style={{ borderColor: errores.telefono ? "#D95386" : "#E6E6E6" }}
              />
            </div>
            {errores.telefono && <span className="error">{errores.telefono}</span>}
          </div>

          <div className="campo">
            <label htmlFor="asunto">Motivo del mensaje:</label>
            <select
              id="asunto"
              value={formData.asunto}
              onChange={handleChange}
              style={{ borderColor: errores.asunto ? "#D95386" : "#E6E6E6" }}
            >
              <option value="">Selecciona una opción...</option>
              <option value="pedido">Hacer un pedido</option>
              <option value="consulta">Consulta general</option>
              <option value="felicitacion">Felicitaciones</option>
              <option value="reclamo">Reclamo</option>
            </select>
            {errores.asunto && <span className="error">{errores.asunto}</span>}
          </div>

          <div className="campo">
            <label htmlFor="mensaje">Tu Mensaje:</label>
            <textarea
              id="mensaje"
              rows="6"
              value={formData.mensaje}
              onChange={handleChange}
              placeholder="Ej: Hola, me gustaría cotizar una torta..."
              maxLength={500}
              style={{ borderColor: errores.mensaje ? "#D95386" : "#E6E6E6" }}
            ></textarea>
            <div style={{ textAlign: "right", marginTop: "5px" }}>
              <small style={{ color: formData.mensaje.length >= 500 ? "#D95386" : "#666", fontWeight: "bold" }}>
                {Math.max(0, 500 - formData.mensaje.length)} caracteres restantes
              </small>
            </div>
            {errores.mensaje && <span className="error">{errores.mensaje}</span>}
          </div>

          <button type="submit" className="boton">Enviar mensaje 💌</button>

          {mostrarExito && (
            <div id="mensaje-exito">
              ¡Gracias! Hemos recibido tu mensaje. Te responderemos muy pronto. 🧁
            </div>
          )}
        </form>
      </div>
    </main>
  );
};

export default Contacto;