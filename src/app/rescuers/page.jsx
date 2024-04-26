"use client";
import React from "react";
import RescuerCard from "@components/RescuerCard/page";
import RescuersFilters from "@components/RescuersFilters/page";

const rescuers = []
for (let i = 1; i < 9; i++) {
  rescuers.push({
    id: i,
    name: `Rescatista ${i}`,
    location: `Rosario`,
    telephone: `342-123456${i}`,
    image: "/images/rescuerProfile.svg",
  });
}

export default function RescuersPage() {
  return (
    <div className="flex flex-col flex-1 justify-center items-center">
      <div className="shadow-md rounded p-4 md:p-8 mb-4 max-w-[1200px] w-4/5 bg-white mt-4">
        <h1 className="text-2xl font-bold mb-2">Rescatistas</h1>
        <RescuersFilters />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {
          rescuers.map((rescuer) => (
            <RescuerCard key={rescuer.id} rescuer={rescuer} />
          ))
        }
      </div>
    </div>
  );
}


