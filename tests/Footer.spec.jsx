import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import React from "react";
import Footer from "../src/components/Footer";

describe("Pruebas del Componente Footer", () => {
  it("debe mostrar el copyright y los créditos", () => {
    render(<Footer />);
    
    // Usamos una expresión regular más flexible por si cambiaste el año
    expect(screen.getByText(/Pastelería My Dreams/i)).toBeInTheDocument();
    
    const firma = screen.getByText(/Catherine Godoy/i);
    expect(firma).toBeInTheDocument();
    expect(firma.tagName).toBe('STRONG');
  });
});