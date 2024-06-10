"use client"
import Pet from "../Pet";
import PetClass from "@classes/Pet";
import { useState, useEffect } from "react";

export default function PetsRandom() {
  const [pets, setPets] = useState([]);
  useEffect(() => {
    PetClass.getRandomPets().then((pets) => {
      setPets(pets);
    });
  }, []);
  return (
    <div className="mt-6 grid gap-x-6 gap-y-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 mx-2">
      {pets.slice(0, 4).map((pet) => (
        <Pet key={pet._id} pet={pet} />
      ))}
    </div>
  );
}
