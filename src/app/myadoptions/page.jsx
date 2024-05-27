"use client"
import React from "react";
import AdoptionCard from "@/components/AdoptionCard/page";
import Adoption from "@/classes/Adoption";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function MyAdoptions() {
    const { data: session } = useSession();
    const id = session?.user?._id;
    const [adoptions, setAdoptions] = useState([]);

    useEffect(() => {
        const response = Adoption.getAdoptionsForRescuer(id)
            .then((response) => {
                setAdoptions(response);
                console.log("Adoptions for user:", response);
            }
            ).catch((error) => {
                console.error("An error occurred:", error);
            });
        if (!response) {
            console.log("Failed to get adoptions for user");
        }
    }
        , [id]);

    return (
        <div className="grid grid-cols-1 place-items-center gap-4 align-middle md:grid-cols-2 lg:grid-cols-3 my-4">
            {adoptions && adoptions.map((adoption) => (
                <AdoptionCard key={adoption.pet._id} adoption={adoption} pet={adoption.pet} user={adoption.user} />
            ))}
        </div>
    );
}