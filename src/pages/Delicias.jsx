import { useEffect, useState } from 'react';
import { obtenerProductos } from '../service/ProductosService'; 
import '../App.css'; 

function Delicias() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const secciones = [
    { 
      titulo: "Sabores Frutales", 
      cats: ["Kutchen", "Pies", "Tartas"] 
    },
    { 
      titulo: "Nuestras Tortas", 
      cats: ["Tortas"] 
    },
    { 
      titulo: "Tentaciones Individuales", 
      cats: ["Brownies", "Donas", "Muffins", "Cupcakes", "Rollos", "Tartaletas"] 
    },
    { 
      titulo: "Queques Artesanales", 
      cats: ["Queques"] 
    }
  ];

  useEffect(() => {
    const cargarTodo = async () => {
      try {
        const datos = await obtenerProductos();
        setProductos(datos || []);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      } finally {
        setCargando(false);
      }
    };
    cargarTodo();
  }, []);

  if (cargando) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
        <p>Cocinando tus delicias... 🧁</p>
      </div>
    );
  }

  return (
    <main className="main-content">
      <h1 className="titulo-principal">Nuestro Catálogo</h1>
      <p className="subtitulo-home">Sabores que iluminan tus sueños</p>

      {secciones.map(sec => {
        const itemsFiltrados = productos.filter(p => sec.cats.includes(p.categoria));

        if (itemsFiltrados.length === 0) return null;

        return (
          <section key={sec.titulo}>
            <h2 className="titulo-seccion">{sec.titulo}</h2>
            <div className="vitrina">
              {itemsFiltrados.map(prod => (
                <div className="producto" key={prod.id}>
                  <div className="img-wrapper">
                    <img 
                      src={`/img/${prod.imagenUrl}`} 
                      alt={prod.nombre} 
                      onError={(e) => {
                        e.target.onerror = null; 
                        e.target.src = "https://placehold.co/400x400/f8f9fa/cc0000?text=Imagen+No+Encontrada";
                      }}
                    />
                  </div>
                  <div className="info">
                    <h3>{prod.nombre}</h3>
                    <p>{prod.descripcion}</p>
                    <span className="precio-tag">
                      ${Number(prod.precio).toLocaleString('es-CL')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </main>
  );
}

export default Delicias;