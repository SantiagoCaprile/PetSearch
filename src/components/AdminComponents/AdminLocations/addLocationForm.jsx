import React, { useState } from "react";

export default function AddLocationForm() {
    const [admin, setAdmin] = useState("");
    const [name, setName] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");

    const handleAddLocation = () => {
        console.log("Add Location", { admin, name, lat, lng });
        // Add logic to add location
        setAdmin("");
        setName("");
        setLat("");
        setLng("");
    };

    return (
        <div className="bg-gray-100 p-4 rounded-md shadow-md">
            <h3 className="text-lg font-bold mb-2">Add New Location</h3>
            <input
                type="text"
                placeholder="Province"
                value={admin}
                onChange={(e) => setAdmin(e.target.value)}
                className="w-full p-2 mb-2 border border-gray-300 rounded-md"
            />
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 mb-2 border border-gray-300 rounded-md"
            />
            <input
                type="text"
                placeholder="Latitude"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                className="w-full p-2 mb-2 border border-gray-300 rounded-md"
            />
            <input
                type="text"
                placeholder="Longitude"
                value={lng}
                onChange={(e) => setLng(e.target.value)}
                className="w-full p-2 mb-2 border border-gray-300 rounded-md"
            />
            <button onClick={handleAddLocation} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                Add Location
            </button>
        </div>
    );
}