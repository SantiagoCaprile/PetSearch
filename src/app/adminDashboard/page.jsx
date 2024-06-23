'use client';
import React from "react";
import Link from 'next/link';
//this page will be the admin dashboard
//will have many options for the admin to manage the app
//divided in tabs

const routes = [
    {
        name: "Locations",
        url: "/adminDashboard/locations",
    },
    {
        name: "Pets",
        url: "/adminDashboard/pets",
    },
    {
        name: "Users",
        url: "/adminDashboard/users",
    },
    {
        name: "Rescuers",
        url: "/adminDashboard/rescuers",
    },
];

export default function AdminDashboard() {
    return (
        <div className="flex flex-1 bg-slate-700 items-center flex-col gap-4 text-white">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <div className="flex flex-col gap-4">
                {routes.map((route, index) => (
                    <Link key={index} href={route.url} className={(index % 2 === 0 ? "bg-blue-400 " : "bg-green-400 "
                    ) + buttonsStyles}>
                        {route.name}
                    </Link>
                ))}
            </div>
        </div >
    );
}

const buttonsStyles = "text-xl text-center font-semibold text-white font-semibold rounded-md p-8 hover:bg-slate-600 transition-all duration-200"