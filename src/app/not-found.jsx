import Image from "next/image";
import React from "react";

export default function NotFound() {
	return (
		<div className="flex flex-col flex-1 justify-center items-center bg-white">
			<h2 className="text-5xl font-mono font-medium z-10">Page not found :C</h2>
			<Image src={"/images/cat404.webp"} alt="404" width={500} height={500} />
			<a
				href="/"
				className="bg-green-950 text-white border-2 border-green-500 px-16 py-2 rounded-full text-xl hover:bg-green-700 transition-all active:translate-y-1"
			>
				Volver al inicio
			</a>
		</div>
	);
}
