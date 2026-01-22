import React from 'react';
import Producto from '../components/Producto'; // Importamos el molde
import { inventario } from '../data/productos'; // Importamos la bodega de datos

function Delicias() {
  return (
    <main>
      <h1>Nuestro Catálogo</h1>
      <p className="subtitulo">
        Descubre la dulzura hecha en casa y transforma tu día en un momento inolvidable.
      </p>

      {/* SECCIÓN 1: TORTAS */}
      <h2 className="categoria-titulo">Tortas</h2>
      <div className="vitrina">
        {inventario.tortas.map((item) => (
          <Producto 
            key={item.id}
            imagen={item.img}
            nombre={item.nombre}
            descripcion={item.desc}
          />
        ))}
      </div>

      {/* SECCIÓN 2: QUEQUES FAMILIARES */}
      <h2 className="categoria-titulo">Queques Familiares</h2>
      <div className="vitrina">
        {inventario.queques.map((item) => (
          <Producto 
            key={item.id}
            imagen={item.img}
            nombre={item.nombre}
            descripcion={item.desc}
          />
        ))}
      </div>

      {/* SECCIÓN 3: TARTAS, PIES Y KUCHEN */}
      <h2 className="categoria-titulo">Tartas, Pies y Kuchen</h2>
      <div className="vitrina">
        {inventario.tartas.map((item) => (
          <Producto 
            key={item.id}
            imagen={item.img}
            nombre={item.nombre}
            descripcion={item.desc}
          />
        ))}
      </div>

      {/* SECCIÓN 4: DELICIAS PERSONALES */}
      <h2 className="categoria-titulo">Delicias Personales</h2>
      <div className="vitrina">
        {inventario.personales.map((item) => (
          <Producto 
            key={item.id}
            imagen={item.img}
            nombre={item.nombre}
            descripcion={item.desc}
          />
        ))}
      </div>
    </main>
  );
}

export default Delicias;