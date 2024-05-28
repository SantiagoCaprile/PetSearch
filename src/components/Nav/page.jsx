import Link from "next/link";
import { User, UserPlus, PawPrint, LogOut, Cat, FileHeart } from "lucide-react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import LocationSelector from "../LocationSelector/page";

export default function Nav() {
  const { data: session } = useSession();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="flex items-center justify-between bg-green-500 min-w-full">
      <p className="text-white text-lg md:text-2xl font-bold p-4 flex gap-1 items-baseline border-r-2">
        <PawPrint />
        <Link href="/">PetSearch</Link>
        <span className="text-sm text-white font-normal"> hi</span>
      </p>
      <LocationSelector />
      {session && (session.user.role === "rescuer" || session.user.role === "user") && (
        <ul className="flex-1 justify-end gap-4 border-l-2 px-2 md:px-8 hidden md:flex">
          <li className="text-white font-bold hover:underline">
            <Link href="/myadoptions" className="gap-2 flex">
              <FileHeart />
              <span>Mis adopciones</span>
            </Link>
          </li>
          {
            session && session.user.role === "rescuer" &&
            <li className="text-white font-bold hover:underline">
              <Link href="/mypets" className="gap-2 flex">
                <Cat />
                <span>Mis Mascotas</span>
              </Link>
            </li>
          }
        </ul>
      )
      }
      <ul className="flex gap-4 px-2 md:px-8 border-l-2">
        <li className="text-white font-bold hover:underline">
          {session ? (
            <Link href="/profile" className="gap-2 hidden md:flex">
              <User />
              <span>
                {session.user.name}
                {session.user.role === "rescuer" && " - Rescatista"}
                {session.user.role === "admin" && " - Admin"}
              </span>
            </Link>
          ) : (
            <Link href="/login" className="gap-2 hidden md:flex">
              <User />
              <span>Iniciar Sesión</span>
            </Link>
          )}
        </li>
        <li className="text-white font-bold hover:underline">
          {session ? (
            <button onClick={handleLogout} className="flex gap-2 items-center">
              <LogOut height={24} />
              <span className="hidden md:block">Cerrar Sesión</span>
            </button>
          ) : (
            <Link href="/register" className="flex gap-1">
              <UserPlus />
              <span className="hidden md:block">Registrarse</span>
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
