import React, { useEffect, useState } from "react";
import User from "@/classes/User";
import ConfirmButton from "@/components/ConfirmButton/page";
import ProvinceForm from "./addProvinceForm";
import LocationForm from "./addLocationForm";
import { useSession } from "next-auth/react";
import { Circle } from "lucide-react";

export default function LocationsManager() {
    const { data: session } = useSession();
    const [locations, setLocations] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [search, setSearch] = useState("");
    const [locationPage, setLocationPage] = useState(1);
    const [provincePage, setProvincePage] = useState(1);
    const [editLocation, setEditLocation] = useState(null);

    const itemsPerPage = 10;
    const provincesPerPage = 5;

    useEffect(() => {
        if (!session) return;
        User.adminGetProvinces(session.jwtApiToken, session.user.role).then((provinces) => {
            setProvinces(provinces);
        });
        User.adminGetLocations(session.jwtApiToken, session.user.role).then((locations) => {
            setLocations(locations);
        });
    }, [session]);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const filteredLocations = locations?.filter((location) =>
        location.name.toLowerCase().includes(search.toLowerCase())
    );

    const currentLocations = filteredLocations?.slice(
        (locationPage - 1) * itemsPerPage,
        locationPage * itemsPerPage
    );

    const currentProvinces = provinces?.slice(
        (provincePage - 1) * provincesPerPage,
        provincePage * provincesPerPage
    );

    const totalLocationPages = Math.ceil(filteredLocations?.length / itemsPerPage);
    const totalProvincePages = Math.ceil(provinces?.length / provincesPerPage);

    return (
        <div className="p-6 bg-slate-700 text-white">
            <h1 className="text-2xl font-bold mb-4">Manage Locations</h1>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search Locations"
                    value={search}
                    onChange={handleSearchChange}
                    className="w-full p-2 border border-gray-300 text-inherit bg-inherit rounded-md"
                />
            </div>
            <h2 className="text-xl font-semibold mb-2">Provinces</h2>
            <table className="min-w-full border border-gray-200 rounded-md mb-6">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border-b text-center">Code</th>
                        <th className="px-4 py-2 border-b text-center">Name</th>
                        <th className="px-4 py-2 border-b text-center">Status</th>
                        <th className="px-4 py-2 border-b text-center" style={{ width: "200px" }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentProvinces?.map((province) => (
                        <tr key={province._id}>
                            <td className="px-4 py-2 border-b text-center">{province.cod}</td>
                            <td className="px-4 py-2 border-b text-center">{province.name}</td>
                            <td className="px-4 py-2 border-b text-center items-center">{province.active ?
                                <span className="flex gap-1 justify-center"> <Circle className="animate-pulse" color="lightgreen" fill="green" /> Active</span> :
                                <span className="flex gap-1 justify-center"> <Circle color="darkred" fill="darkred" />Inactive</span>}</td>
                            <td className="px-4 py-2 border-b flex justify-center">
                                <div className="w-full flex min-w-80 space-x-2 justify-center">
                                    <ConfirmButton
                                        click={() => console.log("Activate/Deactivate Province", province._id)}
                                        text={province.active ? "Deactivate" : "Activate"}
                                        finalText={province.active ? "Confirm Deactivation" : "Confirm Activation"}
                                        bgColor={province.active ? "bg-red-500" : "bg-green-500"}
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
                    className={"px-4 py-2 mx-1 bg-slate-400 text-white rounded-md" + (provincePage === 1 ? " disabled:opacity-50" : "")}
                    disabled={provincePage === 1}
                >
                    Previous
                </button>
                <span className="px-4 py-2 mx-1">Page {provincePage} of {totalProvincePages}</span>
                <button
                    onClick={() => setProvincePage((prev) => Math.min(prev + 1, totalProvincePages))}
                    className={"px-4 py-2 mx-1 bg-slate-400 text-white rounded-md" + (provincePage === totalProvincePages ? " disabled:opacity-50" : "")}
                    disabled={provincePage === totalProvincePages}
                >
                    Next
                </button>
            </div>
            <h2 className="text-xl font-semibold mb-2">Locations</h2>
            <table className="min-w-full bg-slate-700 text-white border border-gray-200 rounded-md">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border-b text-center">Province</th>
                        <th className="px-4 py-2 border-b text-center">Location</th>
                        <th className="px-4 py-2 border-b text-center">Status</th>
                        <th className="px-4 py-2 border-b text-center" style={{ width: "200px" }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentLocations?.map((location) => (
                        <tr key={location._id}>
                            <td className="px-4 py-2 border-b text-center">{location.admin}</td>
                            <td className="px-4 py-2 border-b text-center">{location.name}</td>
                            <td className="px-4 py-2 border-b text-center items-center">{location.active ?
                                <span className="flex gap-1 justify-center"> <Circle className="animate-pulse" color="lightgreen" fill="green" /> Active</span> :
                                <span className="flex gap-1 justify-center"> <Circle color="darkred" fill="darkred" />Inactive</span>}</td>
                            <td className="px-4 py-2 border-b flex justify-center">
                                <div className="w-full min-w-80 flex space-x-2 justify-center">
                                    <button
                                        onClick={() => setEditLocation(location)}
                                        className="px-4 py-2 bg-yellow-500 text-white rounded-md cursor-pointer"
                                    >
                                        Edit
                                    </button>
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
                    className={"px-4 py-2 mx-1 bg-slate-400 rounded-md" + (locationPage === 1 ? " disabled:opacity-50" : "")}
                    disabled={locationPage === 1}
                >
                    Previous
                </button>
                <span className="px-4 py-2 mx-1">Page {locationPage} of {totalLocationPages}</span>
                <button
                    onClick={() => setLocationPage((prev) => Math.min(prev + 1, totalLocationPages))}
                    className={"px-4 py-2 mx-1 bg-slate-400 rounded-md" + (locationPage === totalLocationPages ? " disabled:opacity-50" : "")}
                    disabled={locationPage === totalLocationPages}
                >
                    Next
                </button>
            </div>
            <div className="grid grid-cols-2 w-1/2 gap-x-2 mt-4 mx-auto justify-items-center">
                <p className="col-span-2 text-slate-200 text-sm">Para visualizar los cambios puede que necesite refrescar</p>
                <ProvinceForm />
                <LocationForm session={session} provinces={provinces} editLocation={editLocation} />
                <button onClick={() => { }} className="px-4 py-2 bg-red-500 text-white rounded-md cursor-pointer hover:translate-y-1">
                    Reset Province Form
                </button>
                <button onClick={() => setEditLocation(null)} className="px-4 py-2 bg-red-500 text-white rounded-md cursor-pointer hover:translate-y-1">
                    Reset Location Form
                </button>
            </div>
        </div>
    );
}
