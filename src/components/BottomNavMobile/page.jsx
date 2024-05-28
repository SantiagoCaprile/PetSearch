import React from "react";
import { Home, Cat, User, FileHeart } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function BottomNavMobile() {
    const { data: session } = useSession();

    return (
        <div className="fixed bottom-0 w-full bg-gray-800 flex justify-around items-center p-2 md:hidden">
            <Link href="/" className="flex flex-col items-center">
                <Home color="white" />
                <span className="text-white text-xs">Inicio</span>
            </Link>
            {
                session && (session.user.role === "rescuer" || session.user.role === "user") && (
                    <>
                        <Link href="/myadoptions" className="flex flex-col items-center">
                            <FileHeart color="white" />
                            <span className="text-white text-xs">Mis adopciones</span>
                        </Link>
                        {
                            session && session.user.role === "rescuer" &&
                            <Link href="/mypets" className="flex flex-col items-center">
                                <Cat color="white" />
                                <span className="text-white text-xs">Mis Mascotas</span>
                            </Link>
                        }
                    </>
                )
            }
            {
                session ? (
                    <Link href="/profile" className="flex flex-col items-center">
                        <User color="white" />
                        <span className="text-white text-xs">Mi Perfíl</span>
                    </Link>
                ) : (
                    <Link href="/login" className="flex flex-col items-center">
                        <User color="white" />
                        <span className="text-white text-xs">Iniciar Sesión</span>
                    </Link>
                )
            }
        </div>
    );
}

