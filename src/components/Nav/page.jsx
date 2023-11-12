import Link from "next/link";
import { User, UserPlus, PawPrint, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function Nav() {
  const { data: session } = useSession();

  console.log("session", session);
  const handleLogout = async ({ userName }) => {
    try {
      await signOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="flex items-center justify-between bg-green-500 min-w-full pl-3 pr-3">
      <p className=" text-white text-2xl font-bold p-4 flex gap-1 items-baseline">
        <PawPrint />
        <Link href="/">PetSearch</Link>
        <span className="text-sm text-white font-normal"> hi</span>
      </p>
      <ul className="flex justify-around border-l-2 w-1/3">
        <li className="text-white font-bold hover:underline">
          {session ? (
            <Link href="/profile" className="flex gap-2">
              <User />
              <span>{session.user.name}</span>
            </Link>
          ) : (
            <Link href="/login" className="flex gap-2">
              <User />
              <span>Iniciar Sesión</span>
            </Link>
          )}
        </li>
        <li className="text-white font-bold hover:underline">
          {session ? (
            <button onClick={handleLogout} className="flex gap-2 items-center">
              <LogOut height={18} />
              <span>Cerrar Sesión</span>
            </button>
          ) : (
            <Link href="/register" className="flex gap-1">
              <UserPlus />
              <span>Registrarse</span>
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
