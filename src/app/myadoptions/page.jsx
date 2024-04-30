"use client"
import React from "react";
import AdoptionCard from "@/components/AdoptionCard/page";

const sampleData = [
    {
        pet: {
            _id: "1",
            name: "Max",
            breed: "Labrador",
        },
        user: {
            _id: "1",
            name: "John Doe",
        },
        adoption: {
            _id: "1",
            status: "approved",
            date: "2021-09-01",
        },
    },
    {
        pet: {
            _id: "2",
            name: "Luna",
            breed: "Golden Retriever",
        },
        user: {
            _id: "2",
            name: "Jane Doe",
        },
        adoption: {
            _id: "2",
            status: "on review",
            date: "2021-09-01",
        },
    },
    {
        pet: {
            _id: "3",
            name: "Rocky",
            breed: "German Shepherd",
        },
        user: {
            _id: "3",
            name: "John Smith",
        },
        adoption: {
            _id: "3",
            status: "pending",
            date: "2021-09-01",
        },
    },
    {
        pet: {
            _id: "4",
            name: "Bella",
            breed: "Poodle",
        },
        user: {
            _id: "4",
            name: "Jane Smith",
        },
        adoption: {
            _id: "4",
            status: "denied",
            date: "2021-09-01",
        },
    },
];

export default function MyAdoptions() {
    return (
        <div className="grid grid-cols-1 place-items-center gap-4 align-middle md:grid-cols-2 lg:grid-cols-3 my-4">
            {sampleData.map((adoption) => (
                <AdoptionCard key={adoption.pet._id} {...adoption} />
            ))}
        </div>
    );
}