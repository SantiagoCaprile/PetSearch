"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import User from "@/classes/User";
import { toast } from "react-hot-toast";
import Metadata from "@/components/Metadata/page";
import { defaultMetadata } from "@/utils/metadata";

const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    type: "user",
  });
  const [errorMessage, setErrorMessage] = useState("");

  function isCreatingUser() {
    return formData.type == "user";
  }

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validations
    if (formData.email.trim() === "") {
      setErrorMessage("Email es requerido");
      return;
    }

    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(formData.email)) {
      setErrorMessage("Email inválido");
      return;
    }

    if (formData.name.trim() === "") {
      setErrorMessage("Nombre completo requerido");
      return;
    }

    if (formData.password.trim() === "") {
      setErrorMessage("La contraseña es requerida");
      return;
    }

    if (formData.password.length < 8) {
      setErrorMessage("La contraseña debe tener al menos 8 caracteres");
      return;
    }

    setErrorMessage("");

    // Send data to backend
    const toastId = toast.loading("Creando cuenta...");
    User.createUser({
      email: formData.email,
      name: formData.name,
      password: formData.password,
      role: formData.type,
    }).then((success) => {
      if (success) {
        toast.success(<span id="success_toast">Cuenta creada exitosamente<br />Ya puede iniciar sesión</span>, { id: toastId, duration: 7000 });
        router.push("/login");
      } else {
        toast.error("Error al crear la cuenta", { id: toastId });
        setErrorMessage("Error al crear la cuenta");
      }
    })
      .catch((error) => {
        console.error("An error occurred:", error);
        toast.error("Error al crear la cuenta", { id: toastId });
        setErrorMessage("Error al crear la cuenta");
      }
      );

  };

  const metadata = {
    ...defaultMetadata,
    title: "Registro de usuario o rescatista" + defaultMetadata.separator + defaultMetadata.title,
    description: "Unite a la comunidad de PetSearch y ayuda a los animales perdidos y abandonados. Registrate ahora!",
  };

  return (
    <div className="flex flex-1 justify-center items-center">
      <Metadata {...metadata} />
      <form
        className="bg-white shadow-md rounded p-8 md:mb-4 md:max-w-[600px] md:w-2/3 w-full mx-2 md:mx-0"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4">
          Registro de{" "}
          <span className="underline">
            {isCreatingUser() ? "Usuario" : "Rescatista"}
          </span>
        </h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="type"
          >
            Tipo de cuenta
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="type"
            name="type"
            onChange={handleFieldChange}
            value={formData.type}
          >
            <option value="user">Usuario</option>
            <option value="rescuer">Rescatista</option>
          </select>
        </div>
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
            placeholder="eg. pet@gmail.com"
            onChange={handleFieldChange}
            value={formData.email}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            {isCreatingUser() ? "Nombre Completo" : "Nombre de la organización"}
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            name="name"
            placeholder={
              isCreatingUser() ? "eg. Juan Pérez" : "eg. Fundación Patitas"
            }
            onChange={handleFieldChange}
            value={formData.name}
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
            placeholder="********"
            onChange={handleFieldChange}
            value={formData.password}
          />
        </div>
        <div className="flex flex-col items-center justify-center">
          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
          <button
            className="bg-green-950 text-white border-2 border-green-500 px-16 py-2 rounded-full text-xl hover:bg-green-700 transition-all active:translate-y-1"
            type="submit"
          >
            Registrarse
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
