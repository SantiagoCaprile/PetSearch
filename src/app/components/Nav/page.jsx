import Link from "next/link";

const navButtonsStyle =
  "p-3 m-2 rounded-md transition duration-500 ease-in-out underline text-white font-bold";

export default function Nav() {
  return (
    <nav className="flex items-center justify-between bg-green-500 min-w-full pl-3 pr-3">
      <p className=" text-white text-2xl font-bold p-4">
        <Link href="/">PetSearch</Link>
        <span className="text-sm text-white font-normal"> hi</span>
      </p>
      <ul className="flex justify-around border-l-2">
        <li className={navButtonsStyle}>
          <Link href="/register">Registrate</Link>
        </li>
        <li className={navButtonsStyle}>
          <Link href="/login">Inicia Sesión</Link>
        </li>
      </ul>
    </nav>
  );
}
