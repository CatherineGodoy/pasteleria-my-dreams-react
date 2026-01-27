import React, { useEffect, useState } from 'react';
import { obtenerProductos } from '../service/ProductosService'; 
import './AdminPanel.css';
import Swal from 'sweetalert2';

function AdminPanel() {
  const [productos, setProductos] = useState([]);
  const [editandoId, setEditandoId] = useState(null); 
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "", descripcion: "", precio: "", imagenUrl: "", categoria: "", activo: true 
  });
  
  const username = sessionStorage.getItem("userName") || "Administradora";
  const urlApi = "https://backend-mydreams.onrender.com/api/productos";

  const cargarDatos = () => {
    obtenerProductos().then(data => {
      const ordenados = (data || []).sort((a, b) => a.id - b.id);
      setProductos(ordenados);
    });
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    const valorFinal = id === 'precio' ? parseFloat(value) || "" : value;
    setNuevoProducto({ ...nuevoProducto, [id]: valorFinal });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const metodo = editandoId ? 'PUT' : 'POST';
    const urlFinal = editandoId ? `${urlApi}/${editandoId}` : urlApi;

    try {
      const resp = await fetch(urlFinal, {
        method: metodo,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem("userToken")}` 
        },
        body: JSON.stringify(nuevoProducto)
      });

      if (resp.ok) {
        Swal.fire({
          title: '¡Éxito!',
          text: editandoId ? "Producto actualizado correctamente" : "🍰 ¡Nueva Delicia agregada!",
          icon: 'success',
          confirmButtonColor: '#d95386',
          timer: 2000
        });
        resetearFormulario();
        cargarDatos();
      } else {
        Swal.fire('Error', 'No se pudo guardar. Verifica tu sesión.', 'error');
      }
    } catch (error) {
      Swal.fire('Error', 'Fallo de conexión con el servidor.', 'error');
    }
  };

  const eliminarProducto = (id) => {
    Swal.fire({
      title: '¿Eliminar de vitrina?',
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d95386',
      cancelButtonColor: '#5d405d',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const resp = await fetch(`${urlApi}/${id}`, { 
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${sessionStorage.getItem("userToken")}` }
        });
        if (resp.ok) {
          Swal.fire('Eliminado', 'El producto ha sido quitado.', 'success');
          cargarDatos();
        }
      }
    });
  };

  const prepararEdicion = (prod) => {
    setEditandoId(prod.id);
    setNuevoProducto({ ...prod });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetearFormulario = () => {
    setEditandoId(null);
    setNuevoProducto({ nombre: "", descripcion: "", precio: "", imagenUrl: "", categoria: "", activo: true });
  };

  return (
    <div className="admin-layout-container">
      <div className="admin-panel-card">
        <h1 className="admin-titulo-principal">Gestión My Dreams</h1>
        <p className="admin-subtitulo-bienvenida">Bienvenida, <span className="admin-user-name">{username}</span> 🌸</p>
        
        <div className="admin-seccion-gestion">
          <h2 className="admin-titulo-formulario">{editandoId ? "Modificar Dulce" : "Nuevo Ingreso"}</h2>
          <form onSubmit={handleSubmit} className="admin-formulario">
            <div className="admin-form-group">
              <label>Nombre del Producto</label>
              <input type="text" id="nombre" value={nuevoProducto.nombre} onChange={handleChange} required />
            </div>
            <div className="admin-form-group">
              <label>Precio</label>
              <input type="number" id="precio" value={nuevoProducto.precio} onChange={handleChange} required />
            </div>
            <div className="admin-form-group admin-full-width">
              <label>Descripción</label>
              <textarea id="descripcion" value={nuevoProducto.descripcion} onChange={handleChange} required />
            </div>
            
            <div className="admin-form-group">
              <label>Sección en Web</label>
              <select id="categoria" value={nuevoProducto.categoria} onChange={handleChange} required>
                <option value="">-- Seleccionar --</option>
                <option value="Tortas">Nuestras Tortas</option>
                <option value="Queques">Queques Artesanales</option>
                <option value="Pies">Sabores Frutales</option>
                <option value="Tartaletas">Individuales (Tartaletas)</option>
                <option value="Alfajores">Individuales (Alfajores)</option>
                <option value="Brownies">Individuales (Brownies)</option>
                <option value="Donas">Individuales (Donas)</option>
                <option value="Muffins">Individuales (Muffins)</option>
                <option value="Rollos">Individuales (Rollos)</option>
                <option value="Cupcakes">Individuales (Cupcakes)</option>
                <option value="Kutchen">Kutchen</option>
              </select>
            </div>

            <div className="admin-form-group">
              <label>Imagen del Archivo</label>
              <select 
                id="imagenUrl" 
                value={nuevoProducto.imagenUrl} 
                onChange={handleChange} 
                required={!editandoId} 
              >
                <option value="">-- Seleccionar Imagen --</option>
                <option value="alfajor.jpg">Alfajor de Coco</option>
                <option value="brownieChocolateNuez.jpg">Brownie Chocolate Nuez</option>
                <option value="carlotaMango.jpg">Carlota de Mango</option>
                <option value="cupcakesVariedades.jpg">Cupcakes Variedades</option>
                <option value="donasGlaseadas.jpg">Donas Glaseadas</option>
                <option value="kutchenDeManzana.jpg">Kutchen de Manzana</option>
                <option value="miniTartaletas.jpg">Mini Tartaletas</option>
                <option value="muffinsPlatanoArandano.jpg">Muffins Plátano Arándano</option>
                <option value="pieDeLimon.jpg">Pie de Limón</option>
                <option value="pieMaracuya.jpg">Pie de Maracuyá</option>
                <option value="quequeArandano.jpg">Queque Arándano</option>
                <option value="quequeChoc.jpg">Queque de Chocolate</option>
                <option value="quequeMarmoladoVainilla.jpg">Queque Mármolado</option>
                <option value="quequePlatano.jpg">Queque de Plátano</option>
                <option value="quequeVainilla.jpg">Queque Vainilla</option>
                <option value="rollosDeCanela.jpg">Rollos de Canela</option>
                <option value="tartaletaFrutas.jpg">Tartaleta Frutas</option>
                <option value="tartaYogurth.jpg">Tarta Yogurt</option>
                <option value="torta3Leches.jpg">Torta Tres Leches</option>
                <option value="tortaCremaPina.jpg">Torta Crema Piña</option>
                <option value="tortaManjarLucuma.jpg">Torta Manjar Lucuma</option>
                <option value="tortaManjarNuez.jpg">Torta Manjar Nuez</option>
                <option value="tortaMerengueFrambueza.jpg">Torta Merengue Frambuesa</option>
                <option value="tortaMoka.jpg">Torta Moka</option>
                <option value="tortaSelvaNegra.jpg">Torta Selva Negra</option>
              </select>
              {editandoId && <span className="admin-hint">Imagen actual: {nuevoProducto.imagenUrl}</span>}
            </div>

            <div className="admin-botonera">
              <button type="submit" className="admin-btn-principal">
                {editandoId ? "🚀 Actualizar" : "✨ Publicar"}
              </button>
              {editandoId && (
                <button type="button" onClick={resetearFormulario} className="admin-btn-pill" style={{backgroundColor: '#666'}}>
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="admin-tabla-container">
          <table className="admin-tabla">
            <thead>
              <tr>
                <th>Miniatura</th>
                <th>Nombre</th>
                <th>Sección</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map(prod => (
                <tr key={prod.id}>
                  <td>
                    <img 
                      src={`/img/${prod.imagenUrl}`} 
                      alt="" 
                      className="admin-img-tabla" 
                      onError={(e) => { e.target.src = "/img/alfajor.jpg"; }}
                    />
                  </td>
                  <td><strong>{prod.nombre}</strong></td>
                  <td>{prod.categoria}</td>
                  <td>${Number(prod.precio).toLocaleString('es-CL')}</td>
                  <td>
                    <button className="admin-btn-pill" onClick={() => prepararEdicion(prod)}>✏️</button>
                    <button className="admin-btn-pill" style={{backgroundColor:'#5d405d'}} onClick={() => eliminarProducto(prod.id)}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;