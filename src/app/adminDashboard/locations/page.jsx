'use client';
import React from "react";
import AdminLocations from "@/components/AdminComponents/AdminLocations/page";
import Link from "next/link";
import { ArrowBigLeft } from "lucide-react";
//this page will be the admin dashboard
//will have many options for the admin to manage the app
//divided in tabs

export default function AdminLocationsPage() {
    return (
        <div>
            <Link href="/adminDashboard" className=" block max-w-fit bg-blue-500 text-xl text-center font-semibold text-white rounded-md p-2 mt-2 ml-6 hover:bg-slate-600 transition-all duration-200">
                <ArrowBigLeft className="inline-block" size={24} />
                Back
            </Link>
            <AdminLocations />
        </div>
    );
}