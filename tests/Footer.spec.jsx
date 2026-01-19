import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import React from "react";
import Footer from "../src/components/Footer";

describe("Pruebas del Componente Footer", () => {
  it("debe mostrar el texto de copyright con el año y nombre de la pastelería", () => {
    render(<Footer />);
    
    // Verificamos el texto principal del copyright
    expect(screen.getByText(/2026 Pastelería My Dreams/i)).toBeInTheDocument();
    expect(screen.getByText(/Todos los derechos reservados/i)).toBeInTheDocument();
  });

  it("debe mostrar los créditos de diseño con el nombre de la desarrolladora", () => {
    render(<Footer />);
    
    // Verificamos que tu nombre aparezca como la desarrolladora
    const firma = screen.getByText(/Catherine Godoy/i);
    expect(firma).toBeInTheDocument();
    
    // Verificamos que tu nombre esté resaltado (dentro de una etiqueta strong)
    expect(firma.tagName).toBe('STRONG');
  });
});