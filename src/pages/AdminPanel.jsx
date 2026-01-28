import React, { useEffect, useState } from "react";
import { obtenerProductos } from "../service/ProductosService";
import "./AdminPanel.css";
import Swal from "sweetalert2";

function AdminPanel() {
  const [productos, setProductos] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    imagenUrl: "",
    categoria: "",
    activo: true,
  });

  const username = sessionStorage.getItem("userName") || "Administradora";
  const urlApi = "https://backend-mydreams.onrender.com/api/productos";

  const cargarDatos = () => {
    obtenerProductos().then((data) => {
      const ordenados = (data || []).sort((a, b) => a.id - b.id);
      setProductos(ordenados);
    });
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    const valorFinal = id === "precio" ? parseFloat(value) || "" : value;
    setNuevoProducto({ ...nuevoProducto, [id]: valorFinal });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nuevoProducto.nombre || !nuevoProducto.precio || !nuevoProducto.categoria || !nuevoProducto.imagenUrl) {
      Swal.fire({
        title: "Campos incompletos",
        text: "Por favor, completa todos los datos del dulce antes de continuar. 🧁",
        icon: "warning",
        confirmButtonColor: "#d95386",
      });
      return;
    }

    const metodo = editandoId ? "PUT" : "POST";
    const urlFinal = editandoId ? `${urlApi}/${editandoId}` : urlApi;

    try {
      const resp = await fetch(urlFinal, {
        method: metodo,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
        body: JSON.stringify(nuevoProducto),
      });

      if (resp.ok) {
        Swal.fire({
          title: "¡Éxito!",
          text: editandoId
            ? "Producto actualizado correctamente"
            : "🍰 ¡Nueva Delicia agregada!",
          icon: "success",
          confirmButtonColor: "#d95386",
          timer: 2000,
        });
        resetearFormulario();
        cargarDatos();
      } else {
        Swal.fire("Error", "No se pudo guardar. Verifica tu sesión.", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Fallo de conexión con el servidor.", "error");
    }
  };

  const eliminarProducto = (id) => {
    Swal.fire({
      title: "¿Eliminar de vitrina?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d95386",
      cancelButtonColor: "#5d405d",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const resp = await fetch(`${urlApi}/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
          },
        });
        if (resp.ok) {
          Swal.fire("Eliminado", "El producto ha sido quitado.", "success");
          cargarDatos();
        }
      }
    });
  };

  const prepararEdicion = (prod) => {
    setEditandoId(prod.id);
    setNuevoProducto({ ...prod });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetearFormulario = () => {
    setEditandoId(null);
    setNuevoProducto({
      nombre: "",
      descripcion: "",
      precio: "",
      imagenUrl: "",
      categoria: "",
      activo: true,
    });
  };

  return (
    <div className="admin-layout-container">
      <div className="admin-panel-card">
        <h1 className="admin-titulo-principal">Gestión My Dreams</h1>
        <p className="admin-subtitulo-bienvenida">
          Bienvenida, <span className="admin-user-name">{username}</span> 
        </p>

        <div className="admin-seccion-gestion">
          <h2 className="admin-titulo-formulario">
            {editandoId ? "Modificar Dulce" : "Nuevo Ingreso"}
          </h2>
          
          {/* noValidate quita el globo naranja del navegador */}
          <form onSubmit={handleSubmit} className="admin-formulario" noValidate>
            <div className="admin-form-group">
              <label htmlFor="nombre">Nombre del Producto</label>
              <input
                type="text"
                id="nombre"
                value={nuevoProducto.nombre}
                onChange={handleChange}
              />
            </div>
            <div className="admin-form-group">
              <label htmlFor="precio">Precio</label>
              <input
                type="number"
                id="precio"
                value={nuevoProducto.precio}
                onChange={handleChange}
              />
            </div>
            <div className="admin-form-group admin-full-width">
              <label htmlFor="descripcion">Descripción</label>
              <textarea
                id="descripcion"
                value={nuevoProducto.descripcion}
                onChange={handleChange}
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="categoria">Sección en Web</label>
              <select
                id="categoria"
                value={nuevoProducto.categoria}
                onChange={handleChange}
              >
                <option value="">-- Seleccionar Sección --</option>
                <option value="Sabores Frutales">Sabores Frutales</option>
                <option value="Nuestras Tortas">Nuestras Tortas</option>
                <option value="Tentaciones Individuales">Tentaciones Individuales</option>
                <option value="Queques Artesanales">Queques Artesanales</option>
              </select>
            </div>

            <div className="admin-form-group">
              <label htmlFor="imagenUrl">Imagen del Archivo</label>
              <select
                id="imagenUrl"
                value={nuevoProducto.imagenUrl}
                onChange={handleChange}
              >
                <option value="">-- Seleccionar Imagen --</option>
                <option value="alfajor.jpg">alfajor.jpg</option>
                <option value="brownieChocolateNuez.jpg">brownieChocolateNuez.jpg</option>
                <option value="carlotaMango.jpg">carlotaMango.jpg</option>
                <option value="cupcakesVariedades.jpg">cupcakesVariedades.jpg</option>
                <option value="donasGlaseadas.jpg">donasGlaseadas.jpg</option>
                <option value="kutchenDeManzana.jpg">kutchenDeManzana.jpg</option>
                <option value="miniTartaletas.jpg">miniTartaletas.jpg</option>
                <option value="muffinsPlatanoArandano.jpg">muffinsPlatanoArandano.jpg</option>
                <option value="pieDeLimon.jpg">pieDeLimon.jpg</option>
                <option value="pieMaracuya.jpg">pieMaracuya.jpg</option>
                <option value="quequeArandano.jpg">quequeArandano.jpg</option>
                <option value="quequeChoc.jpg">quequeChoc.jpg</option>
                <option value="quequeMarmoladoVainilla.jpg">quequeMarmoladoVainilla.jpg</option>
                <option value="quequePlatano.jpg">quequePlatano.jpg</option>
                <option value="quequeVainilla.jpg">quequeVainilla.jpg</option>
                <option value="rollosDeCanela.jpg">rollosDeCanela.jpg</option>
                <option value="tartaletaFrutas.jpg">tartaletaFrutas.jpg</option>
                <option value="tartaYogurth.jpg">tartaYogurth.jpg</option>
                <option value="torta3Leches.jpg">torta3Leches.jpg</option>
                <option value="tortaCremaPina.jpg">tortaCremaPina.jpg</option>
                <option value="tortaManjarLucuma.jpg">tortaManjarLucuma.jpg</option>
                <option value="tortaManjarNuez.jpg">tortaManjarNuez.jpg</option>
                <option value="tortaMerengueFrambueza.jpg">tortaMerengueFrambueza.jpg</option>
                <option value="tortaMoka.jpg">tortaMoka.jpg</option>
                <option value="tortaSelvaNegra.jpg">tortaSelvaNegra.jpg</option>
              </select>
            </div>

            <div className="admin-botonera">
              <button type="submit" className="admin-btn-principal">
                {editandoId ? "Actualizar" : "Publicar"}
              </button>
              {editandoId && (
                <button
                  type="button"
                  onClick={resetearFormulario}
                  className="admin-btn-pill"
                  style={{ backgroundColor: "#666" }}
                >
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
              {productos.map((prod) => (
                <tr key={prod.id}>
                  <td>
                    <img
                      src={`/img/${prod.imagenUrl}`}
                      alt=""
                      className="admin-img-tabla"
                      onError={(e) => {
                        e.target.src = "/img/alfajor.jpg";
                      }}
                    />
                  </td>
                  <td><strong>{prod.nombre}</strong></td>
                  <td>{prod.categoria}</td>
                  <td>${Number(prod.precio).toLocaleString("es-CL")}</td>
                  <td>
                    <button
                      className="admin-btn-pill"
                      onClick={() => prepararEdicion(prod)}
                      aria-label="✏️"
                    >
                      ✏️
                    </button>
                    <button
                      className="admin-btn-pill"
                      style={{ backgroundColor: "#5d405d" }}
                      onClick={() => eliminarProducto(prod.id)}
                      aria-label="🗑️"
                    >
                      🗑️
                    </button>
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