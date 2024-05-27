"use client";
import Nav from "../components/Nav/page";
import BottomNavMobile from "@/components/BottomNavMobile/page";
import "./globals.css";
import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import store from "./store/configureStore";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <html lang="en">
          <body className={inter.className + " flex flex-col min-h-lvh"}>
            <Toaster position="bottom-center" />
            <Nav />
            <main className="flex flex-col flex-1 bg-[#EFEEF1] mb-14 md:mb-0">{children}
              <footer className="flex flex-col  justify-evenly mt-auto bg-slate-700">
                <p className="text-center text-gray-500 text-xs p-1">
                  &copy;{new Date().getFullYear()} PetSearch - All Rights Reserved
                </p>
              </footer>
            </main>
            <BottomNavMobile />
          </body>
        </html>
      </Provider>
    </SessionProvider>
  );
}
