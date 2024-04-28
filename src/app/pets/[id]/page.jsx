"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@/components/Loader";
import Carousel from "@/components/Carousel/page";

const imageExample =
  "https://firebasestorage.googleapis.com/v0/b/petsearch-e0abe.appspot.com/o/pet1.webp?alt=media&token=cd4dd80f-89d3-4cd2-b123-0b615c07852a";
const imageAlt = "Pet image";

import {
  setPets,
  setPetsLoading,
  setPetsError,
} from "../../../app/store/reducers/petsSlice";

const URLPETS = "http://localhost:4000/pets";

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
  }, [dispatch, pet]);

  if (!pet) {
    return <Loader />;
  }

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
              <Carousel slides={[imageExample, imageExample, imageExample]} options={{ "loop": true }} />
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
              <strong>Edad:</strong> {pet.age.number} {pet.age.unit}
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
            {findCharacteristic("good with kids") ? greenCheck : redX}
            {findCharacteristic("good with kids")
              ? "Bueno con chicos"
              : "No es bueno con chicos"}
          </li>
          <li className="flex gap-1">
            {findCharacteristic("good with dogs") ? greenCheck : redX}
            {findCharacteristic("good with dogs")
              ? "Bueno con perros"
              : "No es bueno con perros"}
          </li>
          <li className="flex gap-1">
            {findCharacteristic("good with cats") ? greenCheck : redX}
            {findCharacteristic("good with cats")
              ? "Bueno con gatos"
              : "No es bueno con gatos"}
          </li>
          <li className="flex gap-1">
            {findCharacteristic("neutered") ? greenCheck : redX}
            {findCharacteristic("neutered") ? "Castrado" : "No está castrado"}
          </li>
          <li className="flex gap-1">
            {findCharacteristic("neutered") ? greenCheck : redX}
            {findCharacteristic("neutered") ? "Vacunado" : "No está vacunado"}
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
