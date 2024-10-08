import React, { useEffect, useState } from "react";
import User from "@/classes/User";

export default function LocationForm({ color = "bg-slate-100 text-black", session, provinces = [], editLocation = null }) {
    const [admin, setAdmin] = useState("");
    const [name, setName] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");

    useEffect(() => {
        if (editLocation) {
            setAdmin(editLocation.admin || "");
            setName(editLocation.name || "");
            setLat(editLocation.lat || "");
            setLng(editLocation.lng || "");
        } else {
            setAdmin("");
            setName("");
            setLat("");
            setLng("");
        }
    }, [editLocation]);

    const handleAddLocation = () => {
        // Add logic to add location
        document.getElementById('submit-form').disabled = true;
        if (editLocation) {
            const _id = editLocation._id;
            // Edit location
            if (confirm("Are you sure you want to edit this location?"))
                User.adminPutEditLocation(session.jwtApiToken, session.user.role, { admin, name, lat, lng, _id }).finally(() => {
                    document.getElementById('submit-form').disabled = false;
                });
            else
                document.getElementById('submit-form').disabled = false;
        } else {
            // Add location
            if (confirm("Are you sure you want to add this location?"))
                User.adminPostLocation(session.jwtApiToken, session.user.role, { admin, name, lat, lng })
                    .finally(() => {
                        document.getElementById('submit-form').disabled = false;
                    });
            else
                document.getElementById('submit-form').disabled = false;
        }

        setAdmin("");
        setName("");
        setLat("");
        setLng("");

    };

    return (
        <div className={`p-4 rounded-md border border-gray-300`}>
            <h3 className="text-lg font-bold mb-2">
                {editLocation ? "Edit" : "Add"} Location
            </h3>
            <select
                className={`text-black w-full p-2 mb-2 border border-gray-300 rounded-md ${color}`}
                value={admin}
                onChange={(e) => setAdmin(e.target.value)}
            >
                <option value="" disabled>Select a province</option>
                {provinces && provinces.map((province) => (
                    <option key={province._id} value={province.name}>
                        {province.name}
                    </option>
                ))}
            </select>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full p-2 mb-2 border border-gray-300 rounded-md ${color}`}
            />
            <input
                type="text"
                placeholder="Latitude"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                className={`w-full p-2 mb-2 border border-gray-300 rounded-md ${color}`}
            />
            <input
                type="text"
                placeholder="Longitude"
                value={lng}
                onChange={(e) => setLng(e.target.value)}
                className={`w-full p-2 mb-2 border border-gray-300 rounded-md ${color}`}
            />
            <button onClick={handleAddLocation} id='submit-form' className={`bg-blue-500 text-white px-4 py-2 rounded-md disabled:bg-gray-500 disabled:cursor-not-allowed`}>
                {editLocation ? "Edit" : "Add"} Location
            </button>
        </div>
    );
}
