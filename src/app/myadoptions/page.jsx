"use client"
import React from "react";
import AdoptionCard from "@/components/AdoptionCard/page";
import Adoption from "@/classes/Adoption";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Loader from "@/components/Loader";

export default function MyAdoptions() {
    const { data: session } = useSession();
    const id = session?.user?._id;
    const [adoptions, setAdoptions] = useState('loading');

    useEffect(() => {
        if (!session) return;
        if (session.user.role === 'rescuer') {
            const response = Adoption.getAdoptionsForRescuer(id)
                .then((response) => {
                    setAdoptions(response);
                }
                ).catch((error) => {
                    setAdoptions('error');
                    console.error("An error occurred:", error);
                });
            if (!response) {
                console.log("Failed to get adoptions");
            }
        } else if (session.user.role === 'user') {
            const response = Adoption.getAdoptionsForUser(id)
                .then((response) => {
                    setAdoptions(response);
                    console.log(response);
                }
                ).catch((error) => {
                    setAdoptions('error');
                    console.error("An error occurred:", error);
                });
            if (!response) {
                console.log("Failed to get adoptions");
            }
        }
    }
        , [id]);

    if (adoptions === 'error') {
        return <div className="text-center text-red-500">
            Error al cargar las adopciones
            <br />
            Intentelo mas tarde
        </div>;
    }

    if (adoptions && adoptions.length === 0) {
        return <div className="text-center text-gray-500 pt-4">
            No tienes adopciones
        </div>;
    }

    return (
        <div className="grid grid-cols-1 place-items-center gap-4 align-middle md:grid-cols-2 lg:grid-cols-3 my-4">
            {adoptions === 'loading' ? <div className=" col-span-3"><Loader /></div>
                : adoptions?.map((adoption) => (
                    <AdoptionCard key={adoption.pet._id} adoption={adoption} pet={adoption.pet} user={adoption.user} />
                ))}
        </div>
    );
}