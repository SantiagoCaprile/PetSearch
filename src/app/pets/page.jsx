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
import { useForm } from "react-hook-form";
import Pet from "@/classes/Pet";
import AdBanner from "@/components/GoogleAdsense/AdBanner";
import Metadata from "@/components/Metadata/page";
import { defaultMetadata } from "@/utils/metadata";

export default function Page() {
  const { register, handleSubmit, setValue } = useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);
  const dispatch = useDispatch();
  const petsSelector = useSelector((state) => state.pets);
  // Obtener el índice inicial y final de los elementos a mostrar en la página actual
  useEffect(() => {
    dispatch(setPetsLoading());
    Pet.getAllPets()
      .then((data) => {
        dispatch(setPets(data));
        setCurrentItems(data.slice(indexOfFirstItem, indexOfLastItem));
      })
      .catch((err) => {
        console.log(err);
        dispatch(setPetsError());
      });
  }, [dispatch]);

  const itemsPerPage = 12;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const totalPages = Math.ceil(Array.isArray(petsSelector.pets) ? petsSelector.pets.length / itemsPerPage : 0);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setCurrentItems(petsSelector.pets.slice(indexOfFirstItem, indexOfLastItem));
  }, [petsSelector.pets, currentPage]);

  const handleSearch = async (data) => {

    // Lógica de búsqueda según los filtros seleccionados
    const specie = data.species === "any" ? null : data.species;
    const size = data.size === "any" ? null : data.size
    const filtrados = await Pet.getAllPets(specie, size, data.sex, data.age);
    dispatch(setPets(filtrados));
    setCurrentItems(filtrados);
    setCurrentPage(1);
  };

  const metadata = {
    ...defaultMetadata,
    title: "Mascotas para adoptar en Argentina" + defaultMetadata.separator + defaultMetadata.title,
    description: "Buscador de mascotas para adoptar en Argentina de manera rápida y sencilla. Encontrá tu mascota ideal en PetSearch",
  };

  return (
    <div className="flex flex-col flex-1">
      <Metadata {...metadata} />
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
                  <option value={Pet.SPECIES.DOG}>Perro</option>
                  <option value={Pet.SPECIES.CAT}>Gato</option>
                  <option value={Pet.SPECIES.OTHER}>Otro</option>
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
                  <option value={Pet.SIZES.SMALL}>Pequeño</option>
                  <option value={Pet.SIZES.MEDIUM}>Mediano</option>
                  <option value={Pet.SIZES.LARGE}>Grande</option>
                </select>
              </div>
            </div>
            <div className="grid h-fit items-center justify-items-center">
              <label htmlFor="age" className="w-full font-medium border-b border-black">
                Sexo
              </label>
              <div className="grid gap-2 justify-items-center py-2 md:grid-cols-2">
                <div className="flex gap-1">
                  <label htmlFor="sex-male" className="block font-medium">
                    Macho
                  </label>
                  <input
                    type="radio"
                    id="sex-male"
                    value={Pet.SEXS.MALE}
                    name="sex"
                    {...register("sex")}
                  />
                </div>
                <div className="flex gap-1">
                  <label htmlFor="sex-male" className="block font-medium">
                    Hembra
                  </label>
                  <input
                    type="radio"
                    id="sex-female"
                    name="sex"
                    value={Pet.SEXS.FEMALE}
                    {...register("sex")}
                  />
                </div>
              </div>
              <button className="bg-gray-200 text-white p-1 rounded-full h-fit w-fit border-2 border-gray-300 hover:scale-105 transition-all mb-1"
                onClick={() => {
                  // Limpiar sex radio buttons
                  document.getElementsByName("sex").forEach((el) => {
                    el.checked = false;
                    setValue("sex", null)
                  }
                  );
                }}
              >
                <X size={14} color="red" />
              </button>
            </div>
            <div className="mb-4 flex flex-col items-center">
              <label htmlFor="age" className="block font-medium ">
                Edad
              </label>
              <div className="flex flex-col items-end border-t border-black md:pb-2 ">
                <label
                  htmlFor="age-baby"
                  className="inline-flex items-center mt-2"
                >
                  <span className="mr-2 text-nowrap">Cachorro {"(< 6 meses)"}</span>
                  <input
                    type="checkbox"
                    id="age-baby"
                    value={Pet.AGES.BABY}
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
                    value={Pet.AGES.YOUNG}
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
                    value={Pet.AGES.ADULT}
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
                    value={Pet.AGES.SENIOR}
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
        <div className="md:w-3/4 bg-white p-4 flex flex-col justify-between min-h-fit">
          {petsSelector.error && <p>Fallo en la carga de mascotas</p>}
          {petsSelector.loading ? (
            <div className="flex flex-1 flex-col justify-center items-center">
              <Loader />
              Buscando mascotas ...
            </div>
          ) : (
            <div className="grid gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 mx-2">
              {currentItems && currentItems.map((pet, index) => (
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
        <div className="w-1/6 bg-gray-100 p-4 hidden md:flex flex-col text-center">
          <div className="sticky top-3">
            <AdBanner
              dataAdSlot="6430493933"
              dataAdFormat="auto"
              dataFullWidthResponsive={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
