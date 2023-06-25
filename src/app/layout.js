import Nav from "./components/Nav/page";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PetSearch",
  description: "PetSearch is a web app to find your new pet",
  image: "/paw.ico",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className + " flex flex-col min-h-screen"}>
        <Nav />
        <main className="flex flex-col flex-1">{children}</main>
        <footer className="flex flex-col  justify-evenly mt-auto bg-slate-700">
          <p className="text-center text-gray-500 text-xs p-1">
            &copy;{new Date().getFullYear()} PetSearch - All Rights Reserved
          </p>
        </footer>
      </body>
    </html>
  );
}
