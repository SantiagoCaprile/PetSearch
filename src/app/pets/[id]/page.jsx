"use client";
import Link from "next/link";
import { useEffect } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@/components/Loader";
import Carousel from "@/components/Carousel/page";
import { getAge } from "@/utils/dateFunctions";
import Pet from "@classes/Pet";

import {
  addPet,
  setPets,
  setPetsLoading,
  setPetsError,
} from "../../../app/store/reducers/petsSlice";

const CHARACTERISTICS = {
  KIDS: "goodWithKids",
  DOGS: "goodWithDogs",
  CATS: "goodWithCats",
  NEUTERED: "neutered",
  VACCINATED: "vaccinated",
};

const URLPETS = `${process.env.API_URL}/pets`;

const greenCheck = <CheckCircle2 className="text-green-500" />;
const redX = <XCircle className="text-red-500" />;

export default function PetProfile({ params }) {
  const { id } = params;
  // Esto luego se cambia cuando se obtiene la data de la base de datos
  //const pet = pets.find((pet) => pet.id == id);
  const dispatch = useDispatch();
  const pet = useSelector((state) => {
    return state.pets.pets.find((pet) => pet._id == id);
  });
  const loading = useSelector((state) => state.pets.loading);
  useEffect(() => {
    console.log(pet);
    if (pet === null) {
      dispatch(setPetsLoading());
      fetch(URLPETS).then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            dispatch(setPets(data));
          });
        } else {
          dispatch(setPetsError());
        }
      });
    }

    if (!pet) {
      // Si no se encuentra el pet tendría que hacer el fetch
      dispatch(setPetsLoading());
      Pet.getPetById(id).then((pet) => {
        if (pet) {
          dispatch(addPet(pet));
        } else {
          dispatch(setPetsError());
        }
      });
    }

  }, [dispatch, pet, id]);

  if (!pet || loading) {
    return <Loader />;
  }

  const petAge = getAge(pet);

  const findCharacteristic = (char) => {
    let founded = pet.characteristics.find((c) => c.key === char);
    if (founded) {
      return founded.value;
    }
  };

  return (
    <div className="md:w-4/5 mx-auto p-4">
      <div className="flex flex-col md:flex-row border-b border-black pb-2 items-center">
        <div className="w-full md:w-3/5">
          <div className="relative square-image-wrapper">
            <div className="flex flex-1 items-center">
              <Carousel slides={pet.images} options={{
                "loop": true,
              }} />
            </div>
          </div>
        </div>
        <div className="w-full md:w-2/5 mb-6 md:pl-6 flex flex-col">
          <h1 className="text-4xl mb-2">
            Hola, me llamo <strong>{pet.name}</strong>
          </h1>
          <div className="mb-4 flex flex-col h-1/2 justify-evenly">
            <p className="text-gray-700">
              <strong>Sexo:</strong> macho
              {
                //pet sex
              }
            </p>
            <p className="text-gray-700">
              <strong>Edad:</strong> {petAge.number} {petAge.unit}
            </p>
            <p className="text-gray-700">
              <strong>Raza:</strong> {pet.breed}
            </p>
          </div>
          <Link
            href="/adoptionform"
            className="bg-blue-500 text-white px-4 py-2 rounded-md w-2/3 text-center"
          >
            Adoptame
          </Link>
        </div>
      </div>
      <div className="my-5">
        <p className="text-gray-700 my-5">
          <strong>Características:</strong>
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <li className="flex gap-1">
            {findCharacteristic(CHARACTERISTICS.KIDS) ? greenCheck : redX}
            {findCharacteristic(CHARACTERISTICS.KIDS)
              ? "Bueno con chicos"
              : "No es bueno con chicos"}
          </li>
          <li className="flex gap-1">
            {findCharacteristic(CHARACTERISTICS.DOGS) ? greenCheck : redX}
            {findCharacteristic(CHARACTERISTICS.DOGS)
              ? "Bueno con perros"
              : "No es bueno con perros"}
          </li>
          <li className="flex gap-1">
            {findCharacteristic(CHARACTERISTICS.CATS) ? greenCheck : redX}
            {findCharacteristic(CHARACTERISTICS.CATS)
              ? "Bueno con gatos"
              : "No es bueno con gatos"}
          </li>
          <li className="flex gap-1">
            {findCharacteristic(CHARACTERISTICS.NEUTERED) ? greenCheck : redX}
            {findCharacteristic(CHARACTERISTICS.NEUTERED)
              ? "Castrado"
              : "No está castrado"}
          </li>
          <li className="flex gap-1">
            {findCharacteristic(CHARACTERISTICS.VACCINATED) ? greenCheck : redX}
            {findCharacteristic(CHARACTERISTICS.VACCINATED)
              ? "Vacunado"
              : "No está vacunado"}
          </li>
        </ul>
        <div className="border-t border-black pt-2 items-center mt-2">
          <h2 className="text-lg font-semibold mb-4">Descripción</h2>
          <p className="text-gray-700">{pet.description}</p>
        </div>
      </div>
    </div>
  );
}
