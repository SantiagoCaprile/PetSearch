"use client"
import React, { useEffect, useState } from "react";
import Map from "@/components/Map";
import LOCATIONS from "@utils/ar.json"
import Link from "next/link";
import { PlusSquare } from "lucide-react";

//will display a map with lost and fount pets
const lostAndFoundPets = [
    {
        image: "https://res.cloudinary.com/dprm5aerx/image/upload/f_auto,q_auto/qc9bukqchv8cjf7z5wip",
        name: "Tommy",
        type: "Lost",
        lat: "-34.6033",
        lng: "-58.3817",
        date: "17/04/2024",
        cel: "11 9 44444444",
        description: "Gato de raza pequeña, color marrón claro, ojos grandes, cola corta, muy amigable Gato de raza pequeña, color marrón claro, ojos grandes, cola corta, muy amigable Gato de raza pequeña, color marrón claro, ojos grandes, cola corta, muy amigable"
    },
    {
        image: "https://res.cloudinary.com/dprm5aerx/image/upload/f_auto,q_auto/rcmnx2zwiso7e3hnlsur",
        name: "Kepler",
        type: "Found",
        lat: "-34.6035",
        lng: "-58.3819",
        date: "13/04/2024",
        cel: "343 4409871",
        description: "Gato de raza siames, color blanco con manchas grises, ojos azules, muy cariñoso"
    }
]

export default function HelpMap() {
    const [city, setCity] = useState(null)
    const [map, setMap] = useState(false)

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.localStorage.getItem("location")
                && setCity(LOCATIONS.find(city => city.city == window.localStorage.getItem("location")))
            console.log(window.localStorage.getItem("location"))
            document.getElementById("city").value = LOCATIONS.findIndex(city => city.city == window.localStorage.getItem("location"))
            setMap(true)
        }
    }, [])

    const handleSetCity = (e) => {
        e.preventDefault()
        setMap(false)
        setCity(LOCATIONS[e.target.value])
        setTimeout(() => {
            setMap(true)
        }, 200)
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="flex justify-around items-center my-2 gap-2">
                <select name="city" id="city" className="w-[200px] p-2 rounded-md border border-gray-300"
                    onChange={handleSetCity}
                >
                    <option value="" defaultChecked>
                        Seleccione localidad
                    </option>
                    {
                        LOCATIONS &&
                        Object.values(LOCATIONS).map((city, index) => (
                            <option key={index} value={index}>
                                {city.city}
                            </option>
                        ))
                    }
                </select>
                <Link href="/helpMap/create" className="flex gap-1 text-nowrap bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Crear Anuncio
                    <PlusSquare />
                </Link>
            </div>
            <div className="md:w-2/3 md:h-[600px] h-svh w-full rounded-md overflow-hidden">
                {city && map ? (
                    <Map
                        center={[city.lat, city.lng]}
                        zoom={13}
                    >
                        {({ TileLayer, Marker, Popup }) => (
                            <>
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                />
                                {lostAndFoundPets &&
                                    lostAndFoundPets.map((pet, index) => (
                                        <Marker
                                            key={index}
                                            position={[pet.lat, pet.lng]}
                                            icon={L.icon({
                                                iconUrl: pet.type == "Lost" ? "/leaflet/images/marker-icon-red.png" : "/leaflet/images/marker-icon-green.png",
                                                popupAnchor: [0, -30],
                                                iconSize: [20, 30],
                                                shadowUrl: "/leaflet/images/marker-shadow.png",
                                                iconAnchor: [10, 30],
                                                shadowSize: [20, 30],
                                            })}
                                        >
                                            <Popup>
                                                <PopupData pet={pet} />
                                            </Popup>
                                        </Marker>))
                                }
                            </>
                        )}
                    </Map>
                ) : (
                    <div className="flex justify-center items-center bg-slate-400 animate-pulse rounded-lg h-full">
                        <h2 className="text-2xl font-bold text-white">Cargando Mapa...</h2>
                    </div>
                )}
            </div>
        </div >
    )
}

// this will be the component for the popup to display the data of the pet
import Image from "next/image";
function PopupData({ pet }) {
    const [showMore, setShowMore] = useState(false)

    const handleShowMore = () => {
        setShowMore(!showMore)
    }

    return (
        <div className={"w-36 flex-col items-center justify-center max-h-80 overflow-scroll"}>
            <Image src={pet.image} alt="dog" className="aspect-square object-cover overflow-hidden rounded-md" width={200} height={200} />
            <div className={"text-center rounded-lg " + (pet.type == 'Lost' ? " bg-red-200" : "bg-green-100")}>
                <p>
                    <b className="text-lg">{pet.type == 'Lost' ? "Perdido " : "Encontrado "}</b>
                    <br />
                    {pet.date}
                    <br />
                    {!showMore ? (pet.description?.slice(0, 50) + "...") : pet.description}
                    <span className="pl-2 text-blue-500 font-bold cursor-pointer text-nowrap" onClick={handleShowMore}>
                        {!showMore ? "Ver más" : "Menos"}
                    </span>
                    <br />
                    <span className="font-bold">
                        {pet.cel}
                    </span>
                </p>
            </div>
        </div>
    )
}
