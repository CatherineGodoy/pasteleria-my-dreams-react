import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import React from "react";
import Header from "../src/components/Header";

describe("Pruebas de Navegación del Header", () => {
  it("debe contener todos los enlaces con sus rutas correctas", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    
    // 1. Buscamos los enlaces por su texto
    const linkInicio = screen.getByRole("link", { name: /Inicio/i });
    const linkDelicias = screen.getByRole("link", { name: /Delicias/i });
    const linkContacto = screen.getByRole("link", { name: /Contacto/i });
    const linkLogin = screen.getByRole("link", { name: /Login/i });

    // 2. Verificamos que apunten a las direcciones correctas (to="...")
    expect(linkInicio).toHaveAttribute("href", "/");
    expect(linkDelicias).toHaveAttribute("href", "/delicias");
    expect(linkContacto).toHaveAttribute("href", "/contacto");
    expect(linkLogin).toHaveAttribute("href", "/login");
  });

  it("debe tener la estructura de lista para el menú", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    // Verifica que el menú esté dentro de una lista (ul)
    const lista = screen.getByRole("list");
    expect(lista).toBeInTheDocument();
  });
});