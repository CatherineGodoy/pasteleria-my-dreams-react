/* eslint-disable no-undef */
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi, describe, it, expect, beforeEach } from "vitest";
import React from "react";

import AdminPanel from "../src/pages/AdminPanel.jsx";
import * as ProductosService from "../src/service/ProductosService";
import Swal from 'sweetalert2';
import '@testing-library/jest-dom';

// Mocks
vi.mock("../src/service/ProductosService", () => ({
  obtenerProductos: vi.fn(),
}));

vi.mock('sweetalert2', () => ({
  default: {
    fire: vi.fn(() => Promise.resolve({ isConfirmed: true }))
  }
}));

global.fetch = vi.fn();

describe("AdminPanel - Verificación Integral del CRUD", () => {
  
  beforeEach(() => {
    vi.clearAllMocks();
    sessionStorage.setItem("userToken", "token-test-123");
    sessionStorage.setItem("userName", "Admin");
    
    // Datos simulados iniciales
    ProductosService.obtenerProductos.mockResolvedValue([
      { id: 1, nombre: "Torta Chocolate", precio: 15000, categoria: "Nuestras Tortas", imagenUrl: "torta3Leches.jpg", descripcion: "Deliciosa" }
    ]);
  });

  it("1. READ: Debe listar productos correctamente", async () => {
    render(<MemoryRouter><AdminPanel /></MemoryRouter>);
    expect(await screen.findByText(/Torta Chocolate/i)).toBeInTheDocument();
  });

  it("2. CREATE: Debe enviar POST al publicar nuevo producto", async () => {
    fetch.mockResolvedValueOnce({ ok: true });
    render(<MemoryRouter><AdminPanel /></MemoryRouter>);

    // Llenamos TODOS los campos que tu validación manual requiere
    fireEvent.change(screen.getByLabelText(/Nombre del Producto/i), { target: { value: "Brazo de Reina" } });
    fireEvent.change(screen.getByLabelText(/Precio/i), { target: { value: "8000" } });
    fireEvent.change(screen.getByLabelText(/Descripción/i), { target: { value: "Manjar y bizcocho" } });
    fireEvent.change(screen.getByLabelText(/Sección en Web/i), { target: { value: "Sabores Frutales" } });
    fireEvent.change(screen.getByLabelText(/Imagen del Archivo/i), { target: { value: "alfajor.jpg" } });

    // Hacemos clic en Publicar
    const botonPublicar = screen.getByRole("button", { name: /Publicar/i });
    fireEvent.click(botonPublicar);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({ 
        method: "POST",
        body: expect.stringContaining("Brazo de Reina") 
      }));
    });
  });

  it("3. UPDATE: Debe cambiar a modo edición y enviar PUT", async () => {
    fetch.mockResolvedValueOnce({ ok: true });
    render(<MemoryRouter><AdminPanel /></MemoryRouter>);

    // Buscamos el botón de editar (el emoji con su aria-label)
    const botonEditar = await screen.findByLabelText("✏️");
    fireEvent.click(botonEditar);

    // Cambiamos el nombre
    fireEvent.change(screen.getByLabelText(/Nombre del Producto/i), { target: { value: "Torta Especial" } });
    
    const botonActualizar = screen.getByRole("button", { name: /Actualizar/i });
    fireEvent.click(botonActualizar);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(expect.stringContaining("/1"), expect.objectContaining({ method: "PUT" }));
    });
  });

  it("4. DELETE: Debe pedir confirmación y enviar DELETE", async () => {
    fetch.mockResolvedValueOnce({ ok: true });
    render(<MemoryRouter><AdminPanel /></MemoryRouter>);

    const botonEliminar = await screen.findByLabelText("🗑️");
    fireEvent.click(botonEliminar);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(expect.stringContaining("/1"), expect.objectContaining({ method: "DELETE" }));
    });
  });

  it("5. ERROR: Debe manejar fallos de red con SweetAlert", async () => {
    // Simulamos fallo de red (ok: false)
    fetch.mockResolvedValueOnce({ ok: false }); 
    render(<MemoryRouter><AdminPanel /></MemoryRouter>);

    // Llenamos campos para pasar la validación inicial de "Campos incompletos"
    fireEvent.change(screen.getByLabelText(/Nombre del Producto/i), { target: { value: "Test Error" } });
    fireEvent.change(screen.getByLabelText(/Precio/i), { target: { value: "5000" } });
    fireEvent.change(screen.getByLabelText(/Descripción/i), { target: { value: "Test" } });
    fireEvent.change(screen.getByLabelText(/Sección en Web/i), { target: { value: "Nuestras Tortas" } });
    fireEvent.change(screen.getByLabelText(/Imagen del Archivo/i), { target: { value: "alfajor.jpg" } });
    
    fireEvent.click(screen.getByRole("button", { name: /Publicar/i }));

    await waitFor(() => {
      // Verificamos que se llamó a Swal por el error de la respuesta (!resp.ok)
      expect(Swal.fire).toHaveBeenCalledWith(expect.stringMatching(/Error/i), expect.any(String), "error");
    });
  });
});