import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "../src/pages/Login";
import * as AuthService from "../src/service/AuthService";
import { vi } from "vitest";

vi.mock("../src/service/AuthService", () => ({ loginUsuario: vi.fn() }));

describe("Login Coverage", () => {
  it("Muestra error ante credenciales vacías", async () => {
    render(<BrowserRouter><Login /></BrowserRouter>);
    fireEvent.click(screen.getByRole("button", { name: /Ingresar/i }));
    
    // findByText es asíncrono, ideal para esperar cambios de estado
    expect(await screen.findByText(/Por favor, completa todos los campos/i)).toBeInTheDocument();
  });
});