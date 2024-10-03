import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Register from "../src/pages/Register";
import { UserContext } from "../src/context/UserContext";
import userEvent from "@testing-library/user-event";

// Mock de context para simular el registro
const mockUserRegister = jest.fn();

const renderComponent = () =>
  render(
    <UserContext.Provider
      value={{
        register: mockUserRegister,
        isLoggedIn: true,
        logout: jest.fn(),
      }}
    >
      <Register />
    </UserContext.Provider>
  );

describe("Register Component", () => {
  beforeEach(() => {
    mockUserRegister.mockClear();
  });

  test("debería mostrar errores de validación en los campos requeridos", async () => {
    renderComponent();

    const submitButton = screen.getByRole("button", { name: /Registrarse/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/El email es requerido/i)).toBeInTheDocument();
      expect(screen.getByText(/El nombre es requerido/i)).toBeInTheDocument();
    });
  });

  test("debería permitir el envío del formulario cuando todos los campos son válidos", async () => {
    renderComponent();

    // Simula el llenado de campos válidos
    userEvent.type(screen.getByPlaceholderText(/Email/i), "test@example.com");
    userEvent.type(
      screen.getByPlaceholderText(/Nombre completo/i),
      "Juan Perez"
    );
    userEvent.type(screen.getByPlaceholderText(/Edad/i), "25");
    userEvent.type(screen.getByPlaceholderText(/Nombre de usuario/i), "jperez");
    userEvent.type(screen.getByPlaceholderText(/País/i), "Argentina");
    userEvent.type(screen.getByPlaceholderText(/Contraseña/i), "password123");

    const submitButton = screen.getByRole("button", { name: /Registrarse/i });
    fireEvent.click(submitButton);

    // Espera que la función userRegister sea llamada correctamente
    await waitFor(() =>
      expect(mockUserRegister).toHaveBeenCalledWith({
        email: "test@example.com",
        fullname: "Juan Perez",
        age: 25,
        username: "jperez",
        country: "Argentina",
        password: "password123",
      })
    );
  });

  test("debería mostrar el mensaje de error si ocurre un fallo en el registro", async () => {
    // Simula un fallo en el registro
    mockUserRegister.mockRejectedValueOnce(new Error("Error de registro"));

    renderComponent();

    userEvent.type(screen.getByPlaceholderText(/Email/i), "test@example.com");
    userEvent.type(
      screen.getByPlaceholderText(/Nombre completo/i),
      "Juan Perez"
    );
    userEvent.type(screen.getByPlaceholderText(/Edad/i), "25");
    userEvent.type(screen.getByPlaceholderText(/Nombre de usuario/i), "jperez");
    userEvent.type(screen.getByPlaceholderText(/País/i), "Argentina");
    userEvent.type(screen.getByPlaceholderText(/Contraseña/i), "password123");

    const submitButton = screen.getByRole("button", { name: /Registrarse/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Error de registro/i)).toBeInTheDocument();
    });
  });
});
