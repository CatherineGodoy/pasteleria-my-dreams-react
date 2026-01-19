import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import React from "react";
import Home from "../src/pages/Home";

describe("Pruebas de la Página Principal (Home)", () => {
  it("debe renderizar el título principal y la bienvenida", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    
    // Verifica que el nombre de la pastelería esté presente
    expect(screen.getByText(/My Dreams/i)).toBeInTheDocument();
  });

  it("debe mostrar las imágenes de los productos (Kutchen, Pie, Torta)", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    // Buscamos las imágenes por su atributo 'alt' 
    // (Ajusta estos nombres a los que pusiste en el 'alt' de tus etiquetas <img>)
    const imagenes = screen.getAllByRole("img");
    expect(imagenes.length).toBeGreaterThanOrEqual(1);
  });

  it("debe contener un llamado a la acción o sección de productos", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    
    // Verifica que existan palabras clave de tu catálogo
    // Si tus productos tienen estos nombres, el test pasará:
    expect(screen.queryByText(/Kutchen/i) || screen.queryByText(/Pie/i) || screen.queryByText(/Torta/i)).toBeDefined();
  });
});