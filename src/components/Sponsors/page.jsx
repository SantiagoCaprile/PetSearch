import React from "react";
import SPONSORS from "@utils/sponsors.json";
import Image from "next/image";
import Link from "next/link";

// this will be a sponsor section with the logos of the sponsors and a link to their website
export default function Sponsors() {
    return (
        <div className="flex flex-col items-center justify-center p-2 mt-4">
            <h1 className="text-4xl text-center font-bold text-slate-100 drop-shadow-md">Nuestros Patrocinadores</h1>
            <div className="flex flex-wrap justify-center items-center gap-12 pt-4">
                {SPONSORS.map((sponsor, index) => (
                    <Link key={index} href={sponsor.link} target="_blank" rel="noreferrer">
                        <Image src={sponsor.logo} alt={sponsor.name} width={300} height={130}
                            className="aspect-auto rounded-md shadow-md
                            hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-lg
                            hover:contrast-150 bg-slate-50 max-h-[130px] max-w-[300px] object-contain"
                        />
                    </Link>
                ))}
            </div>
        </div >
    );
}
