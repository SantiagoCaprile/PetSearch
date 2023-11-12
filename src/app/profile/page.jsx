import Image from "next/image";
import Link from "next/link";
import userImage from "../../../public/images/user.jpg";
import { Pencil } from "lucide-react";
import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function UserProfile() {
  const session = await getServerSession(options).then((session) => {
    console.log("session", session);
    return session;
  });

  if (!session) {
    redirect("/login");
  }
  return (
    <div className="w-1/2 mx-auto p-4 flex flex-1 flex-col justify-center">
      <div className="flex flex-col md:flex-row pb-2 items-center ">
        <div className="w-full md:w-1/2 mb-6">
          <div className="relative square-image-wrapper mb-6">
            <div className="flex justify-center min-h-full min-w-full rounded-md">
              <Image
                src={userImage}
                alt={"user"}
                width={300}
                className="rounded-lg min-h-full"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 mb-6 md:pl-6 flex flex-col">
          <h1 className="text-4xl mb-2">{session.user.name}</h1>
          <div className="mb-4 flex flex-col h-1/2 justify-evenly">
            <p className="text-gray-700">
              Instagram: <span className="text-blue-500">@usuario</span>
            </p>
            <p className="text-gray-700">
              Facebook: <span className="text-blue-500">@usuario</span>
            </p>
          </div>
          <Link
            href="/personalform"
            className="bg-blue-500 hover:bg-blue-600 transition-all text-white px-4 py-2 rounded-md w-2/3 flex gap-1 items-center justify-center"
          >
            Cambiar mis datos personales
            <Pencil size={20} />
          </Link>
        </div>
      </div>
      <div className="my-5">
        <div className="border-t border-black pt-2 items-center">
          <h2 className="text-lg font-semibold mb-4">Sobre mi</h2>
          <p className="text-gray-700">
            {/*pet.description*/}
            Lorem Ipsum es simplemente el texto de relleno de las imprentas y
            archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar
            de las industrias desde el año 1500, cuando un impresor (N. del T.
            persona que se dedica a la imprenta) desconocido usó una galería de
            textos y los mezcló de tal manera que logró hacer un libro de textos
            especimen. No sólo sobrevivió 500 años, sino que tambien ingresó
            como texto de relleno en documentos electrónicos, quedando
            esencialmente igual al original. Fue popularizado en los 60s con la
            creación de las hojas Letraset, las cuales contenian pasajes de
            Lorem Ipsum, y más recientemente con software de autoedición, como
            por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem
            Ipsum.
          </p>
        </div>
      </div>
    </div>
  );
}
