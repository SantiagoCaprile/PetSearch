import React from "react";
import LOCATIONS from "@utils/ar.json";
import { MapPin } from "lucide-react";
import { useEffect } from "react";

//this will be a dropdown menu to select the location. When it is selected, it will be stored in the session
export default function LocationSelector() {
    useEffect(() => {
        if (localStorage.getItem("location") === null) {
            localStorage.setItem("location", "CABA");
        } else {
            document.getElementById("location").value = localStorage.getItem("location");
        }
    }
        , []);

    return (
        <div className="flex items-center justify-center px-2">
            <MapPin color="white" size="24" />
            <select
                className="text-white bg-inherit bg-opacity-55 rounded-md p-2 focus:outline-none w-4 md:w-60"
                name="location"
                id="location"
                onChange={(e) => {
                    localStorage.setItem("location", e.target.value);
                }}
            >
                {Object.values(LOCATIONS).map((city, index) => (
                    <option key={index} value={city.city}>
                        {city.city}
                    </option>
                ))}
            </select>
        </div>
    );
}

