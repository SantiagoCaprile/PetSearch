// utils/metadata.js
export const defaultMetadata = {
    metadataBase: new URL("https://www.petsearch.com.ar"),
    keywords: ["PetSearch", "Mascotas", "Adopciones", "Rescatistas", "Argentina",],
    title: "PetSearch",
    separator: " | ",
    openGraph: {
        description: "PetSearch es una aplicación para encontrar tu mascota ideal",
        image: "/images/thumbnail.webp",
        title: "PetSearch",
    },
    twitter: {
        card: "summary_large_image",
        site: "@PetSearch",
        creator: "@PetSearch",
        title: "PetSearch",
        description: "PetSearch es una aplicación para encontrar tu mascota ideal",
        image: "/images/thumbnail.webp",
    }
};

