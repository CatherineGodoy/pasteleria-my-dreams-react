import { useEffect, useState } from 'react';
import { obtenerProductos } from '../service/ProductosService'; 
import '../App.css'; 

function Delicias() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const secciones = [
    { titulo: "Sabores Frutales", cats: ["Sabores Frutales", "Pies", "Kutchen", "Tartas"] },
    { titulo: "Nuestras Tortas", cats: ["Nuestras Tortas", "Tortas"] },
    { titulo: "Tentaciones Individuales", cats: ["Tentaciones Individuales", "Brownies", "Donas", "Muffins", "Cupcakes", "Rollos", "Tartaletas", "Alfajores"] },
    { titulo: "Queques Artesanales", cats: ["Queques Artesanales", "Queques"] }
  ];

  useEffect(() => {
    const cargarTodo = async () => {
      try {
        const datos = await obtenerProductos();
        setProductos(datos || []);
      } catch (error) {
        console.error("Error al cargar:", error);
      } finally {
        setCargando(false);
      }
    };
    cargarTodo();
  }, []);

  if (cargando) return <div className="loader">Cargando delicias...</div>;

  return (
    <main className="main-content">
      <h1 className="titulo-principal">Nuestro Catálogo</h1>

      {secciones.map(sec => {
        const itemsFiltrados = productos.filter(p => sec.cats.includes(p.categoria));
        if (itemsFiltrados.length === 0) return null;

        return (
          <section key={sec.titulo} className="seccion-catalogo">
            <h2 className="titulo-seccion">{sec.titulo}</h2>
            <div className="vitrina">
              {itemsFiltrados.map(prod => (
                <div className="producto" key={prod.id}>
                  
                  {/* AQUÍ ESTÁ EL CAMBIO: Ahora es igual al Home */}
                  <div className="img-wrapper">
                    <img src={`/img/${prod.imagenUrl}`} alt={prod.nombre} />
                  </div>

                  <div className="info">
                    <h3>{prod.nombre}</h3>
                    {/* Le ponemos la clase al párrafo para que se vea bien el texto */}
                    <p className="producto-descripcion">{prod.descripcion}</p>
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