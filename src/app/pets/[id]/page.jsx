import Image from "next/image";
import { pets } from "../../../utils/petListTest";
import Link from "next/link";
import { CheckCircle2, XCircle } from "lucide-react";

const greenCheck = <CheckCircle2 className="text-green-500" />;
const redX = <XCircle className="text-red-500" />;

export default function PetProfile({ params }) {
  const { id } = params;
  // Esto luego se cambia cuando se obtiene la data de la base de datos
  const pet = pets.find((pet) => pet.id == id);

  return (
    <div className="w-3/5 mx-auto p-4">
      <div className="flex flex-col md:flex-row border-b border-black pb-2 items-center">
        <div className="w-full md:w-1/2 mb-6">
          <div className="relative square-image-wrapper mb-6">
            <div style={{ width: "100%", height: 0, paddingBottom: "100%" }}>
              <Image
                src={pet.imageSrc}
                alt={pet.imageAlt}
                fill="responsive"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 mb-6 md:pl-6 flex flex-col">
          <h1 className="text-4xl mb-2">
            Hola, me llamo <strong>{pet.name}</strong>
          </h1>
          <div className="mb-4 flex flex-col h-1/2 justify-evenly">
            <p className="text-gray-700">
              <strong>Sexo:</strong> {pet.sex}
            </p>
            <p className="text-gray-700">
              <strong>Edad:</strong> {pet.age}
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
            {pet.goodWithChildren ? greenCheck : redX}
            {pet.goodWithChildren
              ? "Bueno con chicos"
              : "No es bueno con chicos"}
          </li>
          <li className="flex gap-1">
            {pet.goodWithDogs ? greenCheck : redX}
            {pet.goodWithDogs ? "Bueno con perros" : "No es bueno con perros"}
          </li>
          <li className="flex gap-1">
            {pet.goodWithCats ? greenCheck : redX}
            {pet.goodWithCats ? "Bueno con gatos" : "No es bueno con gatos"}
          </li>
          <li className="flex gap-1">
            {pet.neutered ? greenCheck : redX}
            {pet.neutered ? "Castrado" : "No está castrado"}
          </li>
          <li className="flex gap-1">
            {pet.vaccinated ? greenCheck : redX}
            {pet.vaccinated ? "Vacunado" : "No está vacunado"}
          </li>
        </ul>
        <div className="border-t border-black pt-2 items-center mt-2">
          <h2 className="text-lg font-semibold mb-4">Descripción</h2>
          <p className="text-gray-700">
            {/*pet.description*/}
            Lorem Ipsum es simplemente el texto de relleno de las imprentas y
            archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar
            de las industrias desde el año 1500, cuando un impresor (N. del T.
            persona que se dedica a la imprenta) desconocido usó una galería de
            textos y los mezcló de tal manera que logró hacer un libro de textos
            especimen. No sólo sobrevivió 500 años, sino que tambien ingresó
            como texto de relleno en documentos electrónicos, quedando
            esencialmente igual al original. Fue popularizado en los 60s con la
            creación de las hojas Letraset, las cuales contenian pasajes de
            Lorem Ipsum, y más recientemente con software de autoedición, como
            por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem
            Ipsum.
          </p>
        </div>
      </div>
    </div>
  );
}
