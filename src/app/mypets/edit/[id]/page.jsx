import React from "react";
import CreatePetForm from "@/components/CreatePetForm/page";

// should extract the id from the params and pass it to the CreatePet component
export default async function EditPet({ params }) {
    const id = params.id;
    return (
        <CreatePetForm editPet={id} />
    );
}

