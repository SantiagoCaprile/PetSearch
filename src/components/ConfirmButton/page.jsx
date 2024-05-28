"use client";
import React, { useState } from "react";
import { CheckCircle2, ArrowLeftCircle } from "lucide-react";

export default function ConfirmButton({ onClick, text, disabledIf = null, finalText, bgColor = "bg-gray-700" }) {
    const [confirm, setConfirm] = useState(false);

    return (
        <div className="flex flex-1 gap-2 items-center justify-center text-white">
            {!confirm && (
                <button
                    onClick={() => {
                        if (confirm) {
                            onClick();
                        } else {
                            setConfirm(true);
                        }
                    }}
                    disabled={disabledIf}
                    className={`flex gap-2 items-center justify-center min-w-24 w-full p-2 rounded-lg border border-gray-700 md:w-fit h-[66px] ${disabledIf || confirm ? "cursor-not-allowed" : "cursor-pointer"} ${bgColor}`}
                >
                    <span className=" text-pretty w-4/5 md:w-auto">
                        {confirm ? finalText : text}
                    </span>
                </button>
            )}
            {confirm && (
                <>
                    <button onClick={() => setConfirm(false)} className="flex flex-col gap-2 min-w-24 h-fit p-1 items-center justify-center rounded-lg border border-gray-700 bg-green-500 transition-colors hover:bg-green-400">
                        <CheckCircle2 size={24} color="white" />
                        <span className=" text-pretty text-white w-4/5 md:w-auto">
                            Confirmar
                        </span>
                    </button>
                    <button onClick={() => setConfirm(false)} className="flex flex-col min-w-24 h-fit p-1 gap-2 items-center justify-center rounded-lg border border-gray-700 bg-red-500 transition-colors hover:bg-red-400">
                        <ArrowLeftCircle size={24} color="white" />
                        <span className=" text-pretty text-white w-4/5 md:w-auto">
                            Cancelar
                        </span>
                    </button>
                </>
            )}
        </div >
    );
}