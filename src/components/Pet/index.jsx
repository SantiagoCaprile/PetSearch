import Image from "next/image";
import Link from "next/link";
import { getAge } from "@utils/dateFunctions";

export default function Pet({ pet }) {
  let age = getAge(pet);
  return (
    <div key={pet._id} className="group relative">
      <div className="min-h-5 aspect-video w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:scale-105 transition-all lg:h-52 shadow-sm">
        {
          pet.images && pet.images.length > 0 &&
          <Image
            src={pet.images[0]}
            alt={"Pet Image"}
            width={250}
            height={250}
            className="w-full h-full object-center object-cover lg:w-full lg:h-full"
          />
        }


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
            {pet.age?.number || age?.number} {pet.age?.unit || age?.unit}
          </p>
        </div>
        <p className="text-sm font-medium text-gray-900">{pet.breed}</p>
      </div>
    </div>
  );
}
