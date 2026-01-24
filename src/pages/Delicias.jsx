import { useEffect, useState } from 'react';
import { obtenerProductos } from '../service/ProductosService'; 
import '../App.css'; 

// IMPORTACIÓN DE IMÁGENES
import imgKutchen from '../assets/img/kutchenDeManzana.jpg';
import imgPie from '../assets/img/pieDeLimon.jpg';
import imgTortaPina from '../assets/img/tortaCremaPiña.jpg';
import imgBrownie from '../assets/img/brownieChocolateNuez.jpg';
import imgCupcakes from '../assets/img/cupcakesVariedades.jpg';
import imgDonas from '../assets/img/donasGlaseadas.jpg';
import imgMuffins from '../assets/img/muffinsPlatanoArandano.jpg';
import imgQuequeArandano from '../assets/img/quequeArandano.jpg';
import imgQuequeMarmol from '../assets/img/quequeMarmoladoVainilla.jpg';
import imgQuequeVainilla from '../assets/img/quequeVainilla.jpg';
import imgRollos from '../assets/img/rollosDeCanela.jpg';
import imgTartaleta from '../assets/img/tartaletaFrutas.jpg';
import imgTartaYogurt from '../assets/img/tartaYogurth.jpg';
import imgTortaLucuma from '../assets/img/tortaManjarLucuma.jpg';
import imgTortaNuez from '../assets/img/tortaManjarNuez.jpg';
import imgTortaFrambuesa from '../assets/img/tortaMerengueFrambueza.jpg';
import imgSelvaNegra from '../assets/img/tortaSelvaNegra.jpg';

function Delicias() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const diccionarioFotos = {
    "kutchenDeManzana.jpg": imgKutchen,
    "pieDeLimon.jpg": imgPie,
    "tortaCremaPina.jpg": imgTortaPina,
    "brownieChocolateNuez.jpg": imgBrownie,
    "cupcakesVariedades.jpg": imgCupcakes,
    "donasGlaseadas.jpg": imgDonas,
    "muffinsPlatanoArandano.jpg": imgMuffins,
    "quequeArandano.jpg": imgQuequeArandano,
    "quequeMarmoladoVainilla.jpg": imgQuequeMarmol,
    "quequeVainilla.jpg": imgQuequeVainilla,
    "rollosDeCanela.jpg": imgRollos,
    "tartaletaFrutas.jpg": imgTartaleta,
    "tartaYogurth.jpg": imgTartaYogurt,
    "tortaManjarLucuma.jpg": imgTortaLucuma,
    "tortaManjarNuez.jpg": imgTortaNuez,
    "tortaMerengueFrambueza.jpg": imgTortaFrambuesa,
    "tortaSelvaNegra.jpg": imgSelvaNegra
  };

  const secciones = [
    { titulo: "Sabores Frutales", cats: ["Kutchen", "Pies", "Tartaletas", "Tartas"] },
    { titulo: "Nuestras Tortas", cats: ["Tortas"] },
    { titulo: "Tentaciones Individuales", cats: ["Brownies", "Donas", "Muffins", "Cupcakes", "Rollos"] },
    { titulo: "Queques Artesanales", cats: ["Queques"] }
  ];

  useEffect(() => {
    const cargarTodo = async () => {
      try {
        const datos = await obtenerProductos();
        setProductos(datos || []);
      } catch (error) {
        console.error("Error:", error);
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
            <span className="seccion-subtitulo">Tradición en cada bocado</span>
            <div className="vitrina">
              {itemsFiltrados.map(prod => (
                <div className="producto" key={prod.id}>
                  <div className="img-wrapper">
                    <img src={diccionarioFotos[prod.imagenUrl] || imgKutchen} alt={prod.nombre} />
                  </div>
                  <div className="info">
                    <h3>{prod.nombre}</h3>
                    <p>{prod.descripcion}</p>
                    <span className="precio-tag">
                      ${prod.precio.toLocaleString('es-CL')}
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