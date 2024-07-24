"use client";
import React, { useReducer, useEffect } from "react";
import faqs from "@utils/faq";
import Metadata from "@/components/Metadata/page";
import { defaultMetadata } from "@/utils/metadata";

const faqReducer = (state, action) => {
    switch (action.type) {
        case "TOGGLE_FAQ":
            return state === action.index ? null : action.index;
        default:
            return state;
    }
};

export default function Faq() {
    const [selectedFaq, dispatch] = useReducer(faqReducer, null);

    const handleFaqClick = (index) => {
        dispatch({ type: "TOGGLE_FAQ", index });
    };

    const metadata = {
        ...defaultMetadata,
        title: "Preguntas Frecuentes" + defaultMetadata.separator + defaultMetadata.title,
        description: "Preguntas frecuentes de PetSearch. Conocé más sobre nuestra plataforma y cómo funciona",
    };

    return (
        <div className="container mx-auto flex flex-col justify-center items-center">
            <Metadata {...metadata} />
            <h1 className="text-4xl font-bold text-center my-8">
                PetSearch y el Marketing Sustentable
            </h1>
            <iframe
                className="bg-black p-1 rounded-sm w-full h-[280px] md:w-[780px] md:h-[450px]"
                src="https://www.youtube.com/embed/OdxBDAq9kwU?si=9ezNSMqxYZCa8LUX" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen="true"
            >
            </iframe>


            <h2 className="text-4xl font-bold text-center my-8">Preguntas Frecuentes</h2>
            <div className="grid grid-cols-1 md:w-[800px]">
                {faqs.map((faq, index) => {
                    const isFaqSelected = index === selectedFaq;
                    return (
                        <div key={index} className="bg-white rounded-lg shadow-md mb-8">
                            <div
                                className="flex justify-between items-start p-4 cursor-pointer"
                                onClick={() => handleFaqClick(index)}
                            >
                                <h2 className="text-lg font-semibold">{faq.Q}</h2>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`h-6 w-6 transition-transform duration-200 ${isFaqSelected ? 'transform rotate-180' : ''}`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </div>
                            <div
                                className={`duration-300 ease-in-out overflow-hidden ${isFaqSelected ? 'max-h-screen' : 'max-h-0'}`}
                            >
                                <div className="p-4 text-pretty">
                                    <p>{faq.A}</p>
                                </div>
                            </div>
                        </div>

                    );
                })}
            </div>
        </div>
    );
}