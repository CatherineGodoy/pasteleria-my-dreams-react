import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AdminPanel from "../src/pages/AdminPanel";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";

global.fetch = vi.fn();

describe("AdminPanel CRUD", () => {
  beforeEach(() => {
    sessionStorage.setItem("userToken", "fake-token");
    fetch.mockResolvedValue({
      ok: true,
      json: async () => [{ id: 1, nombre: "Torta Test", precio: 1000, categoria: "Tortas" }]
    });
  });

  it("Carga los productos correctamente en la tabla", async () => {
    render(<BrowserRouter><AdminPanel /></BrowserRouter>);
    expect(await screen.findByText(/Torta Test/i)).toBeInTheDocument();
  });

  it("El botón eliminar dispara la alerta de SweetAlert", async () => {
    render(<BrowserRouter><AdminPanel /></BrowserRouter>);
    const botonEliminar = await screen.findByText(/🗑️/i);
    fireEvent.click(botonEliminar);
  });
});