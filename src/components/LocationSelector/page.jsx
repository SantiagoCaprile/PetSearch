"use client";
import React from "react";
import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import User from "@/classes/User";
import { useDispatch } from "react-redux";
import { setLocation } from "./../../app/store/reducers/locationSlice";

//this will be two components, one for the province and one for the location
//after the user selects the province, the location will be filtered by the province
//the location and province will be saved in the local storage
export default function LocationSelector({ displayProvinces }) {
    const dispatch = useDispatch();
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
        if (province) {
            setSelectedProvince(province);
        }
        //if the location is saved in the local storage but is not a valid location, it will be removed
        if (!localStorage.getItem("location")) return;

        if (!localStorage.getItem("location").includes("name")) {
            localStorage.removeItem("location");
        } else if (localStorage.getItem("location").includes("lat") && localStorage.getItem("location").includes("lng")) {
            const locationSaved = JSON.parse(localStorage.getItem("location"));
            if (locationSaved && locationSaved.name && locationSaved.lat) {
                setSelectedLocation(locationSaved.name);
                dispatch(setLocation({ province, location }));
            }
        }
    }, []);

    useEffect(() => {
        if (selectedProvince) {
            User.getLocationsByProvince(selectedProvince).then((locations) => {
                setLocations(locations);
                if (locations.length > 0) {
                    if (!localStorage.getItem("location")) {
                        localStorage.setItem("location", JSON.stringify(locations[0]));
                        setSelectedLocation(locations[0].name);
                        dispatch(setLocation({ province: selectedProvince, location: locations[0] }));
                    } else {
                        const location = JSON.parse(localStorage.getItem("location"));
                        setSelectedLocation(location.name);
                        dispatch(setLocation({ province: selectedProvince, location }));
                    }
                }
            });
        }
    }, [selectedProvince]);

    const handleProvinceChange = (e) => {
        setSelectedProvince(e.target.value);
        localStorage.setItem("province", e.target.value);
    };

    const handleLocationChange = (e) => {
        setSelectedLocation(e.target.value);
        const locationFull = locations.find(location => location.name === e.target.value)
        localStorage.setItem("location", JSON.stringify(locationFull));
        dispatch(setLocation({ province: selectedProvince, location: locationFull }));
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
                        <option value="" disabled>
                            Provincia
                        </option>
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

