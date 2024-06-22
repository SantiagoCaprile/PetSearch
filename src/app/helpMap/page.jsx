"use client"
import React, { useEffect, useState } from "react";
import Map from "@/components/Map";
import Link from "next/link";
import { PlusSquare } from "lucide-react";
import HelpFormClass from "@/classes/HelpForm";
import { formatDateToDDMMYYYY } from "@/utils/dateFunctions";
import { useSelector } from "react-redux";
import Metadata from "@/components/Metadata/page";
import { defaultMetadata } from "@/utils/metadata";

export default function HelpMap() {
    const locations = useSelector((state) => state.location);
    const [city, setCity] = useState(null)
    const [map, setMap] = useState(false)
    const [lostAndFoundPets, setLostAndFoundPets] = useState([])

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.localStorage.getItem("location")
                && (locations ? locations.location : window.localStorage.getItem("location"))
            setMap(true)
            HelpFormClass.getHelpFormByCity(locations.location.name)
                .then((data) => {
                    setLostAndFoundPets(data)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        handleSetCity()
    }, [locations.location])

    const handleSetCity = (e) => {
        setMap(false)
        setCity(locations.location.location) //redux slice.location object.city
        HelpFormClass.getHelpFormByCity(locations.location)
            .then((data) => {
                setLostAndFoundPets(data)
            })
            .catch((err) => {
                console.log(err)
            }
            )
        setTimeout(() => {
            setMap(true)
        }, 200)
    }

    const metadata = {
        ...defaultMetadata,
        title: "Mapa de Mascotas Perdidas y Encontradas en Argentina"
            + defaultMetadata.title.end,
        description: "Mapa de mascotas perdidas y encontradas en Argentina. Publica un anuncio si perdiste o encontraste un animalito",
    };

    return (
        <div className="flex flex-col justify-center items-center">
            <Metadata {...metadata} />
            <div className="flex justify-around items-center my-2 gap-2">
                <p className="text-sm text-wrap text-gray-500 ">
                    Si perdiste o encontraste un animalito, puedes publicar un anuncio
                    <br />
                    (Selecciona tu ciudad arriba)
                </p>
                <Link href="/helpMap/create" className="flex gap-1 text-nowrap bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Crear Anuncio
                    <PlusSquare />
                </Link>
            </div>
            <div className="md:w-2/3 md:h-[600px] h-svh w-full rounded-md overflow-hidden">
                {city && city.lat && map ? (
                    <Map
                        center={[city.lat, city.lng]}
                        zoom={city.admin == "CABA" ? 15 : 13}
                    >
                        {({ TileLayer, Marker, Popup }) => (
                            <>
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                />
                                {lostAndFoundPets && lostAndFoundPets.length > 0 &&
                                    lostAndFoundPets.map((pet, index) => (
                                        <Marker
                                            key={index}
                                            position={[pet.location.lat, pet.location.lng]}
                                            icon={L.icon({
                                                iconUrl: pet.type == HelpFormClass.TYPE.LOST ? "/leaflet/images/marker-icon-red.png" : "/leaflet/images/marker-icon-green.png",
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
            <div className={"text-center rounded-lg " + (pet.type == HelpFormClass.TYPE.LOST ? " bg-red-200" : "bg-green-100")}>
                <p>
                    <b className="text-lg">{pet.type == HelpFormClass.TYPE.LOST ? "Perdido " : "Encontrado "}</b>
                    <br />
                    {formatDateToDDMMYYYY(pet.date)}
                    <br />
                    {
                        pet.description.length < 40 ? pet.description
                            :
                            !showMore ? (pet.description?.slice(0, 40) + "...") : pet.description
                    }
                    {
                        pet.description.length > 40 &&
                        <span className="pl-2 text-blue-500 font-bold cursor-pointer text-nowrap" onClick={handleShowMore}>
                            {!showMore ? "Ver más" : "Menos"}
                        </span>
                    }
                    <br />
                    <span className="font-bold">
                        {pet.cel}
                    </span>
                </p>
            </div>
        </div>
    )
}
