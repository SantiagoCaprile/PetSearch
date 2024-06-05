import React, { useState } from "react";
import Pet from "@/components/Pet";
import Link from "next/link";
import Loader from "@/components/Loader";

export default function PetViewer({ petList = [], admitNewPet = false, loading = true }) {
    const [selectedAges, setSelectedAges] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 8;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = Array.isArray(petList)
        ? petList.slice(indexOfFirstItem, indexOfLastItem)
        : [];
    const totalPages = Math.ceil(currentItems.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSearch = () => {
        // Lógica de búsqueda según los filtros seleccionados
        console.log("Realizar búsqueda...");
    };

    const handleAgeChange = (event) => {
        const { value, checked } = event.target;

        setSelectedAges((prevSelectedAges) => {
            if (checked) {
                return [...prevSelectedAges, value];
            } else {
                return prevSelectedAges.filter((age) => age !== value);
            }
        });
    };

    return (
        <div className="flex flex-col flex-1">
            <div className="flex flex-col items-center md:items-stretch md:flex-row justify-center flex-1">
                <div className="md:w-1/6 w-full bg-gray-100 p-4 flex flex-col text-center">
                    <h2 className="text-lg font-semibold mb-4 border-b border-black pb-2">
                        Filtros
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-1">
                        <div className="flex flex-col">
                            <div className="mb-4">
                                <label htmlFor="species" className="block font-medium">
                                    Especie
                                </label>
                                <select
                                    id="species"
                                    className="border border-gray-300 rounded-md p-2"
                                >
                                    <option default value="any">
                                        Cualquiera
                                    </option>
                                    <option value="dog">Perro</option>
                                    <option value="cat">Gato</option>
                                    <option value="other">Otro</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="breed" className="block font-medium">
                                    Ubicación
                                </label>
                                <select
                                    id="location"
                                    className="border border-gray-300 rounded-md p-2 "
                                >
                                    <option default value="any">
                                        Cualquiera
                                    </option>
                                    <option value="CABA">CABA</option>
                                    <option value="Parana">Paraná</option>
                                    <option value="Santa Fe">Santa Fe</option>
                                    <option value="Rosario">Rosario</option>
                                </select>
                            </div>
                        </div>
                        <div className="mb-4 flex flex-col items-center">
                            <label htmlFor="age" className="block font-medium ">
                                Edad
                            </label>
                            <div className="flex flex-col items-end border-t border-black pb-2 ">
                                <label
                                    htmlFor="age-baby"
                                    className="inline-flex items-center mt-2"
                                >
                                    <span className="mr-2">Cachorro</span>
                                    <input
                                        type="checkbox"
                                        id="age-baby"
                                        value="baby"
                                        checked={selectedAges.includes("baby")}
                                        onChange={handleAgeChange}
                                    />
                                </label>
                                <label
                                    htmlFor="age-young"
                                    className="inline-flex items-center mt-2"
                                >
                                    <span className="mr-2">Joven</span>
                                    <input
                                        type="checkbox"
                                        id="age-young"
                                        value="young"
                                        checked={selectedAges.includes("young")}
                                        onChange={handleAgeChange}
                                    />
                                </label>
                                <label
                                    htmlFor="age-adult"
                                    className="inline-flex items-center mt-2"
                                >
                                    <span className="mr-2">Adulto</span>
                                    <input
                                        type="checkbox"
                                        id="age-adult"
                                        value="adult"
                                        checked={selectedAges.includes("adult")}
                                        onChange={handleAgeChange}
                                    />
                                </label>
                                <label
                                    htmlFor="age-senior"
                                    className="inline-flex items-center mt-2"
                                >
                                    <span className="mr-2">Senior</span>
                                    <input
                                        type="checkbox"
                                        id="age-senior"
                                        value="senior"
                                        checked={selectedAges.includes("senior")}
                                        onChange={handleAgeChange}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                    <button
                        className=" bg-gray-800 text-white px-4 py-2 rounded-md"
                        onClick={handleSearch}
                    >
                        Buscar
                    </button>
                </div>
                <div className="md:w-3/4 bg-white p-4 flex flex-col justify-between min-h-fit">
                    {!loading && !currentItems.length && <p>No se encontró ninguna mascota</p>}
                    {loading && <div className="flex flex-1 flex-col justify-center items-center">
                        <Loader />
                        Buscando mascotas ...
                    </div>}
                    <div className="grid gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 mx-2">
                        {admitNewPet && (
                            <Link href="/createPet" className="flex flex-col items-center justify-center bg-gray-200 rounded-md p-4 border border-gray-300 hover:border-gray-500 hover:bg-gray-300 transition-colors duration-150">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-12 w-12 text-gray-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                    />
                                </svg>
                                <span className="text-gray-500">Agregar mascota</span>
                            </Link>
                        )}
                        {currentItems.map((pet, index) => (
                            <Pet key={index} pet={pet} />
                        ))}
                    </div>
                    <div className="flex justify-center m-4">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index}
                                className={`px-2 py-1 mx-1 rounded ${index + 1 === currentPage
                                    ? " bg-slate-500 text-white"
                                    : "bg-gray-300"
                                    }`}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="w-1/6 bg-gray-100 p-4"></div>
            </div>
        </div>
    );
}
