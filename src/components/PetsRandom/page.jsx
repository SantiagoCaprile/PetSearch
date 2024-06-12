"use client"
import Pet from "../Pet";
import PetSkeleton from "../Pet/PetSkeleton";
import PetClass from "@classes/Pet";
import { useState, useEffect } from "react";

export default function PetsRandom() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    PetClass.getRandomPets().then((pets) => {
      setPets(pets);
      setLoading(false);
    });
  }, []);

  return (
    <div className="mt-6 grid gap-x-6 gap-y-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 mx-2">
      {!pets || loading
        ? Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="relative">
            <PetSkeleton />
          </div>
        ))
        : pets.slice(0, 4).map((pet) => (
          <div key={pet._id} className="relative">
            <Pet pet={pet} />
          </div>
        ))}
    </div>
  );
}
