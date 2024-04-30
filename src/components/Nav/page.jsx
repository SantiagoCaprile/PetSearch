import Link from "next/link";
import { User, UserPlus, PawPrint, LogOut, Cat, FileHeart } from "lucide-react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

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
      <p className="text-white text-lg md:text-2xl font-bold p-4 flex gap-1 items-baseline">
        <PawPrint />
        <Link href="/">PetSearch</Link>
        <span className="text-sm text-white font-normal"> hi</span>
      </p>
      {session && session.user.role === "rescuer" && (
        <ul className="flex flex-1 justify-end gap-4 border-l-2 px-4 md:px-8">
          <li className="text-white font-bold hover:underline">
            <Link href="/myadoptions" className="flex gap-2">
              <FileHeart />
              <span className="hidden md:block">Mis adopciones</span>
            </Link>
          </li>
          <li className="text-white font-bold hover:underline">
            <Link href="/mypets" className="flex gap-2">
              <Cat />
              <span className="hidden md:block">Mis Mascotas</span>
            </Link>
          </li>
        </ul>
      )
      }
      <ul className="flex gap-4 px-4 md:px-8 border-l-2">
        <li className="text-white font-bold hover:underline">
          {session ? (
            <Link href="/profile" className="flex gap-2">
              <User />
              <span className="hidden md:block">
                {session.user.name}
                {session.user.role === "rescuer" && " - Rescatista"}
                {session.user.role === "admin" && " - Admin"}
              </span>
            </Link>
          ) : (
            <Link href="/login" className="flex gap-2">
              <User />
              <span className="hidden md:block">Iniciar Sesión</span>
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
