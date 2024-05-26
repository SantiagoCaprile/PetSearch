"use client";
import React from "react";
import RescuerCard from "@components/RescuerCard/page";
import RescuersFilters from "@components/RescuersFilters/page";
import { useEffect, useState } from "react";
import Rescuer from "@/classes/Rescuer";

export default function RescuersPage() {
  const [rescuers, setRescuers] = useState([]);
  useEffect(() => {
    Rescuer.getAll()
      .then((res) => {
        setRescuers(res.rescuers);
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="flex flex-col flex-1 justify-center items-center">
      <div className="shadow-md rounded p-4 md:p-8 mb-4 max-w-[1200px] w-4/5 bg-white mt-4">
        <h1 className="text-2xl font-bold mb-2">Rescatistas</h1>
        <RescuersFilters />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {
          rescuers &&
          rescuers.map((rescuer) => (
            <RescuerCard key={rescuer._id} rescuer={rescuer} />
          ))
        }
      </div>
    </div>
  );
}


