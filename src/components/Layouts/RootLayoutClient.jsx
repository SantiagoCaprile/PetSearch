// RootLayoutClient.js
'use client';
import Nav from "@/components/Nav/page";
import BottomNavMobile from "@/components/BottomNavMobile/page";
import { Provider } from "react-redux";
import store from '../../app/store/configureStore';
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

export default function RootLayoutClient({ children }) {
    return (
        <SessionProvider>
            <Provider store={store}>
                <Toaster position="bottom-center" />
                <Nav />
                <main className="flex flex-col flex-1 bg-[#EFEEF1] mb-14 md:mb-0">
                    {children}
                </main>
                <footer className="flex flex-col justify-evenly mt-auto bg-slate-700">
                    <p className="text-center text-gray-500 text-xs p-1">
                        &copy;{new Date().getFullYear()} PetSearch - All Rights Reserved
                    </p>
                </footer>
                <BottomNavMobile />
            </Provider>
        </SessionProvider>
    );
}
