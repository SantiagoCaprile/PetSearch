"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";

export default function AdoptionFormComponent({ petId }) {
  const { data: session } = useSession();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const watchRazon = watch("Razon", "");
  const watchInfoMascotas = watch("InfoMascotas", "");
  const onSubmit = (data) => {
    data = { ...data, petId, userId: session.user._id };
    console.log(data);
  }

  return (
    <div className="flex flex-1 justify-center items-center">
      <form
        className="bg-white shadow-md rounded px-8 py-6 md:my-4 max-w-[600px] md:w-2/3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-2xl font-bold mb-4 border-b-2 border-slate-500">
          Solicitud de adopción
        </h1>
        <fieldset className="mb-4">
          <label className={styles.label}>
            ¿Serás el responsable la adopción?
          </label>
          <div className="flex gap-1 items-center">
            <label>Si </label>
            <input
              {...register("responsable", {
                required: { value: true, message: "Campo requerido" },
              })}
              type="radio"
              value={true}
              className={styles.radio}
            />
            <label>No </label>
            <input
              {...register("responsable")}
              type="radio"
              value={false}
              className={styles.radio}
            />
          </div>
          {errors.responsable && (
            <p className={styles.errors}>{errors.responsable.message}</p>
          )}
        </fieldset>
        <fieldset className="mb-4">
          <label className={styles.label}>
            ¿Tienes ingresos para los gastos de la mascota?
          </label>
          <div className="flex gap-1 items-center">
            <label>Si </label>
            <input
              {...register("incomeMoney", {
                required: { value: true, message: "Campo requerido" },
              })}
              type="radio"
              value={true}
              className={styles.radio}
            />
            <label>No </label>
            <input
              {...register("incomeMoney")}
              type="radio"
              value={false}
              className={styles.radio}
            />
          </div>
          {errors.incomeMoney && (
            <p className={styles.errors}>{errors.incomeMoney.message}</p>
          )}
        </fieldset>
        <fieldset className="mb-4">
          <label className={styles.label}>
            Seleccione el tipo de vivienda donde vivirá la mascota
          </label>
          <select {...register("homeType")} className={styles.select}>
            <option value="Casa con patio">Casa con patio</option>
            <option value=" Casa sin patio"> Casa sin patio</option>
            <option value=" Dpto"> Dpto</option>
            <option value=" Campo"> Campo</option>
          </select>
        </fieldset>
        <fieldset className="mb-4">
          <label className={styles.label}>
            ¿Tiene permiso del propietario para tener mascotas?
          </label>
          <div className="flex gap-1 items-center">
            <label>Si </label>
            <input
              {...register("allowed", {
                required: { value: true, message: "Campo requerido" },
              })}
              type="radio"
              value={true}
              className={styles.radio}
            />
            <label>No </label>
            <input
              {...register("allowed")}
              type="radio"
              value={false}
              className={styles.radio}
            />
          </div>
          {errors.allowed && (
            <p className={styles.errors}>{errors.allowed.message}</p>
          )}
        </fieldset>
        <fieldset className="mb-4">
          <label className={styles.label}>
            ¿Alguien tiene alergia a los animales o alguna afección relacionada?
          </label>
          <div className="flex gap-1 items-center">
            <label>Si </label>
            <input
              {...register("alergies", {
                required: { value: true, message: "Campo requerido" },
              })}
              type="radio"
              value={true}
              className={styles.radio}
            />
            <label>No </label>
            <input
              {...register("alergies")}
              type="radio"
              value={false}
              className={styles.radio}
            />
          </div>
          {errors.alergies && (
            <p className={styles.errors}>{errors.alergies.message}</p>
          )}
        </fieldset>
        <fieldset className="mb-4">
          <label className={styles.label}>
            ¿Tienes o tuviste otras mascotas?
          </label>
          <select {...register("hadPets")} className={styles.select}>
            <option value="Si, tengo">Si, tengo</option>
            <option value=" Si, tuve"> Si, tuve</option>
            <option value=" Nunca tuve"> Nunca tuve</option>
          </select>
        </fieldset>
        <fieldset className="mb-4">
          <label className={styles.label}>
            Si posee otras mascotas, ¿están esterilizadas?
          </label>
          <div className="flex gap-1 items-center">
            <label>Si </label>
            <input
              {...register("areSterilized")}
              type="radio"
              value={true}
              className={styles.radio}
            />
            <label>No </label>
            <input
              {...register("areSterilized")}
              type="radio"
              value={false}
              className={styles.radio}
            />
          </div>
        </fieldset>
        <fieldset className="mb-4">
          <label className={styles.label}>
            Contanos un poquito mas de tus mascotas o las que has tenido
          </label>
          <textarea
            className={styles.inputs + " h-24 resize-none"}
            {...register("tellMoreAboutPets", {
              maxLength: {
                value: 700,
                message: "Limite de caracteres excedido",
              },
            })}
          />
          <span className="text-gray-500 text-xs">
            Caracteres restantes:
            {700 - watchInfoMascotas.length > 0
              ? 700 - watchInfoMascotas.length
              : 0}
          </span>

          {errors.InfoMascotas && (
            <p className={styles.errors}>{errors.InfoMascotas.message}</p>
          )}
        </fieldset>
        <fieldset className="mb-4">
          <label className={styles.label}>
            En caso de no poder seguir teniendo a la mascota, ¿qué harías con
            ella?
          </label>
          <select className={styles.select} {...register("inWorstCase")}>
            <option value="Me contacto con la rescatista">
              Me contacto con la rescatista
            </option>
            <option value="La regalo">La regalo</option>
            <option value="Busco un familiar/amigo responsable">
              Busco un familiar/amigo responsable
            </option>
          </select>
        </fieldset>
        <fieldset className="mb-4">
          <label className={styles.label}>
            Contanos un poco de vos. ¿Por qué queres adoptar?
          </label>
          <textarea
            className={styles.inputs + " h-24 resize-none"}
            {...register("whyAdopt", {
              required: {
                value: true,
                message: "Por favor completa la razón para adoptar",
              },
              maxLength: {
                value: 700,
                message: "Limite de caracteres excedido",
              },
            })}
          />
          <span className="text-gray-500 text-xs">
            Caracteres restantes:
            {700 - watchRazon.length > 0 ? 700 - watchRazon.length : 0}
          </span>

          {errors.Razon && (
            <p className={styles.errors}>{errors.Razon.message}</p>
          )}
        </fieldset>
        <div className="flex justify-center items-center">
          <button type="submit" className={styles.button}>
            Enviar Solicitud
          </button>
        </div>
      </form>
    </div>
  );
}

const styles = {
  label: "block text-gray-700 text-m font-bold mb-2",
  inputs:
    "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
  errors: "text-red-500 mb-4",
  button:
    "bg-green-950 text-white border-2 border-green-500 px-16 py-2 rounded-full text-xl hover:bg-green-700 transition-all active:translate-y-1",
  radio: "w-5 h-5 mr-2",
  select: " bg-slate-100 w-full rounded-md border-2 border-slate-300 p-2",
};
