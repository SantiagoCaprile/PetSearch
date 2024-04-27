"use client";
import React from "react";
import { useForm } from "react-hook-form";

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div className="flex flex-1 justify-center items-center">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-[600px] md:w-2/3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-2xl font-bold mb-4">Datos Personales</h1>
        <fieldset className="mb-4">
          <label htmlFor="nombre" className={styles.label}>
            Nombre y apellido
          </label>
          <input
            className={styles.inputs}
            type="text"
            id="nombre"
            placeholder="Nombre y apellido"
            {...register("Nombre", {
              required: {
                value: true,
                message: "Nombre y apellido es requerido",
              },
            })}
          />
          {errors.Nombre && (
            <p className={styles.errors}>{errors.Nombre.message}</p>
          )}
        </fieldset>
        <fieldset className="mb-4">
          <label htmlFor="cel" className={styles.label}>
            Celular
          </label>
          <input
            className={styles.inputs}
            type="tel"
            id="cel"
            placeholder="Celular"
            {...register("Celular", {
              required: { value: true, message: "Celular es requerido" },
            })}
          />
          {errors.Celular && (
            <p className={styles.errors}>{errors.Celular.message}</p>
          )}
        </fieldset>
        <fieldset className="mb-4">
          <label htmlFor="edad" className={styles.label}>
            Edad
          </label>
          <input
            className={styles.inputs}
            type="number"
            id="edad"
            placeholder="Edad"
            {...register("Edad", {
              required: { value: true, message: "La edad es requerida" },
              max: 100,
              min: { value: 1, message: "Ingrese una edad válida" },
            })}
          />
          {errors.Edad && (
            <p className={styles.errors}>{errors.Edad.message}</p>
          )}
        </fieldset>
        <fieldset className="mb-4">
          <label htmlFor="direccion" className={styles.label}>
            Dirección completa
          </label>
          <input
            className={styles.inputs}
            type="text"
            id="direccion"
            placeholder="(si no posee describa donde se ubica)"
            {...register("Direccion", {
              required: { value: true, message: "La dirección es requerida" },
            })}
          />
          {errors.Direccion && (
            <p className={styles.errors}>{errors.Direccion.message}</p>
          )}
        </fieldset>
        <fieldset className="mb-4">
          <label htmlFor="localidad" className={styles.label}>
            Localidad
          </label>
          <input
            className={styles.inputs}
            type="text"
            id="localidad"
            placeholder="Localidad"
            {...register("Localidad", {
              required: { value: true, message: "La localidad es requerida" },
            })}
          />
          {errors.Localidad && (
            <p className={styles.errors}>{errors.Localidad.message}</p>
          )}
        </fieldset>
        <div className="flex justify-center items-center">
          <button type="submit" className={styles.button}>
            Guardar mis datos
          </button>
        </div>
      </form>
    </div>
  );
}

const styles = {
  label: "block text-gray-700 text-sm font-bold mb-2",
  inputs:
    "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
  errors: "text-red-500 mb-4",
  button:
    "bg-green-950 text-white border-2 border-green-500 px-16 py-2 rounded-full text-xl hover:bg-green-700 transition-all active:translate-y-1",
};
