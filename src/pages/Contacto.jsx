import React, { useState } from 'react';
import './Contacto.css';

const Contacto = () => {
  // === ESTADOS PARA EL FORMULARIO ===
  // Definimos el estado inicial de los campos del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: ''
  });

  // Estados para manejar errores de validación y mensajes de confirmación
  const [errores, setErrores] = useState({});
  const [mostrarExito, setMostrarExito] = useState(false);

  // === MANEJAR CAMBIOS EN LOS INPUTS ===
  // Función que actualiza el estado de formData cada vez que el usuario escribe
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    
    // Limpiar el mensaje de error del campo específico mientras el usuario corrige
    if (errores[id]) {
      setErrores({ ...errores, [id]: '' });
    }
  };

  // === LÓGICA DE VALIDACIÓN ===
  // Esta función verifica que los datos cumplan con los requisitos antes de ser enviados
  const validarFormulario = () => {
    let nuevosErrores = {};
    let esValido = true;

    // Expresiones regulares para validar formatos específicos
    const patronNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    const patronEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const patronTelefono = /^[0-9]+$/;

    // Validación de Nombre: No vacío y sin caracteres especiales
    if (!formData.nombre.trim()) {
      nuevosErrores.nombre = "Por favor, ingresa tu nombre.";
      esValido = false;
    } else if (!patronNombre.test(formData.nombre)) {
      nuevosErrores.nombre = "El nombre no debe contener números ni símbolos.";
      esValido = false;
    }

    // Validación de Email: Formato de correo electrónico estándar
    if (!formData.email.trim()) {
      nuevosErrores.email = "El correo electrónico es obligatorio.";
      esValido = false;
    } else if (!patronEmail.test(formData.email)) {
      nuevosErrores.email = "Ingresa un formato de correo válido (ejemplo@correo.com).";
      esValido = false;
    }

    // Validación de Teléfono: Limpia espacios y verifica exactamente 8 dígitos
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

    // Validación de Asunto: Asegura que se haya seleccionado una opción del menú
    if (!formData.asunto) {
      nuevosErrores.asunto = "Por favor, selecciona un motivo de contacto.";
      esValido = false;
    }

    // === SECCIÓN DE MENSAJE (Validación Inteligente por contexto) ===
    if (!formData.mensaje.trim()) {
      nuevosErrores.mensaje = "Por favor, escribe tu consulta o detalles de tu pedido.";
      esValido = false;
    } 
    // Para pedidos y consultas: requiere mayor detalle (mínimo 50 caracteres)
    else if ((formData.asunto === 'pedido' || formData.asunto === 'consulta') && formData.mensaje.length < 50) {
      nuevosErrores.mensaje = "¡Queremos que tu pedido sea perfecto! Danos los detalles necesarios para ayudarte mejor.";
      esValido = false;
    } 
    // Para felicitaciones o reclamos: requiere información básica (mínimo 10 caracteres)
    else if (formData.mensaje.length < 10) {
      nuevosErrores.mensaje = "Por favor, detalla tu mensaje para brindarte una mejor atención.";
      esValido = false;
    }

    // Actualizamos el estado de errores para que se muestren en el HTML
    setErrores(nuevosErrores);
    return esValido;
  };

  // === MANEJAR ENVÍO DEL FORMULARIO ===
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que la página se recargue por defecto
    
    if (validarFormulario()) {
      // === PROCESAMIENTO DE DATOS ===
      
      // Imprimimos un aviso en la consola con estilo para confirmar flujo exitoso
      console.log("%c Formulario Validado y Enviado ", "color: white; background: #D95386; font-weight: bold; border-radius: 4px; padding: 2px 5px;");
      
      // console.table transforma el objeto formData en una tabla visual para inspección técnica
      console.table(formData); 

      // Activamos el feedback visual de éxito para el usuario
      setMostrarExito(true);
      
      // Reseteamos los campos del formulario limpiando el estado
      setFormData({ nombre: '', email: '', telefono: '', asunto: '', mensaje: '' });
      
      // Temporizador para ocultar el mensaje de éxito después de 5 segundos
      setTimeout(() => setMostrarExito(false), 5000);
    }
  };

  return (
    <main className="main-content">
      <div className="contenedor-contacto">
        <h1>¡Contáctanos!</h1>
        <p className="intro">
          Tu opinión es nuestro ingrediente secreto. Cuéntanos qué necesitas.
        </p>

        <form onSubmit={handleSubmit} className="formulario" noValidate>
          {/* Campo: Nombre */}
          <div className="campo">
            <label htmlFor="nombre">Nombre Completo:</label>
            <input 
              type="text" id="nombre" 
              value={formData.nombre} onChange={handleChange}
              placeholder="Ej: María Pérez"
              style={{ borderColor: errores.nombre ? '#D95386' : '#E6E6E6' }}
            />
            {errores.nombre && <span className="error">{errores.nombre}</span>}
          </div>

          {/* Campo: Email */}
          <div className="campo">
            <label htmlFor="email">Correo Electrónico:</label>
            <input 
              type="email" id="email" 
              value={formData.email} onChange={handleChange}
              placeholder="Ej: maria@correo.com"
              style={{ borderColor: errores.email ? '#D95386' : '#E6E6E6' }}
            />
            {errores.email && <span className="error">{errores.email}</span>}
          </div>

          {/* Campo: Teléfono con prefijo fijo */}
          <div className="campo">
            <label htmlFor="telefono">Teléfono de contacto:</label>
            <div className="telefono-container">
              <span className="prefijo">+56 9</span>
              <input 
                type="tel" id="telefono" 
                value={formData.telefono} onChange={handleChange}
                placeholder="1234 5678" 
                style={{ borderColor: errores.telefono ? '#D95386' : '#E6E6E6' }}
              />
            </div>
            {errores.telefono && <span className="error">{errores.telefono}</span>}
          </div>

          {/* Campo: Asunto (Select) */}
          <div className="campo">
            <label htmlFor="asunto">Motivo del mensaje:</label>
            <select 
              id="asunto" value={formData.asunto} onChange={handleChange}
              style={{ borderColor: errores.asunto ? '#D95386' : '#E6E6E6' }}
            >
              <option value="">Selecciona una opción...</option>
              <option value="pedido">Hacer un pedido</option>
              <option value="consulta">Consulta general</option>
              <option value="felicitacion">Felicitaciones</option>
              <option value="reclamo">Reclamo</option>
            </select>
            {errores.asunto && <span className="error">{errores.asunto}</span>}
          </div>

          {/* Campo: Mensaje (Textarea) */}
          <div className="campo">
            <label htmlFor="mensaje">Tu Mensaje:</label>
            <textarea
              id="mensaje" rows="6"
              value={formData.mensaje} onChange={handleChange}
              placeholder="Ej: Hola, me gustaría cotizar una torta..."
              style={{ borderColor: errores.mensaje ? '#D95386' : '#E6E6E6' }}
            ></textarea>
            {errores.mensaje && <span className="error">{errores.mensaje}</span>}
          </div>

          {/* Botón de envío */}
          <button type="submit" className="boton">
            Enviar mensaje 💌
          </button>

          {/* Mensaje de éxito condicional */}
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