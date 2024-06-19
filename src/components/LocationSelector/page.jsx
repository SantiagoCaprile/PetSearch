"use client";
import React from "react";
import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import User from "@/classes/User";

//this will be two components, one for the province and one for the location
//after the user selects the province, the location will be filtered by the province
//the location and province will be saved in the local storage
export default function LocationSelector({ displayProvinces }) {
    const [provinces, setProvinces] = useState([]);
    const [locations, setLocations] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("");

    useEffect(() => {
        User.getProvinces().then((provinces) => {
            setProvinces(provinces);
        });
    }, []);

    useEffect(() => {
        setLocations([]);
    }, []);

    useEffect(() => {
        const province = localStorage.getItem("province");
        const location = localStorage.getItem("location");
        if (province) {
            setSelectedProvince(province);
        }
        if (location) {
            setSelectedLocation(location);
        }
    }, []);

    useEffect(() => {
        if (selectedProvince) {
            User.getLocationsByProvince(selectedProvince).then((locations) => {
                setLocations(locations);
                const defaultLocation = locations ? locations[0]?.name : "";
                localStorage.setItem('location', defaultLocation);
            });
        }
    }, [selectedProvince]);

    const handleProvinceChange = (e) => {
        setSelectedProvince(e.target.value);
        localStorage.setItem("province", e.target.value);
    };

    const handleLocationChange = (e) => {
        setSelectedLocation(e.target.value);
        localStorage.setItem("location", e.target.value);
    };

    return (
        <div className="flex items-center gap-2 md:px-1">
            <MapPin color={"white"} />
            <div className="flex flex-col items-center">
                {displayProvinces && (
                    <select
                        value={selectedProvince}
                        onChange={handleProvinceChange}
                        disabled={provinces?.length === 0}
                        className="text-white bg-inherit bg-opacity-55 rounded-md md:p-2 focus:outline-none w-full"
                    >
                        {provinces?.length == 0 && (
                            <option value="" selected>
                                Provincia
                            </option>
                        )
                        }
                        {provinces?.map((province) => (
                            <option key={province.cod} value={province.name}>
                                {province.name}
                            </option>
                        ))}
                    </select>
                )}
                <select
                    value={selectedLocation}
                    onChange={handleLocationChange}
                    disabled={locations?.length === 0}
                    className="text-white bg-inherit bg-opacity-55 rounded-md md:p-2 focus:outline-none w-full"
                >
                    {locations?.length === 0 && (
                        <option value="">
                            Localidad
                        </option>
                    )
                    }
                    {locations?.map((location) => (
                        <option key={location._id} value={location.name}>
                            {location.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

