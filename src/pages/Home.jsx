import React from 'react';
import { Link } from 'react-router-dom';

// IMPORTACIÓN CON NOMBRES EXACTOS
import imgKutchen from '../assets/img/kutchenDeManzana.jpg'; 
import imgPie from '../assets/img/pieDeLimon.jpg';
import imgTorta from '../assets/img/tortaCremaPiña.jpg';

function Home() {
  const productosDestacados = [
    { 
      id: 1, 
      nombre: 'Kutchen de Manzana', 
      descripcion: 'Delicioso kutchen casero con manzanas frescas y un toque de canela.', 
      imagen: imgKutchen,
      precio: '$5.500' // Agregamos el precio al objeto
    },
    { 
      id: 2, 
      nombre: 'Pie de Limón', 
      descripcion: 'Nuestra receta clásica con merengue suizo dorado a la perfección.', 
      imagen: imgPie,
      precio: '$6.500' // Agregamos el precio al objeto
    },
    { 
      id: 3, 
      nombre: 'Torta Crema Piña', 
      descripcion: 'Bizcocho esponjoso relleno de crema chantilly y trozos de piña natural.', 
      imagen: imgTorta,
      precio: '$7.000' // Agregamos el precio al objeto
    }
  ];

  return (
    <main className="main-content">
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
                <img src={prod.imagen} alt={prod.nombre} />
              </div>
              <div className="info">
                <h3>{prod.nombre}</h3>
                <p>{prod.descripcion}</p>
                {/* PRECIO AGREGADO AQUÍ ABAJO */}
                <span className="precio-tag">{prod.precio}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <Link to="/delicias" className="boton">
            Ver Catálogo Completo
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Home;