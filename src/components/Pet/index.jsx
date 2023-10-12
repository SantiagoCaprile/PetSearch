import Image from "next/image";
import Link from "next/link";

const imageExample =
  "https://firebasestorage.googleapis.com/v0/b/petsearch-e0abe.appspot.com/o/pet1.webp?alt=media&token=cd4dd80f-89d3-4cd2-b123-0b615c07852a";
const imageAlt = "Pet image";

export default function Pet({ pet }) {
  return (
    <div key={pet._id} className="group relative">
      <div className="min-h-5 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-52">
        <Image
          src={imageExample}
          alt={imageAlt}
          width={250}
          height={250}
          className="w-full h-full object-center object-cover lg:w-full lg:h-full"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <Link href={`/pets/${pet._id}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {pet.name}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {pet.age.number} {pet.age.unit}
          </p>
        </div>
        <p className="text-sm font-medium text-gray-900">{pet.breed}</p>
      </div>
    </div>
  );
}
