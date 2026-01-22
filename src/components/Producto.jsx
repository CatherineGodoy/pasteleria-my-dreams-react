import React from "react";

// Recibe la info de cada delicia
const Producto = ({ imagen, nombre, descripcion }) => {
  return (
    <div className="producto">
      <img src={imagen} alt={nombre} />
      <h3>{nombre}</h3>
      <p>{descripcion}</p>
    </div>
  );
};

export default Producto;
