"use client"
import React, { useState, useEffect } from "react";
import Chat from "@/components/Chat";
import Image from "next/image";
import Link from "next/link";
import Adoption from "@/classes/Adoption";
import Loader from "@/components/Loader";
import { getAge, formatDateToDDMMYYYY } from "@/utils/dateFunctions";
import { useSession } from "next-auth/react";
import ConfirmButton from "@/components/ConfirmButton/page";
import { toast } from "react-hot-toast"

import { CheckCircle2, XCircle, MessageSquareWarning } from "lucide-react";
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

export default function AdoptionPage({ params }) {
    const { data: session } = useSession();
    const [adoption, setAdoption] = useState('loading');
    const [pet, setPet] = useState(null);
    const [user, setUser] = useState(null);
    const [rescuer, setRescuer] = useState(null);
    const [actualResult, setActualResult] = useState(null);

    useEffect(() => {
        if (!session) return;
        Adoption.getAdoptionById(params.id)
            .then((adoption) => {
                if (session.user.role === "rescuer" && adoption.result === Adoption.result.PENDING) {
                    Adoption.changeAdoptionStatus(adoption._id, Adoption.result.ON_REVIEW, session.user.role)
                        .then((response) => {
                            // console.log(response);
                        }).catch((error) => {
                            console.error("An error occurred:", error);
                        });
                }
                return adoption;
            }).then((adoption) => {
                adoption.status = Adoption.translateResult(adoption.result);
                const pet = adoption.pet;
                const user = adoption.user;
                pet.image = pet.images[0];
                pet.age = pet.birthDate ? getAge(pet) : "Desconocida";
                setPet(pet);
                setUser(user);
                setRescuer(adoption.rescuer)
                setAdoption(adoption);
                setActualResult(adoption.result);
            }).catch((error) => {
                setAdoption(null);
                console.error("An error occurred:", error);
            });
    }, [params.id, actualResult, session]);

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

    const handleConfirmChange = (status) => {
        const toastId = toast.loading("Cargando...");
        Adoption.changeAdoptionStatus(adoption._id, status, session.user.role)
            .then((response) => {
                setActualResult(status);
                toast.success("Acción realizada exitosamente", { id: toastId });
            }).catch((error) => {
                toast.error("Error al realizar la acción", { id: toastId });
                console.error("An error occurred:", error);
            });
    }

    return (
        <div className="flex flex-col md:flex-row justify-evenly items-center">
            <div className="flex flex-col items-center justify-center p-2 gap-2">
                <div className="grid md:grid-cols-2 md:gap-4 md:mb-2">
                    <Link href={`/pets/${pet._id}`} className={styles.cards}>
                        <p className="col-span-2 text-center text-lg md:text-xl"
                        ><b>{pet.name}</b></p>
                        <div className="flex justify-center items-center h-[150px] w-[200px] md:h-[200px] md:w-[250px]">
                            <Image src={pet.image} alt="Pet image" width={200} height={200} className="w-full h-full object-center object-cover rounded-md" />
                        </div>
                        <div className="flex w-full justify-around">
                            <p>{pet.breed}</p>
                            <p>{pet.age.number}{" "}{pet.age.unit}</p>
                        </div>
                    </Link>
                    <div className="flex flex-col items-center justify-center">
                        <div className={styles.heros}>
                            <div className="text-wrap">
                                <p><b>{user.name}</b></p>
                                <p>{user?.phone}</p>
                                <p className="text-xs md:text-base">{user.email}</p>
                            </div>
                            <div className="flex justify-center items-center h-[50px] w-[50px]">
                                <Image src={user.image || "/images/userProfile.svg"} alt="User image" width={200} height={200} priority className="w-full h-full object-center object-cover rounded-md" />
                            </div>
                        </div>
                        <div className={styles.heros}>
                            <div className="text-wrap">
                                <p><b>{rescuer.user.name}</b></p>
                                <p>{rescuer?.user.phone}</p>
                                <p className="text-xs md:text-base">{rescuer.user.email}</p>
                            </div>
                            <div className="flex justify-center items-center h-[50px] w-[50px]">
                                <Image src={rescuer.image || "/images/rescuerProfile.svg"} alt="User image" width={100} height={100} priority className="w-full h-full object-center object-cover rounded-md" />
                            </div>
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
                    <p>{adoption.status}</p>
                    <label className='font-bold text-center'>Tipo propiedad: </label>
                    <p>{adoption.homeType === "Dpto" ? "Departamento" : adoption.homeType}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <hr className="w-full border border-gray-300" />
                    <label className={styles.label}>¿Experiencia con mascotas o que van a convivir con el animal?</label>
                    <p>{adoption.tellMoreAboutPets}</p>
                    <hr className="w-full border border-gray-300" />
                    <label className={styles.label}>¿Que harías en el caso de que no puedas tener mas el animal?</label>
                    <p>{adoption.inWorstCase}</p>
                    <hr className="w-full border border-gray-300" />
                    <label className={styles.label}>¿Por qué queres adoptar?</label>
                    <p>{adoption.whyAdopt}</p>
                </div>
                {session && session.user.role === 'user' &&
                    <>
                        <ConfirmButton
                            click={() => handleConfirmChange(Adoption.result.CANCELLED)}
                            text="Retirar Adopción"
                            disabledIf={!(adoption.result === Adoption.result.ON_REVIEW || adoption.result === Adoption.result.PENDING)}
                            finalText="Esta seguro de retirar la adopción?"
                            bgColor="bg-red-500"
                        />
                        <ConfirmButton
                            click={() => console.log("Rescatista denunciado")}
                            text={<div className="flex gap-2 items-center justify-center"><MessageSquareWarning size={24} strokeWidth={3} /><span>Denunciar</span></div>}
                            disabledIf={!(adoption.result === Adoption.result.ON_REVIEW || adoption.result === Adoption.result.PENDING)}
                            finalText="Está seguro que desea poner una denuncia?"
                            bgColor="bg-red-500"
                        />
                    </>
                }
                {session && session.user.role === 'rescuer' &&
                    <div className="flex flex-col gap-2 md:flex-row w-full md:w-fit">
                        <ConfirmButton
                            click={() => handleConfirmChange(Adoption.result.APPROVED)}
                            text="Aprobar"
                            disabledIf={!(adoption.result === Adoption.result.ON_REVIEW || adoption.result === Adoption.result.PENDING)}
                            finalText="Esta seguro de aceptar la adopción?"
                            bgColor="bg-green-500"
                        />
                        <ConfirmButton
                            click={() => handleConfirmChange(Adoption.result.DENIED)}
                            text="Rechazar adopción"
                            disabledIf={!(adoption.result === Adoption.result.ON_REVIEW || adoption.result === Adoption.result.PENDING)}
                            finalText="Esta seguro de rechazar la adopción?"
                            bgColor="bg-red-500"
                        />
                    </div>
                }
            </div>
            <div className="w-full md:w-1/3 p-2 ">
                <Chat chatId={adoption.chat} />
            </div>
        </div>
    )
}

const styles = {
    cards: "flex flex-col items-center justify-evenly border-2 p-2 hover:transform hover:scale-105 hover:bg-slate-200 transition-all rounded-md bg-slate-300 w-full gap-2",
    heros: "flex justify-center items-center gap-2 p-2 m-2 hover:transform hover:scale-105 hover:bg-slate-200 transition-all rounded-md bg-slate-300 w-full",
    label: "text-lg font-semibold",
}