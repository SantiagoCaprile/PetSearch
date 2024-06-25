'use client';
import { useEffect } from "react";
import Nav from "@/components/Nav/page";
import BottomNavMobile from "@/components/BottomNavMobile/page";
import { Provider } from "react-redux";
import store from '../../app/store/configureStore';
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

export default function RootLayoutClient({ children }) {
    useEffect(() => {
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
        script.setAttribute('data-ad-client', 'ca-pub-9956234514200358');
        document.head.appendChild(script);
    }, []);

    return (
        <SessionProvider>
            <Provider store={store}>
                <Toaster position="bottom-center" />
                <Nav />
                <main className="flex flex-col flex-1 bg-[#EFEEF1] mb-14 md:mb-0">
                    {children}
                    <footer className="flex flex-col text-wrap md:flex-row justify-evenly mt-auto bg-slate-700">
                        <p className="text-center text-gray-500 text-xs p-1">
                            &copy;{new Date().getFullYear()} PetSearch - All Rights Reserved
                        </p>
                        <div className="flex flex-row items-center justify-center gap-x-2">
                            <a href="/faq/PrivacyPolicy" className="text-center text-gray-500 text-xs">
                                Política de Privacidad
                            </a>
                            <span className="text-gray-500 hidden md:block text-xs">|</span>
                            <a href="/faq/TermsOfService" className="text-center text-gray-500 text-xs">
                                Términos de Servicio
                            </a>
                        </div>
                    </footer>
                </main>
                <BottomNavMobile />
            </Provider>
        </SessionProvider>
    );
}
