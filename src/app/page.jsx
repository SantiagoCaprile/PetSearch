import React from "react";
import Link from "next/link";
import PetsRandom from "../components/PetsRandom/page";
import { Search } from "lucide-react";

export const metadata = {
  title: "PetSearch",
  description: "PetSearch es una aplicación para encontrar tu mascota ideal",
};

export default async function Page() {
  return (
    <div className=" flex flex-col flex-1">
      <div className="flex flex-col flex-1 items-center justify-end bg-[url('../../public/images/dog.jpg')] bg-cover bg-center min-h-[450px] text-white">
        <div className="flex flex-col justify-start ">
          <div className="text-8xl text-left font-[meows] font-medium z-10 ">
            <p>Somos PetSearch</p>
            <p>Tenemos un amigo para vos</p>
          </div>
          <div>
            <form className="flex justify-evenly items-center p-3 text-base  rounded-t-md from-transparent to-green-900 bg-gradient-to-b">
              <fieldset className="flex flex-col text-center text-2xl m-3 w-140">
                <label className="">¿Cual te gustaría adoptar?</label>
                <select className="text-center bg-slate-200 rounded-md text-black hover:bg-slate-300 transition-colors h-10 shadow-md border-2 border-slate-500">
                  <option value="cualquiera">Cualquiera</option>
                  <option value="perro">Perro</option>
                  <option value="gato">Gato</option>
                </select>
              </fieldset>
              <fieldset className="flex flex-col text-center text-2xl m-3">
                <label>¿En donde te encontrás?</label>
                <select className="text-center bg-slate-200 rounded-md text-black hover:bg-slate-300 transition-colors h-10 shadow-md border-2 border-slate-500">
                  <option value="CABA">CABA</option>
                  <option value="Parana">Paraná</option>
                  <option value="Santa Fe">Santa Fe</option>
                  <option value="Rosario">Rosario</option>
                </select>
              </fieldset>
              <Link href="/pets">
                <button className="flex gap-1 items-center bg-green-950 text-white border-2 border-green-500 px-16 py-2 rounded-full text-xl hover:bg-green-700 transition-all active:translate-y-1">
                  <Search />
                  Buscar
                </button>
              </Link>
              <Link href="/discusion">
                <button className="flex gap-1 items-center bg-green-950 text-white border-2 border-green-500 px-16 py-2 rounded-full text-xl hover:bg-green-700 transition-all active:translate-y-1">
                  <Search />
                  Chats BORRAR!!
                </button>
              </Link>
            </form>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center pt-1 pb-2 px-5 from-transparent to-green-900 bg-gradient-to-t">
        <PetsRandom />
      </div>
    </div>
  );
}
