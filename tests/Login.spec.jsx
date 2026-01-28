/* eslint-disable no-undef */
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "../src/pages/Login";
import * as AuthService from "../src/service/AuthService";
import { vi, describe, it, expect, beforeEach } from "vitest";
import React from "react";
import '@testing-library/jest-dom';

vi.mock("../src/service/AuthService", () => ({ 
  loginUsuario: vi.fn() 
}));

describe("Pruebas de Seguridad - Login", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    sessionStorage.clear();
  });

  test("1. Muestra error ante credenciales vacías", async () => {
    render(<MemoryRouter><Login /></MemoryRouter>);
    
    // Como tus inputs tienen 'required', el navegador bloquea el submit.
    // Para testear tu lógica de setError, eliminamos 'required' temporalmente en el test.
    const userInput = screen.getByPlaceholderText("Ingresa tu usuario");
    const passInput = screen.getByPlaceholderText("Contraseña");
    
    userInput.removeAttribute('required');
    passInput.removeAttribute('required');

    const boton = screen.getByRole("button", { name: /Ingresar/i });
    fireEvent.click(boton);
    
    // Ahora sí, tu handleSubmit se ejecutará y mostrará el error
    const mensaje = await screen.findByText(/Por favor, completa todos los campos/i);
    expect(mensaje).toBeInTheDocument();
  });

  test("2. Muestra error cuando el servicio de login falla con 401", async () => {
    const mockError = { response: { status: 401 } };
    AuthService.loginUsuario.mockRejectedValueOnce(mockError);

    render(<MemoryRouter><Login /></MemoryRouter>);
    
    fireEvent.change(screen.getByPlaceholderText("Ingresa tu usuario"), { target: { value: "errorUser" } });
    fireEvent.change(screen.getByPlaceholderText("Contraseña"), { target: { value: "wrongPass" } });
    fireEvent.click(screen.getByRole("button", { name: /Ingresar/i }));

    expect(await screen.findByText(/Usuario o contraseña incorrectos/i)).toBeInTheDocument();
  });

  test("3. Redirige y guarda datos en sessionStorage tras login exitoso", async () => {
    AuthService.loginUsuario.mockResolvedValueOnce({ token: "fake-token-123" });

    render(<MemoryRouter><Login /></MemoryRouter>);
    
    fireEvent.change(screen.getByPlaceholderText("Ingresa tu usuario"), { target: { value: "admin" } });
    fireEvent.change(screen.getByPlaceholderText("Contraseña"), { target: { value: "123456" } });
    fireEvent.click(screen.getByRole("button", { name: /Ingresar/i }));

    await waitFor(() => {
      expect(AuthService.loginUsuario).toHaveBeenCalledWith("admin", "123456");
      expect(sessionStorage.getItem("userToken")).toBe("fake-token-123");
      expect(sessionStorage.getItem("userName")).toBe("admin");
    });
  });
});