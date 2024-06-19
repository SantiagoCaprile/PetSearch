"use client"
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Map from "@/components/Map";
import LOCATIONS from "@utils/ar.json";
import { MapPin, Save } from "lucide-react"
import { Dog, TriangleAlert } from "lucide-react";
import Image from "next/image";
import HelpFormClass from "@/classes/HelpForm";
import { useSession } from "next-auth/react";
import { toast } from 'react-hot-toast';
import { useRouter } from "next/navigation";
import { convertImageToBase64 } from "@/utils/imgFunctions";


export default function HelpForm() {
    const [map, setMap] = useState(false);
    const [location, setLocation] = useState({});
    const [image, setImage] = useState([]);
    const [file, setFile] = useState(null);
    const { data: session } = useSession();
    const router = useRouter();
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm();

    async function handleImageChange(e) {
        const files = Array.from(e.target.files);
        const imagePreview = files.map(file => URL.createObjectURL(file));
        setFile(files[0]);
        setImage(imagePreview[0])
    }

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.localStorage.getItem("location")
                && setLocation(LOCATIONS.find(city => city.city == JSON.parse(window.localStorage.getItem("location")).name))
            document.getElementById("localidad").value = LOCATIONS.findIndex(city => city.city == JSON.parse(window.localStorage.getItem("location")).name)
            setMap(true)
        }
    }, [])

    const onSubmit = async (data) => {
        if (location.lat === undefined || location.lng === undefined) {
            alert("Debe visualizar la ubicación en el mapa antes de continuar");
            return;
        }
        data = {
            ...data,
            location: {
                lat: location.lat,
                lng: location.lng,
                city: LOCATIONS[getValues("localidad")].city,
            },
            image: file ? await convertImageToBase64(file) : null,
            user: session.user._id,
        };

        const toastId = toast.loading("Creando anuncio...");
        const result = await HelpFormClass.createHelpForm(data);
        if (result) {
            toast.success("Anuncio creado correctamente", { id: toastId });
            setTimeout(() => {
                router.push("/helpMap");
            }, 2000);
        } else {
            toast.error("Error al crear anuncio", { id: toastId });
        }
    };

    const updateMap = (e = null) => {
        setMap(false);
        if (e) {
            setLocation({
                lat: LOCATIONS[e.target.value].lat,
                lng: LOCATIONS[e.target.value].lng,
            });
        } else {
            setLocation({
                lat: LOCATIONS[getValues("localidad")].lat,
                lng: LOCATIONS[getValues("localidad")].lng,
            });
        }
        setTimeout(() => {
            setMap(true);
        }, 200);
    }

    const getLocation = () => {
        // const toastId = toast.error("Utilice esta luego de haber seleccionado la localidad", { icon: <TriangleAlert size={24} color="orange" /> }, { duration: 7000 });
        const verifyIfCitySelectedCorrectly = (position) => {
            //should check if the city selected is close to the location
            //if not, should alert the user that the location may not be correct
            if (getValues("localidad") === "") {
                alert("Debe seleccionar la localidad antes de continuar");
                return false;
            }
            //if the difference between the selected location and the city is greater than 0.2, alert the user
            if ((Math.abs(position.coords.latitude) - Math.abs(LOCATIONS[getValues("localidad")].lat)) > 0.2 || (Math.abs(position.coords.longitude) - Math.abs(LOCATIONS[getValues("localidad")].lng)) > 0.2) {
                // toast.dismiss(toastId);
                toast.error("Parece que no se encuentra en la localidad seleccionada. Favor verifique", {
                    icon: <TriangleAlert size={32} color="red" />
                }, { duration: 7000 });
                return false;
            }
            return true;
        }
        if (navigator.geolocation) {
            setMap(false);
            navigator.geolocation.getCurrentPosition((position) => {
                if (verifyIfCitySelectedCorrectly(position)) {
                    setLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                    setTimeout(() => {
                        setMap(true);
                        toast.success("Ubicación actualizada", { icon: <MapPin size={18} /> });
                    }, 500);
                } else {
                    toast.error("Ubicación no actualizada", { icon: <TriangleAlert size={24} color="red" /> });
                }
            })
        } else {
            alert("Geolocation is not supported by this browser.");
        }

    }

    return (
        <div className="flex md:flex-1 overflow-auto flex-col md:flex-row gap-2 justify-center items-start p-4">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-[600px] md:w-2/3">
                <h2 className="text-2xl font-bold mb-4">
                    Crear anuncio
                </h2>
                <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className={styles.fieldset + (errors.type && " text-red-500")}>
                        <label htmlFor="type" className={styles.label}
                        >
                            Tipo *
                        </label>
                        <div className="flex justify-center items-center gap-2">
                            <input type="radio" name="type" id="lost" value={HelpFormClass.TYPE.LOST} {...register("type", {
                                required: {
                                    value: true,
                                    message: "type es requerido",
                                }
                            })
                            } />
                            <label htmlFor="lost" className="mr-2">
                                Perdido
                            </label>
                            <input type="radio" name="type" id="found" value={HelpFormClass.TYPE.FOUND} {...register("type")} />
                            <label htmlFor="found">Encontrado</label>
                        </div>
                    </fieldset>
                    <fieldset className={styles.fieldset}>
                        <label htmlFor="date" className={styles.label}>
                            Fecha *
                        </label>
                        <input
                            type="date"
                            name="date"
                            id="date"
                            max={new Date().toISOString().split('T')[0]}
                            className={styles.inputs + (errors.date && styles.inputError)}
                            {...register("date", {
                                required: {
                                    value: true,
                                    message: "Fecha es requerida",
                                },
                                max: {
                                    value: new Date().toISOString().split('T')[0],
                                    message: "Fecha no puede ser mayor a la actual"
                                }
                            })}
                        />
                    </fieldset>
                    <fieldset className="mb-4">
                        <label htmlFor="description" className={styles.label}>
                            Descripción
                        </label>
                        <textarea
                            name="description"
                            id="description"
                            cols="50"
                            rows="10"
                            maxLength={500}
                            placeholder="Como es el animal? Donde fue visto?..."
                            className={styles.inputs + " resize-none"}
                            {...register("description", {
                                maxLength: {
                                    value: 500,
                                    message: "No puede superar los 500 caracteres",
                                },
                            })}
                        ></textarea>
                    </fieldset>
                    <fieldset className={styles.fieldset + " self-center w-full"}>
                        <label htmlFor="images" className={styles.label + " self-start"}>
                            Imagen
                        </label>
                        <div className="flex md:flex-1 flex-col md:flex-row justify-between items-center gap-2">
                            <label className="cursor-pointer">
                                <input type="file" className="hidden"
                                    id="images"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                                {image && image.length > 0 ?
                                    <Image src={image}
                                        alt="dog"
                                        className="aspect-square object-cover overflow-hidden rounded-md"
                                        width={150}
                                        height={150} />
                                    :
                                    <Dog size={150} className="bg-slate-200 opacity-50 rounded-md" />
                                }
                            </label>
                            <p className="text-sm text-gray-500 md:max-w-36 max-w-full text-pretty">Agregar una imagen del animal aumenta en un 80% la posibilidad de conectarlo con mas personas</p>
                        </div>
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
                                onChange={(e) => {
                                    e.preventDefault();
                                    updateMap(e);
                                }}
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
                            updateMap();
                        }}
                    >
                        1- Cambiar <MapPin size={24} />
                    </button>
                    <button
                        className={styles.button}
                        onClick={(e) => {
                            e.preventDefault();
                            getLocation();
                        }}
                    >
                        2- Mi Ubicación <MapPin size={24} />
                    </button>
                    <button className={styles.button} type="submit">
                        Guardar <Save size={24} />
                    </button>
                </form>
            </div>
            <div className="flex flex-col w-full gap-2">
                <div className="md:h-[600px] md:min-w-[500px] h-[300px] bg-slate-400 rounded-md overflow-hidden z-0">
                    {map && location ? (
                        <Map center={[location.lat, location.lng]} zoom={15}>
                            {({ TileLayer, Marker }) => (
                                <>
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    />
                                    <Marker
                                        position={[location.lat, location.lng]}
                                        draggable={true}
                                        eventHandlers={{
                                            dragend: (e) => {
                                                setLocation(e.target.getLatLng());
                                            },
                                        }}
                                    />
                                </>
                            )}
                        </Map>
                    ) : (
                        <div className="flex justify-center items-center h-full">
                            {!location && !map && (
                                <h2 className="text-2xl font-bold text-white">
                                    Ingrese la dirección para ver el mapa
                                </h2>
                            )}
                            {location && !map && (
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
    fieldset: "flex justify-even items-center mb-4 ",
    label: "block text-gray-700 text-sm font-bold mr-2 w-1/3 text-nowrap",
    inputs:
        "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
    errors: "text-red-500 mb-4",
    button:
        "bg-green-900 text-white border-2 border-green-500 px-16 py-2 rounded-full text-xl hover:bg-green-700 transition-all active:translate-y-1 flex justify-center items-center gap-2 text-nowrap",
};
