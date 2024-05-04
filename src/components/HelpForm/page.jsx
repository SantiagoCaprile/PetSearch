"use client"
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Map from "@/components/Map";
import LOCATIONS from "@utils/ar.json";
import { MapPin, Save } from "lucide-react"

export default function HelpForm() {
    const [mapa, setMapa] = useState(false);
    const [ubicacion, setUbicacion] = useState({});
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        if (ubicacion.lat === undefined || ubicacion.lng === undefined) {
            alert("Debe visualizar la ubicación en el mapa antes de continuar");
            return;
        }
        data = {
            ...data,
            lat: ubicacion.lat,
            lng: ubicacion.lng,
        };
        console.log("data a enviar: ", data);
    };

    const actualizarMapa = () => {
        setMapa(false);
        setUbicacion({
            lat: LOCATIONS[getValues("localidad")].lat,
            lng: LOCATIONS[getValues("localidad")].lng,
        });
        setTimeout(() => {
            setMapa(true);
        }, 200);
    }

    return (
        <div className="flex md:flex-1 overflow-auto flex-col md:flex-row gap-2 justify-center items-start p-4">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-[600px] md:w-2/3">
                <h2 className="text-2xl font-bold mb-4">
                    Crear anuncio en el Mapa
                </h2>
                <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className={styles.fieldset + (errors.tipo && " text-red-500")}>
                        <label htmlFor="tipo" className={styles.label}
                        >
                            Tipo *
                        </label>
                        <input type="radio" name="tipo" id="lost" value="lost" {...register("tipo", {
                            required: {
                                value: true,
                                message: "Tipo es requerido",
                            }
                        })
                        } />
                        <label htmlFor="lost" className="mr-2">
                            Perdido
                        </label>
                        <input type="radio" name="tipo" id="found" value="found" {...register("tipo")} />
                        <label htmlFor="found">Encontrado</label>
                    </fieldset>
                    <fieldset className={styles.fieldset}>
                        <label htmlFor="fecha" className={styles.label}>
                            Fecha *
                        </label>
                        <input
                            type="date"
                            name="fecha"
                            id="fecha"
                            className={styles.inputs + (errors.fecha && styles.inputError)}
                            {...register("fecha", {
                                required: {
                                    value: true,
                                    message: "Fecha es requerida",
                                },
                            })}
                        />
                    </fieldset>
                    <fieldset className="mb-4">
                        <label htmlFor="descripcion" className={styles.label}>
                            Descripción
                        </label>
                        <textarea
                            name="descripcion"
                            id="descripcion"
                            cols="50"
                            rows="10"
                            maxLength={500}
                            placeholder="Como es el animal? Donde fue visto?..."
                            className={styles.inputs + " resize-none"}
                            {...register("descripcion", {
                                maxLength: {
                                    value: 500,
                                    message: "No puede superar los 200 caracteres",
                                },
                            })}
                        ></textarea>
                    </fieldset>
                    <div className="mb-4">
                        <fieldset className={styles.fieldset}>
                            <label htmlFor="localidad" className={styles.label}>
                                Localidad *
                            </label>
                            <select
                                name="localidad"
                                id="localidad"
                                className={
                                    styles.inputs + (errors.localidad && styles.inputError)
                                }
                                {...register("localidad", {
                                    required: {
                                        value: true,
                                        message: "Localidad es requerida",
                                    },
                                })}
                            >
                                {
                                    LOCATIONS &&
                                    Object.values(LOCATIONS).map((city, index) => (
                                        <option key={index} value={index}>
                                            {city.city}
                                        </option>
                                    ))
                                }
                            </select>
                        </fieldset>
                        <span className={styles.errors}>
                            {errors.localidad && errors.localidad.message}
                        </span>
                        <p className="text-sm text-pretty text-gray-500">
                            {"->"} Seleccione la localidad para visualizar en el mapa
                            y arrastre el marcador para ajustar la ubicación
                        </p>
                    </div>
                    <button
                        className={styles.button}
                        onClick={(e) => {
                            e.preventDefault();
                            actualizarMapa();
                        }}
                    >
                        Ver Mapa <MapPin size={24} />
                    </button>
                    <button className={styles.button} type="submit">
                        Guardar <Save size={24} />
                    </button>
                </form>
            </div>
            <div className="flex flex-col w-full gap-2">
                <div className="md:h-[600px] md:min-w-[500px] h-[300px] bg-slate-400 rounded-md overflow-hidden">
                    {mapa && ubicacion ? (
                        <Map center={[ubicacion.lat, ubicacion.lng]} zoom={13}>
                            {({ TileLayer, Marker }) => (
                                <>
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    />
                                    <Marker
                                        position={[ubicacion.lat, ubicacion.lng]}
                                        draggable={true}
                                        eventHandlers={{
                                            dragend: (e) => {
                                                setUbicacion(e.target.getLatLng());
                                            },
                                        }}
                                    />
                                </>
                            )}
                        </Map>
                    ) : (
                        <div className="flex justify-center items-center h-full">
                            {!ubicacion && !mapa && (
                                <h2 className="text-2xl font-bold text-white">
                                    Ingrese la dirección para ver el mapa
                                </h2>
                            )}
                            {ubicacion && !mapa && (
                                <h2 className="text-2xl font-bold text-white">
                                    Cargando Mapa...
                                </h2>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

const styles = {
    inputError: "border border-red-500 text-red-500",
    fieldset: "flex justify-center items-center mb-4",
    label: "block text-gray-700 text-sm font-bold mr-2 w-1/3 text-nowrap",
    inputs:
        "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
    errors: "text-red-500 mb-4",
    button:
        "bg-green-900 text-white border-2 border-green-500 px-16 py-2 rounded-full text-xl hover:bg-green-700 transition-all active:translate-y-1 flex justify-center items-center gap-2",
};
