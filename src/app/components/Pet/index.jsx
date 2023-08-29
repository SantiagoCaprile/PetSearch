import Image from "next/image";
import Link from "next/link";

export default function Pet({ pet }) {
  return (
    <div key={pet.id} className="group relative">
      <div className="min-h-5 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-52">
        <Image
          src={pet.imageSrc}
          alt={pet.imageAlt}
          width={250}
          height={250}
          className="w-full h-full object-center object-cover lg:w-full lg:h-full"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <Link href={`/pets/${pet.id}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {pet.name}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{pet.age}</p>
        </div>
        <p className="text-sm font-medium text-gray-900">{pet.sex}</p>
      </div>
    </div>
  );
}
