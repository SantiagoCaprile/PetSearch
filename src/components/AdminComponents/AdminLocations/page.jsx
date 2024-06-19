import React, { useEffect, useState } from "react";
import User from "@/classes/User";
import ConfirmButton from "@/components/ConfirmButton/page";
import AddProvinceForm from "./AddProvinceForm";
import AddLocationForm from "./AddLocationForm";

export default function LocationsManager() {
    const [locations, setLocations] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [search, setSearch] = useState("");
    const [locationPage, setLocationPage] = useState(1);
    const [provincePage, setProvincePage] = useState(1);

    const itemsPerPage = 20;

    useEffect(() => {
        User.getProvinces().then((provinces) => {
            setProvinces(provinces);
        });
        User.getLocations().then((locations) => {
            setLocations(locations);
        });
    }, []);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const filteredLocations = locations.filter((location) =>
        location.name.toLowerCase().includes(search.toLowerCase())
    );

    const currentLocations = filteredLocations.slice(
        (locationPage - 1) * itemsPerPage,
        locationPage * itemsPerPage
    );

    const currentProvinces = provinces.slice(
        (provincePage - 1) * itemsPerPage,
        provincePage * itemsPerPage
    );

    const totalLocationPages = Math.ceil(filteredLocations.length / itemsPerPage);
    const totalProvincePages = Math.ceil(provinces.length / itemsPerPage);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Manage Locations</h1>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search Locations"
                    value={search}
                    onChange={handleSearchChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
            </div>
            <div className="flex space-x-4 mb-4">
                <AddLocationForm />
                <AddProvinceForm />
            </div>
            <h2 className="text-xl font-semibold mb-2">Provinces</h2>
            <table className="min-w-full bg-white border border-gray-200 rounded-md mb-6">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border-b text-center">Code</th>
                        <th className="px-4 py-2 border-b text-center">Name</th>
                        <th className="px-4 py-2 border-b text-center">Status</th>
                        <th className="px-4 py-2 border-b text-center" style={{ width: "200px" }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentProvinces.map((province) => (
                        <tr key={province._id}>
                            <td className="px-4 py-2 border-b text-center">{province.cod}</td>
                            <td className="px-4 py-2 border-b text-center">{province.name}</td>
                            <td className="px-4 py-2 border-b text-center">{province.active ? "Active" : "Inactive"}</td>
                            <td className="px-4 py-2 border-b flex justify-center">
                                <div className="w-full flex min-w-80 space-x-2 justify-center">
                                    <ConfirmButton
                                        click={() => console.log("Activate/Deactivate Province", province._id)}
                                        text={province.active ? "Deactivate" : "Activate"}
                                        finalText={province.active ? "Confirm Deactivation" : "Confirm Activation"}
                                        bgColor="bg-red-500"
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-center mb-6">
                <button
                    onClick={() => setProvincePage((prev) => Math.max(prev - 1, 1))}
                    className="px-4 py-2 mx-1 bg-gray-300 rounded-md"
                    disabled={provincePage === 1}
                >
                    Previous
                </button>
                <span className="px-4 py-2 mx-1">Page {provincePage} of {totalProvincePages}</span>
                <button
                    onClick={() => setProvincePage((prev) => Math.min(prev + 1, totalProvincePages))}
                    className="px-4 py-2 mx-1 bg-gray-300 rounded-md"
                    disabled={provincePage === totalProvincePages}
                >
                    Next
                </button>
            </div>
            <h2 className="text-xl font-semibold mb-2">Locations</h2>
            <table className="min-w-full bg-white border border-gray-200 rounded-md">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border-b text-center">Province</th>
                        <th className="px-4 py-2 border-b text-center">Location</th>
                        <th className="px-4 py-2 border-b text-center" style={{ width: "200px" }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentLocations.map((location) => (
                        <tr key={location._id}>
                            <td className="px-4 py-2 border-b text-center">{location.admin}</td>
                            <td className="px-4 py-2 border-b text-center">{location.name}</td>
                            <td className="px-4 py-2 border-b flex justify-center">
                                <div className="w-full min-w-80 flex space-x-2 justify-center">
                                    <ConfirmButton
                                        click={() => console.log("Edit Location", location._id)}
                                        text="Edit"
                                        finalText="Confirm Edit"
                                        bgColor="bg-yellow-500"
                                    />
                                    <ConfirmButton
                                        click={() => console.log("Activate/Deactivate Location", location._id)}
                                        text={location.active ? "Deactivate" : "Activate"}
                                        finalText={location.active ? "Confirm Deactivation" : "Confirm Activation"}
                                        bgColor="bg-red-500"
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-center mt-6">
                <button
                    onClick={() => setLocationPage((prev) => Math.max(prev - 1, 1))}
                    className="px-4 py-2 mx-1 bg-gray-300 rounded-md"
                    disabled={locationPage === 1}
                >
                    Previous
                </button>
                <span className="px-4 py-2 mx-1">Page {locationPage} of {totalLocationPages}</span>
                <button
                    onClick={() => setLocationPage((prev) => Math.min(prev + 1, totalLocationPages))}
                    className="px-4 py-2 mx-1 bg-gray-300 rounded-md"
                    disabled={locationPage === totalLocationPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
