"use client";
import React from "react";
import { useState, useEffect } from "react";
import { Dog, Cat } from "lucide-react";

export default function FunnyButton({ children }) {
    const [showDog, setShowDog] = useState(true);
    const [showCat, setShowCat] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setShowDog(!showDog);
            setShowCat(!showCat);
        }, 1500);

        return () => clearInterval(interval);
    }, [showDog, showCat]);

    return (
        <button className="flex gap-1 items-center bg-green-950 text-white border-2 border-green-500 px-16 py-2 rounded-full text-xl hover:bg-green-700 transition-all active:translate-y-1">
            <div className="animate-bounce duration-500 ease-in-out">
                {showDog ? <Dog /> : null}
                {showCat ? <Cat /> : null}
            </div>
            {children}
        </button>
    );
}