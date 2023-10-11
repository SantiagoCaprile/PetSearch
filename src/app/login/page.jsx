"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "../../components/Loader";

import { useDispatch } from "react-redux";
import {
  setUser,
  setUserLoading,
  setUserError,
} from "../../app/store/reducers/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    if (isLoading) return null;
    setIsLoading(true);
    dispatch(setUserLoading());
    try {
      const response = await fetch("http://localhost:4000/users/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      }).catch((err) => {
        setErrorMessage("Error en la verificación");
        dispatch(setUserError());
        console.log(err);
      });

      if (response.ok) {
        console.log("Verificación exitosa");
        response.json().then((data) => {
          dispatch(setUser(data.user));
        });
        router.push(router.back() || "/");
      } else {
        setErrorMessage("Credenciales inválidas");
      }
    } catch (error) {
      console.error("Error en la verificación:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-1 justify-center items-center">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-[600px] w-2/3"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4">Inicio de Sesión</h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleFieldChange}
            value={formData.email}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Contraseña
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            name="password"
            placeholder="Contraseña"
            onChange={handleFieldChange}
            value={formData.password}
          />
        </div>
        <div className="flex flex-col items-center justify-center">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {errorMessage && (
                <p className="text-red-500 mb-4">{errorMessage}</p>
              )}
              <button
                className="bg-green-950 text-white border-2 border-green-500 px-16 py-2 rounded-full text-xl hover:bg-green-700 transition-all active:translate-y-1"
                type="submit"
              >
                Iniciar Sesión
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
