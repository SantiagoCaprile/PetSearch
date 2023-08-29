"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Nav() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedUserName = sessionStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }

    // Escuchar el evento "userLoggedIn" y actualizar userName
    const handleUserLoggedIn = () => {
      const updatedUserName = sessionStorage.getItem("userName");
      if (updatedUserName) {
        setUserName(updatedUserName);
      }
    };

    window.addEventListener("userLoggedIn", handleUserLoggedIn);

    return () => {
      // Limpia el evento cuando el componente se desmonta
      window.removeEventListener("userLoggedIn", handleUserLoggedIn);
    };
  }, []);

  //falta hacer un handle logout
  // y la ruta de profile

  return (
    <nav className="flex items-center justify-between bg-green-500 min-w-full pl-3 pr-3">
      <p className=" text-white text-2xl font-bold p-4">
        <Link href="/">PetSearch</Link>
        <span className="text-sm text-white font-normal"> hi</span>
      </p>
      <ul className="flex justify-around border-l-2 w-1/3">
        <li className="text-white font-bold hover:underline">
          {userName ? (
            <Link href="/profile">
              <span>{userName}</span>
            </Link>
          ) : (
            <Link href="/login">
              <span>Iniciar Sesión</span>
            </Link>
          )}
        </li>
        <li className="text-white font-bold hover:underline">
          {userName ? (
            <Link href="/">
              <span>Cerrar Sesión</span>
            </Link>
          ) : (
            <Link href="/register">
              <span>Registrarse</span>
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
