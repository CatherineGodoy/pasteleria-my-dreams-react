/* eslint-disable no-undef */
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Contacto from "../src/pages/Contacto"; 

describe("Pruebas de Formulario - Cobertura Total", () => {
  
  test("1. Debe validar campos vacíos (Línea 20)", () => {
    render(<Contacto />);
    const boton = screen.getByRole("button");
    fireEvent.click(boton);
    
    // Verificamos que el input de nombre tenga el borde rojo de error
    const nombreInput = screen.getByPlaceholderText(/María Pérez/i);
    expect(nombreInput).toHaveStyle({ borderColor: 'rgb(217, 83, 134)' });
  });

  test("2. Debe validar formato de teléfono (Líneas 36-37)", () => {
    render(<Contacto />);
    const telInput = screen.getByPlaceholderText(/1234 5678/i);
    // Ponemos un teléfono inválido
    fireEvent.change(telInput, { target: { value: "123" } });
    fireEvent.click(screen.getByRole("button"));
    
    expect(telInput).toHaveStyle({ borderColor: 'rgb(217, 83, 134)' });
  });

  test("3. Debe validar longitud del mensaje (Líneas 44-45)", () => {
    render(<Contacto />);
    const textarea = screen.getByPlaceholderText(/me gustaría cotizar/i);
    // Mensaje muy corto
    fireEvent.change(textarea, { target: { value: "Corto" } });
    fireEvent.click(screen.getByRole("button"));
    
    expect(textarea).toHaveStyle({ borderColor: 'rgb(217, 83, 134)' });
  });

  test("4. Envío exitoso completo (Líneas 53-73)", async () => {
    render(<Contacto />);
    
    // Llenamos todo correctamente para entrar en la rama de éxito
    fireEvent.change(screen.getByPlaceholderText(/María Pérez/i), { target: { value: "Usuario Test" } });
    fireEvent.change(screen.getByPlaceholderText(/maria@correo.com/i), { target: { value: "test@test.com" } });
    fireEvent.change(screen.getByPlaceholderText(/1234 5678/i), { target: { value: "12345678" } });
    
    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "pedido" } });

    const textarea = screen.getByPlaceholderText(/me gustaría cotizar/i);
    fireEvent.change(textarea, { target: { value: "Este mensaje es suficientemente largo para que el formulario se envíe con éxito." } });

    fireEvent.click(screen.getByRole("button"));

    // Esperamos el mensaje de éxito que resetea el formulario
    await waitFor(() => {
      expect(screen.getByText(/Hemos recibido tu mensaje/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });
});