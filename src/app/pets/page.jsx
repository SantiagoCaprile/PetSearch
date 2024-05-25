"use client";
import PetCard from "../../components/Pet";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@/components/Loader";
import { X } from "lucide-react";
import {
  setPets,
  setPetsLoading,
  setPetsError,
} from "../../app/store/reducers/petsSlice";
const URLPETS = `${process.env.API_URL || "http://localhost:4000"}/pets`;
import { useForm } from "react-hook-form";

export default function Page() {
  const { register, handleSubmit } = useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const petsSelector = useSelector((state) => state.pets);
  // Obtener el índice inicial y final de los elementos a mostrar en la página actual
  useEffect(() => {
    dispatch(setPetsLoading());
    fetch(URLPETS)
      .then((response) => response.json())
      .then((data) => {
        dispatch(setPets(data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(setPetsError());
      });
  }, [dispatch]);

  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Array.isArray(petsSelector.pets)
    ? petsSelector.pets.slice(indexOfFirstItem, indexOfLastItem)
    : [];
  const totalPages = Math.ceil(Array.isArray(petsSelector.pets) ? petsSelector.pets.length / itemsPerPage : 0);
  console.log(totalPages);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (data) => {
    // Lógica de búsqueda según los filtros seleccionados
    console.log("Realizar búsqueda...");
    console.log(data);
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
                  {...register("species")}
                >
                  <option default value="any">
                    Cualquiera
                  </option>
                  <option value="dog">Perro</option>
                  <option value="cat">Gato</option>
                  <option value="other">Otro</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="mb-4">
                <label htmlFor="size" className="block font-medium">
                  Tamaño
                </label>
                <select
                  id="size"
                  className="border border-gray-300 rounded-md p-2"
                  {...register("size")}
                >
                  <option default value="any">
                    Cualquiera
                  </option>
                  <option value="small">Pequeño</option>
                  <option value="medium">Mediano</option>
                  <option value="big">Grande</option>
                </select>
              </div>
            </div>
            <div className="flex justify-around items-center">
              <div className="mb-4">
                <label htmlFor="sex-male" className="block font-medium">
                  Macho
                </label>
                <input
                  type="radio"
                  id="sex-male"
                  value="male"
                  name="sex"
                  {...register("sex")}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="sex-male" className="block font-medium">
                  Hembra
                </label>
                <input
                  type="radio"
                  id="sex-female"
                  name="sex"
                  value="female"
                  {...register("sex")}
                />
              </div>
              <button className="bg-gray-800 text-white p-1 rounded-full h-fit"
                onClick={() => {
                  // Limpiar sex radio buttons
                  document.getElementsByName("sex").forEach((el) => {
                    el.checked = false;
                  }
                  );
                }}
              >
                <X size={16} color="red" />
              </button>
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
                  <span className="mr-2 text-nowrap">Cachorro {"(< 6 meses)"}</span>
                  <input
                    type="checkbox"
                    id="age-baby"
                    value="baby"
                    {...register("age")}
                  />
                </label>
                <label
                  htmlFor="age-young"
                  className="inline-flex items-center mt-2"
                >
                  <span className="mr-2">Joven {"(< 3 años)"}</span>
                  <input
                    type="checkbox"
                    id="age-young"
                    value="young"
                    {...register("age")}
                  />
                </label>
                <label
                  htmlFor="age-adult"
                  className="inline-flex items-center mt-2"
                >
                  <span className="mr-2">Adulto {"(< 10 años)"}</span>
                  <input
                    type="checkbox"
                    id="age-adult"
                    value="adult"
                    {...register("age")}
                  />
                </label>
                <label
                  htmlFor="age-senior"
                  className="inline-flex items-center mt-2"
                >
                  <span className="mr-2">Senior {"(> 10 años)"}</span>
                  <input
                    type="checkbox"
                    id="age-senior"
                    value="senior"
                    {...register("age")}
                  />
                </label>
              </div>
            </div>
          </div>
          <button
            className=" bg-gray-800 text-white px-4 py-2 rounded-md hover:translate-y-0.5 transition-all active:translate-y-1"
            onClick={handleSubmit(handleSearch)}
          >
            Buscar
          </button>
        </div>
        <div className="md:w-3/4 bg-white p-4 flex flex-col justify-between">
          {petsSelector.error && <p>Fallo en la carga de mascotas</p>}
          {petsSelector.loading ? (
            <div className="flex flex-1 flex-col justify-center items-center">
              <Loader />
              Buscando mascotas ...
            </div>
          ) : (
            <div className="grid gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 mx-2">
              {currentItems.map((pet, index) => (
                <PetCard key={index} pet={pet} />
              ))}
            </div>
          )}
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
