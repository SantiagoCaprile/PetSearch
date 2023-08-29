import Pet from "../Pet";
import { pets } from "../../utils/petListTest";

export default function PetsRandom() {
  return (
    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 mx-2">
      {pets.slice(0, 4).map((pet) => (
        <Pet key={pet.id} pet={pet} />
      ))}
    </div>
  );
}
