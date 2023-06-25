import Image from "next/image";

const pets = [
  {
    id: 1,
    name: "Cogote",
    href: "#",
    imageSrc:
      "https://www.purina.com.ar/sites/default/files/styles/webp/public/2023-06/purina-juegos-mentales-perro-cachorro.png.webp?itok=i2FAaVxg",
    imageAlt: "Front of men's Basic Tee in black.",
    sex: "Macho",
    age: "3 meses",
  },
  {
    id: 2,
    name: "Rita",
    href: "#",
    imageSrc:
      "https://www.purina.com.ar/sites/default/files/styles/webp/public/2023-06/purina-como-hidratar-a-un-perro-3_0.png.webp?itok=ALWt1Mkn",
    imageAlt: "Front of men's Basic Tee in black.",
    sex: "Hembra",
    age: "6 meses",
  },
  {
    id: 3,
    name: "Sultán",
    href: "#",
    imageSrc:
      "https://www.purina.com.ar/sites/default/files/styles/webp/public/2023-06/lugar-acogedor-gato.jpg.webp?itok=vtDyKID7",
    imageAlt: "Front of men's Basic Tee in black.",
    sex: "Macho",
    age: "1 año",
  },
  {
    id: 4,
    name: "Pepita",
    href: "#",
    imageSrc:
      "https://www.purina.com.ar/sites/default/files/styles/webp/public/2023-06/ideas-de-nombres-para-gatos-y-su-significado-1.jpg.webp?itok=y5gIH55B",
    imageAlt: "Front of men's Basic Tee in black.",
    sex: "Hembra",
    age: "2 años",
  },
  // More pets...
];

export default function Pets() {
  return (
    <div className="">
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 mx-2">
        {pets.map((pet) => (
          <div key={pet.id} className="group relative">
            <div className="min-h-5 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-52">
              <Image
                src={pet.imageSrc}
                alt={pet.imageAlt}
                width={250}
                height={250}
                className="w-full h-full object-center object-cover lg:w-full lg:h-full"
              />
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-700">
                  <a href={pet.href}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {pet.name}
                  </a>
                </h3>
                <p className="mt-1 text-sm text-gray-500">{pet.age}</p>
              </div>
              <p className="text-sm font-medium text-gray-900">{pet.sex}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
