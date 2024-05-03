"use client"
import React, { useEffect, useState } from "react";
import Map from "@/components/Map";
import LOCATIONS from "@utils/ar.json"
import { set } from "react-hook-form";

//will display a map with lost and fount pets
const lostAndFoundPets = [
    {
        name: "Tommy",
        type: "Lost",
        lat: "-34.6033",
        lng: "-58.3817",
        date: "17/04/2024",
        cel: "11 9 44444444"
    },
    {
        name: "Kepler",
        type: "Found",
        lat: "-34.6035",
        lng: "-58.3819",
        date: "13/04/2024",
        cel: "343 4409871"
    }
]

export default function HelpMap() {
    const [city, setCity] = useState(null)
    const [map, setMap] = useState(false)

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
            <select name="city" id="city" className="w-[200px]"
                onChange={handleSetCity}
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
            <div className="md:w-2/3 md:h-[600px] h-svh w-full bg-black">
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
                                                iconUrl: pet.type != "Lost" ? "/leaflet/images/marker-icon-red.png" : "/leaflet/images/marker-icon-green.png",
                                                popupAnchor: [0, -30],
                                                iconSize: [20, 30],
                                                shadowUrl: "/leaflet/images/marker-shadow.png",
                                                iconAnchor: [10, 30],
                                                shadowSize: [20, 30],
                                            })}
                                        >
                                            <Popup>
                                                <p className="text-center">
                                                    {pet.type == 'Lost' ? "Perdido " : "Encontrado "} el {pet.date}<br />
                                                    {pet.cel}
                                                </p>
                                            </Popup>
                                        </Marker>))
                                }
                            </>
                        )}
                    </Map>
                ) : (
                    <div className="flex justify-center items-center h-full">
                        <h2 className="text-2xl font-bold text-white">Cargando Mapa...</h2>
                    </div>
                )}
            </div>
        </div >
    )
}

