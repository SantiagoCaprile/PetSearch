import React, { useState } from "react";

export default function AddProvinceForm({ color = "bg-slate-100 text-black" }) {
    const [name, setName] = useState("");
    const [cod, setCod] = useState("");

    const handleAddProvince = () => {
        console.log("Add Province", { name, cod });
        // Add logic to add province
        setName("");
        setCod("");
    };

    return (
        <div className="p-4 rounded-md border border-gray-300">
            <h3 className="text-lg font-bold mb-2">Add New Province</h3>
            <input
                type="text"
                placeholder="Code"
                value={cod}
                onChange={(e) => setCod(e.target.value)}
                className={`w-full p-2 mb-2 border border-gray-300 rounded-md ${color}`}
            />
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full p-2 mb-2 border border-gray-300 rounded-md ${color}`}
            />
            <button onClick={handleAddProvince} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                Add Province
            </button>
        </div>
    );
}
