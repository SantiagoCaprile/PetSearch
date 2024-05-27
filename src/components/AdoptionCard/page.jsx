"use client"
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, Ban, Timer, CircleDotDashed } from "lucide-react";
import { formatDateToDDMMYYYY } from "@/utils/dateFunctions";

export default function AdoptionCard({ adoption, pet, user }) {

    if (!adoption || !pet || !user) {
        return null;
    }

    return (
        <div className="w-fit bg-slate-300 rounded-md p-2 hover:transform hover:scale-105 hover:bg-slate-200 border-2 hover:border-slate-500 transition-all">
            <Link href={`/myadoptions/${adoption._id}`}>
                <div className="min-h-5 aspect-video min-w-[300px] w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-52">
                    <Image
                        src={pet.images[0]}
                        alt={pet.name + " image"
                            || "Imagen de mascota"}
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
                    <p className="text-sm font-medium text-gray-900">{
                        formatDateToDDMMYYYY(adoption.createdAt)
                    }</p>
                    <p className="text-sm font-medium text-gray-900">
                        {adoption.result === "approved" && (<span className={styles.statusSpan}><CheckCircle color="LightGreen" strokeWidth={3} /> Adoptado</span>)}
                        {adoption.result === "denied" && (<span className={styles.statusSpan}><Ban color="Red" strokeWidth={3} /> Rechazado</span>)}
                        {adoption.result === "pending" && (<span className={styles.statusSpan}><Timer color="Yellow" strokeWidth={3} /> Pendiente</span>)}
                        {adoption.result === "on review" && (<span className={styles.statusSpan}><CircleDotDashed color="Blue" strokeWidth={3} /> En Revisión</span>)}
                    </p>
                </div>
            </Link>
        </div>
    );
}

const styles = {
    statusSpan: "flex gap-1 items-center p-1 rounded-lg border border-gray-600 bg-gray-500 text-white",
}