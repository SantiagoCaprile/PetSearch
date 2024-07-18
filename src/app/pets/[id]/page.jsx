"use client";
import Link from "next/link";
import { useEffect } from "react";
import { CheckCircle2, XCircle, Store, BookHeartIcon, EditIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@/components/Loader";
import Carousel from "@/components/Carousel/page";
import { getAge } from "@/utils/dateFunctions";
import Pet from "@classes/Pet";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Adoption from "@classes/Adoption";
import Image from "next/image";

import {
  addPet,
  setPets,
  setPetsLoading,
  setPetsError,
} from "../../../app/store/reducers/petsSlice";

const CHARACTERISTICS = Pet.CHARACTERISTICS;

const URLPETS = `${process.env.API_URL}/pets`;

const greenCheck = <CheckCircle2 className="text-green-500" />;
const redX = <XCircle className="text-red-500" />;

export default function PetProfile({ params }) {
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = params;
  const dispatch = useDispatch();
  const pet = useSelector((state) => {
    return state.pets.pets.find((pet) => pet._id == id);
  });
  const loading = useSelector((state) => state.pets.loading);
  const error = useSelector((state) => state.pets.error);
  useEffect(() => {
    if (!pet) {
      // Si no se encuentra el pet tendría que hacer el fetch y luego agregarlo al store
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

  if (!pet && error) {
    return <div>Error al cargar la mascota</div>;
  }

  const petAge = getAge(pet);

  const findCharacteristic = (char) => {
    let founded = pet.characteristics.find((c) => c.key === char);
    if (founded) {
      return founded.value;
    }
  };

  const handleAdopt = async () => {
    if (session && session.user.role === "user") {
      const res = await Adoption.verifyIfAdoptionExists(pet._id, session.user._id);
      if (res) {
        toast.error("Ya has solicitado la adopción de esta mascota");
      } else {
        router.push(`/adoptionform/${pet._id}`);
      }
    } else if (session) {
      toast.error("Los rescatistas no pueden adoptar mascotas, inicia sesión como usuario para poder hacerlo", { duration: 6000 });
    } else {
      toast.error("Debes iniciar sesión para poder adoptar una mascota");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }
  }

  return (
    <div className="md:w-4/5 mx-auto p-4">
      <div className="flex flex-col md:flex-row border-b border-black pb-2 items-center">
        <div className="w-full md:w-3/5">
          <div className="relative square-image-wrapper">
            <div className="flex flex-1 items-center justify-center">
              {
                pet.images.length === 0 ?
                  <Image src="/images/pet.svg" alt="Imagen Mascota" width={300} height={300} />
                  :
                  <Carousel slides={pet.images} options={{
                    "loop": true,
                  }} />
              }
            </div>
          </div>
        </div>
        <div className="w-full md:w-2/5 mb-6 md:pl-6 flex flex-col">
          <h1 className="text-4xl mb-2">
            Hola, me llamo <strong>{pet.name}</strong>
          </h1>
          <div className="mb-4 flex flex-col h-1/2 justify-evenly">
            <p className="text-gray-700">
              <strong>Sexo:</strong> {pet.sex === 'male' ? 'Macho' : 'Hembra'}
            </p>
            <p className="text-gray-700">
              <strong>Edad:</strong> {petAge.number} {petAge.unit}
            </p>
            <p className="text-gray-700">
              <strong>Raza:</strong> {pet.breed}
            </p>
            <p className="text-gray-700">
              <strong>Tamaño:</strong> {pet.size === 'small' ? 'Pequeño' : pet.size === 'medium' ? 'Mediano' : 'Grande'}
            </p>
          </div>
          <button
            onClick={() => handleAdopt()}
            className="flex flex-row gap-2 justify-center align-middle bg-blue-500 text-white px-4 py-2 rounded-md w-2/3 text-center hover:bg-blue-700"
          >
            <BookHeartIcon className="inline-block" />
            Adoptame
          </button>
          {pet.rescuer && (
            <Link
              href={`/rescuers/${pet.rescuer?._id}`}
              className="flex flex-row gap-2 justify-center align-middle bg-slate-100 border-blue-500 border-2 text-black px-4 py-2 rounded-md w-2/3 text-center mt-2 hover:bg-slate-200 hover:border-blue-700"
            >
              <Store className="inline-block" />
              <span className="font-bold text-nowrap"> {pet.rescuer.name}</span>
            </Link>
          )}
          {session && session.user.role === "rescuer" && session.user._id === pet.rescuer?._id &&
            <Link href={`/mypets/edit/${pet._id}`} className="flex flex-row gap-2 justify-center align-middle bg-slate-100 border-blue-500 border-2 text-black px-4 py-2 rounded-md w-2/3 text-center mt-2 hover:bg-slate-200 hover:border-blue-700">
              <EditIcon /> <span className="font-bold text-nowrap"> Editar</span>
            </Link>
          }
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
