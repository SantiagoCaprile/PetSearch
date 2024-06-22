// RootLayoutServer.js
import "../../app/globals.css";
import { Inter } from "next/font/google";
import Metadata from "@/components/Metadata/page";
import { defaultMetadata } from "@/utils/metadata";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayoutServer({ children }) {
    return (
        <html lang="es">
            <head>
                <Metadata {...defaultMetadata} />
            </head>
            <body className={inter.className + " flex flex-col min-h-lvh"}>
                {children}
            </body>
        </html>
    );
}
