"use client"
import Image from "next/image";
import Link from "next/link";
const imageExample =
    "https://firebasestorage.googleapis.com/v0/b/petsearch-e0abe.appspot.com/o/pet1.webp?alt=media&token=cd4dd80f-89d3-4cd2-b123-0b615c07852a";
const imageAlt = "Pet image";
import { CheckCircle, Ban, Timer, CircleDotDashed } from "lucide-react";


export default function AdoptionCard({ pet, user, adoption }) {

    return (
        <div className="w-fit bg-slate-300 rounded-md p-2 hover:transform hover:scale-105 hover:bg-slate-200 border-2 hover:border-slate-500 transition-all">
            <Link href={`/adoption/${adoption._id}`}>
                <div className="min-h-5 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-52">
                    <Image
                        src={imageExample}
                        alt={imageAlt}
                        width={250}
                        height={250}
                        className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                    />
                </div>
                <div className="mt-4 flex justify-between">
                    <p className="text-sm text-gray-700">
                        <span aria-hidden="true" className="" />
                        {pet.name}
                    </p>
                    <p className="text-sm font-medium text-gray-900">{pet.breed}</p>
                </div>
                <div className="mt-2 flex justify-between">
                    <p className="text-sm text-gray-700">
                        <span aria-hidden="true" className="" />
                        {user.name}
                    </p>
                    <p className="text-sm font-medium text-gray-900">{adoption.date}</p>
                    <p className="text-sm font-medium text-gray-900">
                        {adoption.status === "approved" && (<span className={styles.statusSpan}><CheckCircle color="LightGreen" strokeWidth={3} /> Adoptado</span>)}
                        {adoption.status === "denied" && (<span className={styles.statusSpan}><Ban color="Red" strokeWidth={3} /> Rechazado</span>)}
                        {adoption.status === "pending" && (<span className={styles.statusSpan}><Timer color="Yellow" strokeWidth={3} /> Pendiente</span>)}
                        {adoption.status === "on review" && (<span className={styles.statusSpan}><CircleDotDashed color="Blue" strokeWidth={3} /> En Revisión</span>)}
                    </p>
                </div>
            </Link>
        </div>
    );
}

const styles = {
    statusSpan: "flex gap-1 items-center p-1 rounded-lg border border-gray-600 bg-gray-500 text-white",
}