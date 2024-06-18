import React from "react";
import Link from "next/link";
import PetsRandom from "../components/PetsRandom/page";
import { Store, MapPinned, PersonStanding } from "lucide-react";
import FunnyButton from "@/components/FunnyButtom/page";
import Sponsors from "@/components/Sponsors/page";

export const metadata = {
  title: "PetSearch",
  description: "PetSearch es una aplicación para encontrar tu mascota ideal",
};

export default async function HomePage() {
  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col flex-1 items-center justify-end bg-[url('../../public/images/dog.webp')] bg-cover md:bg-center bg-right min-h-[550px] text-white">
        <div className="flex flex-col justify-start">
          <div className="text-3xl text-center md:text-8xl md:text-left font-[meows] font-medium z-10">
            <p>Somos PetSearch</p>
            <p>Tenemos un amigo para vos</p>
          </div>
          <div>
            <div className="flex flex-col md:flex-row justify-evenly items-center p-3 text-base rounded-t-md from-transparent to-green-900 bg-gradient-to-b">
              <div className="flex md:flex-row justify-center items-center gap-1 flex-col">
                <Link href="/pets">
                  <FunnyButton >
                    <span>Mascotas</span>
                  </FunnyButton>
                </Link>
                <Link href="/helpMap">
                  <button className="flex gap-1 items-center bg-green-950 text-white border-2 border-green-500 px-16 py-2 rounded-full text-xl hover:bg-green-700 transition-all active:translate-y-1 text-nowrap">
                    <MapPinned />
                    Pet GPS
                  </button>
                </Link>
                <Link href="/rescuers">
                  <button className="flex gap-1 items-center bg-green-950 text-white border-2 border-green-500 px-16 py-2 rounded-full text-xl hover:bg-green-700 transition-all active:translate-y-1">
                    <Store />
                    Rescatistas
                  </button>
                </Link>
                <Link href="/faq">
                  <button className="flex gap-1 items-center bg-green-950 text-white border-2 border-green-500 px-16 py-2 rounded-full text-xl hover:bg-green-700 transition-all active:translate-y-1">
                    <PersonStanding />
                    Nosotros
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center pt-1 pb-2 px-5 from-transparent to-green-900 bg-gradient-to-t md:min-h-80 min-h-[300px]">
        <PetsRandom />
        <Sponsors />
      </div>
    </div>
  );
}
