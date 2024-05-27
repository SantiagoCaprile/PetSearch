"use client"
import React, { useState, useEffect } from "react";
import Chat from "@/components/Chat";
import Image from "next/image";
import Link from "next/link";
import Adoption from "@/classes/Adoption";
import Loader from "@/components/Loader";
import { getAge, formatDateToDDMMYYYY } from "@/utils/dateFunctions";


import { CheckCircle2, XCircle } from "lucide-react";
const checkCrossPill = (value, message) => {
    const styles = {
        statusSpan: "flex gap-2 items-center justify-center p-1 rounded-lg border border-gray-700 text-black md:w-fit h-[50px] w-full md:h-full ",
    }
    if (value) {
        return <p className={styles.statusSpan}><CheckCircle2 color="Green" size={24} strokeWidth={3} /> <span className=" text-pretty w-4/5 md:w-auto">{message}</span></p>
    } else {
        return <p className={styles.statusSpan}><XCircle color="Red" strokeWidth={3} size={24} /> <span className="text-pretty w-4/5 md:w-auto">{message}</span></p>
    }
}

export default function AdoptionPage({ params: { id } }) {

    const [adoption, setAdoption] = useState('loading');
    const [pet, setPet] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        Adoption.getAdoptionById(id)
            .then((adoption) => {
                adoption.result = Adoption.translateResult(adoption.result);
                const pet = adoption.pet;
                const user = adoption.user;
                pet.image = pet.images[0];
                pet.age = pet.birthDate ? getAge(pet) : "Desconocida";
                setPet(pet);
                setUser(user);
                setAdoption(adoption);
            }).catch((error) => {
                setAdoption(null);
                console.error("An error occurred:", error);
            });
    }, [id]);

    if (adoption == 'loading') {
        return <div className="flex flex-1 items-center justify-center">
            <Loader />
        </div>;
    }

    if (!adoption || !pet || !user) {
        return <div className="text-center text-red-500">
            Error al cargar la adopción
            <br />
            Intentelo mas tarde
        </div>;
    }



    return (
        <div className="flex flex-col md:flex-row justify-evenly items-center">
            <div className="flex flex-col items-center justify-center p-2 gap-2">
                <div className="grid grid-cols-2">
                    <Link href={`/pets/${pet._id}`} className={styles.cards}>
                        <div className="w-fit h-fit">
                            <p>{pet.name}</p>
                            <p>{pet.breed}</p>
                            <p>{pet.age.number}{" "}{pet.age.unit}</p>
                        </div>
                        <div className="h-full flex justify-center items-center md:h-[200px] md:w-[200px]">
                            <Image src={pet.image} alt="Pet image" width={200} height={200} className="w-full h-full object-center object-cover rounded-md" />
                        </div>
                    </Link>
                    <div className={styles.cards}>
                        <div>
                            <p>{user.name}</p>
                            <p>{user?.phone}</p>
                            <p>{user.email}</p>
                        </div>
                        <div className="w-full h-full flex justify-center items-center md:h-[200px] md:w-[200px]">
                            <Image src={user.image || "/images/userProfile.svg"} alt="User image" width={150} height={150} className="w-full h-full object-center object-cover rounded-md" />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-2 items-center align-middle justify-items-center">
                    {checkCrossPill(adoption.responsable, "Es el responsable de la adopción")}
                    {checkCrossPill(adoption.incomeMoney, "Tiene ingresos suficientes")}
                    {checkCrossPill(adoption.allowed, "Tiene permiso del dueño")}
                    {checkCrossPill(!adoption.alergies, "Sin alergias")}
                    {checkCrossPill(adoption.hadPets, "Tuvo o tiene mascotas")}
                    {adoption.hadPets && checkCrossPill(adoption.areSterilized, "Están castradas")}
                </div>
                <div className="grid md:grid-cols-4 grid-cols-2 gap-2">
                    <label className='font-bold text-center'>
                        Solicitada:
                    </label>
                    <p>{formatDateToDDMMYYYY(adoption.createdAt)}</p>
                    <label className='font-bold text-center'>Estado:</label>
                    <p>{adoption.result}</p>
                    <label className='font-bold text-center'>Tipo propiedad: </label>
                    <p>{adoption.homeType}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <hr className="w-full border border-gray-300" />
                    <label className={styles.label}>¿Experiencia con mascotas o que van a convivir con el animal?</label>
                    <p>{adoption.tellMoreAboutPets}</p>
                    <hr className="w-full border border-gray-300" />
                    <label className={styles.label}>¿Que harias en el caso de que no puedas tener mas el animal?</label>
                    <p>{adoption.inWorstCase}</p>
                    <hr className="w-full border border-gray-300" />
                    <label className={styles.label}>¿Por que queres adoptar a este animal?</label>
                    <p>{adoption.whyAdopt}</p>
                </div>
            </div>
            <div className="w-full md:w-1/3 p-2 ">
                <Chat />
            </div>
        </div>
    )
}

const styles = {
    cards: "flex flex-col items-center justify-evenly border-2 p-2 m-2 hover:transform hover:scale-105 hover:bg-slate-200 transition-all rounded-md bg-slate-300",
    label: "text-lg font-semibold",
}