"use client"
import Image from "next/image";
import rescuerImage from "@public/images/rescuerProfile.svg";
import { useEffect, useState } from "react";
import Rescuer from "@/classes/Rescuer";

export default function RescuerPublicProfile({ params }) {
    const { id } = params;
    const [rescuer, setRescuer] = useState({});

    useEffect(() => {
        Rescuer.getRescuerById(id)
            .then((res) => {
                setRescuer(res.rescuer);
                console.log(res.rescuer);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [id]);

    if (!rescuer) {
        return <div>Loading...</div>;
    }

    return (
        <div className="md:w-3/5 md:m-auto p-4 md:p-8 bg-white shadow-md rounded-md">
            <div className="flex flex-col lg:flex-row pb-2 items-center justify-center md:justify-evenly">
                <div className="mb-6 flex justify-center p-4 h-[200px] w-[200px] bg-slate-200 rounded-md md:mb-6">
                    <div className="flex justify-center min-h-full min-w-full rounded-md mb-6">
                        <Image
                            src={rescuerImage}
                            alt={"rescuer"}
                            width={300}
                            className="rounded-lg min-h-full"
                            style={{ objectFit: "cover" }}
                        />
                    </div>
                </div>
                <div className="w-full md:w-1/2 mb-6 md:pl-6 flex flex-col">
                    <h1 className="text-3xl mb-2">{rescuer.user?.name}</h1>
                    <div className="mb-4 flex flex-col h-1/2 justify-evenly">
                        <p className="text-gray-700">
                            <strong>Email:</strong> <a href={`mailto:${rescuer.user?.email}`} className="text-blue-500 underline">{rescuer.user?.email}</a>
                        </p>
                        <p className="text-gray-700">
                            Instagram: <span className="text-blue-500">@usuario</span>
                        </p>
                        <p className="text-gray-700">
                            Facebook: <span className="text-blue-500">@usuario</span>
                        </p>
                        <p className="text-gray-700">
                            {rescuer.city}
                        </p>
                        <p className="text-gray-700">
                            {rescuer.contactPhone}
                        </p>
                    </div>
                </div>
            </div>
            <div className="my-5">
                <div className="border-t border-black pt-2 items-center">
                    <h2 className="text-lg font-semibold mb-4">Biografía</h2>
                    <p className="text-gray-700 text-pretty">
                        {rescuer && rescuer?.bio}
                    </p>
                </div>
            </div>
        </div>
    );
}
