'use client';
import React from "react";
import AdminLocations from "@/components/AdminComponents/AdminLocations/page";
//this page will be the admin dashboard
//will have many options for the admin to manage the app
//divided in tabs

export default function AdminDashboard() {
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <AdminLocations />
        </div>
    );
}

