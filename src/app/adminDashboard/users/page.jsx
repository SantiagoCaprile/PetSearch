import React from "react";
import UsersManager from "@/components/AdminComponents/AdminUsers/page";
import Link from "next/link";
import { ArrowBigLeft } from "lucide-react";

export default function AdminUsersPage() {
    return (
        <div className="bg-slate-700 text-white">
            <Link href="/adminDashboard" className=" block max-w-fit bg-blue-500 text-xl text-center font-semibold text-white rounded-md p-2 mt-2 ml-6 hover:bg-slate-600 transition-all duration-200">
                <ArrowBigLeft className="inline-block" size={24} />
                Back
            </Link>
            <UsersManager />
        </div>
    );
}