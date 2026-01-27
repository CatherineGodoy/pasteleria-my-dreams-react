import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';    
import '../App.css';   

function Home() {
  const productosDestacados = [
    { 
      id: 1, 
      nombre: 'Kutchen de Manzana', 
      descripcion: 'Delicioso kutchen casero con manzanas frescas y un toque de canela.', 
      imagen: 'kutchenDeManzana.jpg', 
      precio: '$5.500' 
    },
    { 
      id: 2, 
      nombre: 'Pie de Limón', 
      descripcion: 'Nuestra receta clásica con merengue suizo dorado a la perfección.', 
      imagen: 'pieDeLimon.jpg', 
      precio: '$6.500' 
    },
    { 
      id: 3, 
      nombre: 'Torta Crema Piña', 
      descripcion: 'Bizcocho esponjoso relleno de crema chantilly y trozos de piña natural.', 
      imagen: 'tortaCremaPina.jpg', 
      precio: '$7.000' 
    }
  ];

  return (
    <main className="main-content">
      {/* Hero: Clase específica para el banner de bienvenida */}
      <section className="hero">
        <h1 className="titulo-principal">Bienvenido a Pastelería My Dreams</h1>
        <p className="subtitulo-home">
          Somos un emprendimiento familiar que te entrega sabores que iluminan tus sueños.
        </p>
      </section>

      <section className="productos-favoritos">
        <h2 className="titulo-seccion">Favoritos de la Casa</h2>
        <p className="seccion-subtitulo">
          Descubre nuestras recetas más populares y sabrosas
        </p>

        <div className="vitrina">
          {productosDestacados.map((prod) => (
            <div className="producto" key={prod.id}>
              <div className="img-wrapper">
                {/* Cargamos desde la carpeta public/img/ */}
                <img 
                  src={`/img/${prod.imagen}`} 
                  alt={prod.nombre} 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/img/alfajor.jpg";
                  }}
                />
              </div>
              <div className="info">
                <h3>{prod.nombre}</h3>
                <p>{prod.descripcion}</p>
                <span className="precio-tag">{prod.precio}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Botón de navegación al catálogo */}
        <div className="btn-container-home">
          <Link to="/delicias" className="boton-principal">
            Ver Catálogo Completo
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Home;